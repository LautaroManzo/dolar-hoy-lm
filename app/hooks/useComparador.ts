'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { API_HISTORICO } from '../constants/api';
import { toApiCasa } from '../constants/dolarTypes';

type DataPoint = { fecha: string; compra: number; venta: number; originalDate: string };
type DataMap = Record<string, DataPoint[]>;

const CACHE_TTL_DAYS = 1;
const HISTORICAL_DAYS = 365;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

function readCache(tipo: string): DataPoint[] | null {
  try {
    const raw = localStorage.getItem(`historico_${tipo}_${HISTORICAL_DAYS}d`);
    if (!raw) return null;
    const { fechaCache, datos } = JSON.parse(raw) as { fechaCache: string; datos: DataPoint[] };
    if ((Date.now() - new Date(fechaCache).getTime()) / MS_PER_DAY >= CACHE_TTL_DAYS) return null;
    return datos;
  } catch {
    return null;
  }
}

function writeCache(tipo: string, datos: DataPoint[]) {
  try {
    localStorage.setItem(
      `historico_${tipo}_${HISTORICAL_DAYS}d`,
      JSON.stringify({ fechaCache: new Date().toISOString(), datos })
    );
  } catch {}
}

async function fetchTipo(tipo: string, signal: AbortSignal): Promise<DataPoint[]> {
  const res = await fetch(
    `${API_HISTORICO}/${toApiCasa(tipo)}`,
    { signal }
  );
  if (!res.ok) throw new Error(`${res.status}`);
  const json: unknown = await res.json();
  if (!Array.isArray(json)) throw new Error('Respuesta no es un array');
  const raw = json.filter(
    (item): item is { fecha: string; compra: number; venta: number } =>
      typeof item === 'object' && item !== null &&
      typeof item.fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(item.fecha) &&
      typeof item.compra === 'number' && typeof item.venta === 'number'
  );
  return raw.slice(-HISTORICAL_DAYS).map(item => {
    const [y, m, d] = item.fecha.split('-').map(Number);
    return {
      fecha: new Date(y, m - 1, d).toLocaleDateString('es-AR', { month: 'short', year: '2-digit' }),
      compra: item.compra,
      venta: item.venta,
      originalDate: item.fecha,
    };
  });
}

function applyRangeFilter(dates: string[], rango: string): string[] {
  const hoy = new Date();
  let fechaCorte: Date;
  if (rango === 'YTD') {
    fechaCorte = new Date(hoy.getFullYear(), 0, 1);
  } else {
    const dias: Record<string, number> = { '7D': 7, '1M': 30, '3M': 90, '6M': 180, '1A': 365 };
    fechaCorte = new Date(hoy);
    fechaCorte.setDate(fechaCorte.getDate() - (dias[rango] ?? 365));
  }
  return dates.filter(d => {
    const [y, m, day] = d.split('-').map(Number);
    return new Date(y, m - 1, day) >= fechaCorte;
  });
}

export type ChartPoint = Record<string, string | number | undefined>;

export function useComparador(selectedTypes: string[], rango: string) {
  const [dataMap, setDataMap] = useState<DataMap>({});
  const [loadingTypes, setLoadingTypes] = useState<Set<string>>(new Set());
  const [failedTypes, setFailedTypes] = useState<Set<string>>(new Set());
  const inFlightRef = useRef<Set<string>>(new Set());

  const isSingle = selectedTypes.length === 1;
  const loading = selectedTypes.some(t => loadingTypes.has(t) || (!dataMap[t] && !failedTypes.has(t)));
  const hasError = selectedTypes.some(t => failedTypes.has(t) && !dataMap[t]);

  useEffect(() => {
    const missing = selectedTypes.filter(t => !dataMap[t] && !inFlightRef.current.has(t));
    if (missing.length === 0) return;

    const controllers: AbortController[] = [];
    const inFlight = inFlightRef.current;
    missing.forEach(t => inFlight.add(t));

    setLoadingTypes(prev => new Set([...prev, ...missing]));

    const load = async () => {
      // Leer caché primero
      const fromCache: DataMap = {};
      const toFetch: string[] = [];

      for (const tipo of missing) {
        const cached = readCache(tipo);
        if (cached) fromCache[tipo] = cached;
        else toFetch.push(tipo);
      }

      if (Object.keys(fromCache).length > 0) {
        setDataMap(prev => ({ ...prev, ...fromCache }));
        setLoadingTypes(prev => {
          const next = new Set(prev);
          Object.keys(fromCache).forEach(t => next.delete(t));
          return next;
        });
      }

      if (toFetch.length === 0) return;

      const results = await Promise.allSettled(
        toFetch.map(tipo => {
          const ctrl = new AbortController();
          controllers.push(ctrl);
          return fetchTipo(tipo, ctrl.signal).then(data => ({ tipo, data }));
        })
      );

      const fresh: DataMap = {};
      const failed: string[] = [];
      for (const result of results) {
        if (result.status === 'fulfilled') {
          fresh[result.value.tipo] = result.value.data;
          writeCache(result.value.tipo, result.value.data);
        } else {
          const idx = results.indexOf(result);
          if (idx >= 0 && idx < toFetch.length) failed.push(toFetch[idx]);
        }
      }

      if (Object.keys(fresh).length > 0) {
        setDataMap(prev => ({ ...prev, ...fresh }));
      }
      if (failed.length > 0) {
        setFailedTypes(prev => new Set([...prev, ...failed]));
      }
      setLoadingTypes(prev => {
        const next = new Set(prev);
        toFetch.forEach(t => next.delete(t));
        return next;
      });
      missing.forEach(t => inFlight.delete(t));
    };

    load();
    return () => {
      controllers.forEach(c => c.abort());
      missing.forEach(t => inFlight.delete(t));
    };
  // selectedTypes.join(',') como dep estable para evitar re-fetches por nueva referencia de array
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypes.join(',')]);

  const chartData = useMemo<ChartPoint[]>(() => {
    const available = selectedTypes.filter(t => dataMap[t]?.length > 0);
    if (available.length === 0) return [];

    if (isSingle) {
      const tipo = available[0];
      const dates = applyRangeFilter(dataMap[tipo].map(d => d.originalDate), rango);
      return dates.flatMap(date => {
        const entry = dataMap[tipo].find(d => d.originalDate === date);
        if (!entry) return [];
        return [{ originalDate: date, compra: entry.compra, venta: entry.venta }];
      });
    }

    // Multi: fechas comunes a todos los tipos seleccionados disponibles
    const dateSets = available.map(t => new Set(dataMap[t].map(d => d.originalDate)));
    const commonDates = applyRangeFilter(
      [...dateSets[0]].filter(date => dateSets.every(s => s.has(date))).sort(),
      rango
    );

    return commonDates.map(date => {
      const point: ChartPoint = { originalDate: date };
      for (const tipo of available) {
        const entry = dataMap[tipo].find(d => d.originalDate === date);
        if (entry) point[tipo] = entry.venta;
      }
      return point;
    });
  }, [dataMap, selectedTypes, rango, isSingle]);

  return { chartData, loading, isSingle, hasError };
}
