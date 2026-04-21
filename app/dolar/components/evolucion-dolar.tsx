'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import ErrorBoundary from '../../shared/ui/error-boundary';
import { Dropdown } from '../../shared/ui/Dropdown';
import { useDolarHistorico } from '../../hooks/useDolarHistorico';
import { COLORS } from '../../constants/colors';

type Rango = '7D' | '1M' | '3M' | '6M' | '1A' | 'YTD';

const RANGOS: { id: Rango; label: string; titulo: string; dias?: number }[] = [
  { id: '7D',  label: '7D',  titulo: 'Última semana',    dias: 7   },
  { id: '1M',  label: '1M',  titulo: 'Último mes',       dias: 30  },
  { id: '3M',  label: '3M',  titulo: 'Últimos 3 meses',  dias: 90  },
  { id: '6M',  label: '6M',  titulo: 'Últimos 6 meses',  dias: 180 },
  { id: '1A',  label: '1A',  titulo: 'Último año',       dias: 365 },
  { id: 'YTD', label: 'YTD', titulo: 'Año actual'                  },
];

const LS_RANGO_KEY = 'grafico_rango_temporal';

function getSavedRango(): Rango {
  try {
    const saved = localStorage.getItem(LS_RANGO_KEY) as Rango | null;
    if (saved && RANGOS.some(r => r.id === saved)) return saved;
  } catch {}
  return '1A';
}

function filtrarPorRango(
  data: { originalDate: string; compra: number; venta: number; fecha: string }[],
  rango: Rango
) {
  if (!data.length) return data;

  const hoy = new Date();
  let fechaCorte: Date;

  if (rango === 'YTD') {
    fechaCorte = new Date(hoy.getFullYear(), 0, 1);
  } else {
    const config = RANGOS.find(r => r.id === rango);
    const dias = config?.dias ?? 365;
    fechaCorte = new Date(hoy);
    fechaCorte.setDate(fechaCorte.getDate() - dias);
  }

  return data.filter(d => {
    const [y, m, day] = d.originalDate.split('-').map(Number);
    return new Date(y, m - 1, day) >= fechaCorte;
  });
}

const opcionesDolar = [
  { id: 'blue',            name: 'Dólar Blue'      },
  { id: 'oficial',         name: 'Dólar Oficial'   },
  { id: 'bolsa',           name: 'Dólar MEP'       },
  { id: 'contadoconliqui', name: 'Dólar CCL'       },
  { id: 'tarjeta',         name: 'Dólar Tarjeta'   },
  { id: 'mayorista',       name: 'Dólar Mayorista' },
  { id: 'cripto',          name: 'Dólar Cripto'    },
];

const EvolucionDolar: React.FC = () => {
  const [tipoDolar, setTipoDolar] = useState<string>('blue');
  const [rango, setRango] = useState<Rango>('1A');
  const [isMounted, setIsMounted] = useState(false);
  const { data, loading, error } = useDolarHistorico(tipoDolar);

  useEffect(() => {
    setIsMounted(true);
    setRango(getSavedRango());
  }, []);

  const handleRango = (r: Rango) => {
    setRango(r);
    try { localStorage.setItem(LS_RANGO_KEY, r); } catch {}
  };

  const filteredData = useMemo(() => filtrarPorRango(data, rango), [data, rango]);
  const titulo = RANGOS.find(r => r.id === rango)?.titulo ?? 'Último año';

  return (
    <section className="w-full font-sans mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto w-full rounded-2xl border-t-4 border-[#2d5a7b]">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

          {/* TITULO Y SELECTOR */}
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#1a3a52]">{titulo}</h2>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-3">
              <Dropdown
                options={opcionesDolar}
                selectedId={tipoDolar}
                onSelect={setTipoDolar}
                className="w-60 sm:w-52"
              />
            </div>
          </div>

          {/* TABS DE RANGO */}
          <div className="flex gap-1 mb-6 bg-slate-100 rounded-xl p-1 w-fit">
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

          {/* GRÁFICO */}
          <ErrorBoundary>
            <div className="w-full h-[380px] relative">

              {loading && (
                <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2d5a7b] mb-3"></div>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Cargando...</span>
                  </div>
                </div>
              )}

              {error ? (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-100 rounded-xl">
                  {error}
                </div>
              ) : isMounted ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${tipoDolar}-${rango}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

                        <XAxis
                          dataKey="originalDate"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }}
                          minTickGap={30}
                          tickMargin={12}
                          tickFormatter={(value: string) => {
                            const [year, month, day] = value.split('-').map(Number);
                            return new Date(year, month - 1, day).toLocaleDateString('es-AR', {
                              month: 'short',
                              year: '2-digit',
                            });
                          }}
                        />

                        <YAxis
                          orientation="left"
                          domain={['auto', 'auto']}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }}
                          tickFormatter={(value) => `$${value}`}
                        />

                        <Tooltip
                          contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            padding: '12px',
                            backgroundColor: '#ffffff',
                          }}
                          itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                          labelStyle={{ marginBottom: '4px', color: '#64748b', fontSize: '11px', fontWeight: '600' }}
                          labelFormatter={(_label, payload) => {
                            if (payload && payload.length > 0) {
                              const [year, month, day] = (payload[0].payload.originalDate as string).split('-').map(Number);
                              return new Date(year, month - 1, day).toLocaleDateString('es-AR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              });
                            }
                            return _label;
                          }}
                          formatter={(value, name) => [
                            `$${value}`,
                            name === 'venta' ? 'Venta' : 'Compra'
                          ]}
                        />

                        <Legend
                          verticalAlign="top"
                          align="right"
                          iconType="circle"
                          iconSize={8}
                          wrapperStyle={{
                            paddingBottom: '20px',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}
                          formatter={(value) => (
                            <span className="ml-1" style={{ color: value === 'venta' ? COLORS.chart.venta : COLORS.chart.compra }}>
                              {value === 'venta' ? 'Venta' : 'Compra'}
                            </span>
                          )}
                        />

                        <Area
                          type="monotone"
                          dataKey="compra"
                          stroke={COLORS.chart.compra}
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorCompra)"
                          animationDuration={600}
                        />
                        <Area
                          type="monotone"
                          dataKey="venta"
                          stroke={COLORS.chart.venta}
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#colorVenta)"
                          animationDuration={600}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                </AnimatePresence>
              ) : null}
            </div>
          </ErrorBoundary>

        </div>
      </div>
    </section>
  );
};

export default EvolucionDolar;
