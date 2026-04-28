export type Rango = '7D' | '1M' | '3M' | '6M' | '1A' | 'YTD';

export const RANGOS: { id: Rango; label: string; titulo: string }[] = [
  { id: '7D',  label: '7D',  titulo: 'Última semana'   },
  { id: '1M',  label: '1M',  titulo: 'Último mes'      },
  { id: '3M',  label: '3M',  titulo: 'Últimos 3 meses' },
  { id: '6M',  label: '6M',  titulo: 'Últimos 6 meses' },
  { id: '1A',  label: '1A',  titulo: 'Último año'      },
  { id: 'YTD', label: 'YTD', titulo: 'Año actual'      },
];

export const CHART_AXIS_PROPS = {
  axisLine: false as const,
  tickLine: false as const,
  tick: { fontSize: 10, fill: '#94a3b8', fontWeight: 500 },
};

export const CHART_TOOLTIP_CONTENT_STYLE = {
  borderRadius: '12px',
  border: 'none',
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  padding: '12px',
  backgroundColor: '#ffffff',
};

export const CHART_TOOLTIP_ITEM_STYLE = { fontWeight: 'bold' as const, fontSize: '12px' };

export const CHART_TOOLTIP_LABEL_STYLE = {
  marginBottom: '4px',
  color: '#64748b',
  fontSize: '11px',
  fontWeight: '600' as const,
};
