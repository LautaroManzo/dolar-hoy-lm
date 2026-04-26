'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <dl className="space-y-2 mt-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-200 ${
              isOpen ? 'border-brand-secondary/30 bg-brand-primary/[0.03]' : 'border-slate-100 bg-slate-50 hover:border-slate-200'
            }`}
          >
            <dt>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-black transition-colors duration-200 ${
                  isOpen ? 'bg-brand-secondary text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {i + 1}
                </span>
                <span className={`flex-1 font-semibold text-base transition-colors duration-200 ${
                  isOpen ? 'text-brand-primary' : 'text-slate-700'
                }`}>
                  {item.pregunta}
                </span>
                <span className={`shrink-0 transition-colors duration-200 ${isOpen ? 'text-brand-secondary' : 'text-slate-300'}`}>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
            </dt>
            <dd className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed px-5 pb-5 pl-[3.75rem]">
                {item.respuesta}
              </p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
