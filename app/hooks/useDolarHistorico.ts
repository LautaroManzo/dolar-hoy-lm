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

export function useDolarHistorico(tipoDolar: string) {
  const [data, setData] = useState<DolarProcesado[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let loadingTimer = setTimeout(() => setLoading(true), 300);

    const fetchHistorico = async () => {
      setError(null);

      const cacheKey = `historico_${tipoDolar}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { fechaCache, datos } = JSON.parse(cached);
        const diffDias = (Date.now() - new Date(fechaCache).getTime()) / (1000 * 60 * 60 * 24);

        if (diffDias < 7) {
          setData(datos);
        }
      }

      try {
        const response = await fetch(
          `https://api.argentinadatos.com/v1/cotizaciones/dolares/${tipoDolar}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error('Error al obtener datos');

        const result = (await response.json()) as DolarHistorico[];

        const procesados: DolarProcesado[] = result
          .slice(-30)
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
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ 
            fechaCache: new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' })).toISOString(), 
            datos: procesados 
          })
        );

      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setError('No se pudo cargar el gráfico.');
        }
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
