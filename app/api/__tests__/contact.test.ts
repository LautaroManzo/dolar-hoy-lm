import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSend = vi.fn().mockResolvedValue({ error: null });

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

const originalEnv = { ...process.env };

beforeEach(() => {
  vi.resetModules();
  mockSend.mockClear();
  mockSend.mockResolvedValue({ error: null });
  process.env = {
    ...originalEnv,
    RESEND_API_KEY: 'test-key',
    CONTACT_EMAIL: 'test@example.com',
  };
});

function makeRequest(body: Record<string, unknown>, ip = '127.0.0.1') {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: JSON.stringify(body),
  });
}

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    subject: 'Test subject',
    email: 'user@example.com',
    message: 'This is a test message',
    website: '',
    loadedAt: Date.now() - 5000,
    ...overrides,
  };
}

describe('POST /api/contact', () => {
  it('devuelve 400 con body invalido', async () => {
    const { POST } = await import('../contact/route');
    const req = makeRequest({ subject: '' }) as unknown;
    const res = await POST(req as import('next/server').NextRequest);
    expect(res.status).toBe(400);
  });

  it('devuelve 400 si honeypot tiene valor', async () => {
    const { POST } = await import('../contact/route');
    const req = makeRequest(validBody({ website: 'spam-bot' })) as unknown;
    const res = await POST(req as import('next/server').NextRequest);
    expect(res.status).toBe(400);
  });

  it('devuelve 400 si loadedAt es muy reciente (< 3s)', async () => {
    const { POST } = await import('../contact/route');
    const req = makeRequest(validBody({ loadedAt: Date.now() })) as unknown;
    const res = await POST(req as import('next/server').NextRequest);
    expect(res.status).toBe(400);
  });

  it('envía email correctamente con body válido', async () => {
    const { POST } = await import('../contact/route');
    const req = makeRequest(validBody(), '10.0.0.1') as unknown;
    const res = await POST(req as import('next/server').NextRequest);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it('devuelve 429 tras exceder rate limit', async () => {
    const { POST } = await import('../contact/route');
    const ip = '10.0.0.99';

    for (let i = 0; i < 3; i++) {
      const req = makeRequest(validBody(), ip) as unknown;
      await POST(req as import('next/server').NextRequest);
    }

    const req = makeRequest(validBody(), ip) as unknown;
    const res = await POST(req as import('next/server').NextRequest);
    expect(res.status).toBe(429);
  });

  it('sanitiza HTML en el mensaje', async () => {
    const { POST } = await import('../contact/route');
    const req = makeRequest(validBody({ message: '<script>alert("xss")</script>' }), '10.0.0.200') as unknown;
    await POST(req as import('next/server').NextRequest);

    const html = mockSend.mock.calls[0]?.[0]?.html ?? '';
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});
