export const formatPrice = (price: number): string => {
  return price.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export function parseNum(v: string): number {
  return parseFloat(v.replace(/\./g, '').replace(',', '.')) || 0;
}

export function formatInput(v: string): string {
  const clean = v.replace(/[^\d,]/g, '');
  const [intPart = '', ...decParts] = clean.split(',');
  const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decParts.length > 0 ? `${formatted},${decParts.join('')}` : formatted;
}

export const formatVariation = (variation: {
  percent: number;
  percentAbs: number;
  sign: "up" | "down" | "neutral";
  dailyDiff: number;
  dailyDiffSign: "up" | "down" | "neutral";
}) => {
  const signPrefix = variation.dailyDiffSign === "up" ? "+" : variation.dailyDiffSign === "down" ? "-" : "";
  const hasDailyDifference = variation.percent !== 0;
  
  return {
    signPrefix,
    hasDailyDifference,
    formattedDailyDiff: `${signPrefix}${Math.abs(variation.dailyDiff).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    formattedPercent: `${signPrefix}${variation.percentAbs.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
  };
};
