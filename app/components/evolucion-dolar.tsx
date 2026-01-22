'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
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

type DolarHistorico = {
  fecha: string;
  compra: number;
  venta: number;
};

type DolarProcesado = {
  fecha: string;
  compra: number;
  venta: number;
  originalDate: string;
};

const EvolucionDolar: React.FC = () => {
  const [data, setData] = useState<DolarProcesado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [tipoDolar, setTipoDolar] = useState<string>('blue');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const opcionesDolar = [
    { id: 'blue', nombre: 'Dólar Blue' },
    { id: 'oficial', nombre: 'Dólar Oficial' },
    { id: 'bolsa', nombre: 'Dólar MEP' },
    { id: 'contadoconliqui', nombre: 'Dólar CCL' },
    { id: 'tarjeta', nombre: 'Dólar Tarjeta' },
    { id: 'mayorista', nombre: 'Dólar Mayorista' },
    { id: 'cripto', nombre: 'Dólar Cripto' },
  ];

  const COLOR_VENTA = '#2d5a7b';
  const COLOR_COMPRA = '#10b981';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHistorico = async () => {
        setLoading(true);
        setError(null);

        const cacheKey = `historico_${tipoDolar}`;
        const hoy = new Date().toISOString().split('T')[0];
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const { fechaCache, datos } = JSON.parse(cached);
          if (fechaCache === hoy) {
            setData(datos);
            setLoading(false);
            return;
          }
        }

        try {
          const response = await fetch(
              `https://api.argentinadatos.com/v1/cotizaciones/dolares/${tipoDolar}`,
              { signal: controller.signal }
          );

          if (!response.ok) throw new Error('Error al obtener datos');

          const result = (await response.json()) as DolarHistorico[];

          const procesados: DolarProcesado[] = result
              .slice(-30)
              .map((item) => {
                  const dateParts = item.fecha.split('-').map(Number);
                  const fechaObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

                  return {
                      fecha: fechaObj.toLocaleDateString('es-AR', {
                          day: 'numeric',
                          month: 'short',
                      }),
                      venta: item.venta,
                      compra: item.compra,
                      originalDate: item.fecha,
                  };
              });

            setData(procesados);
            localStorage.setItem(cacheKey, JSON.stringify({ fechaCache: hoy, datos: procesados }));
        } catch (err: any) {
          if (err.name === 'AbortError') return;
          console.error(err);
          setError('No se pudo cargar el gráfico.');
        } finally {
            setLoading(false);
        }
    };
    
    fetchHistorico();
    return () => controller.abort();
  }, [tipoDolar]);

  const nombreSeleccionado = opcionesDolar.find(o => o.id === tipoDolar)?.nombre;

  return (
    <section className="w-full font-sans mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
            <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-[#1a3a52]">
                    Últimos 30 días
                </h2>
            </div>

          <div className="flex flex-col items-center sm:items-end gap-3">
            <div className="relative w-60 sm:w-52" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer ${
                  isDropdownOpen 
                    ? 'border-[#1a3a52] bg-[#f8fafc]'
                    : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <span className="font-bold text-sm text-[#1a3a52]">{nombreSeleccionado}</span>
                <ChevronDown size={16} className={`text-[#1a3a52] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-[#2d5a7b] border border-[#2d5a7b] rounded-xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-top-1">
                  {opcionesDolar.map((opcion) => (
                    <button
                      key={opcion.id}
                      onClick={() => {
                        setTipoDolar(opcion.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors border-b border-white/5 last:border-none cursor-pointer ${
                        tipoDolar === opcion.id ? 'bg-white/20' : 'hover:bg-white/10'
                      }`}
                    >
                      <span className={`font-semibold ${tipoDolar === opcion.id ? 'text-white' : 'text-slate-200'}`}>
                        {opcion.nombre}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

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
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVenta" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLOR_VENTA} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={COLOR_VENTA} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCompra" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLOR_COMPRA} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={COLOR_COMPRA} stopOpacity={0} />
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
                    <span className="ml-1" style={{ color: value === 'venta' ? COLOR_VENTA : COLOR_COMPRA }}>
                      {value === 'venta' ? 'Venta' : 'Compra'}
                    </span>
                  )}
                />

                <Area
                  type="monotone"
                  dataKey="compra"
                  stroke={COLOR_COMPRA}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCompra)"
                  animationDuration={1200}
                />
                <Area
                  type="monotone"
                  dataKey="venta"
                  stroke={COLOR_VENTA}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorVenta)"
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default EvolucionDolar;