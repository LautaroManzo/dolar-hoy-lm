import { useState, useEffect } from 'react';

type DolarHistorico = {
  fecha: string;
  compra: number;
  venta: number;
};

type DolarProcesado = {
  fecha: string;
  compra: number;
  venta: number;
  originalDate: string;
};

const LOADING_DEBOUNCE_MS = 300;
const CACHE_TTL_DAYS = 7;
const HISTORICAL_DAYS = 30;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function useDolarHistorico(tipoDolar: string) {
  const [data, setData] = useState<DolarProcesado[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const controller = new AbortController();
    const cacheKey = `historico_${tipoDolar}`;

    // Intenta cargar desde caché antes de mostrar el spinner
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { fechaCache, datos } = JSON.parse(cached) as { fechaCache: string; datos: DolarProcesado[] };
        const diffDias = (Date.now() - new Date(fechaCache).getTime()) / MS_PER_DAY;
        if (diffDias < CACHE_TTL_DAYS) {
          setData(datos);
          // Caché vigente: no hace falta fetch ni mostrar loading
          return () => controller.abort();
        }
      } catch {
        // Caché corrupta, la ignoramos y seguimos al fetch
        localStorage.removeItem(cacheKey);
      }
    }

    // Caché vencida o ausente: mostrar spinner después del debounce
    const loadingTimer = setTimeout(() => setLoading(true), LOADING_DEBOUNCE_MS);

    const fetchHistorico = async () => {
      setError(null);

      try {
        const response = await fetch(
          `https://api.argentinadatos.com/v1/cotizaciones/dolares/${tipoDolar}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error(`Error al obtener datos: ${response.status}`);

        const result = (await response.json()) as DolarHistorico[];

        const procesados: DolarProcesado[] = result
          .slice(-HISTORICAL_DAYS)
          .map((item) => {
            const dateParts = item.fecha.split('-').map(Number);
            const fechaObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

            return {
              fecha: fechaObj.toLocaleDateString('es-AR', {
                day: 'numeric',
                month: 'short',
              }),
              venta: item.venta,
              compra: item.compra,
              originalDate: item.fecha,
            };
          });

        setData(procesados);

        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              fechaCache: new Date().toISOString(),
              datos: procesados,
            })
          );
        } catch (storageErr) {
          console.warn('No se pudo guardar el caché en localStorage:', storageErr);
        }

      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        console.error(`Error cargando histórico de ${tipoDolar}:`, err);
        setError('No se pudo cargar el gráfico.');
      } finally {
        clearTimeout(loadingTimer);
        setLoading(false);
      }
    };

    fetchHistorico();
    return () => {
      clearTimeout(loadingTimer);
      controller.abort();
    };
  }, [tipoDolar]);

  return { data, loading, error };
}
