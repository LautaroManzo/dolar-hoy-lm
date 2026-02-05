import { getDolar } from "./dolar";

export async function getDolarBuyPrice(type: string) {
  const data = await getDolar(type);
  return data.buy;
}