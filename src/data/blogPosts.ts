export type BlogCategory =
  | "medicion-caudal"
  | "automatizacion"
  | "nivel"
  | "oil-gas"
  | "casos"
  | "normativa";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string; // ISO date string
  readingTime: number; // minutes
  image: string;
  imageAlt: string;
  author: string;
  tags: string[];
}

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  "medicion-caudal": "Medición de Caudal",
  automatizacion: "Automatización",
  nivel: "Medición de Nivel",
  "oil-gas": "Oil & Gas",
  casos: "Casos de Éxito",
  normativa: "Normativa",
};

export const blogPosts: BlogPost[] = [
  {
    slug: "caudalimetro-clamp-on-vs-electromagnetico",
    title: "Caudalímetro clamp-on vs. electromagnético: ¿Cuándo usar cada uno?",
    excerpt:
      "Comparativa técnica completa: precisión, costo total de propiedad, facilidad de instalación y casos donde cada tecnología gana. Con ejemplos reales de la industria colombiana.",
    category: "medicion-caudal",
    publishedAt: "2025-03-15",
    readingTime: 8,
    image: "/images/blog/clamp-on-vs-electromagnetico.jpg",
    imageAlt: "Comparativa de caudalímetros clamp-on y electromagnético en tubería industrial",
    author: "Equipo Técnico Nova Measurement",
    tags: ["Flexim", "caudalímetro", "clamp-on", "electromagnético"],
  },
  {
    slug: "medicion-fiscal-gas-natural-colombia",
    title: "Medición fiscal de gas natural en Colombia: API 5.8 y AGA-9 con tecnología clamp-on",
    excerpt:
      "Guía práctica para cumplir los requisitos de medición fiscal de gas natural según normativa colombiana e internacional. Qué certifica Flexim y cómo Nova Measurement ejecuta la instalación.",
    category: "normativa",
    publishedAt: "2025-02-28",
    readingTime: 10,
    image: "/images/blog/medicion-fiscal-gas.jpg",
    imageAlt: "Instalación de medición fiscal de gas natural con caudalímetro Flexim",
    author: "Equipo Técnico Nova Measurement",
    tags: ["Flexim", "gas natural", "medición fiscal", "API 5.8", "AGA-9"],
  },
  {
    slug: "foundation-fieldbus-vs-hart-diferencias",
    title: "Foundation Fieldbus vs. HART: ¿Cuál protocolo elegir para su planta?",
    excerpt:
      "Análisis técnico de los dos protocolos de comunicación industrial más usados en Colombia. Ventajas del Foundation Fieldbus DFI302 de Smar y cuándo el HART sigue siendo la opción correcta.",
    category: "automatizacion",
    publishedAt: "2025-02-10",
    readingTime: 7,
    image: "/images/blog/fieldbus-vs-hart.jpg",
    imageAlt: "Sistema de control DCS con instrumentación Foundation Fieldbus Smar",
    author: "Equipo Técnico Nova Measurement",
    tags: ["Smar", "Foundation Fieldbus", "HART", "DFI302", "automatización"],
  },
  {
    slug: "medicion-nivel-solidos-silos-industria",
    title: "Medición de nivel en silos: Rotonivo vs. NivoRadar vs. NivoBow",
    excerpt:
      "Cómo elegir la tecnología correcta para medir nivel en silos de cemento, carbón, granos y polvos industriales. Criterios de selección con ejemplos de aplicación en Colombia.",
    category: "nivel",
    publishedAt: "2025-01-20",
    readingTime: 6,
    image: "/images/blog/medicion-nivel-silos.jpg",
    imageAlt: "Sensor de nivel Rotonivo UWT instalado en silo industrial",
    author: "Equipo Técnico Nova Measurement",
    tags: ["UWT", "Rotonivo", "NivoRadar", "nivel", "silos"],
  },
  {
    slug: "roi-caudalimetro-ultrasónico-planta-industrial",
    title: "¿Cuánto ahorra realmente un caudalímetro ultrasónico? ROI real en plantas colombianas",
    excerpt:
      "Tres casos reales con datos: cuánto costó la instalación, cuánto ahorró en paradas de planta, mantenimiento y pérdidas de producto. Calculadora incluida.",
    category: "casos",
    publishedAt: "2025-01-05",
    readingTime: 9,
    image: "/images/blog/roi-caudalimetro.jpg",
    imageAlt: "Gráfica de retorno de inversión de caudalímetro clamp-on Flexim",
    author: "Equipo Técnico Nova Measurement",
    tags: ["ROI", "Flexim", "Oil & Gas", "ahorro operativo"],
  },
  {
    slug: "instalacion-flexim-zona-atex-refineria",
    title: "Instalación Flexim en zona ATEX: procedimiento seguro en refinerías y plantas petroquímicas",
    excerpt:
      "Paso a paso del proceso de instalación de un caudalímetro clamp-on en zonas clasificadas Zona 1 y Zona 2, incluyendo gestión de permisos de trabajo y certificaciones requeridas en Colombia.",
    category: "oil-gas",
    publishedAt: "2024-12-12",
    readingTime: 11,
    image: "/images/blog/flexim-zona-atex.jpg",
    imageAlt: "Técnico instalando sensor Flexim en tubería de refinería con zona ATEX",
    author: "Equipo Técnico Nova Measurement",
    tags: ["Flexim", "ATEX", "Oil & Gas", "refinería", "petroquímica"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}
