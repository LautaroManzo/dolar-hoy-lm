'use client';

import React, { useState } from 'react';
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

const EvolucionDolar: React.FC = () => {
  const [tipoDolar, setTipoDolar] = useState<string>('blue');
  const [isMounted, setIsMounted] = useState(false);
  const { data, loading, error } = useDolarHistorico(tipoDolar);

  React.useEffect(() => { setIsMounted(true); }, []);

  const opcionesDolar = [
    { id: 'blue', name: 'Dólar Blue', nombre: 'Dólar Blue' },
    { id: 'oficial', name: 'Dólar Oficial', nombre: 'Dólar Oficial' },
    { id: 'bolsa', name: 'Dólar MEP', nombre: 'Dólar MEP' },
    { id: 'contadoconliqui', name: 'Dólar CCL', nombre: 'Dólar CCL' },
    { id: 'tarjeta', name: 'Dólar Tarjeta', nombre: 'Dólar Tarjeta' },
    { id: 'mayorista', name: 'Dólar Mayorista', nombre: 'Dólar Mayorista' },
    { id: 'cripto', name: 'Dólar Cripto', nombre: 'Dólar Cripto' },
  ];

  const nombreSeleccionado = opcionesDolar.find(o => o.id === tipoDolar)?.nombre;

  return (
    <section className="w-full font-sans mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto w-full rounded-2xl border-t-4 border-[#2d5a7b]">
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

        {/* TITULO Y SELECTOR */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-[#1a3a52]">
              Últimos 30 días
            </h2>
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
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    dataKey="fecha"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }}
                    minTickGap={30}
                    tickMargin={12}
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
                    animationDuration={1200}
                  />
                  <Area
                    type="monotone"
                    dataKey="venta"
                    stroke={COLORS.chart.venta}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorVenta)"
                    animationDuration={1200}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </ErrorBoundary>
        </div>
      </div>
    </section>
  );
};

export default EvolucionDolar;
