export interface DolarData {
  compra: number;
  venta: number;
  fechaActualizacion: string;
  variacion: number;
  casa: string;
}

const API_AMBITO = "https://dolarapi.com/v1/ambito/dolares";

export interface VariationData {
  percent: number;
  percentAbs: number;
  sign: "up" | "down" | "neutral";
  dailyDiff: number;
  dailyDiffSign: "up" | "down" | "neutral";
}

export interface DolarResponse {
  buy: number;
  sell: number;
  buyVariation: VariationData;
  sellVariation: VariationData;
  spread: number;
  spreadSign: "up" | "down" | "neutral";
  fechaActualizacion: string;
}

const getSign = (n: number): "up" | "down" | "neutral" => (n > 0 ? "up" : n < 0 ? "down" : "neutral");

async function fetchJson<T>(url: string, revalidateTime: number = 60): Promise<T> {
  const res = await fetch(url, { next: { revalidate: revalidateTime } });
  if (!res.ok) throw new Error(`Error en fetch: ${res.status}`);
  return res.json();
}

export async function fetchAllDolars(): Promise<DolarData[]> {
  return fetchJson<DolarData[]>(API_AMBITO, 60);
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
    fechaActualizacion: dolarData.fechaActualizacion
  };
}

export async function getDolar(type: string): Promise<DolarResponse> {
  const allDolars = await fetchAllDolars();
  const dolarData = allDolars.find(d => d.casa === type);
  if (!dolarData) throw new Error(`No se encontró el tipo de dólar: ${type}`);
  return processDolar(dolarData);
}