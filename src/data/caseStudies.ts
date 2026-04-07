import type { CaseStudy } from "@/types";

/* ─── Casos de Éxito reales — Nova Measurement Colombia ─────── */
/* Imágenes: copiar a /public/images/cases/                       */
export const caseStudies: CaseStudy[] = [
  {
    slug: "termovalle-fuel-oil-54in",
    client: "Termovalle",
    title: "Medición de fuel oil en tubería de 54\" para generación de energía",
    application: "Caudal de fuel oil",
    fluid: "Fuel oil",
    diameter: '54"',
    technology: "flexim",
    sector: "energia",
    location: "Valle del Cauca, Colombia",
    year: 2024,
    image: "/images/cases/termovalle.jpg",
    summary:
      "Instalación de caudalímetro Flexim clamp-on en tubería de 54 pulgadas de fuel oil que alimenta turbinas de generación eléctrica. La instalación se realizó sin detener la planta ni interrumpir el suministro de combustible.",
    highlights: [
      "Instalado sin detener la turbina ni interrumpir la generación",
      "Diámetro excepcional de 54\" — fuera del alcance de tecnologías convencionales",
      "Medición estable en fluido viscoso a temperatura elevada",
      "Eliminación de mantenimiento preventivo de medidores mecánicos",
    ],
  },
  {
    slug: "geopark-crudo-gas-colombia",
    client: "Geopark",
    title: "Medición de crudo y gas natural en campo petrolero",
    application: "Caudal de crudo y gas",
    fluid: "Crudo liviano / Gas natural",
    diameter: '4" — 6"',
    technology: "flexim",
    sector: "oil-gas",
    location: "Llanos Orientales, Colombia",
    year: 2025,
    image: "/images/cases/geopark.jpg",
    summary:
      "Instalación de múltiples puntos de medición ultrasónica clamp-on en líneas de producción activas. El enfoque no intrusivo permitió comisionar los instrumentos sin parar los pozos ni purgar las líneas.",
    highlights: [
      "Múltiples puntos de medición instalados simultáneamente en campo",
      "Cero tiempo de parada en pozos de producción activos",
      "Medición confiable en crudo con variación de viscosidad",
      "Soporte técnico in-situ durante toda la comisión",
    ],
  },
  {
    slug: "perenco-gas-natural-colombia",
    client: "Perenco Colombia",
    title: "Medición de gas natural y gas a tea en líneas de producción",
    application: "Caudal de gas",
    fluid: "Gas natural / Gas a TEA",
    diameter: '4" — 8"',
    technology: "flexim",
    sector: "oil-gas",
    location: "Putumayo, Colombia",
    year: 2024,
    image: "/images/cases/perenco.jpg",
    summary:
      "Medición no intrusiva de gas natural en líneas de producción y gas a tea (venteo) en instalaciones de Perenco Colombia. La tecnología clamp-on permitió instalación en zonas clasificadas ATEX sin interrumpir la operación.",
    highlights: [
      "Instalación en zona ATEX sin permisos de trabajo en caliente",
      "Medición bidireccional en líneas de venteo y producción",
      "Resultados verificados contra medidores fiscales existentes",
      "Reducción de costos de mantenimiento en 40% vs. medidores convencionales",
    ],
  },
  {
    slug: "gases-del-caribe-portatil",
    client: "Gases del Caribe",
    title: "Verificación de caudal con caudalímetro portátil en red de distribución",
    application: "Auditoría y verificación de caudal",
    fluid: "Gas natural",
    technology: "flexim",
    sector: "oil-gas",
    location: "Barranquilla, Colombia",
    year: 2025,
    image: "/images/cases/gases-del-caribe.jpg",
    summary:
      "Uso del caudalímetro portátil Flexim para auditoría de caudal en la red de distribución de gas natural de Gases del Caribe. El equipo portátil permitió verificar múltiples puntos de la red en un solo día sin interrupciones.",
    highlights: [
      "Verificación de 12 puntos de medición en un solo día de campo",
      "Sin paradas de suministro a usuarios finales",
      "Detección de desequilibrios de balance en la red",
      "Reporte técnico entregado en 48 horas post-medición",
    ],
  },
  {
    slug: "emcartago-generacion-energia",
    client: "EMCARTAGO",
    title: "Instrumentación y control para planta de generación de energía",
    application: "Medición de flujo y posicionamiento de válvulas",
    fluid: "Agua / Combustible",
    technology: "smar",
    sector: "energia",
    location: "Cartago, Colombia",
    year: 2025,
    image: "/images/cases/emcartago.jpg",
    summary:
      "Instalación de sistema completo de instrumentación Smar en planta de generación eléctrica: transmisores de presión diferencial, posicionadores de válvulas y sistema Foundation Fieldbus para control integrado del proceso.",
    highlights: [
      "Sistema Fieldbus Foundation completo — integración total del proceso",
      "Posicionadores FY300 en válvulas críticas de control de vapor",
      "Transmisores LD300 para medición de nivel en tanques de condensado",
      "Reducción de tiempo de puesta en marcha en 30% vs. instrumentación convencional",
    ],
  },
  {
    slug: "descafecol-extracto-cafe",
    client: "Descafecol",
    title: "Medición de concentración en extracto de café — Grados Brix",
    application: "Refractometría de proceso — Grados Brix",
    fluid: "Extracto de café",
    technology: "flexim",
    sector: "alimentos",
    location: "Cundinamarca, Colombia",
    year: 2024,
    image: "/images/cases/descafecol.jpg",
    summary:
      "Instalación de refractómetro de proceso Flexim para medición continua en línea de grados Brix en extracto de café. La tecnología no intrusiva eliminó puntos de muestreo manual y garantizó la trazabilidad del proceso productivo.",
    highlights: [
      "Medición continua en línea — eliminación de muestreo manual",
      "Precisión de ±0.1 °Brix en proceso dinámico",
      "Sin contacto con el producto — cumplimiento de normas sanitarias",
      "Integración directa con sistema de control existente (4-20 mA)",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudiesBySector(sector: string): CaseStudy[] {
  if (sector === "all") return caseStudies;
  return caseStudies.filter((c) => c.sector === sector);
}
