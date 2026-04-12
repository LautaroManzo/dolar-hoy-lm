import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { formatVariation } from '../../utils/format';
import { COLORS } from '../../constants/colors';

interface VariationDisplayProps {
  variation: {
    percent: number;
    percentAbs: number;
    sign: "up" | "down" | "neutral";
    dailyDiff: number;
    dailyDiffSign: "up" | "down" | "neutral";
  };
  showPercentage?: boolean;
  compact?: boolean;
}

const iconMap = {
  up: ArrowUp,
  down: ArrowDown,
  neutral: Minus,
};

export function VariationDisplay({ variation, showPercentage = true, compact = false }: VariationDisplayProps) {
  const { hasDailyDifference, formattedDailyDiff, formattedPercent } = formatVariation(variation);
  const Icon = iconMap[variation.dailyDiffSign];
  
  if (!hasDailyDifference) return null;

  if (compact) {
    return (
      <div className={`text-xs font-semibold flex items-center gap-1 ${
        variation.sign === 'down' ? 'text-red-700' : 
        variation.sign === 'up' ? 'text-green-700' : 
        'text-gray-600'
      }`}>
        <Icon size={12} />
        {variation.sign === 'down' ? '-' : variation.sign === 'up' ? '+' : ''}{variation.percentAbs.toFixed(2)}%
      </div>
    );
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs font-semibold mt-2">
      <span className={`flex items-center gap-1 px-3 py-1 rounded-full ${COLORS.variation[variation.dailyDiffSign]}`}>
        <Icon size={12} />
        {formattedDailyDiff}
      </span>
      {showPercentage && (
        <span className="text-gray-700">
          ({formattedPercent})
        </span>
      )}
    </span>
  );
}
