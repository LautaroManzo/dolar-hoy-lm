import { getOtrasMonedas } from '@/app/services/cotizaciones';
import { formatPrice } from '@/app/utils/format';


export default async function OtrasMonedas() {
  let monedas;
  try {
    monedas = await getOtrasMonedas();
  } catch {
    return null;
  }

  if (!monedas.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <section aria-labelledby="otras-monedas-heading">
        <div className="max-w-6xl mx-auto w-full">

          <h2
            id="otras-monedas-heading"
            className="flex items-center mb-5 text-brand-primary text-2xl tracking-wide opacity-70
              after:content-[''] after:flex-grow after:h-[1px] after:ml-6
              after:bg-gradient-to-r after:from-transparent after:to-brand-primary/15"
          >
            Otras monedas
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {monedas.map(m => (
              <div
                key={m.moneda}
                className="rounded-2xl shadow-md bg-white p-5 flex flex-col gap-3 border-t-4 border-brand-secondary"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 tracking-wide">
                    {m.nombre}
                  </h3>
                  <span className="ml-auto text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {m.moneda}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center justify-center py-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[0.55rem] font-bold text-gray-700 tracking-wide uppercase">Compra</span>
                    <span className="text-base sm:text-xl font-bold text-gray-700 leading-tight mt-1">${formatPrice(m.compra)}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center py-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-[0.55rem] font-bold text-brand-secondary tracking-wide uppercase">Venta</span>
                    <span className="text-base sm:text-xl font-bold text-brand-secondary leading-tight mt-1">${formatPrice(m.venta)}</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 text-center">
                  Última actualización {m.horaActualizacion}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
