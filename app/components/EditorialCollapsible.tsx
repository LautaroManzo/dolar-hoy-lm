'use client';

import { useState } from 'react';
import { ChevronsDown, ChevronsUp } from 'lucide-react';

interface Section {
  titulo: string;
  cuerpo: string;
}

const ALLOWED_TAGS = new Set(['strong', 'em', 'b', 'i', 'br', 'p', 'ul', 'ol', 'li', 'a']);

function sanitizeHtml(html: string): string {
  return html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/gi, (match, tag: string) => {
    const lower = tag.toLowerCase();
    if (!ALLOWED_TAGS.has(lower)) return '';
    if (match.startsWith('</')) return `</${lower}>`;
    if (lower === 'a') {
      const href = match.match(/href\s*=\s*["']([^"']*)["']/i)?.[1] ?? '';
      if (!href || /^\s*javascript\s*:/i.test(href)) return '';
      return `<a href="${href.replace(/"/g, '&quot;')}" rel="nofollow noopener" target="_blank">`;
    }
    return `<${lower}>`;
  });
}

export default function EditorialCollapsible({ sections }: { sections: Section[] }) {
  const [expanded, setExpanded] = useState(false);
  const [first, ...rest] = sections;

  return (
    <div>
      <div>
        <h3 className="text-base font-bold text-brand-primary mb-1">{first.titulo}</h3>
        <p className="text-slate-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHtml(first.cuerpo) }} />
      </div>

      {rest.length > 0 && (
        <>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
            expanded ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-5 mt-5">
              {rest.map((s) => (
                <div key={s.titulo}>
                  <h3 className="text-base font-bold text-brand-primary mb-1">{s.titulo}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHtml(s.cuerpo) }} />
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
