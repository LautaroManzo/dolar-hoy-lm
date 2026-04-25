import { describe, it, expect } from 'vitest';
import { formatPrice, parseNum, formatInput, formatVariation } from '../format';

describe('formatPrice', () => {
  it('formatea entero con dos decimales en es-AR', () => {
    expect(formatPrice(1410)).toBe('1.410,00');
  });

  it('formatea decimal existente', () => {
    expect(formatPrice(1410.5)).toBe('1.410,50');
  });

  it('formatea números pequeños', () => {
    expect(formatPrice(5)).toBe('5,00');
  });

  it('formatea cero', () => {
    expect(formatPrice(0)).toBe('0,00');
  });
});

describe('parseNum', () => {
  it('convierte string es-AR a number', () => {
    expect(parseNum('1.410,50')).toBe(1410.5);
  });

  it('convierte entero sin separadores', () => {
    expect(parseNum('1000')).toBe(1000);
  });

  it('devuelve 0 para string vacío', () => {
    expect(parseNum('')).toBe(0);
  });

  it('devuelve 0 para string inválido', () => {
    expect(parseNum('abc')).toBe(0);
  });
});

describe('formatInput', () => {
  it('agrega puntos de miles', () => {
    expect(formatInput('1410')).toBe('1.410');
  });

  it('preserva coma decimal', () => {
    expect(formatInput('1410,5')).toBe('1.410,5');
  });

  it('elimina caracteres no numéricos excepto coma', () => {
    expect(formatInput('$1.410,50')).toBe('1.410,50');
  });

  it('devuelve vacío para input vacío', () => {
    expect(formatInput('')).toBe('');
  });
});

describe('formatVariation', () => {
  it('sube: prefijo + y signo up', () => {
    const result = formatVariation({ percent: 2, percentAbs: 2, sign: 'up', dailyDiff: 10, dailyDiffSign: 'up' });
    expect(result.signPrefix).toBe('+');
    expect(result.hasDailyDifference).toBe(true);
    expect(result.formattedPercent).toBe('+2,00%');
  });

  it('baja: prefijo - y signo down', () => {
    const result = formatVariation({ percent: -1.5, percentAbs: 1.5, sign: 'down', dailyDiff: -5, dailyDiffSign: 'down' });
    expect(result.signPrefix).toBe('-');
    expect(result.formattedPercent).toBe('-1,50%');
  });

  it('sin variación: hasDailyDifference false', () => {
    const result = formatVariation({ percent: 0, percentAbs: 0, sign: 'neutral', dailyDiff: 0, dailyDiffSign: 'neutral' });
    expect(result.hasDailyDifference).toBe(false);
    expect(result.signPrefix).toBe('');
  });
});
