# CLAUDE.md

Este archivo provee instrucciones a Claude Code (claude.ai/code) para trabajar con el código de este repositorio.

## Comandos

```bash
npm run dev      # Inicia el servidor de desarrollo (localhost:3000)
npm run build    # Build de producción
npm run start    # Inicia el servidor de producción
npm run lint     # Verificación con ESLint
```

No hay suite de tests configurada.

## Qué hace la app

Tracker en tiempo real del tipo de cambio peso argentino/USD. Muestra 6 tipos de cambio (Blue, Oficial, MEP, CCL, Tarjeta, Cripto) con gráficos históricos de 30 días, una calculadora de divisas y noticias financieras. Desplegada en `dolarinfohoy.com.ar`.

## Arquitectura

**Fuentes de datos:**
- `dolarapi.com/v1/ambito/dolares` — cotizaciones en tiempo real (la página principal revalida cada 60s)
- `api.argentinadatos.com/v1/cotizaciones/dolares/{type}` — histórico de 30 días (lado cliente, caché en localStorage con TTL de 7 días)
- Tabla `posts` de Supabase — noticias/artículos (las últimas 2 se muestran en la homepage)

**Modelo de componentes:** El `page.tsx` principal es un Server Component que obtiene todos los datos y los pasa hacia abajo. Las partes interactivas (`cards.tsx`, `evolucion-dolar.tsx`, `calculator.tsx`) son Client Components.

**Archivos de servicios clave:**
- `app/services/dolar.ts` — obtiene datos de dolarapi.com, calcula spread y variación
- `app/services/getAllDolarData.ts` — orquesta la obtención de los 6 tipos de cambio
- `app/hooks/useDolarHistorico.ts` — hook cliente para datos históricos con caché en localStorage

**Sección de noticias** (`app/noticia/`): el Server Component consulta Supabase; el `[id]/page.tsx` dinámico renderiza los artículos individuales.

**Constantes:** `app/constants/dolarTypes.ts` define los 6 tipos de cambio con sus claves de API, nombres de display, descripciones y horarios de operación.

## Variables de entorno

Requeridas en `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Convenciones importantes

- El alias de path `@/*` apunta a la raíz del repositorio (ej: `@/app/services/dolar`).
- Toda la lógica de fecha/hora usa la zona horaria de Buenos Aires — usar los helpers en `app/utils/site.ts`.
- El SEO es crítico: `page.tsx` inyecta dinámicamente los precios actuales en `<title>` y en los datos estructurados JSON-LD (esquema FinancialQuote). Mantener esto sincronizado al cambiar la forma de los datos.
- El dominio de imágenes remotas `resizer.glanacion.com` está en la whitelist de `next.config.ts` para imágenes de noticias.
- Google Analytics está implementado con `<GoogleAnalytics gaId="G-6MP230WEJ1" />` en `app/layout.tsx` — no usar el campo `verification.google` de metadata para esto.
