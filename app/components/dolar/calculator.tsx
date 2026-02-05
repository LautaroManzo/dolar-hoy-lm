"use client";

import { X, ArrowRightLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getDolarBuyPrice } from '../../services/getDolarBuyPrice';
import { Dropdown } from '../ui/Dropdown';
import { formatPrice } from '../../utils/format';

interface DolarType {
  id: string;
  name: string;
  price: number;
}

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [dolarTypes, setDolarTypes] = useState<DolarType[]>([
    { id: 'blue', name: 'Dólar Blue', price: 0 },
    { id: 'oficial', name: 'Dólar Oficial', price: 0 },
    { id: 'bolsa', name: 'Dólar MEP', price: 0 },
    { id: 'contadoconliqui', name: 'Dólar CCL', price: 0 },
    { id: 'tarjeta', name: 'Dólar Tarjeta', price: 0 }, 
    { id: 'crypto', name: 'Dólar Cripto', price: 0 },
  ]);
  const [selectedDolar, setSelectedDolar] = useState<DolarType | null>(
    { id: 'blue', name: 'Dólar Blue', price: 0 }
  );
  const [isInverse, setIsInverse] = useState(false);

  useEffect(() => {
    const loadDolarTypes = async () => {
      try {
        const types = [
          { id: 'blue', name: 'Dólar Blue', price: await getDolarBuyPrice("blue") },
          { id: 'oficial', name: 'Dólar Oficial', price: await getDolarBuyPrice("oficial") },
          { id: 'bolsa', name: 'Dólar MEP', price: await getDolarBuyPrice("bolsa") },
          { id: 'contadoconliqui', name: 'Dólar CCL', price: await getDolarBuyPrice("contadoconliqui") },
          { id: 'tarjeta', name: 'Dólar Tarjeta', price: await getDolarBuyPrice("tarjeta") }, 
          { id: 'crypto', name: 'Dólar Cripto', price: await getDolarBuyPrice("cripto") },
        ];
        setDolarTypes(types);
        setSelectedDolar(prev => prev ? types.find(t => t.id === prev.id) || types[0] : types[0]);
      } catch (error) {
        console.error('Error loading dolar types:', error);
      }
    };

    if (isOpen) {
      loadDolarTypes();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen)
      document.body.style.overflow = "hidden";
    else
      document.body.style.overflow = "";

    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const result = selectedDolar && amount 
    ? isInverse 
      ? (Number(amount) * selectedDolar.price) 
      : (Number(amount) / selectedDolar.price)
    : 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f2535]/60 backdrop-blur-lg p-4 transition-all"
      onClick={() => { setAmount(""); onClose(); }}
    >
      <div 
        className="bg-white w-full max-w-sm overflow-visible rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="p-5 flex justify-between items-center bg-[#1a3a52] rounded-t-2xl text-white">
          <h2 className="text-lg font-bold tracking-tight uppercase text-sm opacity-90">Conversor de Moneda</h2>
          <button 
            onClick={() => { setAmount(""); onClose(); }}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-1.5 block">
              Tipo de dólar
            </label>
            <Dropdown
              options={dolarTypes}
              selectedId={selectedDolar?.id || 'blue'}
              onSelect={(id) => {
                const selected = dolarTypes.find(t => t.id === id);
                if (selected) setSelectedDolar(selected);
              }}
              className="w-full"
            />
          </div>

          <div className="flex flex-col relative">
            
            {/* Input */}
            <div className="p-4 rounded-xl border-2 border-slate-100 bg-white focus-within:border-slate-300 transition-colors">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                {isInverse ? 'Ingrese un monto en Dólares' : 'Ingrese un monto en Pesos'}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-300">$</span>
                <input 
                  type="number"
                  min="0"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.currentTarget.blur();
                    }
                  }}
                  className="bg-transparent text-2xl font-bold text-[#1a3a52] focus:outline-none w-full placeholder:text-slate-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            <div className="relative h-0 flex justify-center z-10">
              <button 
                onClick={() => { 
                  setIsInverse(!isInverse);
                  setAmount("");
                }}
                className="absolute -translate-y-1/2 bg-[#2d5a7b] text-white p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-[3px] border-white cursor-pointer"
              >
                <ArrowRightLeft size={16} />
              </button>
            </div>

            <div className="p-5 rounded-xl bg-[#1a3a52] shadow-inner shadow-black/20 mt-2">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1">
                Total Estimado
              </span>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2 overflow-hidden">
                  <span className="text-sm font-bold text-white/60">$</span>
                  <span className={`text-3xl font-black tracking-tight truncate ${amount ? 'text-white' : 'text-white/20'}`}>
                    {amount ? result.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0,00"}
                  </span>
                </div>
                <span className="shrink-0 text-[10px] font-black text-[#1a3a52] px-2 py-1 bg-white rounded-md ml-2">
                  {isInverse ? 'ARS' : 'USD'}
                </span>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-center px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-sm font-black text-[#1a3a52]">1 USD = ${formatPrice(selectedDolar?.price || 0)}</span>
          </div>

        </div>
      </div>
    </div>
  );
}
