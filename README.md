# 💵 DolarInfoHoy

Sitio de cotizaciones del dólar en tiempo real para Argentina. Muestra 6 tipos de cambio con gráficos históricos, calculadora de divisas y noticias financieras automatizadas.

[Ver sitio web](https://dolarinfohoy.com.ar)

---

## 🚀 Tecnologías utilizadas

![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/supabase-%233ECF8E.svg?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-%23EA4B71.svg?style=for-the-badge&logo=n8n&logoColor=white)

### 🛠️ Otras dependencias

- **recharts** — Gráficos de evolución histórica
- **framer-motion** — Animaciones de UI
- **embla-carousel-react** — Carrusel de noticias
- **lucide-react** — Iconografía
- **@vercel/analytics** — Métricas de uso

---

## 📰 Automatización de noticias

Las noticias financieras se publican de forma automática mediante un workflow de **n8n** programado. Obtiene artículos desde NewsAPI, los procesa con IA (Gemini) para resumirlos y formatearlos, y los guarda en Supabase desde donde la app los consume.

---

## 📡 APIs utilizadas

| API | Uso | Sitio |
|-----|-----|-------|
| **DolarApi** | Cotizaciones en tiempo real de los 6 tipos de cambio | [dolarapi.com](https://dolarapi.com) |
| **ArgentinaDatos** | Histórico de 1 año por tipo de cambio | [argentinadatos.com](https://argentinadatos.com) |
| **NewsAPI** | Fuente de noticias para el workflow de n8n | [newsapi.org](https://newsapi.org) |
| **Supabase** | Base de datos para artículos y noticias | [supabase.com](https://supabase.com) |

---

## 🌐 Despliegue y SEO

El proyecto está desplegado en **Vercel** bajo el dominio [dolarinfohoy.com.ar](https://dolarinfohoy.com.ar). El metadata, Open Graph y datos estructurados JSON-LD se generan dinámicamente con los precios actuales en cada request.
