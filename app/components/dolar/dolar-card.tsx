"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Minus, TrendingUp, TrendingDown, Info, X, Share2, Copy } from "lucide-react";
import { useState } from "react";

interface VariationData {
  percent: number;
  percentAbs: number;
  sign: "up" | "down" | "neutral";
  dailyDiff: number;
  dailyDiffSign: "up" | "down" | "neutral";
}

interface DolarCardProps {
  title: string;
  buy: number;
  sell: number;
  buyVariation: VariationData;
  sellVariation: VariationData;
  spread: number; 
  spreadSign: "up" | "down" | "neutral"; 
  descripcion: string;
  extra: string;
  horaOperacion: string;
  fechaActualizacion: string;
}

// Iconos para la tendencia general
const headerIconMap = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

// Iconos para la variación en pesos
const iconMap = {
  up: ArrowUp,
  down: ArrowDown,
  neutral: Minus,
};

// Clases de color para la variación
const colorMap = {
  up: "text-green-700 bg-green-100",
  down: "text-red-700 bg-red-100",
  neutral: "text-gray-600 bg-gray-200",
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
  sellVariation,
  descripcion,
  extra,
  horaOperacion,
  fechaActualizacion
}: DolarCardProps) {

  const [isOpen, setIsOpen] = useState(false); 
  const [copied, setCopied] = useState(false);

  // Calculate spread
  const spread = sell - buy;

  const handleCopy = async () => {
    const copyText = `${title}\n• Compra: $${buy.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n• Venta: $${sell.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  const handleShare = async () => {
    const shareText = `${title}\n• Compra: $${buy.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n• Venta: $${sell.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    
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
      console.error('Error al compartir:', error);
    }
  };

  // Variaciones para COMPRA
  const BuyDailyDiffIcon = iconMap[buyVariation.dailyDiffSign];
  const buyDiffColorClasses = colorMap[buyVariation.dailyDiffSign];
  const buySignPrefix = buyVariation.dailyDiffSign === "up" ? "+" : buyVariation.dailyDiffSign === "down" ? "-" : "";
  const buyHasDailyDifference = buyVariation.dailyDiff !== 0;

  const BuyVariationContent = buyHasDailyDifference && (
    <span className="flex items-center justify-center gap-1 text-xs font-semibold mt-2">
      <span className={`flex items-center gap-1 px-3 py-1 rounded-full ${buyDiffColorClasses}`}>
        <BuyDailyDiffIcon size={12} />
        {buySignPrefix}{Math.abs(buyVariation.dailyDiff).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className="text-gray-700">
        ({buySignPrefix}{buyVariation.percentAbs.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)
      </span>
    </span>
  );

  // Variaciones para VENTA
  const SellDailyDiffIcon = iconMap[sellVariation.dailyDiffSign];
  const sellDiffColorClasses = colorMap[sellVariation.dailyDiffSign];
  const sellSignPrefix = sellVariation.dailyDiffSign === "up" ? "+" : sellVariation.dailyDiffSign === "down" ? "-" : "";
  const sellHasDailyDifference = sellVariation.dailyDiff !== 0;

  const SellVariationContent = sellHasDailyDifference && (
    <span className="flex items-center justify-center gap-1 text-xs font-semibold mt-2">
      <span className={`flex items-center gap-1 px-3 py-1 rounded-full ${sellDiffColorClasses}`}>
        <SellDailyDiffIcon size={12} />
        {sellSignPrefix}{Math.abs(sellVariation.dailyDiff).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className="text-gray-700">
        ({sellSignPrefix}{sellVariation.percentAbs.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)
      </span>
    </span>
  );

  // Tendencia general
  const generalTrendSign = buyVariation.sign;
  const HeaderIcon = headerIconMap[generalTrendSign];
  const isNeutral = generalTrendSign === "neutral";

  return (
    <motion.div
      className="relative w-full h-[270px] mb-6"
      animate={{ rotateY: isOpen ? 180 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div
        className={`absolute inset-0 rounded-2xl shadow-md bg-white p-5 flex flex-col gap-3 border-t-4 border-[#2d5a7b] justify-center ${isOpen ? "pointer-events-none" : "pointer-events-auto"}`}
        style={{ backfaceVisibility: "hidden" }}
      >
      
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 tracking-wide">
            {title}
          </h3>

          {!isNeutral && (
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${colorMap[generalTrendSign]}`}>
                <HeaderIcon size={14} />
                Tendencia
              </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-1">

          <div className="flex flex-col p-4 text-center bg-slate-50 border border-slate-100 rounded-xl h-[120px] justify-center">

            <span className="text-[0.65rem] font-bold text-gray-700 tracking-wide uppercase">Compra hoy</span>

            <span className="text-2xl lg:text-4xl text-gray-700 font-bold leading-none mt-1">
              ${buy.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>

          </div>

          <div className="flex flex-col p-4 text-center bg-slate-50 border border-slate-100 rounded-xl h-[120px] justify-center">

            <span className="text-[0.65rem] font-bold text-[#2d5a7b] tracking-wide uppercase">Venta hoy</span>

            <span className="text-2xl lg:text-4xl text-[#2d5a7b] font-bold leading-none mt-1">
              ${sell.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>

          </div>

        </div>

        <div className="flex items-center justify-evenly bg-slate-50 rounded-lg p-2 gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[0.5rem] font-bold text-gray-700 tracking-wide uppercase sm:text-[0.65rem]">
              Variación:
            </span>
            <div className={`text-xs font-semibold flex items-center gap-1 sm:text-sm ${buyVariation.sign === 'down' ? 'text-red-700' : buyVariation.sign === 'up' ? 'text-green-700' : 
              'text-gray-600'
            }`}>
              {buyVariation.sign === 'down' ? <ArrowDown size={12} /> : buyVariation.sign === 'up' ? <ArrowUp size={12} /> : 
              <Minus size={12} />}
              {buyVariation.sign === 'down' ? '-' : buyVariation.sign === 'up' ? '+' : ''}{buyVariation.percentAbs.toFixed(2)}%
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[0.45rem] font-bold text-gray-700 tracking-wide uppercase sm:text-[0.55rem]">
              Brecha:
            </span>
            <div className="text-xs font-semibold text-gray-700 sm:text-sm">
              $ {spread.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
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
        className={`absolute inset-0 rounded-3xl shadow-2xl border-t-4 border-[#2d5a7b] bg-white flex flex-col p-[20px] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
      >
        <div className="flex-1 flex flex-col justify-center space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 tracking-wide mb-3">
              {title}
            </h3>
            <p className="text-[14px] sm:text-[16px] text-gray-700 font-semibold leading-relaxed">
              {descripcion}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <p className="text-[13px] sm:text-[15px] font-medium text-center">{extra}</p>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <p className="text-[12px] sm:text-[14px] font-medium text-center">{horaOperacion}</p>
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