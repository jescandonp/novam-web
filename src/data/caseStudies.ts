import type { CaseStudy } from "@/types";

/* ─── Casos de Éxito — Nova Measurement Colombia ────────────── */
/* Clientes anonimizados por política de confidencialidad.        */
/* Los datos técnicos (fluido, diámetro, sector, ubicación)       */
/* son reales y verificables.                                     */
export const caseStudies: CaseStudy[] = [
  {
    slug: "generadora-fuel-oil-54in-valle",
    client: "Empresa Generadora · Valle del Cauca",
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
      "Instalación de caudalímetro Flexim clamp-on en tubería de 54 pulgadas de fuel oil que alimenta turbinas de generación eléctrica en el suroccidente colombiano. La instalación se realizó sin detener la planta ni interrumpir el suministro de combustible.",
    highlights: [
      "Instalado sin detener la turbina ni interrumpir la generación",
      "Diámetro de 54\" — fuera del alcance de tecnologías convencionales",
      "Medición estable en fluido viscoso a temperatura elevada",
      "Eliminación del mantenimiento preventivo de medidores mecánicos",
    ],
  },
  {
    slug: "operador-og-crudo-gas-llanos",
    client: "Operador O&G · Llanos Orientales",
    title: "Medición de crudo y gas natural en campo petrolero activo",
    application: "Caudal de crudo y gas",
    fluid: "Crudo liviano / Gas natural",
    diameter: '4" — 6"',
    technology: "flexim",
    sector: "oil-gas",
    location: "Llanos Orientales, Colombia",
    year: 2025,
    image: "/images/cases/geopark.jpg",
    summary:
      "Instalación de múltiples puntos de medición ultrasónica clamp-on en líneas de producción activas en los Llanos Orientales. El enfoque no intrusivo permitió comisionar los instrumentos sin parar los pozos ni purgar las líneas.",
    highlights: [
      "Múltiples puntos de medición instalados simultáneamente en campo",
      "Cero tiempo de parada en pozos de producción activos",
      "Medición confiable en crudo con variación de viscosidad",
      "Soporte técnico in-situ durante toda la comisión",
    ],
  },
  {
    slug: "operador-og-gas-natural-putumayo",
    client: "Operador O&G · Putumayo",
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
      "Medición no intrusiva de gas natural en líneas de producción y gas a tea (venteo) en campo del Putumayo. La tecnología clamp-on permitió la instalación en zonas clasificadas ATEX sin interrumpir la operación en ningún momento.",
    highlights: [
      "Instalación en zona ATEX sin permisos de trabajo en caliente",
      "Medición bidireccional en líneas de venteo y producción",
      "Resultados verificados contra medidores fiscales existentes",
      "Reducción de costos de mantenimiento del 40% vs. medidores convencionales",
    ],
  },
  {
    slug: "distribuidora-gas-auditoria-costa",
    client: "Distribuidora de Gas · Costa Atlántica",
    title: "Auditoría de balance hídrico en red de distribución de gas natural",
    application: "Auditoría y verificación de caudal",
    fluid: "Gas natural",
    technology: "flexim",
    sector: "oil-gas",
    location: "Barranquilla, Colombia",
    year: 2025,
    image: "/images/cases/gases-del-caribe.jpg",
    summary:
      "Uso del caudalímetro portátil Flexim para auditoría de caudal en red de distribución de gas natural en la Costa Atlántica. El equipo portátil permitió verificar múltiples puntos de la red en un solo día de campo sin interrupciones al servicio.",
    highlights: [
      "Verificación de 12 puntos de medición en un solo día de campo",
      "Sin paradas de suministro a usuarios finales durante la auditoría",
      "Detección de desequilibrios de balance en la red de distribución",
      "Reporte técnico entregado 48 horas post-medición",
    ],
  },
  {
    slug: "generadora-instrumentacion-eje-cafetero",
    client: "Empresa Generadora · Eje Cafetero",
    title: "Instrumentación y control completo para planta de generación eléctrica",
    application: "Medición de flujo y posicionamiento de válvulas",
    fluid: "Agua / Combustible",
    technology: "smar",
    sector: "energia",
    location: "Cartago, Colombia",
    year: 2025,
    image: "/images/cases/emcartago.jpg",
    summary:
      "Instalación de sistema completo de instrumentación Smar en planta de generación eléctrica del Eje Cafetero: transmisores de presión diferencial, posicionadores de válvulas y sistema Foundation Fieldbus para control integrado del proceso.",
    highlights: [
      "Sistema Foundation Fieldbus completo — integración total del proceso",
      "Posicionadores FY300 en válvulas críticas de control de vapor",
      "Transmisores LD300 para medición de nivel en tanques de condensado",
      "Reducción del tiempo de puesta en marcha en 30% vs. instrumentación convencional",
    ],
  },
  {
    slug: "productor-alimentos-grados-brix-cundinamarca",
    client: "Productor de Alimentos · Cundinamarca",
    title: "Medición en línea de concentración (Grados Brix) en extracto de café",
    application: "Refractometría de proceso — Grados Brix",
    fluid: "Extracto de café",
    technology: "flexim",
    sector: "alimentos",
    location: "Cundinamarca, Colombia",
    year: 2024,
    image: "/images/cases/descafecol.jpg",
    summary:
      "Instalación de refractómetro de proceso Flexim PIOX R para medición continua en línea de grados Brix en extracto de café. La tecnología no intrusiva eliminó los puntos de muestreo manual y garantizó la trazabilidad del proceso productivo.",
    highlights: [
      "Medición continua en línea — eliminación del muestreo manual",
      "Precisión de ±