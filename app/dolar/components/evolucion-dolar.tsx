'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import ErrorBoundary from '../../shared/ui/error-boundary';
import { useComparador } from '../../hooks/useComparador';
import { COLORS } from '../../constants/colors';

type Rango = '7D' | '1M' | '3M' | '6M' | '1A' | 'YTD';

const RANGOS: { id: Rango; label: string; titulo: string }[] = [
  { id: '7D',  label: '7D',  titulo: 'Última semana'   },
  { id: '1M',  label: '1M',  titulo: 'Último mes'      },
  { id: '3M',  label: '3M',  titulo: 'Últimos 3 meses' },
  { id: '6M',  label: '6M',  titulo: 'Últimos 6 meses' },
  { id: '1A',  label: '1A',  titulo: 'Último año'      },
  { id: 'YTD', label: 'YTD', titulo: 'Año actual'      },
];

const TIPOS = [
  { id: 'blue',            label: 'Blue'     },
  { id: 'oficial',         label: 'Oficial'  },
  { id: 'bolsa',           label: 'MEP'      },
  { id: 'contadoconliqui', label: 'CCL'      },
  { id: 'tarjeta',         label: 'Tarjeta'  },
  { id: 'cripto',          label: 'Cripto'   },
];

const LS_RANGO_KEY = 'grafico_rango_temporal';
const LS_TIPOS_KEY = 'grafico_tipos_seleccionados';

function getSaved<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function formatDate(value: string, short = false) {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-AR', short
    ? { month: 'short', year: '2-digit' }
    : { day: 'numeric', month: 'long', year: 'numeric' }
  );
}

const EvolucionDolar: React.FC = () => {
  const [rango, setRango] = useState<Rango>(() =>
    typeof window === 'undefined' ? '1A' : getSaved<Rango>(LS_RANGO_KEY, '1A')
  );
  const [selected, setSelected] = useState<string[]>(() =>
    typeof window === 'undefined' ? ['blue'] : getSaved<string[]>(LS_TIPOS_KEY, ['blue'])
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { chartData, loading, isSingle } = useComparador(selected, rango);

  const handleRango = (r: Rango) => {
    setRango(r);
    try { localStorage.setItem(LS_RANGO_KEY, JSON.stringify(r)); } catch {}
  };

  const toggleTipo = (id: string) => {
    setSelected(prev => {
      const next = prev.includes(id)
        ? prev.length > 1 ? prev.filter(t => t !== id) : prev
        : [...prev, id];
      try { localStorage.setItem(LS_TIPOS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const titulo = RANGOS.find(r => r.id === rango)?.titulo ?? 'Último año';

  const axisProps = {
    axisLine: false as const,
    tickLine: false as const,
    tick: { fontSize: 10, fill: '#94a3b8', fontWeight: 500 },
  };

  const tooltipContentStyle = {
    borderRadius: '12px', border: 'none',
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    padding: '12px', backgroundColor: '#ffffff',
  };
  const tooltipItemStyle = { fontWeight: 'bold' as const, fontSize: '12px' };
  const tooltipLabelStyle = { marginBottom: '4px', color: '#64748b', fontSize: '11px', fontWeight: '600' as const };

  return (
    <section className="w-full font-sans mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto w-full rounded-2xl border-t-4 border-[#2d5a7b]">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1a3a52]">{titulo}</h2>
              {!isSingle && (
                <p className="text-xs text-slate-400 mt-1">Precio de venta</p>
              )}
            </div>

            {/* TABS DE RANGO */}
            <div className="flex gap-1 bg-slate-100 rounded-xl p-1 h-fit">
              {RANGOS.map(r => (
                <button
                  key={r.id}
                  onClick={() => handleRango(r.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                    rango === r.id
                      ? 'bg-white text-[#1a3a52] shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* PILLS DE TIPO */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TIPOS.map(tipo => {
              const isActive = isMounted && selected.includes(tipo.id);
              const color = COLORS.comparador[tipo.id];
              return (
                <button
                  key={tipo.id}
                  onClick={() => toggleTipo(tipo.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all duration-200 cursor-pointer ${
                    isActive ? 'bg-white' : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                  style={isActive ? { borderColor: color, color } : {}}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: isActive ? color : '#cbd5e1' }}
                  />
                  {tipo.label}
                </button>
              );
            })}
          </div>

          {/* GRÁFICO */}
          <ErrorBoundary>
            <div className="w-full h-[380px] relative">

              {loading && (
                <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2d5a7b] mb-3" />
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Cargando...</span>
                  </div>
                </div>
              )}

              {isMounted && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selected.join('-')}-${rango}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      {isSingle ? (
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorVenta" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS.chart.venta} stopOpacity={0.15} />
                              <stop offset="95%" stopColor={COLORS.chart.venta} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCompra" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS.chart.compra} stopOpacity={0.15} />
                              <stop offset="95%" stopColor={COLORS.chart.compra} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d7dc" />
                          <XAxis dataKey="originalDate" {...axisProps} minTickGap={30} tickMargin={12}
                            tickFormatter={(v: string) => formatDate(v, true)} />
                          <YAxis orientation="left" domain={['auto', 'auto']} {...axisProps}
                            tickFormatter={(v) => `$${v}`} />
                          <Tooltip
                            contentStyle={tooltipContentStyle}
                            itemStyle={tooltipItemStyle}
                            labelStyle={tooltipLabelStyle}
                            labelFormatter={(_label, payload) =>
                              payload?.length > 0 ? formatDate(payload[0].payload.originalDate) : _label}
                            formatter={(value, name) => [`$${value}`, name === 'venta' ? 'Venta' : 'Compra']}
                          />
                          <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8}
                            wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                            formatter={(value) => (
                              <span className="ml-1" style={{ color: value === 'venta' ? COLORS.chart.venta : COLORS.chart.compra }}>
                                {value === 'venta' ? 'Venta' : 'Compra'}
                              </span>
                            )}
                          />
                          <Area type="monotone" dataKey="compra" stroke={COLORS.chart.compra} strokeWidth={2}
                            fillOpacity={1} fill="url(#colorCompra)" animationDuration={600} />
                          <Area type="monotone" dataKey="venta" stroke={COLORS.chart.venta} strokeWidth={2.5}
                            fillOpacity={1} fill="url(#colorVenta)" animationDuration={600} />
                        </AreaChart>
                      ) : (
                        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d7dc" />
                          <XAxis dataKey="originalDate" {...axisProps} minTickGap={30} tickMargin={12}
                            tickFormatter={(v: string) => formatDate(v, true)} />
                          <YAxis orientation="left" domain={['auto', 'auto']} {...axisProps}
                            tickFormatter={(v) => `$${v}`} />
                          <Tooltip
                            contentStyle={tooltipContentStyle}
                            itemStyle={tooltipItemStyle}
                            labelStyle={tooltipLabelStyle}
                            labelFormatter={(_label, payload) =>
                              payload?.length > 0 ? formatDate(payload[0].payload.originalDate) : _label}
                            formatter={(value, name) => [
                              `$${value}`,
                              TIPOS.find(t => t.id === name)?.label ?? name,
                            ]}
                          />
                          <Legend verticalAlign="top" align="right" iconType="circle" iconSize={8}
                            wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                            formatter={(value) => (
                              <span className="ml-1" style={{ color: COLORS.comparador[value as string] }}>
                                {TIPOS.find(t => t.id === value)?.label ?? value}
                              </span>
                            )}
                          />
                          {selected.map(tipo => (
                            <Line key={tipo} type="monotone" dataKey={tipo}
                              stroke={COLORS.comparador[tipo]} strokeWidth={2}
                              dot={false} animationDuration={600} />
                          ))}
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </motion.div>
                </AnimatePresence>
              )}

            </div>
          </ErrorBoundary>


        </div>
      </div>
    </section>
  );
};

export default EvolucionDolar;
