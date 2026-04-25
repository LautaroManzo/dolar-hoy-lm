import { describe, it, expect } from 'vitest';
import { getFechaArgentina, getFechaHoyFormateada } from '../site';

describe('getFechaArgentina', () => {
  it('devuelve un objeto Date válido', () => {
    const fecha = getFechaArgentina();
    expect(fecha).toBeInstanceOf(Date);
    expect(isNaN(fecha.getTime())).toBe(false);
  });

  it('la fecha tiene año, mes y día válidos', () => {
    const fecha = getFechaArgentina();
    expect(fecha.getFullYear()).toBeGreaterThan(2020);
    expect(fecha.getMonth()).toBeGreaterThanOrEqual(0);
    expect(fecha.getMonth()).toBeLessThanOrEqual(11);
    expect(fecha.getDate()).toBeGreaterThanOrEqual(1);
    expect(fecha.getDate()).toBeLessThanOrEqual(31);
  });
});

describe('getFechaHoyFormateada', () => {
  it('devuelve string con formato "D de mes"', () => {
    const result = getFechaHoyFormateada();
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^\d{1,2} de \w+$/);
  });

  it('contiene el mes en español', () => {
    const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const result = getFechaHoyFormateada();
    expect(meses.some(m => result.includes(m))).toBe(true);
  });
});
