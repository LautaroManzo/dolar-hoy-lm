import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getDolar } from '@/app/services/dolar';
import HistoricoSimple from '@/app/dolar/components/historico-simple';
import { DOLAR_PAGE_LIST, type DolarPageContent } from '@/app/constants/dolarPageContent';
import FaqAccordion from '@/app/components/FaqAccordion';
import EditorialCollapsible from '@/app/components/EditorialCollapsible';
import { DolarCard } from '@/app/dolar/components/dolar-card';

interface Props {
  content: DolarPageContent;
}

export default async function DolarTypePage({ content }: Props) {
  let data: Awaited<ReturnType<typeof getDolar>> | null = null;
  try {
    data = await getDolar(content.apiCasa);
  } catch {}

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faq.map(f => ({
      '@type': 'Question',
      name: f.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://dolarinfohoy.com.ar' },
      { '@type': 'ListItem', position: 2, name: content.h1, item: `https://dolarinfohoy.com.ar/${content.slug}` },
    ],
  };

  const otherTypes = DOLAR_PAGE_LIST.filter(p => p.slug !== content.slug);

  return (
    <div className="bg-[#fcf7f8] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        {/* Breadcrumb */}
        <nav aria-label="Ruta de navegación">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-slate-800 transition-colors">
                <ArrowLeft size={13} />
                Inicio
              </Link>
            </li>
            <li className="text-slate-300" aria-hidden="true">/</li>
            <li className="text-[#1a3a52] font-medium truncate">{content.h1.replace(' hoy en Argentina', '')}</li>
          </ol>
        </nav>

        {/* Hero — DolarCard */}
        <h1 className="sr-only">{content.h1}</h1>
        {data ? (
          <DolarCard
            title={content.h1.replace(' hoy en Argentina', '')}
            buy={data.buy}
            sell={data.sell}
            buyVariation={data.buyVariation}
            sellVariation={data.sellVariation}
            spread={data.spread}
            spreadSign={data.spreadSign}
            horaActualizacion={data.horaActualizacion}
            descripcion={content.subtitle}
            extra=""
            horaOperacion=""
            slug={content.slug}
            tipoHistorico={content.tipoHistorico}
            hideInfoLink
          />
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border-t-4 border-[#2d5a7b] px-5 py-6">
            <p className="text-slate-400 text-sm">No se pudo cargar la cotización en este momento.</p>
          </div>
        )}

        {/* Gráfico histórico */}
        <section>
          <HistoricoSimple tipo={content.tipoHistorico} />
        </section>

        {/* Editorial */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-[#2d5a7b] p-6 sm:p-8">
          <EditorialCollapsible sections={content.editorial} />
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-[#2d5a7b] p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#1a3a52] mb-1">Preguntas frecuentes</h2>
          <FaqAccordion items={content.faq} />
        </section>

        {/* Links a otros tipos */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 border-t-4 border-t-[#2d5a7b] p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#1a3a52] mb-5">Otras cotizaciones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mt-4">
            {otherTypes.map(p => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="group flex flex-1 items-center justify-between gap-2 px-4 py-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-[#2d5a7b]/30 hover:bg-[#1a3a52]/[0.03] transition-all duration-200 min-w-0"
              >
                <span className="font-semibold text-base text-slate-700 group-hover:text-[#1a3a52] transition-colors duration-200 truncate">
                  {p.h1.replace(' hoy en Argentina', '')}
                </span>
                <ArrowUpRight size={15} className="shrink-0 text-slate-300 group-hover:text-[#2d5a7b] transition-colors duration-200" />
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
