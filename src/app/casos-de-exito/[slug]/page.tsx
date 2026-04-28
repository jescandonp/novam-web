import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, MapPin, Calendar, Gauge, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { RelatedCases } from "@/components/sections/RelatedCases";
import { CTABanner } from "@/components/sections/CTABanner";
import {
  caseStudies,
  getCaseStudyBySlug,
  getCaseStudiesBySector,
} from "@/data/caseStudies";
import { getTechnologyBySlug } from "@/data/technologies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — ${cs.client}`,
    description: cs.summary.slice(0, 155),
    openGraph: {
      title: `${cs.client}: ${cs.application} | Nova Measurement`,
      images: [{ url: cs.image, width: 1200, height: 630 }],
    },
  };
}

const SECTOR_LABELS: Record<string, string> = {
  "oil-gas": "Oil & Gas",
  energia: "Generación de Energía",
  alimentos: "Alimentos & Bebidas",
  agua: "Agua & Saneamiento",
  quimica: "Química & Petroquímica",
  general: "Industrial",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const tech = getTechnologyBySlug(cs.technology);
  const related = getCaseStudiesBySector(cs.sector)
    .filter((c) => c.slug !== cs.slug)
    .slice(0, 3);

  /* Schema CaseStudy */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    articleType: "CaseStudy",
    headline: cs.title,
    description: cs.summary,
    author: { "@type": "Organization", name: "Nova Measurement SAS" },
    publisher: { "@type": "Organization", name: "Nova Measurement SAS", url: "https://www.novam.com.co" },
    about: { "@type": "Product", name: tech?.name ?? cs.technology },
    locationCreated: { "@type": "Place", addressCountry: "CO", name: cs.location },
    datePublished: `${cs.year}-01-01`,
    image: `https://www.novam.com.co${cs.image}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <PageHero
        breadcrumb={[
          { label: "Casos de Éxito", href: "/casos-de-exito" },
          { label: cs.client },
        ]}
        label={`Caso de Éxito · ${SECTOR_LABELS[cs.sector]}`}
        title={cs.title}
        image={cs.image}
        imageAlt={`${cs.client} — ${cs.application}`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="sector">{SECTOR_LABELS[cs.sector]}</Badge>
          {tech && <Badge variant="brand">{tech.name}</Badge>}
        </div>
      </PageHero>

      {/* Contenido principal */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Cuerpo del caso — 2/3 */}
          <div className="lg:col-span-2 space-y-10">

            {/* Resumen */}
            <section aria-labelledby="section-resumen">
              <h2 id="section-resumen" className="heading-md text-nova-blue mb-4 label-tech">
                El Proyecto
              </h2>
              <p className="text-text-primary text-base leading-relaxed font-sans">
                {cs.summary}
              </p>
            </section>

            {/* Resultados — grid de cards */}
            <section aria-labelledby="section-resultados">
              <h2 id="section-resultados" className="heading-md text-text-primary mb-5 accent-line">
                Resultados obtenidos
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cs.highlights.map((h, i) => (
                  <li
                    key={h}
                    className="flex items-start gap-3.5 p-4 rounded-xl border border-steel bg-white hover:border-nova-blue/40 hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-nova-cyan/10 border border-nova-cyan/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-nova-blue" aria-hidden="true" />
                    </div>
                    <span className="text-text-primary text-sm font-sans leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tecnología utilizada */}
            {tech && (
              <section aria-labelledby="section-tech" className="p-6 bg-nova-cyan-light border border-nova-cyan/20 rounded-2xl">
                <h2 id="section-tech" className="label-tech text-nova-blue mb-4">
                  Tecnología utilizada
                </h2>
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-nova-blue flex items-center justify-center shrink-0">
                    <Gauge className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-text-primary mb-1">{tech.name}</h3>
                    <p className="text-text-muted text-sm font-sans mb-3">{tech.tagline}</p>
                    <div className="flex flex-wrap gap-2">
                      {tech.features.slice(0, 3).map((f) => (
                        <span key={f} className="px-2.5 py-1 bg-white border border-nova-cyan/30 text-nova-blue text-xs font-sans rounded-full">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-nova-cyan/20">
                  <Button href={`/tecnologias/${tech.slug}`} size="sm" variant="secondary" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Ver tecnología completa
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar — 1/3 */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              {/* Ficha técnica */}
              <div className="bg-nova-navy rounded-2xl p-6 text-white">
                <h2 className="label-tech text-nova-cyan mb-5">Ficha del proyecto</h2>
                <dl className="space-y-3.5">
                  <div className="flex justify-between gap-3 text-sm font-sans border-b border-white/10 pb-3">
                    <dt className="text-white/50">Cliente</dt>
                    <dd className="font-bold text-right">{cs.client}</dd>
                  </div>
                  <div className="flex justify-between gap-3 text-sm font-sans border-b border-white/10 pb-3">
                    <dt className="text-white/50">Sector</dt>
                    <dd className="text-right">{SECTOR_LABELS[cs.sector]}</dd>
                  </div>
                  <div className="flex justify-between gap-3 text-sm font-sans border-b border-white/10 pb-3">
                    <dt className="text-white/50">Aplicación</dt>
                    <dd className="text-right text-nova-cyan font-medium">{cs.application}</dd>
                  </div>
                  <div className="flex justify-between gap-3 text-sm font-sans border-b border-white/10 pb-3">
                    <dt className="text-white/50">Fluido</dt>
                    <dd className="font-medium text-right">{cs.fluid}</dd>
                  </div>
                  {cs.diameter && (
                    <div className="flex justify-between gap-3 text-sm font-sans border-b border-white/10 pb-3">
                      <dt className="text-white/50">Diámetro</dt>
                      <dd className="font-mono font-bold text-nova-cyan text-right">{cs.diameter}</dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-3 text-sm font-sans border-b border-white/10 pb-3">
                    <dt className="flex items-center gap-1.5 text-white/50">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      Ubicación
                    </dt>
                    <dd className="text-right">{cs.location}</dd>
                  </div>
                  <div className="flex justify-between gap-3 text-sm font-sans">
                    <dt className="flex items-center gap-1.5 text-white/50">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      Año
                    </dt>
                    <dd className="font-mono font-bold text-right">{cs.year}</dd>
                  </div>
                </dl>
              </div>

              {/* CTA sidebar */}
              <div className="bg-steel/40 border border-steel rounded-2xl p-6">
                <h3 className="font-display font-bold text-text-primary mb-2">
                  ¿Tiene una aplicación similar?
                </h3>
                <p className="text-text-muted text-sm font-sans mb-4 leading-relaxed">
                  Cuéntenos su proceso y le proponemos la solución exacta para su planta.
                </p>
                <Button href="/contacto" fullWidth>
                  Hablar con un ingeniero
                </Button>
              </div>

              {/* Descargar catálogo */}
              {tech && (
                <a
                  href={tech.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white border border-steel rounded-xl hover:border-nova-blue transition-colors group"
                >
                  <div className="w-10 h-10 bg-nova-cyan-light rounded-lg flex items-center justify-center shrink-0">
                    <ArrowRight className="w-5 h-5 text-nova-blue" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold font-display text-text-primary group-hover:text-nova-blue transition-colors">
                      Catálogo {tech.name}
                    </p>
                    <p className="text-xs text-text-muted font-sans">Descargar PDF</p>
                  </div>
                </a>
              )}
            </div>
          </aside>
        </div>
      </SectionWrapper>

      {/* Casos relacionados */}
      {related.length > 0 && (
        <RelatedCases
          cases={related}
          title="Más casos en este sector"
          bg="light"
        />
      )}

      <CTABanner />
    </>
  );
}
