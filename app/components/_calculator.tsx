import { X, ArrowRightLeft, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

import { getDolarBuyPrice } from '../services/getDolarBuyPrice';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DOLAR_TYPES = [
  { id: 'blue', name: 'Dólar Blue', price: await getDolarBuyPrice("blue") },
  { id: 'oficial', name: 'Dólar Oficial', price: await getDolarBuyPrice("oficial") },
  { id: 'bolsa', name: 'Dólar MEP', price: await getDolarBuyPrice("bolsa") },
  { id: 'contadoconliqui', name: 'Dólar CCL', price: await getDolarBuyPrice("contadoconliqui") },
  { id: 'tarjeta', name: 'Dólar Tarjeta', price: await getDolarBuyPrice("tarjeta") }, 
  { id: 'crypto', name: 'Dólar Cripto', price: await getDolarBuyPrice("cripto") },
];

export default function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [selectedDolar, setSelectedDolar] = useState(DOLAR_TYPES[0]);
  const [isInverse, setIsInverse] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen)
      document.body.style.overflow = "hidden";
    else
      document.body.style.overflow = "";

    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const result = isInverse 
    ? (Number(amount) * selectedDolar.price) 
    : (Number(amount) / selectedDolar.price);

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
          
          <div className="relative" ref={dropdownRef}>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1 mb-1.5 block">
              Tipo de dólar
            </label>

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all cursor-pointer ${
                isDropdownOpen 
                  ? 'border-[#1a3a52] bg-[#f8fafc]'
                  : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <span className="font-bold text-[#1a3a52]">{selectedDolar.name}</span>
              <ChevronDown size={18} className={`text-[#1a3a52] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-[calc(100%+5px)] left-0 right-0 z-50 bg-[#2d5a7b] border border-[#2d5a7b] rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
                {DOLAR_TYPES.map((dolar) => (
                  <button
                    key={dolar.id}
                    onClick={() => {
                      setSelectedDolar(dolar);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center justify-between transition-colors border-b border-white/5 last:border-none cursor-pointer ${
                      selectedDolar.id === dolar.id 
                        ? 'bg-white/10' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span className={`font-semibold ${
                      selectedDolar.id === dolar.id ? 'text-white' : 'text-slate-300'
                    }`}>
                      {dolar.name}
                    </span>
                    {selectedDolar.id === dolar.id}
                  </button>
                ))}
              </div>
            )}
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
            <span className="text-sm font-black text-[#1a3a52]">1 USD = ${selectedDolar.price}</span>
          </div>

        </div>
      </div>
    </div>
  );
}
