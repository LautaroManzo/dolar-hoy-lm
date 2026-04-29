import { API_COTIZACIONES } from '../constants/api';
const REVALIDATE_SECONDS = 60;
const TZ_BA = 'America/Argentina/Buenos_Aires';

export interface MonedaData {
  moneda: string;
  nombre: string;
  compra: number;
  venta: number;
  horaActualizacion: string;
}

const MONEDAS_INCLUIDAS = ['EUR', 'BRL', 'CLP', 'UYU'];

function formatHora(fechaISO: string): string {
  if (!fechaISO) return '—';
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

let memCache: MonedaData[] | null = null;

export async function getOtrasMonedas(): Promise<MonedaData[]> {
  try {
    const res = await fetch(API_COTIZACIONES, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) throw new Error(`${res.status}`);
    const raw: unknown = await res.json();
    if (!Array.isArray(raw)) throw new Error('Respuesta no es un array');
    const data = raw.filter(
      (d): d is { moneda: string; nombre: string; compra: number; venta: number; fechaActualizacion: string } =>
        typeof d === 'object' && d !== null &&
        typeof d.moneda === 'string' && typeof d.nombre === 'string' &&
        typeof d.compra === 'number' && typeof d.venta === 'number'
    );
    const result = data
      .filter(d => MONEDAS_INCLUIDAS.includes(d.moneda))
      .sort((a, b) => MONEDAS_INCLUIDAS.indexOf(a.moneda) - MONEDAS_INCLUIDAS.indexOf(b.moneda))
      .map(d => ({
        moneda: d.moneda,
        nombre: d.nombre,
        compra: d.compra,
        venta: d.venta,
        horaActualizacion: formatHora(d.fechaActualizacion),
      }));
    memCache = result;
    return result;
  } catch {
    if (memCache) return memCache;
    return [];
  }
}
