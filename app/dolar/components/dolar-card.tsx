"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Info, X, Share2, Copy, Clock } from "lucide-react";
import { useState } from "react";
import { VariationDisplay } from "../../shared/ui/VariationDisplay";
import { PriceDisplay } from "../../shared/ui/PriceDisplay";
import { formatPrice } from "../../utils/format";
import { COLORS } from "../../constants/colors";
import type { DolarCardData } from "../../types/dolar";

type DolarCardProps = Omit<DolarCardData, 'fechaActualizacion'>;

// Iconos para la tendencia general
const headerIconMap = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

function DolarCardActions({
  copied,
  isOpen,
  onCopy,
  onShare,
  setIsOpen,
  variant,
}: {
  copied: boolean;
  isOpen: boolean;
  onCopy: () => void;
  onShare: () => void;
  setIsOpen: (open: boolean) => void;
  variant: "front" | "back";
}) {
  const actionBarClassName =
    "absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 p-1 bg-white rounded-full flex items-center justify-center shadow-md gap-1";

  const actionButtonClassName =
    "w-9 h-9 rounded-full flex items-center justify-center bg-[#2d5a7b] text-white transition-all duration-300 ease-in-out hover:scale-110 border-2 border-white cursor-pointer";

  const toggleButtonClassName =
    "w-9 h-9 rounded-full flex items-center justify-center bg-[#2d5a7b] text-white transition-all duration-700 ease-in-out hover:scale-110 border-2 border-white cursor-pointer";

  const toggleAriaLabel =
    variant === "front" ? (isOpen ? "Cerrar información" : "Ver más información") : "Cerrar información";

  const toggleTitle =
    variant === "front" ? (isOpen ? "Cerrar información" : "Ver más información") : "Volver";

  return (
    <div className={actionBarClassName}>
      <div className="relative">
        <button
          onClick={onCopy}
          className={actionButtonClassName}
          aria-label="Copiar cotización"
          title="Copiar cotización"
        >
          <Copy size={16} />
        </button>

        {copied && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-30">
            ¡Copiado!
          </div>
        )}
      </div>

      <button
        onClick={onShare}
        className={actionButtonClassName}
        aria-label="Compartir cotización"
        title="Compartir cotización"
      >
        <Share2 size={16} className="mx-auto" />
      </button>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${toggleButtonClassName} ${isOpen ? "rotate-180" : ""}`}
        aria-label={toggleAriaLabel}
        title={toggleTitle}
      >
        {isOpen ? <X size={18} /> : <Info size={18} />}
      </button>
    </div>
  );
}

export function DolarCard({
  title,
  buy,
  sell,
  buyVariation,
  descripcion,
  extra,
  horaOperacion,
  horaActualizacion,
}: DolarCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculate spread
  const spread = sell - buy;

  const handleCopy = async () => {
    const copyText = `${title}\n• Compra: $${formatPrice(buy)}\n• Venta: $${formatPrice(sell)}`;

    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  const handleShare = async () => {
    const shareText = `${title}\n• Compra: $${formatPrice(buy)}\n• Venta: $${formatPrice(sell)}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  };

  // Tendencia general
  const generalTrendSign = buyVariation.sign;
  const HeaderIcon = headerIconMap[generalTrendSign];
  const isNeutral = generalTrendSign === "neutral";

  return (
    <motion.div
      className="relative w-full h-[260px] mb-5"
      animate={{ rotateY: isOpen ? 180 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div
        className={`absolute inset-0 rounded-2xl shadow-md bg-white px-5 pt-5 pb-8 flex flex-col gap-2 border-t-4 border-[#2d5a7b] justify-between ${isOpen ? "pointer-events-none" : "pointer-events-auto"}`}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 tracking-wide">
            {title}
          </h3>

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
            <span className="text-[0.5rem] font-bold text-gray-700 tracking-wide uppercase sm:text-[0.65rem]">
              Variación:
            </span>
            <VariationDisplay variation={buyVariation} compact showPercentage={false} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[0.45rem] font-bold text-gray-700 tracking-wide uppercase sm:text-[0.55rem]">
              Brecha:
            </span>
            <div className="text-xs font-semibold text-gray-700 sm:text-sm">
              $ {formatPrice(spread)}
            </div>
          </div>
        </div>

        <div className="text-[10px] text-gray-400 text-center">
          Última actualización {horaActualizacion}
        </div>

        <DolarCardActions
          copied={copied}
          isOpen={isOpen}
          onCopy={handleCopy}
          onShare={handleShare}
          setIsOpen={setIsOpen}
          variant="front"
        />

      </div>

      <div
        className={`absolute inset-0 rounded-2xl shadow-md border-t-4 border-[#2d5a7b] bg-white flex flex-col px-5 pt-5 pb-8 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
      >
        <div className="flex-1 flex flex-col justify-center gap-4 max-w-[90%] mx-auto w-full">
          <div>
            <p className="text-[11px] sm:text-[13px] font-black text-[#2d5a7b] uppercase tracking-widest mb-2">{title}</p>
            <p className="text-[14px] sm:text-[17px] text-gray-700 leading-relaxed">{descripcion}</p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <Info size={13} className="text-[#2d5a7b] mt-0.5 shrink-0" />
              <p className="text-[12px] sm:text-[15px] text-gray-600 leading-snug">{extra}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-[#2d5a7b] shrink-0" />
              <p className="text-[12px] sm:text-[14px] text-gray-400">{horaOperacion}</p>
            </div>
          </div>
        </div>

        <DolarCardActions
          copied={copied}
          isOpen={isOpen}
          onCopy={handleCopy}
          onShare={handleShare}
          setIsOpen={setIsOpen}
          variant="back"
        />

      </div>

    </motion.div>
  );
}