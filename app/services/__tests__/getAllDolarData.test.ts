import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { DolarData } from '../dolar';

const mockDolarData: DolarData[] = [
  { casa: 'blue', compra: 1400, venta: 1450, fechaActualizacion: '2025-04-27T15:00:00-03:00', variacion: 1.5 },
  { casa: 'oficial', compra: 950, venta: 1000, fechaActualizacion: '2025-04-27T15:00:00-03:00', variacion: 0.5 },
  { casa: 'bolsa', compra: 1350, venta: 1380, fechaActualizacion: '2025-04-27T15:00:00-03:00', variacion: -0.3 },
  { casa: 'contadoconliqui', compra: 1370, venta: 1400, fechaActualizacion: '2025-04-27T15:00:00-03:00', variacion: 0.2 },
  { casa: 'tarjeta', compra: 0, venta: 1600, fechaActualizacion: '2025-04-27T15:00:00-03:00', variacion: 0.5 },
  { casa: 'cripto', compra: 1380, venta: 1410, fechaActualizacion: '2025-04-27T15:00:00-03:00', variacion: -0.1 },
];

vi.mock('../dolar', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../dolar')>();
  return {
    ...actual,
    fetchAllDolars: vi.fn().mockResolvedValue({ data: mockDolarData, isStale: false }),
  };
});

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    cache: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
  };
});

describe('getAllDolarData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('devuelve datos para los 6 tipos de dólar', async () => {
    const { getAllDolarData } = await import('../getAllDolarData');
    const result = await getAllDolarData();
    const keys = Object.keys(result.data);
    expect(keys).toContain('blue');
    expect(keys).toContain('oficial');
    expect(keys).toContain('mep');
    expect(keys).toContain('ccl');
    expect(keys).toContain('tarjeta');
    expect(keys).toContain('cripto');
    expect(keys).toHaveLength(6);
  });

  it('mapea mep a bolsa correctamente', async () => {
    const { getAllDolarData } = await import('../getAllDolarData');
    const result = await getAllDolarData();
    expect(result.data.mep).toBeDefined();
    expect(result.data.mep.buy).toBe(1350);
    expect(result.data.mep.sell).toBe(1380);
  });

  it('mapea ccl a contadoconliqui correctamente', async () => {
    const { getAllDolarData } = await import('../getAllDolarData');
    const result = await getAllDolarData();
    expect(result.data.ccl).toBeDefined();
    expect(result.data.ccl.buy).toBe(1370);
    expect(result.data.ccl.sell).toBe(1400);
  });

  it('propaga isStale correctamente', async () => {
    const { getAllDolarData } = await import('../getAllDolarData');
    const result = await getAllDolarData();
    expect(result.isStale).toBe(false);
  });

  it('cada entrada tiene title y descripcion', async () => {
    const { getAllDolarData } = await import('../getAllDolarData');
    const result = await getAllDolarData();
    for (const [key, entry] of Object.entries(result.data)) {
      expect(entry.title, `${key} debe tener title`).toBeTruthy();
      expect(entry.descripcion, `${key} debe tener descripcion`).toBeTruthy();
    }
  });
});
