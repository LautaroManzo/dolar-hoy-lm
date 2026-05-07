"use client";

import { useEffect, useRef, useCallback } from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import { useCalculator } from '../../hooks/useCalculator';
import { Dropdown } from '../../shared/ui/Dropdown';
import { formatPrice, formatInput } from '../../utils/format';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
  const {
    amount,
    setAmount,
    dolarTypes,
    selectedDolar,
    setSelectedDolar,
    isInverse,
    toggleInverse,
    rateMode,
    setRateMode,
    result,
    clearAmount,
  } = useCalculator(isOpen);

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    clearAmount();
    onClose();
  }, [clearAmount, onClose]);

  const handleCloseRef = useRef(handleClose);
  useEffect(() => { handleCloseRef.current = handleClose; }, [handleClose]);

  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement as HTMLElement;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseRef.current();
    };
    document.addEventListener('keydown', handleEscape);

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, input, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();

    return () => {
      document.removeEventListener('keydown', handleEscape);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/60 backdrop-blur-lg p-4 transition-all"
      onClick={handleClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Conversor de moneda"
        className="bg-white w-full max-w-sm overflow-visible rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="p-5 flex justify-between items-center bg-brand-primary rounded-t-2xl text-white">
          <h2 className="text-lg font-bold tracking-tight uppercase text-sm opacity-90">Conversor de Moneda</h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer"
            aria-label="Cerrar conversor"
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
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(formatInput(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.currentTarget.blur();
                    }
                  }}
                  className="bg-transparent text-2xl font-bold text-brand-primary focus:outline-none w-full placeholder:text-slate-200"
                />
              </div>
            </div>

            <div className="relative h-0 flex justify-center z-10">
              <button
                type="button"
                onClick={toggleInverse}
                className="absolute -translate-y-1/2 bg-brand-secondary text-white p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-[3px] border-white cursor-pointer"
                aria-label={isInverse ? 'Cambiar a pesos → dólares' : 'Cambiar a dólares → pesos'}
              >
                <ArrowRightLeft size={16} />
              </button>
            </div>

            <div className="p-5 rounded-xl bg-brand-primary shadow-inner shadow-black/20 mt-2">
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
                <span className="shrink-0 text-[10px] font-black text-brand-primary px-2 py-1 bg-white rounded-md ml-2">
                  {isInverse ? 'ARS' : 'USD'}
                </span>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-center gap-0 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
            <button
              type="button"
              onClick={() => setRateMode('compra')}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                rateMode === 'compra' ? 'bg-brand-secondary shadow-sm' : 'hover:bg-slate-100'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                rateMode === 'compra' ? 'text-white' : 'text-slate-400'
              }`}>Compra</span>
              <span className={`text-sm font-black ${
                rateMode === 'compra' ? 'text-white' : 'text-gray-700'
              }`}>
                ${formatPrice(selectedDolar?.compra || 0)}
              </span>
            </button>
            <div className="w-px h-8 bg-slate-200" />
            <button
              type="button"
              onClick={() => setRateMode('venta')}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                rateMode === 'venta' ? 'bg-brand-secondary shadow-sm' : 'hover:bg-slate-100'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-widest ${
                rateMode === 'venta' ? 'text-white' : 'text-slate-400'
              }`}>Venta</span>
              <span className={`text-sm font-black ${
                rateMode === 'venta' ? 'text-white' : 'text-gray-700'
              }`}>
                ${formatPrice(selectedDolar?.venta || 0)}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
