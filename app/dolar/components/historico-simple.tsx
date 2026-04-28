'use client';

import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useComparador } from '@/app/hooks/useComparador';
import { COLORS } from '@/app/constants/colors';
import { formatChartDate } from '@/app/utils/format';
import {
  type Rango, RANGOS,
  CHART_AXIS_PROPS, CHART_TOOLTIP_CONTENT_STYLE,
  CHART_TOOLTIP_ITEM_STYLE, CHART_TOOLTIP_LABEL_STYLE,
} from '../constants/chart';

interface Props {
  tipo: string;
}

export default function HistoricoSimple({ tipo }: Props) {
  const [rango, setRango] = useState<Rango>('1A');
  const [isMounted, setIsMounted] = useState(false);
  const { chartData, loading } = useComparador([tipo], rango);

  // Marca el mount para evitar hydration mismatch con el skeleton
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setIsMounted(true); }, []);

  const tooltipLabel = (_label: string, payload: readonly { payload?: { originalDate?: string } }[]) =>
    payload?.length > 0 && payload[0].payload?.originalDate ? formatChartDate(payload[0].payload.originalDate) : _label;

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <h2 className="text-xl font-bold text-brand-primary">Evolución histórica</h2>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-full sm:w-auto">
          {RANGOS.map(r => (
            <button
              key={r.id}
              onClick={() => setRango(r.id)}
              className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                rango === r.id ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center sm:justify-end gap-4 mb-4">
        {[{ key: 'compra', label: 'Compra', color: COLORS.chart.compra }, { key: 'venta', label: 'Venta', color: COLORS.chart.venta }].map(({ key, label, color }) => (
          <span key={key} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
      </div>

      <div className="w-full h-[240px] sm:h-[320px] relative">
        {!isMounted && (
          <div className="w-full h-full animate-pulse bg-slate-100 rounded-xl" />
        )}
        {isMounted && loading && (
          <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-secondary" />
          </div>
        )}
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id={`colorVenta-${tipo}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.chart.venta} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={COLORS.chart.venta} stopOpacity={0} />
                </linearGradient>
                <linearGradient id={`colorCompra-${tipo}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.chart.compra} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={COLORS.chart.compra} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d7dc" />
              <XAxis dataKey="originalDate" {...CHART_AXIS_PROPS} minTickGap={30} tickMargin={12}
                tickFormatter={(v: string) => formatChartDate(v, true)} />
              <YAxis orientation="left" domain={['auto', 'auto']} {...CHART_AXIS_PROPS}
                tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={CHART_TOOLTIP_CONTENT_STYLE}
                itemStyle={CHART_TOOLTIP_ITEM_STYLE}
                labelStyle={CHART_TOOLTIP_LABEL_STYLE}
                labelFormatter={tooltipLabel}
                formatter={(value, name) => [`$${value}`, name === 'venta' ? 'Venta' : 'Compra']}
              />
              <Area type="monotone" dataKey="compra" stroke={COLORS.chart.compra} strokeWidth={2}
                fillOpacity={1} fill={`url(#colorCompra-${tipo})`} animationDuration={600} />
              <Area type="monotone" dataKey="venta" stroke={COLORS.chart.venta} strokeWidth={2.5}
                fillOpacity={1} fill={`url(#colorVenta-${tipo})`} animationDuration={600} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
