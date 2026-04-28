import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { CTABanner } from "@/components/sections/CTABanner";
import { RelatedCases } from "@/components/sections/RelatedCases";
import { technologies, getTechnologyBySlug } from "@/data/technologies";
import { getCaseStudiesBySector } from "@/data/caseStudies";

/* ─── Mapeo de líneas de producto con descripción corta ───────── */
const PRODUCT_LINE_META: Record<
  string,
  Record<string, { label: string; desc: string; tag: string }>
> = {
  flexim: {
    "Caudalímetros para líquidos (FLUXUS F)": {
      label: "FLUXUS F",
      desc: "Medición precisa en líquidos de cualquier viscosidad. Agua, crudo, combustibles, soluciones y más.",
      tag: "LÍQUIDOS",
    },
    "Caudalímetros para gas (FLUXUS G)": {
      label: "FLUXUS G",
      desc: "Medición ultrasónica para gas natural, gas a tea, aire comprimido y gases técnicos.",
      tag: "GASES",
    },
    "Caudalímetros para vapor (FLUXUS S)": {
      label: "FLUXUS S",
      desc: "Diseñado para vapor saturado y sobrecalentado a temperatura y presión elevadas.",
      tag: "VAPOR",
    },
    "Refractómetros de proceso (PIOX R)": {
      label: "PIOX R",
      desc: "Medición en línea de concentración, densidad y grados Brix sin contacto con el producto.",
      tag: "ANALÍTICO",
    },
    "Portátiles para verificación y auditoría": {
      label: "PORTÁTIL",
      desc: "Verificación de medidores instalados, auditorías de balance hídrico y comisionamiento.",
      tag: "PORTÁTIL",
    },
  },
  smar: {
    "Transmisores de presión diferencial (LD300/LD400)": {
      label: "LD300 / LD400",
      desc: "Transmisores de presión diferencial de alta estabilidad para medición de caudal, nivel y presión.",
      tag: "PRESIÓN",
    },
    "Transmisores de temperatura (TT300)": {
      label: "TT300",
      desc: "Transmisor de temperatura con entrada universal para termocuplas, RTD y señales mV.",
      tag: "TEMPERATURA",
    },
    "Transmisores de nivel por presión diferencial": {
      label: "NIVEL ΔP",
      desc: "Medición de nivel en tanques y recipientes mediante presión diferencial con alta confiabilidad.",
      tag: "NIVEL",
    },
    "Posicionadores de válvulas (FY300/FY400)": {
      label: "FY300 / FY400",
      desc: "Posicionadores digitales para válvulas de control. Diagnósticos avanzados y comunicación HART.",
      tag: "VÁLVULAS",
    },
    "Sistemas DFI302 — Foundation Fieldbus": {
      label: "DFI302",
      desc: "Sistema de integración Fieldbus para control de proceso distribuido. Reduce cableado en 60%.",
      tag: "FIELDBUS",
    },
  },
  uwt: {
    "Rotonivo® — nivel rotativo mecánico": {
      label: "Rotonivo®",
      desc: "Sensor de nivel tipo paleta giratoria para sólidos a granel. Robusto, simple y confiable.",
      tag: "SÓLIDOS",
    },
    "Vibranivo® — nivel por vibración": {
      label: "Vibranivo®",
      desc: "Interruptor de nivel por vibración para detección puntual en polvos, granulados y líquidos.",
      tag: "VIBRACIÓN",
    },
    "NivoBob® — plomada electrónica": {
      label: "NivoBob®",
      desc: "Medición continua de nivel en silos de gran altura mediante plomada electrónica de cable.",
      tag: "CONTINUO",
    },
    "NivoRadar® — radar de nivel sin contacto": {
      label: "NivoRadar®",
      desc: "Radar de onda guiada y libre para medición sin contacto en condiciones extremas de proceso.",
      tag: "RADAR",
    },
    "Capanivo® — nivel capacitivo": {
      label: "Capanivo®",
      desc: "Sensor capacitivo para detección de nivel en líquidos, pastas, espumas y sólidos finos.",
      tag: "CAPACITIVO",
    },
  },
};

const SECTOR_LABELS: Record<string, string> = {
  "oil-gas": "Oil & Gas",
  energia: "Generación de Energía",
  alimentos: "Alimentos & Bebidas",
  agua: "Agua & Saneamiento",
  quimica: "Química & Petroquímica",
  general: "Industrial General",
};

const BADGE_LABEL: Record<string, string> = {
  flexim: "Distribuidor Autorizado",
  smar: "Partner Exclusivo Colombia",
  uwt: "Alianza Estratégica",
};

/* ─── FAQ por tecnología ──────────────────────────────────────── */
const FAQS: Record<string, { q: string; a: string }[]> = {
  flexim: [
    {
      q: "¿Qué es la medición clamp-on?",
      a: "Es una técnica de medición de caudal que utiliza transductores ultrasónicos montados en el exterior de la tubería. Los sensores envían y reciben pulsos de sonido a través de la pared del tubo y el fluido, calculando el caudal basándose en el principio de tiempo de tránsito.",
    },
    {
      q: "¿Afecta el material de la tubería a la medición?",
      a: "Flexim funciona en tuberías de acero al carbono, acero inoxidable, PVC, HDPE, GRP y prácticamente cualquier material. El software de configuración calcula automáticamente los parámetros para cada combinación de material y diámetro.",
    },
    {
      q: "¿Cuál es el margen de error típico?",
      a: "La precisión estándar es ±1% del valor medido para líquidos. En configuraciones con múltiples trayectorias (multipath) se puede alcanzar ±0.5%. Para gases, la precisión depende del perfil de flujo y es típicamente ±2%.",
    },
    {
      q: "¿Se puede instalar en zona ATEX?",
      a: "Sí. Los equipos Flexim tienen certificación ATEX / IECEx Zona 1 y Zona 2. La instalación en zonas clasificadas no requiere permiso de trabajo en caliente ya que no se interviene la tubería.",
    },
  ],
  smar: [
    {
      q: "¿Qué es Foundation Fieldbus y por qué es relevante?",
      a: "Foundation Fieldbus es un protocolo de comunicación digital que permite conectar múltiples instrumentos en un solo cable de bus. Reduce el cableado hasta en un 60%, facilita el diagnóstico remoto y habilita el control en campo — directamente en el instrumento.",
    },
    {
      q: "¿Qué diferencia hay entre LD300 y LD400?",
      a: "El LD400 es la versión avanzada con mayor rango de presión estática, compensación de temperatura integrada y diagnósticos extendidos. El LD300 es el estándar de alta confiabilidad para la mayoría de las aplicaciones industriales.",
    },
    {
      q: "¿Los posicionadores FY incluyen diagnósticos de válvula?",
      a: "Sí. Los posicionadores FY300/FY400 incluyen diagnósticos de firma de válvula, detección de fricción, histéresis y desgaste del sello. Esto permite mantenimiento predictivo sin parar la planta.",
    },
  ],
  uwt: [
    {
      q: "¿Cuál tecnología UWT aplica para sólidos a granel?",
      a: "Para detección puntual en silos: Rotonivo® (paleta giratoria) o Vibranivo® (vibración). Para medición continua de nivel en silos altos: NivoBob® (plomada electrónica) o NivoRadar® (radar). La elección depende del tipo de sólido y la altura del silo.",
    },
    {
      q: "¿Funcionan en polvo fino o materiales adhesivos?",
      a: "Sí. El Vibranivo® está diseñado específicamente para materiales difíciles como polvos ultrafinos, productos higroscópicos y materiales que tienden a adherirse al sensor. El recubrimiento PTFE opcional elimina problemas de adherencia.",
    },
    {
      q: "¿Qué garantía ofrecen los equipos UWT?",
      a: "UWT ofrece 6 años de garantía de calidad en toda su línea de productos. Es una de las garantías más largas en la industria de medición de nivel, respaldada por su política de fabricación en Alemania.",
    },
  ],
};

/* ─── Static params ──────────────────────────────────────────── */
export function generateStaticParams() {
  return technologies.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tech = getTechnologyBySlug(slug);
  if (!tech) return {};
  return {
    title: `${tech.name} — ${tech.tagline}`,
    description: tech.description,
  };
}

/* ─── FAQ accordion (server component) ────────────────────────── */
function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  return (
    <details className="group border-b border-steel last:border-0">
      <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none hover:text-nova-blue transition-colors">
        <span className="font-display font-semibold text-text-primary text-base group-hover:text-nova-blue transition-colors">
          {q}
        </span>
        <ChevronDown
          className="w-5 h-5 text-text-muted shrink-0 transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <p className="pb-5 text-text-muted text-sm font-sans leading-relaxed">
        {a}
      </p>
    </details>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tech = getTechnologyBySlug(slug);
  if (!tech) notFound();

  const productMeta = PRODUCT_LINE_META[tech.slug] ?? {};
  const faqs = FAQS[tech.slug] ?? [];
  const badgeLabel = BADGE_LABEL[tech.slug] ?? "Alianza Estratégica";

  /* Casos de éxito relacionados (todos los sectores de esta tech) */
  const { caseStudies } = await import("@/data/caseStudies");
  const relatedCases = caseStudies
    .filter((c) => c.technology === tech.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <PageHero
        breadcrumb={[
          { label: "Tecnologías", href: "/tecnologias" },
          { label: tech.name },
        ]}
        label={tech.tagline}
        title={tech.name}
      >
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="brand">{badgeLabel}</Badge>
          {tech.industries.slice(0, 3).map((ind) => (
            <Badge key={ind} variant="sector">
              {SECTOR_LABELS[ind]}
            </Badge>
          ))}
        </div>
      </PageHero>

      {/* Descripción + features */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div>
            <Badge variant="brand" className="mb-4">
              {badgeLabel}
            </Badge>
            <h2 className="font-display font-black text-3xl text-nova-navy mb-4 leading-tight">
              ¿Por qué {tech.name}?
            </h2>
            <p className="text-text-muted text-base leading-relaxed font-sans mb-8">
              {tech.description}
            </p>
            <ul className="space-y-3">
              {tech.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-nova-blue shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-text-primary text-sm font-sans">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button href="/contacto" variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Solicitar consultoría
              </Button>
              <a
                href={tech.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-steel text-text-muted font-sans text-sm rounded hover:border-nova-blue hover:text-nova-blue transition-colors"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Descargar catálogo
              </a>
            </div>
          </div>

          {/* Logo / visual */}
          <div className="flex items-center justify-center bg-steel/30 border border-steel rounded-2xl p-16">
            <Image
              src={tech.logo}
              alt={`Logo ${tech.name}`}
              width={200}
              height={100}
              className="object-contain"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Líneas de producto */}
      <SectionWrapper bg="light">
        <SectionHeader
          label="Líneas de Producto"
          title={`Soluciones ${tech.name}`}
          subtitle="Cada línea está diseñada para una variable de proceso específica. Seleccione la que corresponde a su aplicación."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {tech.productLines.map((pl) => {
            const meta = productMeta[pl];
            return (
              <div
                key={pl}
                className="bg-white border border-steel rounded-xl p-6 hover:border-nova-blue/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-black text-xl text-nova-navy">
                    {meta?.label ?? pl}
                  </span>
                  {meta?.tag && (
                    <span className="px-2 py-0.5 bg-nova-cyan/10 border border-nova-cyan/25 text-nova-blue text-[10px] font-mono font-bold rounded tracking-widest uppercase">
                      {meta.tag}
                    </span>
                  )}
                </div>
                {meta?.desc && (
                  <p className="text-text-muted text-sm font-sans leading-relaxed">
                    {meta.desc}
                  </p>
                )}
                {!meta && (
                  <p className="text-text-muted text-sm font-sans">{pl}</p>
                )}
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Sectores de aplicación */}
      <SectionWrapper bg="white">
        <SectionHeader
          label="Sectores de Aplicación"
          title="¿En qué industria opera usted?"
          centered
        />
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {tech.industries.map((ind) => (
            <Link
              key={ind}
              href={`/soluciones/${ind}`}
              className="flex items-center gap-2 px-5 py-3 border border-steel rounded-xl text-sm font-medium font-sans text-text-primary hover:border-nova-blue hover:text-nova-blue hover:bg-nova-cyan-light transition-all"
            >
              {SECTOR_LABELS[ind]}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* Casos de éxito con esta tecnología */}
      {relatedCases.length > 0 && (
        <RelatedCases
          cases={relatedCases}
          title={`Casos de Éxito con ${tech.name}`}
          bg="light"
        />
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <SectionWrapper bg="white">
          <SectionHeader
            label="Preguntas Técnicas"
            title="FAQ — Preguntas frecuentes"
            centered
          />
          <div className="max-w-2xl mx-auto mt-6 divide-y divide-steel border border-steel rounded-xl px-6">
            {faqs.map((faq, i) => (
              <FaqItem key={i} idx={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </SectionWrapper>
      )}

      <CTABanner
        title={`¿Listo para implementar ${tech.name}?`}
        subtitle="Nuestros ingenieros evalúan su proceso y proponen la configuración óptima para su aplicación."
        primaryLabel="Solicitar consultoría"
      />
    </>
  );
}
