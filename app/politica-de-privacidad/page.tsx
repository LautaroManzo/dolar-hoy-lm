import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Política de Privacidad | DolarInfoHoy',
  description: 'Conocé cómo DolarInfoHoy recopila, usa y protege tu información personal.',
  alternates: {
    canonical: 'https://dolarinfohoy.com.ar/politica-de-privacidad',
  },
}

export default function PoliticaDePrivacidadPage() {
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
            <li className="text-[#1a3a52] font-medium">Política de Privacidad</li>
          </ol>
        </nav>

        <article className="bg-white rounded-2xl shadow-sm p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a3a52] mb-2">Política de Privacidad</h1>
          <p className="text-sm text-slate-500 mb-8">Última actualización: abril de 2026</p>

          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-slate-700">

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">1. Responsable del tratamiento</h2>
              <p>
                El responsable del tratamiento de los datos personales recolectados a través de este sitio es <strong>DolarInfoHoy</strong>,
                operado de forma independiente con domicilio en la República Argentina.
                Ante cualquier consulta sobre privacidad podés escribirnos a{' '}
                <a href="mailto:dolarinfohoy@gmail.com" className="text-[#2d5a7b] underline hover:text-[#1a3a52]">
                  dolarinfohoy@gmail.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">2. Datos que recolectamos</h2>
              <p>Recolectamos únicamente los datos estrictamente necesarios para operar el sitio:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  <strong>Formulario de contacto:</strong> nombre (opcional), dirección de correo electrónico y el mensaje que nos enviás.
                  Estos datos se procesan a través de <strong>Resend</strong> (servicio de envío de emails) y se utilizan exclusivamente para responder tu consulta.
                </li>
                <li>
                  <strong>Analytics:</strong> utilizamos <strong>Vercel Analytics</strong>, una solución de analítica sin cookies que no rastrea usuarios individuales
                  ni almacena información personal identificable. Solo recolecta datos agregados de tráfico (páginas visitadas, país de origen, tipo de dispositivo).
                </li>
              </ul>
              <p className="mt-2">
                <strong>No utilizamos</strong> cookies de seguimiento, píxeles de publicidad, Google Analytics ni ningún otro tracker que requiera consentimiento explícito.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">3. Finalidad del tratamiento</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Responder consultas enviadas a través del formulario de contacto.</li>
                <li>Analizar el rendimiento del sitio de forma agregada y anónima para mejorar la experiencia de usuario.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">4. Plazo de conservación</h2>
              <p>
                Los mensajes recibidos por el formulario de contacto se conservan por el tiempo necesario para dar respuesta a la consulta.
                Los datos de analítica son agregados e irreversiblemente anonimizados; no tienen plazo de vencimiento propio.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">5. Transferencia a terceros</h2>
              <p>
                No vendemos, alquilamos ni cedemos tus datos personales a terceros con fines comerciales.
                Los únicos proveedores externos que procesan datos en nombre de DolarInfoHoy son:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Resend</strong> (resend.com) — envío de emails del formulario de contacto.</li>
                <li><strong>Vercel</strong> (vercel.com) — hosting y analytics sin cookies.</li>
                <li><strong>Supabase</strong> (supabase.com) — base de datos para noticias y contenido del sitio.</li>
              </ul>
              <p className="mt-2">Todos estos proveedores cuentan con políticas de privacidad propias y medidas de seguridad adecuadas.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">6. Tus derechos (ARCO)</h2>
              <p>
                De acuerdo con la <strong>Ley 25.326 de Protección de Datos Personales</strong> de la República Argentina,
                tenés derecho a:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Acceso:</strong> solicitar qué datos personales tuyos almacenamos.</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
                <li><strong>Cancelación:</strong> solicitar la eliminación de tus datos.</li>
                <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos en determinadas circunstancias.</li>
              </ul>
              <p className="mt-2">
                Para ejercer cualquiera de estos derechos escribinos a{' '}
                <a href="mailto:dolarinfohoy@gmail.com" className="text-[#2d5a7b] underline hover:text-[#1a3a52]">
                  dolarinfohoy@gmail.com
                </a>{' '}
                con el asunto &quot;Derechos ARCO&quot;. Responderemos en un plazo máximo de 5 días hábiles.
              </p>
              <p className="mt-2 text-slate-500 text-sm">
                La Dirección Nacional de Protección de Datos Personales (DNPDP) es el organismo de control competente.
                Podés presentar reclamos en{' '}
                <a href="https://www.argentina.gob.ar/aaip/datospersonales" target="_blank" rel="noopener noreferrer" className="text-[#2d5a7b] underline hover:text-[#1a3a52]">
                  www.argentina.gob.ar/aaip/datospersonales
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">7. Seguridad</h2>
              <p>
                Implementamos medidas técnicas razonables para proteger la información que nos enviás,
                incluyendo comunicaciones cifradas (HTTPS) y acceso restringido a los datos.
                Sin embargo, ningún sistema de transmisión por internet es 100% seguro.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#1a3a52] mb-2">8. Cambios a esta política</h2>
              <p>
                Podemos actualizar esta política cuando sea necesario. La fecha de &quot;última actualización&quot; al inicio del documento
                refleja la versión vigente. Te recomendamos revisarla periódicamente.
              </p>
            </section>

          </div>
        </article>

      </div>
    </div>
  )
}
