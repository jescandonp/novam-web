import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { RelatedCases } from "@/components/sections/RelatedCases";
import { CTABanner } from "@/components/sections/CTABanner";
import { FaqSection, type FaqItem } from "@/components/sections/FaqSection";
import { Button } from "@/components/ui/Button";
import { industries, getIndustryBySlug } from "@/data/industries";
import { technologies } from "@/data/technologies";
import { getCaseStudiesBySector } from "@/data/caseStudies";
import { CheckCircle, ShieldCheck, Zap, Wrench } from "lucide-react";

/* ─── Static params (ISR) ───────────────────────────────────── */
export function generateStaticParams() {
  return industries.map((i) => ({ sector: i.slug }));
}

/* ─── Metadata dinámica ─────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>;
}): Promise<Metadata> {
  const { sector } = await params;
  const industry = getIndustryBySlug(sector);
  if (!industry) return {};

  return {
    title: `Medición Industrial para ${industry.name} en Colombia`,
    description: `Soluciones de medición no intrusiva y automatización para ${industry.name.toLowerCase()} en Colombia. Tecnología Flexim, Smar y UWT con soporte técnico local. ${industry.applications.slice(0, 2).join(", ")}.`,
    openGraph: {
      title: `${industry.name} — Soluciones de Medición | Nova Measurement`,
      images: [{ url: industry.image, width: 1200, height: 630 }],
    },
  };
}

/* ─── FAQ por sector ────────────────────────────────────────── */
const SECTOR_FAQS: Record<string, FaqItem[]> = {
  "oil-gas": [
    {
      question: "¿Cómo se mide caudal de crudo sin detener la producción?",
      answer:
        "Con la tecnología clamp-on de Flexim, los sensores ultrasónicos se instalan sobre la tubería existente desde el exterior, sin perforar ni purgar la línea. El proceso sigue operando a plena presión y temperatura durante la instalación, que típicamente tarda entre 2 y 4 horas por punto de medición.",
    },
    {
      question: "¿La medición clamp-on es válida para medición fiscal de gas?",
      answer:
        "Sí. La tecnología Flexim está certificada bajo normas API 5.8 y AGA-9 para medición de gas natural. Para medición fiscal, se requiere una calibración y configuración específica que Nova Measurement ejecuta con trazabilidad a patrones nacionales e internacionales.",
    },
    {
      question: "¿Funciona en zonas ATEX con atmósferas explosivas?",
      answer:
        "Sí. Los equipos Flexim tienen certificaciones ATEX e IECEx para instalación en zonas clasificadas 0, 1 y 2 (gases) y zonas 20, 21 y 22 (polvos). Nova Measurement gestiona los permisos de trabajo y la ingeniería de detalle para instalaciones en zonas clasificadas.",
    },
    {
      question: "¿Puede medir en tuberías de gran diámetro como las de transmisión?",
      answer:
        "Sí. Flexim tiene experiencia en tuberías de hasta 120\" (3 metros) de diámetro. Hemos ejecutado instalaciones en Colombia en tuberías de hasta 54\" para turbinas de generación. El principio de medición no depende del diámetro — la señal ultrasónica atraviesa la pared de la tubería independientemente de su tamaño.",
    },
    {
      question: "¿Qué fluidos de O&G puede medir la tecnología clamp-on?",
      answer:
        "Crudo liviano y pesado, gas natural, gas a tea (venteo), agua de inyección, agua de producción, diluyente, fuel oil, gas combustible para turbinas y mezclas multifásicas. Para fluidos con alto contenido de gas libre (GVF > 5%) se recomienda una consultoría técnica específica.",
    },
  ],
  energia: [
    {
      question: "¿Cómo se mide fuel oil para turbinas sin parar la generación?",
      answer:
        "Los sensores clamp-on se instalan sobre la línea de combustible activa. Para fuel oil, se utilizan transductores de alta temperatura con acoplante especial que garantiza la transmisión ultrasónica en fluidos viscosos. La instalación no requiere ni una hora de interrupción y la generación continúa sin afectación.",
    },
    {
      question: "¿Sirve la tecnología Smar para control de turbinas de vapor?",
      answer:
        "Sí. Smar ofrece transmisores de presión diferencial LD300/LD400 y posicionadores FY300/FY400 certificados para ambientes de alta temperatura y vapor. Con tecnología Foundation Fieldbus DFI302, se integra completamente al sistema de control de la planta sin inversión en nuevo cableado.",
    },
    {
      question: "¿Cómo se mide energía térmica (BTU) con Flexim?",
      answer:
        "El cálculo de energía térmica requiere la medición combinada de caudal másico y diferencial de temperatura. Flexim integra los transductores de temperatura directamente al transmisor del caudalímetro, calculando energía térmica en tiempo real con salida en BTU/h, kW, kcal/h o GJ/h.",
    },
  ],
  alimentos: [
    {
      question: "¿La medición clamp-on cumple normas sanitarias para alimentos?",
      answer:
        "Sí. Al no haber contacto entre el sensor y el producto, la tecnología clamp-on elimina puntos de posible contaminación cruzada y facilita el cumplimiento de normas HACCP, FDA 21 CFR y 3-A Sanitary Standards. No requiere CIP (Clean-In-Place) del sensor, lo que reduce tiempos de limpieza.",
    },
    {
      question: "¿Puedo medir grados Brix en extracto de café con Flexim?",
      answer:
        "Sí. El refractómetro de proceso PIOX R de Flexim mide concentración en línea (grados Brix, °GL, densidad relativa, entre otros) con precisión de ±0.1 °Brix sin contacto con el producto. Hemos instalado este sistema en plantas de café soluble y extracto líquido en Colombia con excelentes resultados.",
    },
    {
      question: "¿Funciona en fluidos con partículas sólidas como pulpas?",
      answer:
        "La tecnología ultrasónica clamp-on funciona bien en fluidos con sólidos en suspensión siempre que el contenido no supere el 2-3% en volumen. Para pulpas más densas, se recomienda el modo de medición cross-correlation de Flexim, diseñado específicamente para fluidos heterogéneos.",
    },
  ],
  agua: [
    {
      question: "¿Es más económico un clamp-on que un electromagnético para agua?",
      answer:
        "En redes de agua existentes, el clamp-on es significativamente más económico porque elimina la parada de línea, el vaciado, el corte y las nuevas bridas. Para líneas nuevas, el electromagnético puede ser competitivo en costos iniciales, pero el clamp-on sigue siendo superior en flexibilidad y cero mantenimiento de partes húmedas.",
    },
    {
      question: "¿Cómo se hace un balance hídrico con equipos portátiles?",
      answer:
        "El caudalímetro portátil Flexim permite verificar múltiples puntos de la red en un solo día de campo sin interrupciones. Se instala, se toma la medición, se documenta y se traslada al siguiente punto. Entregamos un informe técnico con los caudales medidos y la detección de puntos de desequilibrio.",
    },
  ],
  quimica: [
    {
      question: "¿Puede el clamp-on medir fluidos corrosivos como ácidos?",
      answer:
        "Es precisamente una de las mayores ventajas. Al no tener contacto con el fluido, los sensores no se corroen ni contaminan el proceso. Para tuberías de plástico (PVC, CPVC, PVDF) usadas frecuentemente con ácidos, Flexim tiene configuraciones específicas que compensan la atenuación de la señal en materiales poliméricos.",
    },
    {
      question: "¿Qué instrumentación Smar es adecuada para procesos petroquímicos?",
      answer:
        "Smar ofrece transmisores LD300 para presión diferencial con certificaciones para gases tóxicos e inflamables, posicionadores FY300 para válvulas de control en fluidos agresivos, y el sistema DFI302 Foundation Fieldbus para integración con sistemas DCS. Todos los equipos son certificados ATEX/IECEx.",
    },
  ],
};

/* ─── Ventajas por sector ───────────────────────────────────── */
const ADVANTAGES = [
  {
    icon: <ShieldCheck className="w-6 h-6" aria-hidden="true" />,
    title: "Sin riesgo operativo",
    desc: "Instalación sin perforación ni contacto con el fluido. Cero riesgo de fuga o contaminación.",
  },
  {
    icon: <Zap className="w-6 h-6" aria-hidden="true" />,
    title: "Sin parada de proceso",
    desc: "Comisione nuevos puntos de medición con el proceso activo, a plena presión y temperatura.",
  },
  {
    icon: <Wrench className="w-6 h-6" aria-hidden="true" />,
    title: "Cero mantenimiento de partes húmedas",
    desc: "Sin piezas en contacto con el fluido que desgastar, limpiar ni reemplazar.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" aria-hidden="true" />,
    title: "Certificaciones internacionales",
    desc: "ATEX, IECEx, API, AGA, FDA según la industria. Cumplimiento normativo garantizado.",
  },
];

/* ─── Página ────────────────────────────────────────────────── */
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const industry = getIndustryBySlug(sector);
  if (!industry) notFound();

  const relatedCases = getCaseStudiesBySector(sector);
  const faqs = SECTOR_FAQS[sector] ?? SECTOR_FAQS["oil-gas"];

  const sectorTechs = technologies.filter((t) =>
    industry.technologies.includes(t.slug)
  );

  /* Schema Service */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Medición industrial para ${industry.name}`,
    provider: {
      "@type": "Organization",
      name: "Nova Measurement SAS",
    },
    serviceType: "Instrumentación industrial",
    areaServed: "Colombia",
    description: industry.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <PageHero
        breadcrumb={[
          { label: "Soluciones", href: "/soluciones" },
          { label: industry.name },
        ]}
        label={`Soluciones · ${industry.name}`}
        title={`Medición industrial para ${industry.name}`}
        subtitle={industry.description}
        image={industry.image}
        imageAlt={`Instalación de medición Nova Measurement en sector ${industry.name}`}
      >
        <div className="flex flex-wrap gap-2">
          {sectorTechs.map((t) => (
            <Badge key={t.slug} variant="brand">
              {t.name}
            </Badge>
          ))}
        </div>
      </PageHero>

      {/* Aplicaciones */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <SectionHeader
              label="Aplicaciones"
              title="¿Qué medimos en su planta?"
            />
            <ul className="space-y-4">
              {industry.applications.map((app) => (
                <li key={app} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full bg-nova-cyan shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-text-primary font-sans">{app}</span>
                </li>
              ))}
            </ul>

            {industry.clients.length > 0 && (
              <div className="mt-10">
                <p className="label-tech text-text-muted mb-3">
                  Clientes en este sector
                </p>
                <div className="flex flex-wrap gap-2">
                  {industry.clients.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1.5 bg-steel/60 text-text-muted text-sm font-medium rounded-full font-sans"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Ventajas */}
          <div>
            <SectionHeader
              label="Ventajas clave"
              title="Por qué elegir medición no intrusiva"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ADVANTAGES.map((adv) => (
                <div
                  key={adv.title}
                  className="p-5 bg-nova-cyan-light border border-nova-cyan/20 rounded-xl"
                >
                  <div className="w-10 h-10 bg-nova-blue/10 rounded-lg flex items-center justify-center text-nova-blue mb-3">
                    {adv.icon}
                  </div>
                  <h3 className="font-display font-bold text-sm text-text-primary mb-1">
                    {adv.title}
                  </h3>
                  <p className="text-text-muted text-xs leading-relaxed font-sans">
                    {adv.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Tecnologías para este sector */}
      <SectionWrapper bg="dark" pattern>
        <SectionHeader
          label="Tecnologías disponibles"
          title="Soluciones técnicas para este sector"
          light
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectorTechs.map((tech) => (
            <div
              key={tech.slug}
              className="bg-white/5 border border-white/10 rounded-xl p-7 hover:bg-white/10 hover:border-nova-cyan/30 transition-all"
            >
              <h3 className="font-display font-black text-2xl text-white mb-1">
                {tech.name}
              </h3>
              <p className="label-tech text-nova-cyan mb-4">{tech.tagline}</p>
              <p className="text-white/60 text-sm leading-relaxed font-sans mb-6">
                {tech.description}
              </p>
              <div className="flex gap-3">
                <Button href={`/tecnologias/${tech.slug}`} variant="white" size="sm">
                  Ver tecnología
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Casos relacionados */}
      {relatedCases.length > 0 && (
        <RelatedCases
          cases={relatedCases}
          title={`Proyectos ejecutados en ${industry.name}`}
          label="Casos de éxito"
          bg="light"
        />
      )}

      {/* FAQ */}
      <FaqSection
        items={faqs}
        title={`Preguntas frecuentes — ${industry.name}`}
        label="FAQ técnico"
      />

      {/* CTA */}
      <CTABanner
        title={`¿Tiene un reto de medición en ${industry.name}?`}
        subtitle="Cuéntenos el proceso, el fluido y las condiciones — le proponemos la solución correcta en 24 horas."
      />
    </>
  );
}
