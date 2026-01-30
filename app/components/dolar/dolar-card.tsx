"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Minus, TrendingUp, TrendingDown, Info, X } from "lucide-react";
import { useState } from "react";

interface DolarCardProps {
  title: string;
  buy: number;
  sell: number;
  dailyDiff: number; 
  dailyDiffSign: "up" | "down" | "neutral"; 
  variationPercentAbs: number;
  variationSign: "up" | "down" | "neutral";
  spread: number; 
  spreadSign: "up" | "down" | "neutral"; 
  descripcion: string;
  extra: string;
  horaOperacion: string;
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

export function DolarCard({
  title,
  buy,
  sell,
  dailyDiff, 
  dailyDiffSign,
  variationPercentAbs,
  variationSign,
  descripcion,
  extra,
  horaOperacion
}: DolarCardProps) {

  const [isOpen, setIsOpen] = useState(false);  

  const HeaderIcon = headerIconMap[variationSign]; 
  const DailyDiffIcon = iconMap[dailyDiffSign]; 

  const colorClasses = colorMap[variationSign];
  const diffColorClasses = colorMap[dailyDiffSign];

  const signPrefix = dailyDiffSign === "up" ? "+" : dailyDiffSign === "down" ? "-" : "";
  const hasDailyDifference = dailyDiff !== 0; 
  const isNeutral = variationSign === "neutral";

  const VariationContent = hasDailyDifference && (
    <span className="flex items-center justify-center gap-1 text-xs font-semibold mt-2">
      
      {/* Variación en pesos */}
      <span className={`flex items-center gap-1 px-3 py-1 rounded-full ${diffColorClasses}`}>
        <DailyDiffIcon size={12} />
        {signPrefix}{Math.abs(dailyDiff).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>

      {/* Variación porcentual */}
      <span className={`text-gray-700`}>
        ({signPrefix}{variationPercentAbs.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)
      </span>

    </span>
  );

  return (
    <motion.div
      className="relative w-full h-[220px] mb-6"
      animate={{ rotateY: isOpen ? 180 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div
        className="absolute inset-0 rounded-2xl shadow-md bg-white p-5 flex flex-col gap-5 border-t-4 border-[#2d5a7b] justify-center"
        style={{ backfaceVisibility: "hidden" }}
      >
      
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 tracking-wide">
            {title}
          </h3>

          {!isNeutral && (
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${colorClasses}`}>
                <HeaderIcon size={14} />
                Tendencia
              </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-1">

          <div className="flex flex-col p-4 text-center bg-slate-50 border border-slate-100 rounded-xl h-[120px] justify-center">

            <span className="text-[0.65rem] font-bold text-gray-700 tracking-wide uppercase">Compra hoy</span>

            <span className="text-2xl lg:text-4xl text-gray-700 font-bold leading-none mt-1">
              ${buy.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>

            {VariationContent}

          </div>

          <div className="flex flex-col p-4 text-center bg-slate-50 border border-slate-100 rounded-xl h-[120px] justify-center">

            <span className="text-[0.65rem] font-bold text-[#2d5a7b] tracking-wide uppercase">Venta hoy</span>

            <span className="text-2xl lg:text-4xl text-[#2d5a7b] font-bold leading-none mt-1">
              ${sell.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>

            {VariationContent}

          </div>

        </div>

      </div>

        <div 
            className={`absolute bottom-0 left-1/2 
                        transform -translate-x-1/2 translate-y-1/2 
                        z-20 p-1 bg-white rounded-full 
                        flex items-center justify-center shadow-md`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-10 h-10 rounded-full 
                            flex items-center justify-center 
                            bg-[#2d5a7b] text-white 
                            transition-all duration-700 ease-in-out hover:scale-110
                            border-2 border-white cursor-pointer
                            ${isOpen ? 'rotate-180' : ''}`}
            >
                {isOpen ? <X size={20} /> : <Info size={20} />}
            </button>
        </div>

        <div
            className="absolute inset-0 rounded-3xl shadow-2xl border-t-4 border-[#2d5a7b] bg-white flex flex-col justify-center text-center p-[20px] pb-[26px]"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >

          <div className="space-y-2 mb-2">
              <h3 className="text-[#2d5a7b] font-bold text-[16px] tracking-wider">
                  {title}
              </h3>
              <p className="text-[14px] text-gray-700 font-semibold leading-snug">
                  {descripcion}
              </p>
          </div>

          <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                  <p className="text-[13px] font-medium">{extra}</p>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-gray-600">
                  <p className="text-[12px] font-medium">{horaOperacion}</p>
              </div>
          </div>

        </div>

    </motion.div>
  );
}