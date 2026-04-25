import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | DolarInfoHoy',
  description: 'Leé los términos y condiciones de uso del sitio DolarInfoHoy.',
  alternates: {
    canonical: 'https://dolarinfohoy.com.ar/terminos-y-condiciones',
  },
}

export default function TerminosYCondicionesPage() {
  return (
    <div className="bg-[#fcf7f8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-10">

        <nav aria-label="Ruta de navegación" className="mb-6">
          <ol className="flex items-center gap-3 text-sm">
            <li>
              <Link href="/" className="flex items-center gap-3 text-slate-500 hover:text-slate-800 transition-colors">
                <ArrowLeft size={13} />
                Inicio
              </Link>
            </li>
            <li className="text-slate-400 select-none" aria-hidden="true">/</li>
            <li className="text-[#1a3a52] font-medium">Términos y Condiciones</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3a52] mb-2">Términos y Condiciones</h1>
          <p className="text-sm text-slate-500 mb-8">Última actualización: abril de 2026</p>

          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-slate-700">

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">1. Aceptación de los términos</h2>
              <p>
                Al acceder y utilizar <strong>DolarInfoHoy</strong> (<em>dolarinfohoy.com.ar</em>), aceptás estos Términos y Condiciones en su totalidad.
                Si no estás de acuerdo con alguna de sus cláusulas, te pedimos que no utilices el sitio.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">2. Naturaleza informativa del contenido</h2>
              <p>
                Toda la información publicada en DolarInfoHoy —incluyendo cotizaciones del dólar, gráficos históricos,
                indicadores económicos y noticias— tiene carácter <strong>exclusivamente informativo</strong>.
              </p>
              <p className="mt-2">
                Los datos se obtienen de fuentes públicas y APIs de terceros (DolarApi, ArgentinaDatos, NewsAPI)
                y pueden contener errores, demoras o inexactitudes. <strong>DolarInfoHoy no verifica de forma independiente</strong> la exactitud
                de los datos provistos por estas fuentes.
              </p>
              <p className="mt-2">
                <strong>Nada de lo publicado en este sitio constituye asesoramiento financiero, recomendación de inversión,
                oferta de compra o venta de divisas, ni consejo legal o impositivo.</strong> Antes de tomar decisiones financieras,
                consultá con un profesional habilitado.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">3. Mercado informal (dólar blue)</h2>
              <p>
                El dólar informal (blue) no posee cotización oficial reconocida por el Banco Central de la República Argentina (BCRA).
                Los valores publicados son de referencia y se obtienen de fuentes periodísticas y APIs de terceros.
                DolarInfoHoy no opera en este mercado ni facilita transacciones de ningún tipo.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">4. Limitación de responsabilidad</h2>
              <p>
                En la máxima medida permitida por la ley argentina, DolarInfoHoy y sus operadores no serán responsables por:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Pérdidas o daños derivados de decisiones tomadas con base en la información del sitio.</li>
                <li>Inexactitudes, errores u omisiones en los datos mostrados.</li>
                <li>Interrupciones o indisponibilidad del servicio.</li>
                <li>Contenido de sitios externos enlazados desde DolarInfoHoy.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">5. Propiedad intelectual</h2>
              <p>
                El diseño, código fuente, logotipo, textos originales y demás elementos de DolarInfoHoy son propiedad de sus operadores
                y están protegidos por las leyes argentinas de propiedad intelectual (Ley 11.723).
              </p>
              <p className="mt-2">
                Las cotizaciones, noticias e indicadores económicos provienen de fuentes de terceros y están sujetos a las
                condiciones de uso de cada proveedor. Queda prohibida la reproducción total o parcial del contenido del sitio
                con fines comerciales sin autorización expresa.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">6. Uso aceptable</h2>
              <p>Al usar DolarInfoHoy te comprometés a:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>No utilizar el sitio para actividades ilegales o contrarias a la normativa argentina.</li>
                <li>No realizar scraping automatizado masivo que afecte el rendimiento del servicio.</li>
                <li>No intentar acceder a partes restringidas del sistema.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">7. Modificaciones al servicio</h2>
              <p>
                DolarInfoHoy se reserva el derecho de modificar, suspender o discontinuar el sitio en cualquier momento
                y sin previo aviso, sin que esto genere responsabilidad alguna frente a los usuarios.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">8. Cambios a estos términos</h2>
              <p>
                Podemos actualizar estos Términos y Condiciones cuando lo consideremos necesario.
                La fecha de &quot;última actualización&quot; al inicio del documento refleja la versión vigente.
                El uso continuado del sitio tras una modificación implica la aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">9. Jurisdicción y ley aplicable</h2>
              <p>
                Estos términos se rigen por las leyes de la <strong>República Argentina</strong>.
                Cualquier controversia que surja en relación con su interpretación o cumplimiento será sometida
                a la jurisdicción de los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires,
                con renuncia a cualquier otro fuero que pudiera corresponder.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">10. Contacto</h2>
              <p>
                Para consultas sobre estos términos podés escribirnos a{' '}
                <a href="mailto:dolarinfohoy@gmail.com" className="text-[#2d5a7b] underline hover:text-[#1a3a52]">
                  dolarinfohoy@gmail.com
                </a>.
              </p>
            </section>

          </div>
        </article>

      </div>
    </div>
  )
}
