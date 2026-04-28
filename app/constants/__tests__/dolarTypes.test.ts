import { describe, it, expect } from 'vitest';
import { toApiCasa, API_CASA_MAP, DOLAR_ENTRIES } from '../dolarTypes';

describe('toApiCasa', () => {
  it('mapea mep a bolsa', () => {
    expect(toApiCasa('mep')).toBe('bolsa');
  });

  it('mapea ccl a contadoconliqui', () => {
    expect(toApiCasa('ccl')).toBe('contadoconliqui');
  });

  it('devuelve el mismo valor para blue', () => {
    expect(toApiCasa('blue')).toBe('blue');
  });

  it('devuelve el mismo valor para oficial', () => {
    expect(toApiCasa('oficial')).toBe('oficial');
  });

  it('devuelve el mismo valor para tarjeta', () => {
    expect(toApiCasa('tarjeta')).toBe('tarjeta');
  });

  it('devuelve el mismo valor para cripto', () => {
    expect(toApiCasa('cripto')).toBe('cripto');
  });

  it('devuelve el id sin cambios si no está en el mapa', () => {
    expect(toApiCasa('desconocido')).toBe('desconocido');
  });
});

describe('API_CASA_MAP', () => {
  it('tiene exactamente 6 entradas', () => {
    expect(Object.keys(API_CASA_MAP)).toHaveLength(6);
  });

  it('coincide con las keys de DOLAR_ENTRIES', () => {
    const entryKeys = Object.keys(DOLAR_ENTRIES).sort();
    const mapKeys = Object.keys(API_CASA_MAP).sort();
    expect(mapKeys).toEqual(entryKeys);
  });
});

describe('DOLAR_ENTRIES', () => {
  it('tiene 6 tipos de dólar', () => {
    expect(Object.keys(DOLAR_ENTRIES)).toHaveLength(6);
  });

  it('cada entry tiene 5 campos', () => {
    for (const [key, entry] of Object.entries(DOLAR_ENTRIES)) {
      expect(entry, `entry "${key}" debe tener 5 campos`).toHaveLength(5);
    }
  });

  it('cada entry tiene strings no vacíos', () => {
    for (const [key, entry] of Object.entries(DOLAR_ENTRIES)) {
      entry.forEach((field, i) => {
        expect(field.length, `entry "${key}[${i}]" no puede ser vacío`).toBeGreaterThan(0);
      });
    }
  });
});
