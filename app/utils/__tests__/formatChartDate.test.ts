import { describe, it, expect } from 'vitest';
import { formatChartDate } from '../format';

describe('formatChartDate', () => {
  it('formato largo por defecto', () => {
    const result = formatChartDate('2025-03-15');
    expect(result).toMatch(/15/);
    expect(result).toMatch(/marzo/i);
    expect(result).toMatch(/2025/);
  });

  it('formato corto con short=true', () => {
    const result = formatChartDate('2025-03-15', true);
    expect(result).toMatch(/mar/i);
    expect(result).toMatch(/25/);
  });

  it('maneja primer día del año', () => {
    const result = formatChartDate('2025-01-01');
    expect(result).toMatch(/1/);
    expect(result).toMatch(/enero/i);
  });

  it('maneja último día del año', () => {
    const result = formatChartDate('2025-12-31');
    expect(result).toMatch(/31/);
    expect(result).toMatch(/diciembre/i);
  });
});
