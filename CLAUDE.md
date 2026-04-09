# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

No test suite is configured.

## What This App Does

Real-time Argentine peso/USD exchange rate tracker. Displays 6 rate types (Blue, Oficial, MEP, CCL, Tarjeta, Cripto) with 30-day historical charts, a currency calculator, and financial news. Deployed at `dolarinfohoy.com.ar`.

## Architecture

**Data sources:**
- `dolarapi.com/v1/ambito/dolares` — live exchange rates (main page revalidates every 60s)
- `api.argentinadatos.com/v1/cotizaciones/dolares/{type}` — 30-day historical (client-side, localStorage cache with 7-day TTL)
- Supabase `posts` table — news/articles (last 2 shown on homepage)

**Component model:** Main `page.tsx` is a server component that fetches all rate data and passes it down. Interactive pieces (`cards.tsx`, `evolucion-dolar.tsx`, `calculator.tsx`) are client components.

**Key service files:**
- `app/services/dolar.ts` — fetches from dolarapi.com, calculates spread and variation
- `app/services/getAllDolarData.ts` — orchestrates fetching all 6 exchange types
- `app/hooks/useDolarHistorico.ts` — client hook for historical data with localStorage caching

**News section** (`app/noticia/`): server component queries Supabase; dynamic `[id]/page.tsx` renders individual articles.

**Constants:** `app/constants/dolarTypes.ts` defines the 6 exchange rate types with their API keys, display names, descriptions, and operating hours.

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Notable Conventions

- Path alias `@/*` maps to the repo root (e.g., `@/app/services/dolar`).
- All date/time logic uses Buenos Aires timezone — use helpers in `app/utils/site.ts`.
- SEO is critical: `page.tsx` dynamically injects current prices into `<title>` and JSON-LD structured data (FinancialQuote schema). Keep this in sync when changing data shapes.
- Remote image domain `resizer.glanacion.com` is whitelisted in `next.config.ts` for news images.
