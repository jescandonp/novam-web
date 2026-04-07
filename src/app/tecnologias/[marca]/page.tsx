import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Download, ExternalLink, CheckCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { RelatedCases } from "@/components/sections/RelatedCases";
import { CTABanner } from "@/components/sections/CTABanner";
import { FaqSection, type FaqItem } from "@/components/sections/FaqSection";
import { technologies, getTechnologyBySlug } from "@/data/technologies";
import { caseStudies } from "@/data/caseStudies";
import { industries } from "@/data/industries";

export function generateStaticParams() {
  return technologies.map((t) => ({ marca: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ marca: string }>;
}): Promise<Metadata> {
  const { marca } = await params;
  const tech = getTechnologyBySlug(marca);
  if (!tech) return {};
  return {
    title: `${tech.name} — ${tech.tagline} | Nova Measurement Colombia`,
    description: `${tech.description.slice(0, 155)}`,
    openGraph: {
      title: `${tech.name} Colombia — Nova Measurement`,
    },
  };
}

/* ─── FAQ por tecnología ────────────────────────────────────── */
const TECH_FAQS: Record<string, FaqItem[]> = {
  flexim: [
    {
      question: "¿Qué es la medición ultrasónica clamp-on y cómo funciona?",
      answer:
        "La tecnología clamp-on utiliza transductores ultrasónicos que se instalan sobre la superficie exterior de la tubería, sin perforarla. Los transductores envían pulsos ultrasónicos a través de la pared y el fluido; la diferencia de tiempo entre los pulsos enviados a favor y en contra del flujo permite calcular la velocidad del fluido con alta precisión. El proceso no se interrumpe en ningún momento.",
    },
    {
      question: "¿En qué materiales de tubería funciona Flexim?",
      answer:
        "Acero al carbono, acero inoxidable, acero galvanizado, cobre, PVC, CPVC, PVDF, polietileno, fibra de vidrio (GRP/FRP) y concreto con revestimiento. El único requisito es que el material conduzca el ultrasonido. Para tuberías con revestimiento interior grueso (más de 10 mm), se requiere una configuración especial.",
    },
    {
      question: "¿Cuál es la precisión de un caudalímetro Flexim?",
      answer:
        "Para líquidos: ±0.5% a ±1% del valor medido, dependiendo del modelo y las condiciones. Para gas: ±1% a ±2%. Para aplicaciones de alta precisión (metrología fiscal), Flexim ofrece configuraciones multipath que alcanzan ±0.2%. Estos valores son comparables o superiores a los caudalímetros convencionales de inserción.",
    },
    {
      question: "¿Cuánto tiempo tarda la instalación de un equipo Flexim?",
      answer:
        "Una instalación estándar en una tubería accesible tarda entre 2 y 6 horas incluyendo la verificación y puesta en marcha. Para instalaciones en zonas clasificadas o de difícil acceso (tuberías elevadas, espacios confinados), el tiempo puede extenderse a 1 o 2 días. En ningún caso se requiere parar el proceso.",
    },
    {
      question: "¿Cómo se compara el costo total vs. un caudalímetro convencional?",
      answer:
        "El costo de adquisición del clamp-on puede ser superior al de un electromagnético o vortex de inserción. Sin embargo, cuando se suman los costos de parada de planta, trabajos de corte y soldadura, bridas, válvulas de aislamiento y el mantenimiento preventivo durante la vida útil, el clamp-on resulta significativamente más económico en el análisis de costo total de propiedad (TCO).",
    },
  ],
  smar: [
    {
      question: "¿Qué ventaja tiene Foundation Fieldbus sobre 4-20 mA?",
      answer:
        "Foundation Fieldbus es una red de comunicación digital que permite conectar múltiples instrumentos en un solo par de cables, reduciendo el cableado hasta en un 70%. Además, transmite información de diagnóstico en tiempo real, permite configuración remota y ofrece redundancia intrínseca. La tecnología DFI302 de Smar es una de las implementaciones más maduras del mercado.",
    },
    {
      question: "¿Cuántos años lleva Smar en el mercado y qué garantiza eso?",
      answer:
        "Smar tiene más de 50 años de operación continua en instrumentación industrial, con más de 30 patentes registradas en USA y Brasil. Esta trayectoria garantiza estabilidad de la plataforma, disponibilidad de repuestos y soporte técnico a largo plazo — un factor crítico cuando se especifica instrumentación para plantas con vida útil de 20 o 30 años.",
    },
    {
      question: "¿Nova Measurement ofrece capacitación en tecnología Smar?",
      answer:
        "Sí. Como partner exclusivo Smar en Colombia, ofrecemos el programa de capacitación PATS (Partner Authorization Training Scheme) que certifica a los ingenieros de planta en instalación, configuración y mantenimiento de los equipos Smar. La capacitación se realiza en las instalaciones del cliente o en nuestras oficinas.",
    },
    {
      question: "¿Los posicionadores FY300/FY400 son compatibles con cualquier válvula?",
      answer:
        "Sí. Los posicionadores Smar son universales — funcionan con válvulas de cualquier fabricante (rotativas o lineales) y se pueden montar en acuerdo con estándar NAMUR. Soportan protocolos HART, Foundation Fieldbus y PROFIBUS PA según el modelo.",
    },
  ],
  uwt: [
    {
      question: "¿Cuál es la diferencia entre medición de nivel puntual y continuo?",
      answer:
        "La medición puntual detecta si el material está por encima o debajo de un punto específico (usado para alarmas de máximo/mínimo o control on/off). La medición continua proporciona el nivel exacto en todo momento (usado para inventario, control de proceso o cálculo de volumen). UWT ofrece soluciones para ambos tipos.",
    },
    {
      question: "¿El Rotonivo funciona con polvos y sólidos a granel?",
      answer:
        "Sí. El Rotonivo es el estándar de la industria para detección de nivel en silos de polvos, granulados y materiales a granel como cemento, cal, carbón, granos, harinas y plásticos. Su paleta rotatoria detecta cuando el material lo bloquea, sin necesidad de calibración y sin partes electrónicas en contacto con el producto.",
    },
    {
      question: "¿El NivoRadar necesita mantenimiento?",
      answer:
        "El NivoRadar no tiene partes móviles y no tiene contacto con el producto, por lo que el mantenimiento es prácticamente nulo. La antena puede acumular polvo en ambientes muy cargados, pero una limpieza ocasional es suficiente. Los equipos UWT vienen con 6 años de garantía de fábrica.",
    },
  ],
};

/* ─── Sector labels ─────────────────────────────────────────── */
const SECTOR_LABELS: Record<string, string> = {
  "oil-gas": "Oil & Gas",
  energia: "Energía",
  alimentos: "Alimentos",
  agua: "Agua",
  quimica: "Química",
  general: "Industrial",
};

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ marca: string }>;
}) {
  const { marca } = await params;
  const tech = getTechnologyBySlug(marca);
  if (!tech) notFound();

  const relatedCases = caseStudies.filter((c) => c.technology === marca);
  const faqs = TECH_FAQS[marca] ?? [];
  const servedIndustries = industries.filter((i) =>
    tech.industries.includes(i.slug)
  );

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tech.name,
    description: tech.description,
    brand: { "@type": "Brand", name: tech.name },
    offers: {
      "@type": "Offer",
      seller: { "@type": "Organization", name: "Nova Measurement SAS" },
      areaServed: "CO",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero */}
      <PageHero
        breadcrumb={[
          { label: "Tecnologías", href: "/tecnologias" },
          { label: tech.name },
        ]}
        label="Tecnología"
        title={tech.name}
        subtitle={tech.tagline}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="brand" className="text-xs">
            {marca === "smar"
              ? "Partner exclusivo Colombia"
              : marca === "flexim"
              ? "Distribuidor autorizado"
              : "Alianza estratégica"}
          </Badge>
          <a
            href={tech.brochureUrl}
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-nova-cyan transition-colors font-sans"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            Descargar catálogo
          </a>
        </div>
      </PageHero>

      {/* Descripción + Características */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Descripción */}
          <div>
            <SectionHeader label="Acerca de" title={`¿Por qué ${tech.name}?`} />
            <p className="text-text-muted text-base leading-relaxed font-sans mb-8">
              {tech.description}
            </p>
            <ul className="space-y-3">
              {tech.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle
                    className="w-5 h-5 text-success shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-text-primary text-sm font-sans">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contacto" size="md">
                Solicitar cotización
              </Button>
              <a
                href={tech.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border-2 border-steel-dark text-text-muted rounded text-sm font-bold font-display uppercase tracking-wide hover:border-nova-blue hover:text-nova-blue transition-colors"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Catálogo PDF
              </a>
            </div>
          </div>

          {/* Líneas de producto */}
          <div>
            <SectionHeader label="Portafolio" title="Líneas de producto" />
            <ul className="space-y-3">
              {tech.productLines.map((pl, i) => (
                <li
                  key={pl}
                  className="flex items-start gap-4 p-4 bg-steel/30 rounded-xl border border-steel hover:border-nova-blue/30 transition-colors"
                >
                  <span
                    className="w-7 h-7 rounded-full bg-nova-blue text-white flex items-center justify-center text-xs font-bold font-mono shrink-0"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-text-primary text-sm font-sans leading-snug pt-0.5">
                    {pl}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Industrias servidas */}
      <SectionWrapper bg="dark" pattern>
        <SectionHeader
          label="Sectores"
          title={`¿Dónde aplicamos ${tech.name}?`}
          light
          centered
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {servedIndustries.map((ind) => (
            <a
              key={ind.slug}
              href={`/soluciones/${ind.slug}`}
              className="group flex flex-col items-center text-center p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-nova-cyan/40 transition-all"
            >
              <span className="font-display font-bold text-white text-sm group-hover:text-nova-cyan transition-colors leading-tight">
                {ind.name}
              </span>
              <span className="mt-2 text-xs text-white/40 font-sans">
                {ind.applications.length} aplicaciones
              </span>
            </a>
          ))}
        </div>
      </SectionWrapper>

      {/* Casos relacionados */}
      {relatedCases.length > 0 && (
        <RelatedCases
          cases={relatedCases}
          title={`Instalaciones con ${tech.name} en Colombia`}
          label="Proyectos ejecutados"
        />
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <FaqSection
          items={faqs}
          title={`Preguntas frecuentes — ${tech.name}`}
          label="FAQ técnico"
        />
      )}

      {/* CTA */}
      <CTABanner
        title={`¿Listo para implementar ${tech.name} en su planta?`}
        subtitle="Cuéntenos el proceso y las condiciones — le proponemos la configuración exacta para su aplicación."
      />
    </>
  );
}
