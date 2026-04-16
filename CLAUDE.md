# CLAUDE.md

Tracker en tiempo real del tipo de cambio peso argentino/USD. Next.js (App Router) con TypeScript, desplegado en `dolarinfohoy.com.ar`.

Muestra 6 cotizaciones (Blue, Oficial, MEP, CCL, Tarjeta, Cripto) con gráficos históricos de hasta 365 días, calculadora de divisas, noticias, FAQ y formulario de contacto.

## Comandos

```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

No hay suite de tests configurada.

## Reglas críticas

- **NUNCA** hardcodear colores en componentes — agregarlos primero a `app/constants/colors.ts` y consumirlos desde ahí.
- **NUNCA** usar `Date` nativo para fechas de la app — siempre los helpers de `app/utils/site.ts` (zona horaria Buenos Aires).
- **NUNCA** eliminar los security headers de `next.config.ts` (X-Frame-Options, HSTS, X-XSS-Protection, Permissions-Policy).
- **NUNCA** usar `metadata.verification.google` para Google Analytics — va con `<GoogleAnalytics gaId="G-6MP230WEJ1" />` en `app/layout.tsx`.
- **SIEMPRE** usar el alias `@/*` (apunta a la raíz del repo) en lugar de paths relativos profundos.
- **SIEMPRE** mantener sincronizado el JSON-LD `FinancialQuote` de `page.tsx` al cambiar la forma de los datos de cotizaciones — si se desincroniza se rompe el SEO.

## Arquitectura

**Modelo de componentes:** `page.tsx` es un Server Component que obtiene todos los datos y los distribuye a Client Components interactivos (cards de cotización, gráfico histórico, calculadora, FAQ, formulario de contacto).

**Fuentes de datos:**

| Fuente | Uso | Dónde |
|---|---|---|
| `dolarapi.com/v1/ambito/dolares` | Cotizaciones en tiempo real | `app/services/dolar.ts`, revalida cada 60s |
| `api.argentinadatos.com/v1/cotizaciones/dolares/{type}` | Histórico (hasta 365 días) | Cliente, caché localStorage con TTL 7 días via `app/hooks/useDolarHistorico.ts` |
| Supabase (tabla `posts`) | Noticias/artículos | Server Components en `app/noticia/` |
| Resend | Email del formulario de contacto | `POST /api/contact` |

**Decisiones no obvias:**
- El histórico se cachea en localStorage (TTL 7 días) en lugar del servidor porque los datos pasados no cambian y reduce carga en una API gratuita. El hook incluye debounce de 300ms en loading y abort signal para cleanup al desmontar.
- El revalidado de 60s solo aplica a la homepage, **no** a rutas dinámicas.
- No hay fallback si `dolarapi.com` cae — la app muestra error.

**Tipos de cambio:** los 6 tipos están definidos en `app/constants/dolarTypes.ts` con sus keys de API, nombres de display, descripciones y horarios de operación.

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

El dominio `resizer.glanacion.com` está en la whitelist de imágenes remotas de `next.config.ts`.

## Variables de entorno

Requeridas en `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
RESEND_API_KEY=...        # Resend (formulario de contacto)
CONTACT_EMAIL=...         # Destino de los mensajes del formulario
```