import { describe, it, expect, vi, beforeEach } from 'vitest';

const API_URL = 'https://dolarapi.com/v1/ambito/dolares';
vi.mock('../../constants/api', () => ({ API_DOLAR_AMBITO: API_URL }));
vi.mock('../../constants/dolarTypes', () => ({
  toApiCasa: (type: string) => type,
}));

beforeEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
  delete process.env.FORCE_API_FAILURE;
});

const validDolars = [
  { compra: 1400, venta: 1450, fechaActualizacion: '2025-04-27T15:00:00-03:00', variacion: 1.5, casa: 'blue' },
  { compra: 1000, venta: 1050, fechaActualizacion: '2025-04-27T15:00:00-03:00', variacion: 0.5, casa: 'oficial' },
];

function mockFetch(data: unknown, ok = true) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: () => Promise.resolve(data),
  }));
}

describe('fetchAllDolars - validación', () => {
  it('acepta datos con shape correcta', async () => {
    mockFetch(validDolars);
    const { fetchAllDolars } = await import('../dolar');
    const { data, isStale } = await fetchAllDolars();
    expect(data).toHaveLength(2);
    expect(isStale).toBe(false);
    expect(data[0].casa).toBe('blue');
  });

  it('rechaza respuesta que no es array', async () => {
    mockFetch({ error: 'not array' });
    const { fetchAllDolars } = await import('../dolar');
    await expect(fetchAllDolars()).rejects.toThrow();
  });

  it('filtra items con shape inválida', async () => {
    mockFetch([
      validDolars[0],
      { compra: 'invalid', venta: 1000, casa: 'mep' },
      null,
      { compra: 800, venta: 850 },
    ]);
    const { fetchAllDolars } = await import('../dolar');
    const { data } = await fetchAllDolars();
    expect(data).toHaveLength(1);
    expect(data[0].casa).toBe('blue');
  });

  it('tira error si todos los items son inválidos', async () => {
    mockFetch([
      { compra: 'bad', venta: 'bad', casa: 123 },
      null,
    ]);
    const { fetchAllDolars } = await import('../dolar');
    await expect(fetchAllDolars()).rejects.toThrow();
  });

  it('usa memCache si la API falla después de un fetch exitoso', async () => {
    mockFetch(validDolars);
    const mod = await import('../dolar');

    const first = await mod.fetchAllDolars();
    expect(first.isStale).toBe(false);

    mockFetch(null, false);
    const second = await mod.fetchAllDolars();
    expect(second.isStale).toBe(true);
    expect(second.data).toHaveLength(2);
  });

  it('tira error si la API falla y no hay caché', async () => {
    mockFetch(null, false);
    const { fetchAllDolars } = await import('../dolar');
    await expect(fetchAllDolars()).rejects.toThrow();
  });
});
