import type { VariationData, DolarResponse } from '../types/dolar';

export type { VariationData, DolarResponse };

export interface DolarData {
  compra: number;
  venta: number;
  fechaActualizacion: string;
  variacion: number;
  casa: string;
}

const API_AMBITO = "https://dolarapi.com/v1/ambito/dolares";
const REVALIDATE_SECONDS = 60;
const TZ_BA = 'America/Argentina/Buenos_Aires';

const getSign = (n: number): "up" | "down" | "neutral" => (n > 0 ? "up" : n < 0 ? "down" : "neutral");

function formatFechaHoraArgentina(fechaISO: string): string {
  if (!fechaISO) return "—";
  const fecha = new Date(fechaISO);
  const formatter = new Intl.DateTimeFormat('es-AR', {
    timeZone: TZ_BA,
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = Object.fromEntries(formatter.formatToParts(fecha).map(p => [p.type, p.value]));
  return `${parts.day}/${parts.month} ${parts.hour}:${parts.minute} hs`;
}

async function fetchJson<T>(url: string, revalidateTime: number = REVALIDATE_SECONDS): Promise<T> {
  const res = await fetch(url, { next: { revalidate: revalidateTime } });
  if (!res.ok) throw new Error(`Error en fetch: ${res.status}`);
  return res.json();
}

export async function fetchAllDolars(): Promise<DolarData[]> {
  return fetchJson<DolarData[]>(API_AMBITO, REVALIDATE_SECONDS);
}

export function processDolar(dolarData: DolarData): DolarResponse {
  const spread = dolarData.venta - dolarData.compra;
  const variacionPercent = dolarData.variacion || 0;

  const buyVariation: VariationData = {
    percent: Number(variacionPercent.toFixed(2)),
    percentAbs: Number(Math.abs(variacionPercent).toFixed(2)),
    sign: getSign(variacionPercent),
    dailyDiff: Number((dolarData.compra * variacionPercent / 100).toFixed(2)),
    dailyDiffSign: getSign(variacionPercent)
  };

  const sellVariation: VariationData = {
    percent: Number(variacionPercent.toFixed(2)),
    percentAbs: Number(Math.abs(variacionPercent).toFixed(2)),
    sign: getSign(variacionPercent),
    dailyDiff: Number((dolarData.venta * variacionPercent / 100).toFixed(2)),
    dailyDiffSign: getSign(variacionPercent)
  };

  return {
    buy: dolarData.compra,
    sell: dolarData.venta,
    buyVariation,
    sellVariation,
    spread: Number(spread.toFixed(2)),
    spreadSign: getSign(spread),
    fechaActualizacion: dolarData.fechaActualizacion,
    horaActualizacion: formatFechaHoraArgentina(dolarData.fechaActualizacion),
  };
}

export async function getDolar(type: string): Promise<DolarResponse> {
  const allDolars = await fetchAllDolars();
  const dolarData = allDolars.find(d => d.casa === type);
  if (!dolarData) throw new Error(`No se encontró el tipo de dólar: ${type}`);
  return processDolar(dolarData);
}