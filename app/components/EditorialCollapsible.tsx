'use client';

import { useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';

interface Section {
  titulo: string;
  cuerpo: string;
}

export default function EditorialCollapsible({ sections }: { sections: Section[] }) {
  const [expanded, setExpanded] = useState(false);
  const [first, ...rest] = sections;

  return (
    <div>
      <div>
        <h3 className="text-base font-bold text-brand-primary mb-1">{first.titulo}</h3>
        <p className="text-slate-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: first.cuerpo }} />
      </div>

      {rest.length > 0 && (
        <>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
            expanded ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-5 mt-5">
              {rest.map((s, i) => (
                <div key={i}>
                  <h3 className="text-base font-bold text-brand-primary mb-1">{s.titulo}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: s.cuerpo }} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setExpanded(v => !v)}
            className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all duration-200 cursor-pointer"
            aria-label={expanded ? 'Colapsar' : 'Expandir'}
          >
            {expanded
              ? <ChevronsUp size={18} />
              : <ChevronsDown size={18} />
            }
          </button>
        </>
      )}
    </div>
  );
}
