export const formatPrice = (price: number): string => {
  if (!Number.isFinite(price)) return '0,00';
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

export function formatChartDate(value: string, short = false) {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-AR', short
    ? { month: 'short', year: '2-digit' }
    : { day: 'numeric', month: 'long', year: 'numeric' }
  );
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
