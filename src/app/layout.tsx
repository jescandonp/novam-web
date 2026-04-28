import type { Metadata } from "next";
import { Montserrat, Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/* ─── Fuentes (next/font — cero layout shift) ───────────────── */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});

/* ─── SEO Default Metadata ──────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.novam.com.co"
  ),
  title: {
    default: "Nova Measurement | Medición Industrial No Intrusiva en Colombia",
    template: "%s | Nova Measurement",
  },
  description:
    "Distribuidor autorizado Flexim y partner exclusivo Smar en Colombia. Caudalímetros clamp-on para Oil & Gas, energía y procesos industriales. Soporte técnico en Bogotá, Barranquilla y Bucaramanga.",
  keywords: [
    "medición no intrusiva",
    "caudalímetro clamp-on",
    "Flexim Colombia",
    "Smar Colombia",
    "instrumentación industrial",
    "medición ultrasónica",
    "oil and gas Colombia",
    "Nova Measurement",
  ],
  authors: [{ name: "Nova Measurement SAS" }],
  creator: "Nova Measurement SAS",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.novam.com.co",
    siteName: "Nova Measurement",
    title: "Nova Measurement | Medición Industrial No Intrusiva en Colombia",
    description:
      "Distribuidor técnico especializado de Flexim, Smar y UWT en Colombia. Mida sin parar.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Nova Measurement — Medición Industrial No Intrusiva",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Measurement | Mida sin parar.",
    description:
      "Caudalímetros clamp-on y soluciones de instrumentación industrial para Colombia.",
    images: ["/images/og-default.jpg"],
  },
};

/* ─── Schema.org Organization ───────────────────────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nova Measurement SAS",
  url: "https://www.novam.com.co",
  logo: {
    "@type": "ImageObject",
    url: "https://www.novam.com.co/images/logo.png",
    width: 400,
    height: 150,
  },
  description:
    "Distribuidor técnico especializado en medición industrial no intrusiva. Partner exclusivo Smar y distribuidor autorizado Flexim en Colombia.",
  telephone: "+573215354908",
  email: "info@novam.com.co",
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Barranquilla",
      addressCountry: "CO",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Bucaramanga",
      addressCountry: "CO",
    },
  ],
  areaServed: "CO",
  sameAs: ["https://www.linkedin.com/company/nova-measurement"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-CO"
      className={`${montserrat.variable} ${roboto.variable} ${robotoMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Accesibilidad WCAG 2.2 */}
        <a href="#main-content" className="skip-to-content">
          Ir al contenido principal
        </a>

        <Navbar />

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

  