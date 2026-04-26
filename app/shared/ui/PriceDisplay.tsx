import { formatPrice } from '../../utils/format';

interface PriceDisplayProps {
  price: number;
  label: string;
  variant?: 'compra' | 'venta';
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({ price, label, variant = 'compra', size = 'md' }: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl lg:text-4xl', 
    lg: 'text-3xl lg:text-5xl'
  };

  const labelClasses = {
    sm: 'text-[0.55rem]',
    md: 'text-[0.65rem]',
    lg: 'text-[0.75rem]'
  };

  const colorClasses = variant === 'compra' 
    ? 'text-gray-700' 
    : 'text-brand-secondary';

  return (
    <div className="flex flex-col py-4 px-3 text-center bg-slate-50 border border-slate-100 rounded-xl justify-center">
      <span className={`${labelClasses[size]} font-bold ${variant === 'compra' ? 'text-gray-700' : 'text-brand-secondary'} tracking-wide uppercase`}>
        {label}
      </span>
      <span className={`${sizeClasses[size]} ${colorClasses} font-bold leading-none mt-1`}>
        ${formatPrice(price)}
      </span>
    </div>
  );
}
