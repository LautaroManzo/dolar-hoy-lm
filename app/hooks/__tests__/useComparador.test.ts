import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useComparador } from '../useComparador';

function recentDates(count: number) {
  const dates: { fecha: string; compra: number; venta: number }[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    dates.push({ fecha: `${yyyy}-${mm}-${dd}`, compra: 1380 + i, venta: 1400 + i });
  }
  return dates;
}

const MOCK_DATA = recentDates(5);

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

function mockFetch(data: unknown = MOCK_DATA, ok = true) {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: () => Promise.resolve(data),
  } as Response);
}

describe('useComparador', () => {
  it('carga datos desde la API para un tipo', async () => {
    mockFetch();
    const { result } = renderHook(() => useComparador(['blue'], '7D'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.chartData.length).toBeGreaterThan(0);
    expect(result.current.isSingle).toBe(true);
    expect(result.current.chartData[0]).toHaveProperty('compra');
    expect(result.current.chartData[0]).toHaveProperty('venta');
  });

  it('usa cache de localStorage si existe', async () => {
    const dates = recentDates(3);
    const cachedData = dates.map(d => ({
      fecha: d.fecha.slice(5),
      compra: d.compra,
      venta: d.venta,
      originalDate: d.fecha,
    }));
    localStorage.setItem(
      'historico_blue_365d',
      JSON.stringify({ fechaCache: new Date().toISOString(), datos: cachedData })
    );

    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const { result } = renderHook(() => useComparador(['blue'], '7D'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.current.chartData.length).toBe(3);
  });

  it('ignora cache expirado', async () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 2);
    localStorage.setItem(
      'historico_blue_365d',
      JSON.stringify({ fechaCache: oldDate.toISOString(), datos: [] })
    );

    mockFetch();
    const { result } = renderHook(() => useComparador(['blue'], '7D'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(globalThis.fetch).toHaveBeenCalled();
  });

  it('filtra datos malformados de la API', async () => {
    const good = recentDates(2);
    const badData = [
      ...good,
      { fecha: 'invalid', compra: 'not a number', venta: null },
      { wrong: 'shape' },
    ];
    mockFetch(badData);
    const { result } = renderHook(() => useComparador(['blue'], '7D'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.chartData.length).toBe(2);
  });

  it('isSingle es false con multiples tipos', async () => {
    mockFetch();
    const { result } = renderHook(() => useComparador(['blue', 'oficial'], '1A'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.isSingle).toBe(false);
  });

  it('devuelve chartData vacío sin tipos seleccionados disponibles', () => {
    const { result } = renderHook(() => useComparador([], '1A'));
    expect(result.current.chartData).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});
