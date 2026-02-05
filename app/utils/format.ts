export const formatPrice = (price: number): string => {
  return price.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const formatVariation = (variation: {
  percent: number;
  percentAbs: number;
  sign: "up" | "down" | "neutral";
  dailyDiff: number;
  dailyDiffSign: "up" | "down" | "neutral";
}) => {
  const signPrefix = variation.dailyDiffSign === "up" ? "+" : variation.dailyDiffSign === "down" ? "-" : "";
  const hasDailyDifference = variation.dailyDiff !== 0;
  
  return {
    signPrefix,
    hasDailyDifference,
    formattedDailyDiff: `${signPrefix}${Math.abs(variation.dailyDiff).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    formattedPercent: `${signPrefix}${variation.percentAbs.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`
  };
};
