import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    description:
      "Medición y control de procesos para la industria petrolera colombiana. Caudal sin contacto con Flexim e instrumentación de proceso completa con Smar — presión, temperatura, posición y densidad — con soporte local y stock disponible.",
    applications: [
      "Caudal de crudo en ductos activos (Flexim clamp-on)",
      "Gas natural en city gates y estaciones (Flexim)",
      "Gas a tea (venteo) y gas de proceso (Flexim)",
      "Agua de inyección en yacimientos (Flexim)",
      "Presión y temperatura en líneas de producción (Smar)",
      "Posicionadores de válvulas de control (Smar)",
      "Densidad y concentración en proceso (Flexim / Smar)",
      "Fuel oil para quemadores y turbinas (Flexim)",
    ],
    image: "/images/industries/oil-gas.jpg",
    technologies: ["flexim", "smar"],
    clients: ["Operador O&G · Llanos Orientales", "Operador O&G · Putumayo", "Operador O&G · Llanos Orientales", "Operador Nacional O&G"],
  },
  {
    slug: "energia",
    name: "Generación de Energía",
    description:
      "Turbinas que no paran. Medición que tampoco. Monitoreo continuo de combustibles, vapor y condensado para maximizar la eficiencia y disponibilidad de sus activos de generación.",
    applications: [
      "Fuel oil para turbinas de gas",
      "Vapor de proceso y condensado",
      "Agua de calderas y tratamiento",
      "Control de posicionadores en válvulas críticas",
      "Medición de energía térmica",
      "Aire comprimido para instrumentación",
    ],
    image: "/images/industries/energia.jpg",
    technologies: ["flexim", "smar"],
    clients: ["Empresa Generadora · Valle del Cauca", "Empresa Generadora · Eje Cafetero", "Empresa Generadora · Caribe", "Empresa Generadora · Meta"],
  },
  {
    slug: "alimentos",
    name: "Alimentos & Bebidas",
    description:
      "De los grados Brix al extracto de café. Precisión que protege su producto. Medición no intrusiva que cumple normas sanitarias sin interrumpir sus líneas de producción.",
    applications: [
      "Extracto de café — Grados Brix",
      "Concentración de alcohol (GL)",
      "Densidad de mieles y jarabes",
      "Caudal en líneas sanitarias CIP",
      "Nivel en tanques de proceso",
      "Temperatura de pasteurización",
    ],
    image: "/images/industries/alimentos.jpg",
    technologies: ["flexim", "smar"],
    clients: ["Productor de Alimentos · Cundinamarca", "Industria de Empaques · Nacional"],
  },
  {
    slug: "agua",
    name: "Agua & Saneamiento",
    description:
      "Redes de distribución, tratamiento y agua de proceso industrial. La tecnología clamp-on permite auditorías de balance hídrico sin intervenir las redes en operación.",
    applications: [
      "Agua de proceso industrial",
      "Redes de distribución y balance",
      "Agua desmineralizada / destilada",
      "Agua de inyección (O&G)",
      "Tratamiento y planta potabilizadora",
      "Aguas residuales industriales",
    ],
    image: "/images/industries/agua.jpg",
    technologies: ["flexim", "uwt"],
    clients: ["Operador O&G · Llanos Orientales", "Industria de Empaques · Nacional"],
  },
  {
    slug: "quimica",
    name: "Química & Petroquímica",
    description:
      "Medición en fluidos corrosivos, agresivos o a alta presión donde la instrumentación convencional es inviable o presenta riesgos. Sin contacto = sin corrosión = sin fugas.",
    applications: [
      "Solventes y productos químicos agresivos",
      "Ácidos y bases industriales",
      "Gases industriales especiales (nitrógeno, CO₂, argón)",
      "Sulfato de manganeso y sales",
      "Líneas de suministro de reactivos",
      "Control de dosificación",
    ],
    image: "/images/industries/quimica.jpg",
    technologies: ["flexim", "smar", "uwt"],
    clients: ["Empresa de Gases Industriales · Nacional", "Empresa Química · Bogotá"],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
