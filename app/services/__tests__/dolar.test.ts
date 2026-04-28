import { describe, it, expect } from 'vitest';
import { processDolar } from '../dolar';
import type { DolarData } from '../dolar';

const makeDolarData = (overrides: Partial<DolarData> = {}): DolarData => ({
  compra: 1400,
  venta: 1450,
  fechaActualizacion: '2025-04-27T15:30:00-03:00',
  variacion: 1.5,
  casa: 'blue',
  ...overrides,
});

describe('processDolar', () => {
  it('calcula spread correctamente', () => {
    const result = processDolar(makeDolarData({ compra: 1400, venta: 1450 }));
    expect(result.spread).toBe(50);
    expect(result.spreadSign).toBe('up');
  });

  it('spread cero cuando compra y venta son iguales', () => {
    const result = processDolar(makeDolarData({ compra: 1400, venta: 1400 }));
    expect(result.spread).toBe(0);
    expect(result.spreadSign).toBe('neutral');
  });

  it('spread negativo cuando compra > venta', () => {
    const result = processDolar(makeDolarData({ compra: 1500, venta: 1400 }));
    expect(result.spread).toBe(-100);
    expect(result.spreadSign).toBe('down');
  });

  it('devuelve buy y sell del input', () => {
    const result = processDolar(makeDolarData({ compra: 1200, venta: 1250 }));
    expect(result.buy).toBe(1200);
    expect(result.sell).toBe(1250);
  });

  it('variación positiva genera sign up', () => {
    const result = processDolar(makeDolarData({ variacion: 2.5 }));
    expect(result.buyVariation.sign).toBe('up');
    expect(result.buyVariation.percent).toBe(2.5);
    expect(result.buyVariation.percentAbs).toBe(2.5);
  });

  it('variación negativa genera sign down', () => {
    const result = processDolar(makeDolarData({ variacion: -1.2 }));
    expect(result.buyVariation.sign).toBe('down');
    expect(result.buyVariation.percent).toBe(-1.2);
    expect(result.buyVariation.percentAbs).toBe(1.2);
  });

  it('variación cero genera sign neutral', () => {
    const result = processDolar(makeDolarData({ variacion: 0 }));
    expect(result.buyVariation.sign).toBe('neutral');
    expect(result.buyVariation.percent).toBe(0);
    expect(result.buyVariation.dailyDiff).toBe(0);
  });

  it('calcula dailyDiff basado en venta y variación', () => {
    const result = processDolar(makeDolarData({ venta: 1000, variacion: 2 }));
    expect(result.buyVariation.dailyDiff).toBe(20);
  });

  it('formatea hora de actualización con fecha válida', () => {
    const result = processDolar(makeDolarData({ fechaActualizacion: '2025-04-27T15:30:00-03:00' }));
    expect(result.horaActualizacion).toMatch(/\d{1,2}\/\d{1,2}\s\d{2}:\d{2}\shs/);
  });

  it('maneja fecha vacía', () => {
    const result = processDolar(makeDolarData({ fechaActualizacion: '' }));
    expect(result.horaActualizacion).toBe('—');
  });

  it('maneja variación undefined (fallback a 0)', () => {
    const data = makeDolarData();
    (data as unknown as Record<string, unknown>).variacion = undefined;
    const result = processDolar(data as DolarData);
    expect(result.buyVariation.percent).toBe(0);
    expect(result.buyVariation.sign).toBe('neutral');
  });
});
