"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Info, XCircle, Share2, Copy, Calculator, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { VariationDisplay } from "../../shared/ui/VariationDisplay";
import { PriceDisplay } from "../../shared/ui/PriceDisplay";
import { formatPrice, parseNum, formatInput } from "../../utils/format";
import { COLORS } from "../../constants/colors";
import type { DolarCardData } from "../../types/dolar";

type DolarCardProps = Omit<DolarCardData, 'fechaActualizacion'> & { slug: string; tipoHistorico: string; hideInfoLink?: boolean };

const headerIconMap = { up: TrendingUp, down: TrendingDown, neutral: Minus };


function CardBackContent({ buy, sell, title }: { buy: number; sell: number; title: string }) {
  const [arsVal, setArsVal] = useState('');
  const [usdVal, setUsdVal] = useState('');
  const [rateMode, setRateMode] = useState<'venta' | 'compra'>('venta');
  const [lastEdited, setLastEdited] = useState<'ars' | 'usd'>('ars');

  const activeRate = rateMode === 'venta' ? sell : buy;

  const handleArs = (v: string) => {
    const formatted = formatInput(v);
    setArsVal(formatted);
    setLastEdited('ars');
    const n = parseNum(formatted);
    setUsdVal(n > 0 ? formatPrice(n / activeRate) : '');
  };

  const handleUsd = (v: string) => {
    const formatted = formatInput(v);
    setUsdVal(formatted);
    setLastEdited('usd');
    const n = parseNum(formatted);
    setArsVal(n > 0 ? formatPrice(n * activeRate) : '');
  };

  const switchMode = (mode: 'venta' | 'compra') => {
    setRateMode(mode);
    const r = mode === 'venta' ? sell : buy;
    if (lastEdited === 'ars') {
      const n = parseNum(arsVal);
      setUsdVal(n > 0 ? formatPrice(n / r) : '');
    } else {
      const n = parseNum(usdVal);
      setArsVal(n > 0 ? formatPrice(n * r) : '');
    }
  };

  const arsActive = lastEdited === 'ars' && arsVal !== '';
  const usdActive = lastEdited === 'usd' && usdVal !== '';

  return (
    <div className="flex-1 flex flex-col gap-3 w-full sm:w-[70%] mx-auto justify-center pb-2">
      <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</p>
      {/* ARS input */}
      <div className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border transition-all ${
        arsActive ? 'bg-[#2d5a7b]/5 border-[#2d5a7b]/40' : 'bg-slate-50 border-slate-100'
      }`}>
        <span className="text-[10px] font-black text-slate-400 uppercase shrink-0">ARS</span>
        <div className="w-px h-7 bg-slate-200 shrink-0" />
        <input
          type="text"
          inputMode="decimal"
          value={arsVal}
          onChange={e => handleArs(e.target.value)}
          placeholder="0,00"
          className="flex-1 bg-transparent text-right text-base font-bold text-gray-800 outline-none placeholder:text-slate-300 min-w-0 w-0"
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2 -my-2">
        <div className="flex-1 h-px bg-slate-100" />
        <ArrowUpDown size={13} className="text-slate-300 shrink-0" />
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* USD input */}
      <div className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border transition-all ${
        usdActive ? 'bg-[#2d5a7b]/5 border-[#2d5a7b]/40' : 'bg-slate-50 border-slate-100'
      }`}>
        <span className="text-[10px] font-black text-slate-400 uppercase shrink-0">USD</span>
        <div className="w-px h-7 bg-slate-200 shrink-0" />
        <input
          type="text"
          inputMode="decimal"
          value={usdVal}
          onChange={e => handleUsd(e.target.value)}
          placeholder="0,00"
          className="flex-1 bg-transparent text-right text-base font-bold text-gray-800 outline-none placeholder:text-slate-300 min-w-0 w-0"
        />
      </div>

      {/* Rate + toggle */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5 text-[10px]">
          <button
            onClick={() => switchMode('venta')}
            className={`px-3 py-1 rounded-md font-black uppercase tracking-wide transition-all cursor-pointer ${
              rateMode === 'venta' ? 'bg-[#2d5a7b] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Venta
          </button>
          <button
            onClick={() => switchMode('compra')}
            className={`px-3 py-1 rounded-md font-black uppercase tracking-wide transition-all cursor-pointer ${
              rateMode === 'compra' ? 'bg-[#2d5a7b] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Compra
          </button>
        </div>
        <span className="text-[10px] text-slate-400 font-semibold">1 USD = ${formatPrice(activeRate)}</span>
      </div>
    </div>
  );
}

function ActionButton({ onClick, label, children }: { onClick?: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-full flex items-center justify-center bg-[#2d5a7b] text-white transition-all duration-300 hover:scale-110 border-2 border-white cursor-pointer"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

export function DolarCard({
  title,
  buy,
  sell,
  buyVariation,
  horaActualizacion,
  slug,
  hideInfoLink = false,
}: DolarCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const spread = sell - buy;
  const generalTrendSign = buyVariation.sign;
  const HeaderIcon = headerIconMap[generalTrendSign];
  const isNeutral = generalTrendSign === "neutral";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${title}\n• Compra: $${formatPrice(buy)}\n• Venta: $${formatPrice(sell)}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleShare = async () => {
    const text = `${title}\n• Compra: $${formatPrice(buy)}\n• Venta: $${formatPrice(sell)}`;
    try {
      if (navigator.share) await navigator.share({ title, text });
      else { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    } catch {}
  };

  const actionBar = (variant: 'front' | 'back') => (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 p-1 bg-white rounded-full flex items-center justify-center shadow-md gap-1">
      <div className="relative">
        <ActionButton onClick={handleCopy} label="Copiar cotización"><Copy size={16} /></ActionButton>
        {copied && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-30">
            ¡Copiado!
          </div>
        )}
      </div>

      <ActionButton onClick={handleShare} label="Compartir cotización"><Share2 size={16} /></ActionButton>

      {variant === 'front' ? (
        <ActionButton onClick={() => setIsOpen(true)} label="Calculadora rápida">
          <Calculator size={16} />
        </ActionButton>
      ) : (
        <ActionButton onClick={() => setIsOpen(false)} label="Volver">
          <XCircle size={16} />
        </ActionButton>
      )}

      {!hideInfoLink && (
        <Link
          href={`/${slug}`}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[#2d5a7b] text-white transition-all duration-300 hover:scale-110 border-2 border-white cursor-pointer"
          aria-label={`Ver más información de ${title}`}
          title="Ver más información"
        >
          <Info size={16} />
        </Link>
      )}
    </div>
  );

  return (
    <motion.div
      className="relative w-full h-[260px] mb-14"
      animate={{ rotateY: isOpen ? 180 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {/* FRENTE */}
      <div
        className={`absolute inset-0 rounded-2xl shadow-md bg-white px-5 pt-5 pb-8 flex flex-col gap-2 border-t-4 border-[#2d5a7b] justify-between ${isOpen ? "pointer-events-none" : "pointer-events-auto"}`}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#1a3a52]">{title}</h3>
          {!isNeutral && (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${COLORS.variation[generalTrendSign]}`}>
              <HeaderIcon size={14} />
              Tendencia
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <PriceDisplay price={buy} label="Compra hoy" variant="compra" />
          <PriceDisplay price={sell} label="Venta hoy" variant="venta" />
        </div>

        <div className="flex items-center justify-evenly bg-slate-50 rounded-lg p-2 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[0.5rem] font-bold text-gray-700 tracking-wide uppercase sm:text-[0.65rem]">Variación:</span>
            <VariationDisplay variation={buyVariation} compact showPercentage={false} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[0.45rem] font-bold text-gray-700 tracking-wide uppercase sm:text-[0.55rem]">Brecha:</span>
            <div className="text-xs font-semibold text-gray-700 sm:text-sm">$ {formatPrice(spread)}</div>
          </div>
        </div>

        <div className="text-[10px] text-gray-400 text-center">Última actualización {horaActualizacion}</div>

        {actionBar('front')}
      </div>

      {/* REVERSO */}
      <div
        className={`absolute inset-0 rounded-2xl shadow-md border-t-4 border-[#2d5a7b] bg-white flex flex-col px-5 pt-4 pb-8 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
      >
        {isOpen && <CardBackContent buy={buy} sell={sell} title={title} />}
        {actionBar('back')}
      </div>
    </motion.div>
  );
}
