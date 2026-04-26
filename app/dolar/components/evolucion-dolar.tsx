'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import ErrorBoundary from '../../shared/ui/error-boundary';
import { useComparador } from '../../hooks/useComparador';
import { COLORS } from '../../constants/colors';

type Rango = '7D' | '1M' | '3M' | '6M' | '1A' | 'YTD';
type Modo = 'precio' | 'brecha';

const RANGOS: { id: Rango; label: string; titulo: string }[] = [
  { id: '7D',  label: '7D',  titulo: 'Última semana'   },
  { id: '1M',  label: '1M',  titulo: 'Último mes'      },
  { id: '3M',  label: '3M',  titulo: 'Últimos 3 meses' },
  { id: '6M',  label: '6M',  titulo: 'Últimos 6 meses' },
  { id: '1A',  label: '1A',  titulo: 'Último año'      },
  { id: 'YTD', label: 'YTD', titulo: 'Año actual'      },
];

const TIPOS = [
  { id: 'blue',            label: 'Blue'    },
  { id: 'oficial',         label: 'Oficial' },
  { id: 'bolsa',           label: 'MEP'     },
  { id: 'contadoconliqui', label: 'CCL'     },
  { id: 'tarjeta',         label: 'Tarjeta' },
  { id: 'cripto',          label: 'Cripto'  },
];

const TIPOS_BRECHA = [
  { id: 'blue',            label: 'Blue' },
  { id: 'bolsa',           label: 'MEP'  },
  { id: 'contadoconliqui', label: 'CCL'  },
];

const LS_RANGO_KEY   = 'grafico_rango_temporal';
const LS_TIPOS_KEY   = 'grafico_tipos_seleccionados';
const LS_BRECHA_KEY  = 'grafico_brecha_paralelo';

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

const BRECHA_COLOR = COLORS.comparador.bolsa;

const EvolucionDolar: React.FC = () => {
  const [modo, setModo] = useState<Modo>('precio');
  const [rango, setRango] = useState<Rango>('1A');
  const [selected, setSelected] = useState<string[]>(['blue']);
  const [brechaParalelo, setBrechaParalelo] = useState<string>('blue');
  const [isMounted, setIsMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setRango(getSaved<Rango>(LS_RANGO_KEY, '1A'));
    setSelected(getSaved<string[]>(LS_TIPOS_KEY, ['blue']));
    setBrechaParalelo(getSaved<string>(LS_BRECHA_KEY, 'blue'));
    setIsMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const tiposParaHook = modo === 'brecha' ? ['oficial', brechaParalelo] : selected;
  const { chartData, loading, isSingle } = useComparador(tiposParaHook, rango);

  const brechaData = useMemo(() => {
    if (modo !== 'brecha') return [];
    return chartData
      .map(point => ({
        originalDate: point.originalDate as string,
        brecha: typeof point.oficial === 'number' && typeof point[brechaParalelo] === 'number'
          ? Number((((point[brechaParalelo] as number) - (point.oficial as number)) / (point.oficial as number) * 100).toFixed(2))
          : null,
      }))
      .filter((p): p is { originalDate: string; brecha: number } => p.brecha !== null);
  }, [chartData, modo, brechaParalelo]);

  const brechaActual = brechaData.length > 0 ? brechaData[brechaData.length - 1].brecha : null;

  const brecha30d = useMemo(() => {
    if (!brechaData.length) return null;
    const corte = new Date();
    corte.setDate(corte.getDate() - 30);
    const punto = brechaData.find(p => {
      const [y, m, d] = p.originalDate.split('-').map(Number);
      return new Date(y, m - 1, d) >= corte;
    });
    return punto?.brecha ?? null;
  }, [brechaData]);

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

  const handleBrechaParalelo = (id: string) => {
    setBrechaParalelo(id);
    try { localStorage.setItem(LS_BRECHA_KEY, JSON.stringify(id)); } catch {}
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
  const tooltipItemStyle  = { fontWeight: 'bold' as const, fontSize: '12px' };
  const tooltipLabelStyle = { marginBottom: '4px', color: '#64748b', fontSize: '11px', fontWeight: '600' as const };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tooltipLabel = (_label: any, payload: readonly any[]) =>
    payload?.length > 0 ? formatDate(payload[0].payload.originalDate) : _label;

  const diffBrecha = brechaActual !== null && brecha30d !== null ? brechaActual - brecha30d : null;

  return (
    <section className="w-full font-sans mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto w-full rounded-2xl border-t-4 border-brand-secondary">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-brand-primary">
                {modo === 'brecha' ? 'Brecha cambiaria' : titulo}
              </h2>
              {modo === 'precio' && !isSingle && (
                <p className="text-xs text-slate-400 mt-1">Precio de venta</p>
              )}
              {modo === 'brecha' && (
                <p className="text-xs text-slate-400 mt-1">vs Dólar Oficial</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
              {/* TOGGLE MODO */}
              <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-full sm:w-auto">
                {(['precio', 'brecha'] as Modo[]).map(m => (
                  <button
                    key={m}
                    onClick={() => setModo(m)}
                    className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer capitalize ${
                      modo === m ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {m === 'precio' ? 'Precio' : 'Brecha'}
                  </button>
                ))}
              </div>

              {/* TABS DE RANGO */}
              <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-full sm:w-auto">
                {RANGOS.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleRango(r.id)}
                    className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                      rango === r.id ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PILLS */}
          {modo === 'brecha' ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {TIPOS_BRECHA.map(tipo => {
                  const isActive = isMounted && brechaParalelo === tipo.id;
                  const color = COLORS.comparador[tipo.id];
                  return (
                    <button
                      key={tipo.id}
                      onClick={() => handleBrechaParalelo(tipo.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all duration-200 cursor-pointer ${
                        isActive ? 'bg-white' : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                      style={isActive ? { borderColor: color, color } : {}}
                    >
                      <span className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: isActive ? color : COLORS.chart.inactive }} />
                      {tipo.label}
                    </button>
                  );
                })}
              </div>
              {isMounted && brechaActual !== null && (
                <div className="flex items-center justify-center sm:justify-start gap-4 sm:ml-auto sm:pl-4 sm:border-l border-slate-200">
                  <div>
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Brecha</p>
                    <p className="text-xl font-black text-amber-700">{brechaActual.toFixed(1)}%</p>
                  </div>
                  {diffBrecha !== null && (
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">vs 30d</p>
                      <p className={`text-base font-bold ${diffBrecha > 0 ? 'text-red-600' : diffBrecha < 0 ? 'text-green-600' : 'text-slate-500'}`}>
                        {diffBrecha > 0 ? '+' : ''}{diffBrecha.toFixed(1)}%
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
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
                      <span className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: isActive ? color : COLORS.chart.inactive }} />
                      {tipo.label}
                    </button>
                  );
                })}
              </div>
              {isMounted && isSingle && (
                <div className="flex items-center justify-center sm:justify-start gap-4 sm:ml-auto sm:pl-4 sm:border-l border-slate-200">
                  {[{ key: 'compra', label: 'Compra', color: COLORS.chart.compra }, { key: 'venta', label: 'Venta', color: COLORS.chart.venta }].map(({ key, label, color }) => (
                    <span key={key} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide" style={{ color }}>
                      <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: color }} />
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* GRÁFICO */}
          <ErrorBoundary>
            <div className="w-full h-[260px] sm:h-[380px] relative">
              {!isMounted && (
                <div className="w-full h-full animate-pulse bg-slate-100 rounded-xl" />
              )}
              {isMounted && loading && (
                <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-secondary mb-3" />
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Cargando...</span>
                  </div>
                </div>
              )}

              {isMounted && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${modo}-${selected.join('-')}-${brechaParalelo}-${rango}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      {modo === 'brecha' ? (
                        <AreaChart data={brechaData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorBrecha" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={BRECHA_COLOR} stopOpacity={0.15} />
                              <stop offset="95%" stopColor={BRECHA_COLOR} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d7dc" />
                          <XAxis dataKey="originalDate" {...axisProps} minTickGap={30} tickMargin={12}
                            tickFormatter={(v: string) => formatDate(v, true)} />
                          <YAxis orientation="left" domain={['auto', 'auto']} {...axisProps}
                            tickFormatter={(v) => `${v}%`} />
                          <Tooltip
                            contentStyle={tooltipContentStyle}
                            itemStyle={tooltipItemStyle}
                            labelStyle={tooltipLabelStyle}
                            labelFormatter={tooltipLabel}
                            formatter={(value) => [`${value}%`, 'Brecha']}
                          />
                          <Area type="monotone" dataKey="brecha" stroke={BRECHA_COLOR} strokeWidth={2.5}
                            fillOpacity={1} fill="url(#colorBrecha)" animationDuration={600} />
                        </AreaChart>
                      ) : isSingle ? (
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
                            labelFormatter={tooltipLabel}
                            formatter={(value, name) => [`$${value}`, name === 'venta' ? 'Venta' : 'Compra']}
                          />
                          <Area type="monotone" dataKey="compra" stroke={COLORS.chart.compra} strokeWidth={2}
                            fillOpacity={1} fill="url(#colorCompra)" animationDuration={600} />
                          <Area type="monotone" dataKey="venta" stroke={COLORS.chart.venta} strokeWidth={2.5}
                            fillOpacity={1} fill="url(#colorVenta)" animationDuration={600} />
                        </AreaChart>
                      ) : (
                        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d7dc" />
                          <XAxis dataKey="originalDate" {...axisProps} minTickGap={30} tickMargin={12}
                            tickFormatter={(v: string) => formatDate(v, true)} />
                          <YAxis orientation="left" domain={['auto', 'auto']} {...axisProps}
                            tickFormatter={(v) => `$${v}`} />
                          <Tooltip
                            contentStyle={tooltipContentStyle}
                            itemStyle={tooltipItemStyle}
                            labelStyle={tooltipLabelStyle}
                            labelFormatter={tooltipLabel}
                            formatter={(value, name) => [
                              `$${value}`,
                              TIPOS.find(t => t.id === name)?.label ?? name,
                            ]}
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
