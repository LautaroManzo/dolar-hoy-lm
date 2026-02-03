import { getFechaArgentina, formatDateLocal } from "../utils/site";

interface DolarData {
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

const SOURCES = {
  blue: "https://dolarapi.com/v1/dolares/blue",
  oficial: "https://dolarapi.com/v1/dolares/oficial",
  bolsa: "https://dolarapi.com/v1/dolares/bolsa",
  contadoconliqui: "https://dolarapi.com/v1/dolares/contadoconliqui",
  tarjeta: "https://dolarapi.com/v1/dolares/tarjeta",
  cripto: "https://dolarapi.com/v1/dolares/cripto",
};

interface DolarResponse {
  buy: number;
  sell: number;
  variationPercent: number;
  variationPercentAbs: number;
  variationSign: "up" | "down" | "neutral";
  dailyDiff: number;
  dailyDiffSign: "up" | "down" | "neutral";
  spread: number;
  spreadSign: "up" | "down" | "neutral";
  fechaActualizacion: string;
}

const HISTORICAL = "https://api.argentinadatos.com/v1/cotizaciones/dolares";

const getSign = (n: number) => (n > 0 ? "up" : n < 0 ? "down" : "neutral");

// Función para verificar si un día es hábil (no feriado y no fin de semana)
async function esDiaHabil(fecha: Date): Promise<boolean> {
  const diaSemana = fecha.getDay();
  // 0 = Domingo, 6 = Sábado
  if (diaSemana === 0 || diaSemana === 6) return false;
  
  try {
    const feriados = await fetchJson<Array<{fecha: string}>>(`https://api.argentinadatos.com/v1/feriados/${fecha.getFullYear()}`, 3600);
    
    const fechaStr = formatDateLocal(fecha);
    return !feriados.some(feriado => feriado.fecha === fechaStr);
  } catch (e) {
    console.warn('Error obteniendo feriados:', e);
    return true;
  }
}

// Función para obtener el último día hábil anterior
async function obtenerUltimoDiaHabil(fecha: Date): Promise<Date> {
  let fechaBusqueda = new Date(fecha);
  fechaBusqueda.setDate(fechaBusqueda.getDate() - 1);
  
  // Buscar hasta 7 días atrás
  for (let i = 0; i < 7; i++) {
    if (await esDiaHabil(fechaBusqueda)) {
      return fechaBusqueda;
    }
    fechaBusqueda.setDate(fechaBusqueda.getDate() - 1);
  }
  
  // Fallback: devolver 1 día atrás
  fechaBusqueda = new Date(fecha);
  fechaBusqueda.setDate(fechaBusqueda.getDate() - 1);
  return fechaBusqueda;
}

async function fetchJson<T>(url: string, revalidateTime: number = 300): Promise<T> {
  const res = await fetch(url, { next: { revalidate: revalidateTime } });
  if (!res.ok) throw new Error(`Error en fetch: ${res.status}`);
  return res.json();
}

export async function getDolar(type: keyof typeof SOURCES): Promise<DolarResponse> {
  const today: DolarData = await fetchJson(SOURCES[type], 300);
  const yArgentina = getFechaArgentina();
  
  // Determinar fecha de búsqueda según el tipo
  const esCripto = type === 'cripto';
  const fechaBusqueda = esCripto 
    ? (() => { const d = new Date(yArgentina); d.setDate(d.getDate() - 1); return d; })()
    : await obtenerUltimoDiaHabil(yArgentina);
  
  // Obtener datos históricos
  const yesterdayUrl = `${HISTORICAL}/${type}/${formatDateLocal(fechaBusqueda)}`;
  let ayer: DolarData | null = null;
  
  try {
    const resAyer = await fetch(yesterdayUrl, { next: { revalidate: 300 } });
    if (resAyer.ok) {
      ayer = await resAyer.json();
      const tipoBusqueda = esCripto ? 'día anterior' : 'último día hábil';
      console.log(`Datos históricos para ${type} (${tipoBusqueda}): ${formatDateLocal(fechaBusqueda)}`);
    }
  } catch (e) {
    console.warn(`Error obteniendo datos históricos para ${type}:`, e);
  }

  const ventaAyer = ayer?.venta ?? today.venta;
  
  // Calcular variaciones
  const diferenciaVenta = today.venta - ventaAyer;
  const variacionPorcentual = ventaAyer === 0 ? 0 : ((today.venta - ventaAyer) / ventaAyer) * 100;
  const spread = today.venta - today.compra;

  return {
    buy: today.compra,
    sell: today.venta,
    variationPercent: Number(variacionPorcentual.toFixed(2)),
    variationPercentAbs: Number(Math.abs(variacionPorcentual).toFixed(2)),
    variationSign: getSign(variacionPorcentual),
    dailyDiff: Number(diferenciaVenta.toFixed(2)),
    dailyDiffSign: getSign(diferenciaVenta),
    spread: Number(spread.toFixed(2)),
    spreadSign: getSign(spread),
    fechaActualizacion: today.fechaActualizacion
  };
}