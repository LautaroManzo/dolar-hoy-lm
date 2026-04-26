export const COLORS = {
  primary: '#1a3a52',
  secondary: '#2d5a7b',
  dark: '#0f2535',
  bg: '#fcf7f8',
  success: '#10b981',
  danger: '#dc2626',
  warning: '#f59e0b',
  neutral: '#6b7280',

  variation: {
    up: "text-green-700 bg-green-100",
    down: "text-red-700 bg-red-100",
    neutral: "text-gray-600 bg-gray-200",
  },

  chart: {
    venta: '#2d5a7b',
    compra: '#10b981',
    inactive: '#cbd5e1',
  },

  comparador: {
    blue:            '#2d5a7b',
    oficial:         '#059669',
    bolsa:           '#d97706',
    contadoconliqui: '#7c3aed',
    tarjeta:         '#dc2626',
    cripto:          '#0891b2',
  } as Record<string, string>
} as const;
