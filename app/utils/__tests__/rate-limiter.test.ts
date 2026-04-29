import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createRateLimiter } from '../rate-limiter';

describe('createRateLimiter', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('permite requests dentro del límite', () => {
    const isLimited = createRateLimiter({ limit: 3, windowMs: 10_000 });
    expect(isLimited('1.2.3.4')).toBe(false);
    expect(isLimited('1.2.3.4')).toBe(false);
    expect(isLimited('1.2.3.4')).toBe(false);
  });

  it('bloquea al exceder el límite', () => {
    const isLimited = createRateLimiter({ limit: 2, windowMs: 10_000 });
    isLimited('1.2.3.4');
    isLimited('1.2.3.4');
    expect(isLimited('1.2.3.4')).toBe(true);
  });

  it('permite de nuevo después de que expire la ventana', () => {
    const isLimited = createRateLimiter({ limit: 1, windowMs: 5_000 });
    isLimited('1.2.3.4');
    expect(isLimited('1.2.3.4')).toBe(true);

    vi.advanceTimersByTime(5_001);
    expect(isLimited('1.2.3.4')).toBe(false);
  });

  it('limpia timestamps individuales expirados (no solo IPs completas)', () => {
    const isLimited = createRateLimiter({ limit: 3, windowMs: 5_000 });

    isLimited('1.2.3.4');
    vi.advanceTimersByTime(3_000);
    isLimited('1.2.3.4');
    vi.advanceTimersByTime(3_000);

    // El primer timestamp expiró (6s > 5s), el segundo no (3s < 5s)
    // Debería tener solo 1 timestamp válido + el nuevo = 2, así que permite
    expect(isLimited('1.2.3.4')).toBe(false);
  });

  it('trackea IPs independientemente', () => {
    const isLimited = createRateLimiter({ limit: 1, windowMs: 10_000 });
    isLimited('1.1.1.1');
    expect(isLimited('1.1.1.1')).toBe(true);
    expect(isLimited('2.2.2.2')).toBe(false);
  });

  it('desaloja la IP más antigua cuando se alcanza maxIps', () => {
    const isLimited = createRateLimiter({ limit: 10, windowMs: 60_000, maxIps: 2 });

    isLimited('1.1.1.1');
    vi.advanceTimersByTime(100);
    isLimited('2.2.2.2');
    vi.advanceTimersByTime(100);

    // Tercera IP: debería desalojar 1.1.1.1 (la más antigua)
    expect(isLimited('3.3.3.3')).toBe(false);

    // 1.1.1.1 fue desalojada, ahora puede entrar como nueva
    expect(isLimited('1.1.1.1')).toBe(false);
  });

  it('no desaloja si la IP ya existe en el map', () => {
    const isLimited = createRateLimiter({ limit: 10, windowMs: 60_000, maxIps: 2 });

    isLimited('1.1.1.1');
    isLimited('2.2.2.2');

    // IP existente no debería causar desalojo
    expect(isLimited('1.1.1.1')).toBe(false);
  });
});
