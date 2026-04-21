const API_COTIZACIONES = 'https://dolarapi.com/v1/cotizaciones';
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

export async function getOtrasMonedas(): Promise<MonedaData[]> {
  const res = await fetch(API_COTIZACIONES, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json() as { moneda: string; nombre: string; compra: number; venta: number; fechaActualizacion: string }[];
  return data
    .filter(d => MONEDAS_INCLUIDAS.includes(d.moneda))
    .sort((a, b) => MONEDAS_INCLUIDAS.indexOf(a.moneda) - MONEDAS_INCLUIDAS.indexOf(b.moneda))
    .map(d => ({
      moneda: d.moneda,
      nombre: d.nombre,
      compra: d.compra,
      venta: d.venta,
      horaActualizacion: formatHora(d.fechaActualizacion),
    }));
}
