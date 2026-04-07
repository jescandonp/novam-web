# Nova Measurement — Setup Guide

## 1. Instalar dependencias

```bash
cd novam-web
npm install
```

## 2. Configurar variables de entorno

Edita `.env.local` con tus credenciales reales:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=   ← desde sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                ← Token con write permissions
RESEND_API_KEY=                  ← desde resend.com
CONTACT_EMAIL_TO=info@novam.com.co
NEXT_PUBLIC_SITE_URL=https://www.novam.com.co
```

## 3. Crear proyecto en Sanity

```bash
npx sanity@latest init --env
```
- Selecciona "Create new project" → nombre: "Nova Measurement"
- Dataset: production
- Copia el `projectId` a `.env.local`

## 4. Agregar imágenes reales

Copia las fotos de campo a estas rutas en `/public/images/`:

### Hero
```
public/images/hero/
  hero-main.jpg          ← Termovalle 54" o Geopark (foto principal)
```

### Casos de éxito
```
public/images/cases/
  termovalle.jpg         ← Foto Termovalle fuel oil
  geopark.jpg            ← Foto Geopark crudo/gas
  perenco.jpg            ← Foto Perenco gas natural
  gases-del-caribe.jpg   ← Foto Gases del Caribe portátil
  emcartago.jpg          ← Foto EMCARTAGO
  descafecol.jpg         ← Foto Descafecol extracto café
```

### Industrias (usar fotos representativas de cada sector)
```
public/images/industries/
  oil-gas.jpg            ← Crudo ODC o Gas Natural Perenco
  energia.jpg            ← Termovalle 54"
  alimentos.jpg          ← Extracto café / Grados Brix
  agua.jpg               ← Agua de inyección
  quimica.jpg            ← Posicionador Smar Linde
```

### Logos de marcas (SVG transparente preferido)
```
public/images/logos/
  flexim.svg
  smar.svg
  uwt.svg
```

### OG Image (para redes sociales)
```
public/images/
  og-default.jpg         ← 1200x630px con logo + tagline
```

### Catálogos PDF
```
public/downloads/
  catalogo-flexim.pdf    ← Brochure FLEXIM - NOVA.pdf
  catalogo-smar.pdf      ← Brochure SMAR - NOVA.pdf
  catalogo-uwt.pdf       ← Portafolio UWT - NOVA.pdf
  guia-medicion-clamp-on.pdf  ← Crear el lead magnet
```

## 5. Ejecutar en desarrollo

```bash
npm run dev
```

- Sitio: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

## 6. Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variables de entorno en vercel.com/dashboard
# O via CLI:
vercel env add RESEND_API_KEY
vercel env add SANITY_API_TOKEN
vercel env add CONTACT_EMAIL_TO
```

## 7. Configurar Cloudflare DNS

1. Agregar sitio `novam.com.co` en Cloudflare
2. Cambiar nameservers en el registrador
3. Apuntar CNAME/A a Vercel según instrucciones de Vercel

## 8. Verificar en Google Search Console

1. Ir a search.google.com/search-console
2. Agregar propiedad `https://www.novam.com.co`
3. Verificar via archivo HTML o meta tag (Vercel lo facilita)
4. Enviar sitemap: `https://www.novam.com.co/sitemap.xml`

---

## Estructura del proyecto

```
novam-web/
├── src/
│   ├── app/                    ← Páginas (Next.js App Router)
│   │   ├── page.tsx            ← Home
│   │   ├── contacto/           ← Página de contacto
│   │   ├── api/contact/        ← API formulario de contacto
│   │   ├── api/lead-magnet/    ← API lead magnet
│   │   └── studio/             ← Sanity Studio embebido
│   ├── components/
│   │   ├── layout/             ← Navbar, Footer
│   │   ├── ui/                 ← Button, Badge, SectionWrapper, WhatsApp
│   │   └── sections/           ← Secciones de la Home
│   ├── data/                   ← Datos estáticos (antes de Sanity)
│   ├── lib/sanity/             ← Cliente y queries Sanity
│   └── types/                  ← TypeScript types
├── sanity/schemas/             ← Esquemas del CMS
├── public/images/              ← Imágenes (copiar aquí las fotos reales)
├── .env.local                  ← Variables de entorno (NO subir a git)
└── SETUP.md                    ← Este archivo
```

## Próximos pasos (Sprint 2)

- [ ] Páginas de soluciones por sector (`/soluciones/oil-gas`, etc.)
- [ ] Páginas de tecnologías (`/tecnologias/flexim`, etc.)
- [ ] Página de casos de éxito con filtros
- [ ] Detalle de cada caso de éxito
- [ ] Blog técnico
- [ ] Calculadora de ROI
- [ ] Integrar Sanity (reemplazar datos estáticos)
- [ ] sitemap.xml automático (`app/sitemap.ts`)
- [ ] robots.txt (`app/robots.ts`)
- [ ] Analytics (GA4 + MS Clarity)
