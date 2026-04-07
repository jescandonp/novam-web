import type { Technology } from "@/types";

export const technologies: Technology[] = [
  {
    slug: "flexim",
    name: "Flexim",
    tagline: "Medición no intrusiva clamp-on",
    description:
      "Pionero mundial en medición ultrasónica no intrusiva. Los sensores clamp-on se instalan sobre la tubería existente sin perforar, sin contacto con el fluido y sin detener el proceso. Distribuidor autorizado en Colombia.",
    logo: "/images/logos/flexim.svg",
    accentColor: "#0056B3",
    features: [
      "Sin perforación ni contacto con el fluido",
      "Sin interrupción del proceso en instalación",
      "Independiente del material y diámetro de tubería",
      "Certificaciones ATEX / IECEx para zonas clasificadas",
      "+30 años de innovación continua | +150 países",
    ],
    productLines: [
      "Caudalímetros para líquidos (FLUXUS F)",
      "Caudalímetros para gas (FLUXUS G)",
      "Caudalímetros para vapor (FLUXUS S)",
      "Refractómetros de proceso (PIOX R)",
      "Portátiles para verificación y auditoría",
    ],
    industries: ["oil-gas", "energia", "alimentos", "agua", "quimica"],
    brochureUrl: "/downloads/catalogo-flexim.pdf",
  },
  {
    slug: "smar",
    name: "Smar",
    tagline: "Instrumentación y control de procesos",
    description:
      "Empresa brasileña con más de 50 años de innovación en automatización industrial. Nova Measurement es el distribuidor exclusivo de Smar en Colombia. Soluciones completas en transmisores, posicionadores y sistemas Fieldbus.",
    logo: "/images/logos/smar.svg",
    accentColor: "#0056B3",
    features: [
      "Partner exclusivo Smar en Colombia — más de 6 años",
      "+30 patentes registradas (USA + Brasil)",
      "Certificación ISO 9001",
      "Tecnología O-PAS™ y Foundation Fieldbus",
      "Capacitación PATS incluida con cada proyecto",
    ],
    productLines: [
      "Transmisores de presión diferencial (LD300/LD400)",
      "Transmisores de temperatura (TT300)",
      "Transmisores de nivel por presión diferencial",
      "Posicionadores de válvulas (FY300/FY400)",
      "Sistemas DFI302 — Foundation Fieldbus",
    ],
    industries: ["oil-gas", "energia", "alimentos", "agua", "quimica"],
    brochureUrl: "/downloads/catalogo-smar.pdf",
  },
  {
    slug: "uwt",
    name: "UWT",
    tagline: "Medición de nivel industrial",
    description:
      "Tecnología alemana líder en medición de nivel para silos, tanques y procesos industriales. Alianza estratégica con Nova Measurement para traer las soluciones UWT a la industria colombiana.",
    logo: "/images/logos/uwt.svg",
    accentColor: "#0056B3",
    features: [
      "6 años de garantía de calidad",
      "Presencia en más de 90 países",
      "200+ expertos en nivel industrial",
      "Soluciones para sólidos, líquidos, pastas y espumas",
      "Tecnología radar, vibración, capacitiva y mecánica",
    ],
    productLines: [
      "Rotonivo® — nivel rotativo mecánico",
      "Vibranivo® — nivel por vibración",
      "NivoBob® — plomada electrónica",
      "NivoRadar® — radar de nivel sin contacto",
      "Capanivo® — nivel capacitivo",
    ],
    industries: ["alimentos", "quimica", "general"],
    brochureUrl: "/downloads/catalogo-uwt.pdf",
  },
];

export function getTechnologyBySlug(slug: string): Technology | undefined {
  return technologies.find((t) => t.slug === slug);
}
