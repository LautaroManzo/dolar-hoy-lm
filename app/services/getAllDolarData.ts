import { cache } from 'react';
import { fetchAllDolars, processDolar } from './dolar';
import { DOLAR_ENTRIES } from '../constants/dolarTypes';
import type { DolarCardData } from '../types/dolar';

export interface AllDolarDataResult {
  data: Record<string, DolarCardData>;
  isStale: boolean;
  staleAt?: string;
}

export const getAllDolarData = cache(async (): Promise<AllDolarDataResult> => {
  const { data: allDolars, isStale, staleAt } = await fetchAllDolars();

  const resultsArray = Object.entries(DOLAR_ENTRIES).map(([key, [api, title, desc, extra, hora]]) => {
    const rawData = allDolars.find(d => d.casa === api);
    if (!rawData) {
      console.error(`No se encontró el tipo de dólar: ${api}`);
      return null;
    }
    try {
      const stats = processDolar(rawData);
      return {
        key,
        data: { ...stats, title, descripcion: desc, extra, horaOperacion: hora }
      };
    } catch (error) {
      console.error(`Error procesando ${key}:`, error);
      return null;
    }
  });

  return {
    data: Object.fromEntries(
      resultsArray
        .filter((r): r is { key: string; data: DolarCardData } => r !== null)
        .map(r => [r.key, r.data])
    ),
    isStale,
    staleAt,
  };
});
