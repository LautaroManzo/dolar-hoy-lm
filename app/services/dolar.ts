interface DolarData {
  compra: number;
  venta: number;
  fechaActualizacion: string;
}

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

const SOURCES = {
  blue: "https://dolarapi.com/v1/dolares/blue",
  oficial: "https://dolarapi.com/v1/dolares/oficial",
  bolsa: "https://dolarapi.com/v1/dolares/bolsa",
  contadoconliqui: "https://dolarapi.com/v1/dolares/contadoconliqui",
  tarjeta: "https://dolarapi.com/v1/dolares/tarjeta",
  cripto: "https://dolarapi.com/v1/dolares/cripto",
};

const HISTORICAL = "https://api.argentinadatos.com/v1/cotizaciones/dolares";

const formatDate = (d: Date) =>
  `${d.getUTCFullYear()}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${String(
    d.getUTCDate()
  ).padStart(2, "0")}`;

const getSign = (n: number) => (n > 0 ? "up" : n < 0 ? "down" : "neutral");

async function fetchJson<T>(url: string, revalidateTime: number = 900): Promise<T> {
  const res = await fetch(url, { next: { revalidate: revalidateTime } });
  if (!res.ok) throw new Error(`Error en fetch: ${res.status}`);
  return res.json();
}

export async function getDolar(type: keyof typeof SOURCES): Promise<DolarResponse> {
  
  const today: DolarData = await fetchJson(SOURCES[type], 900);

  const y = new Date();
  y.setUTCDate(y.getUTCDate() - 1);
  const yesterdayUrl = `${HISTORICAL}/${type}/${formatDate(y)}`;

  let ayer: DolarData | null = null;
  try {
    const resAyer = await fetch(yesterdayUrl, { next: { revalidate: 3600 } });
    ayer = resAyer.ok ? await resAyer.json() : null;
  } catch (e) {
    console.warn(`No se pudo obtener precio histórico para ${type}`);
  }

  const compraAyer = ayer?.compra ?? today.compra;
  const ventaAyer = ayer?.venta ?? today.venta;
  
  const diferenciaVenta = today.venta - ventaAyer;
  const variacionPorcentual = ventaAyer === 0 ? 0 : ((today.venta - ventaAyer) / ventaAyer) * 100;
  const spread = today.venta - today.compra;
  const diferenciaCompra = today.compra - compraAyer;
  const diferenciaDiaria = (diferenciaVenta + diferenciaCompra) / 2;

  return {
    buy: today.compra,
    sell: today.venta,
    variationPercent: Number(variacionPorcentual.toFixed(2)),
    variationPercentAbs: Number(Math.abs(variacionPorcentual).toFixed(2)),
    variationSign: getSign(variacionPorcentual),
    dailyDiff: Number(diferenciaDiaria.toFixed(2)),
    dailyDiffSign: getSign(diferenciaDiaria),
    spread: Number(spread.toFixed(2)),
    spreadSign: getSign(spread),
    fechaActualizacion: today.fechaActualizacion
  };
}