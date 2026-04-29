import { describe, it, expect, vi, beforeEach } from 'vitest';

const API_URL = 'https://dolarapi.com/v1/cotizaciones';
vi.mock('../../constants/api', () => ({ API_COTIZACIONES: API_URL }));

beforeEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

const mockMonedas = [
  { moneda: 'EUR', nombre: 'Euro', compra: 1050, venta: 1100, fechaActualizacion: '2025-04-27T15:00:00-03:00' },
  { moneda: 'BRL', nombre: 'Real Brasileño', compra: 250, venta: 270, fechaActualizacion: '2025-04-27T15:00:00-03:00' },
  { moneda: 'CLP', nombre: 'Peso Chileno', compra: 1.1, venta: 1.3, fechaActualizacion: '2025-04-27T15:00:00-03:00' },
  { moneda: 'UYU', nombre: 'Peso Uruguayo', compra: 25, venta: 28, fechaActualizacion: '2025-04-27T15:00:00-03:00' },
  { moneda: 'GBP', nombre: 'Libra Esterlina', compra: 1300, venta: 1350, fechaActualizacion: '2025-04-27T15:00:00-03:00' },
];

function mockFetch(data: unknown, ok = true) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: () => Promise.resolve(data),
  }));
}

describe('getOtrasMonedas', () => {
  it('filtra solo las monedas incluidas (EUR, BRL, CLP, UYU)', async () => {
    mockFetch(mockMonedas);
    const { getOtrasMonedas } = await import('../cotizaciones');
    const result = await getOtrasMonedas();
    expect(result).toHaveLength(4);
    expect(result.map(m => m.moneda)).toEqual(['EUR', 'BRL', 'CLP', 'UYU']);
  });

  it('ordena por el orden definido en MONEDAS_INCLUIDAS', async () => {
    mockFetch([...mockMonedas].reverse());
    const { getOtrasMonedas } = await import('../cotizaciones');
    const result = await getOtrasMonedas();
    expect(result[0].moneda).toBe('EUR');
    expect(result[3].moneda).toBe('UYU');
  });

  it('formatea la hora de actualización', async () => {
    mockFetch(mockMonedas);
    const { getOtrasMonedas } = await import('../cotizaciones');
    const result = await getOtrasMonedas();
    expect(result[0].horaActualizacion).toMatch(/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{2}\shs/);
  });

  it('devuelve array vacío si la API falla y no hay caché', async () => {
    mockFetch(null, false);
    const { getOtrasMonedas } = await import('../cotizaciones');
    const result = await getOtrasMonedas();
    expect(result).toEqual([]);
  });

  it('devuelve caché si la API falla después de un fetch exitoso', async () => {
    mockFetch(mockMonedas);
    const { getOtrasMonedas } = await import('../cotizaciones');

    const first = await getOtrasMonedas();
    expect(first).toHaveLength(4);

    mockFetch(null, false);
    const second = await getOtrasMonedas();
    expect(second).toHaveLength(4);
    expect(second[0].moneda).toBe('EUR');
  });

  it('filtra datos con shape inválida', async () => {
    mockFetch([
      { moneda: 'EUR', nombre: 'Euro', compra: 1050, venta: 1100, fechaActualizacion: '2025-04-27T15:00:00-03:00' },
      { moneda: 'BRL', nombre: 123, compra: 'invalid', venta: 270 },
      null,
      'garbage',
    ]);
    const { getOtrasMonedas } = await import('../cotizaciones');
    const result = await getOtrasMonedas();
    expect(result).toHaveLength(1);
    expect(result[0].moneda).toBe('EUR');
  });

  it('devuelve array vacío si la respuesta no es un array', async () => {
    mockFetch({ error: 'not an array' });
    const { getOtrasMonedas } = await import('../cotizaciones');
    const result = await getOtrasMonedas();
    expect(result).toEqual([]);
  });
});
