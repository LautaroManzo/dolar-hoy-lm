import { DolarCard } from "./dolar-card";
import ErrorBoundary from "../../shared/ui/error-boundary";
import type { DolarCardData } from "../../types/dolar";

interface CardsProps {
  data: Record<string, DolarCardData>;
}

export function Cards({ data }: CardsProps) {

  return (
    <div className="max-w-6xl mx-auto w-full space-y-10">

      <section aria-labelledby="cotizaciones-principales">
        <h2 id="cotizaciones-principales" className="sr-only">Cotizaciones principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-[6fr_4fr] gap-6">
          <ErrorBoundary>
            <DolarCard {...data.blue} slug="dolar/blue" tipoHistorico="blue" />
          </ErrorBoundary>
          <ErrorBoundary>
            <DolarCard {...data.oficial} slug="dolar/oficial" tipoHistorico="oficial" />
          </ErrorBoundary>
        </div>
      </section>

      <section aria-labelledby="otras-cotizaciones">

        <h2 id="otras-cotizaciones" className="flex items-center mb-5 text-brand-primary text-2xl tracking-wide opacity-70
            after:content-[''] after:flex-grow after:h-[1px] after:ml-6
            after:bg-gradient-to-r after:from-transparent after:to-brand-primary/15">
          Otras cotizaciones
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ErrorBoundary>
            <DolarCard {...data.mep} slug="dolar/mep" tipoHistorico="bolsa" />
          </ErrorBoundary>
          <ErrorBoundary>
            <DolarCard {...data.ccl} slug="dolar/ccl" tipoHistorico="contadoconliqui" />
          </ErrorBoundary>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ErrorBoundary>
            <DolarCard {...data.tarjeta} slug="dolar/tarjeta" tipoHistorico="tarjeta" />
          </ErrorBoundary>
          <ErrorBoundary>
            <DolarCard {...data.cripto} slug="dolar/cripto" tipoHistorico="cripto" />
          </ErrorBoundary>
        </div>

      </section>

    </div>
  );
}