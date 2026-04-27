# CLAUDE.md

Tracker en tiempo real del tipo de cambio peso argentino/USD. Next.js (App Router) con TypeScript, desplegado en `dolarinfohoy.com.ar`.

Muestra 6 cotizaciones (Blue, Oficial, MEP, CCL, Tarjeta, Cripto) con gráficos históricos de hasta 365 días, calculadora de divisas, noticias, FAQ y formulario de contacto.

## Comandos

```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
npm test         # Vitest (utils)
```

**Antes de commitear**, correr los 3 checks del CI de GitHub (`.github/workflows/ci.yml`):

```bash
npm run lint && npx tsc --noEmit && npm test
```

## Git

- **NUNCA** incluir `Co-Authored-By: Claude` ni ninguna línea de autoría de IA en los commits.

## Reglas críticas

- **NUNCA** hardcodear colores en componentes — agregarlos primero a `app/constants/colors.ts` y consumirlos desde ahí.
- **NUNCA** hardcodear URLs de API — usar las constantes de `app/constants/api.ts`.
- **NUNCA** usar `Date` nativo para fechas de la app — siempre los helpers de `app/utils/site.ts` (zona horaria Buenos Aires).
- **NUNCA** eliminar los security headers de `next.config.ts` (X-Frame-Options, HSTS, X-XSS-Protection, Permissions-Policy, CSP).
- **NUNCA** usar `metadata.verification.google` para Google Analytics — va con `<GoogleAnalytics gaId="G-6MP230WEJ1" />` en `app/layout.tsx`.
- **NUNCA** usar `dangerouslySetInnerHTML` con `JSON.stringify` sin escapar: siempre `.replace(/</g, '\\u003c')`.
- **SIEMPRE** usar el alias `@/*` (apunta a la raíz del repo) en lugar de paths relativos profundos.
- **SIEMPRE** mantener sincronizado el JSON-LD `FinancialQuote` de `page.tsx` al cambiar la forma de los datos de cotizaciones — si se desincroniza se rompe el SEO.
- **SIEMPRE** incluir `alternates.canonical` en `generateMetadata` de cada página — sin canonical Google marca como duplicada.

## Arquitectura

**Modelo de componentes:** `page.tsx` es un Server Component que obtiene todos los datos y los distribuye a Client Components interactivos (cards de cotización, gráfico histórico, calculadora, FAQ, formulario de contacto).

**Fuentes de datos:**

| Fuente | Uso | Dónde |
|---|---|---|
| `dolarapi.com/v1/ambito/dolares` | Cotizaciones en tiempo real | `app/services/dolar.ts`, revalida cada 60s. `app/components/auto-refresh.tsx` llama `router.refresh()` cada 60s para actualizar los cards sin recargar la página. |
| `api.argentinadatos.com/v1/cotizaciones/dolares/{type}` | Histórico (hasta 365 días) | Cliente, caché localStorage con TTL 1 día via `app/hooks/useComparador.ts` |
| Supabase (tabla `posts`) | Noticias/artículos | Server Components en `app/noticia/` |
| Resend | Email del formulario de contacto | `POST /api/contact` |

**Endpoints API internos:**

| Ruta | Uso |
|---|---|
| `GET /api/dolares` | Proxy con cache server-side (revalidate 60s) para que Client Components accedan a cotizaciones sin importar servicios server |
| `POST /api/contact` | Formulario de contacto con rate limit (3/IP/10min), honeypot y validación Zod |

**Decisiones no obvias:**
- El histórico se cachea en localStorage (TTL 1 día) en lugar del servidor porque los datos pasados no cambian y reduce carga en una API gratuita. El hook incluye abort signal para cleanup al desmontar.
- La homepage usa ISR con `revalidate = 60` — se regenera cada 60 segundos.
- Si `dolarapi.com` cae, la app usa un memCache in-memory como fallback y muestra un banner `isStale`.
- El cookie consent usa `useSyncExternalStore` para leer localStorage sin hydration mismatch.
- El CSP incluye `'unsafe-eval'` solo en desarrollo (React lo necesita para debugging).

**Tipos de cambio:** los 6 tipos están definidos en `app/constants/dolarTypes.ts` con sus keys de API, nombres de display, descripciones y horarios de operación.

**URLs de API:** centralizadas en `app/constants/api.ts`.

## Pipeline de noticias (vive FUERA de este repo)

La tabla `posts` de Supabase se alimenta con un flujo N8N externo con Schedule Trigger. Claude no puede inspeccionar esto, así que queda documentado acá:

1. **Delete row** — limpia `posts`.
2. **4 HTTP Requests en paralelo** a `newsapi.org/v2/...` con distintos topics/keywords sobre dólar y economía argentina.
3. **Merge + Split Out + Sort + Limit** — une, desanida, ordena, limita.
4. **Message a model (Gemini)** — enriquece cada artículo.
5. **Code in JavaScript** — normaliza al esquema de `posts`.
6. **Merge + Create row** — escribe en Supabase.

Si el pipeline falla, las noticias quedan desactualizadas pero el resto de la app funciona normal.

## SEO (crítico)

Structured data JSON-LD activos:
- **`FinancialQuote`** en `page.tsx` — inyecta precios actuales en `<title>` y structured data dinámicamente.
- **`FAQPage`** en `app/components/preguntas-frecuentes.tsx` — 10 preguntas, genera rich snippets.

Otros archivos SEO: `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/opengraph-image.tsx`.

`next.config.ts` permite imágenes remotas de cualquier dominio HTTPS (`hostname: '**'`).

## Variables de entorno

Requeridas en `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
RESEND_API_KEY=...        # Resend (formulario de contacto)
CONTACT_EMAIL=...         # Destino de los mensajes del formulario
```
