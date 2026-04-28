import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/sections/CTABanner";
import { technologies } from "@/data/technologies";

export const metadata: Metadata = {
  title: "Tecnologías de Medición Industrial — Flexim, Smar y UWT",
  description:
    "Distribuidor autorizado Flexim y partner exclusivo Smar y UWT en Colombia. Caudalímetros clamp-on, instrumentación de proceso y medición de nivel para la industria colombiana.",
};

const TECH_ACCENT: Record<string, { bg: string; border: string; label: string }> = {
  flexim: { bg: "bg-nova-blue/10", border: "border-nova-blue/30", label: "Distribuidor Autorizado" },
  smar:   { bg: "bg-nova-navy/10", border: "border-nova-navy/30", label: "Partner Exclusivo Colombia" },
  uwt:    { bg: "bg-nova-cyan/10", border: "border-nova-cyan/30", label: "Alianza Estratégica" },
};

export default function TecnologiasPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Tecnologías" }]}
        label="Nuestras alianzas tecnológicas"
        title="Tres marcas líderes. Un solo equipo."
        subtitle="Nova Measurement representa en Colombia a los fabricantes más especializados del mundo en medición industrial no intrusiva, instrumentación de proceso y medición de nivel."
      />

      {/* Cards de tecnologías */}
      <SectionWrapper bg="white">
        <div className="space-y-12">
          {technologies.map((tech, i) => {
            const accent = TECH_ACCENT[tech.slug] ?? TECH_ACCENT.flexim;
            const isEven = i % 2 === 0;

            return (
              <article
                key={tech.slug}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 rounded-2xl border border-steel bg-white shadow-card hover:shadow-card-hover transition-shadow"
              >
                {/* Info — alterna orden en desktop */}
                <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center shrink-0`}>
                      <Image
                        src={tech.logo}
                        alt={`Logo ${tech.name}`}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-2xl text-nova-navy leading-none">
                        {tech.name}
                      </h2>
                      <p className="label-tech text-nova-blue mt-0.5">{tech.tagline}</p>
                    </div>
                  </div>

                  <Badge variant="brand" className="mb-4">{accent.label}</Badge>

                  <p className="text-text-muted text-base leading-relaxed font-sans mb-6">
                    {tech.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {tech.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm font-sans text-text-primary">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-nova-cyan shrink-0" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/tecnologias/${tech.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-nova-blue text-white font-display font-bold text-sm rounded hover:bg-nova-blue-dark transition-colors"
                    >
                      Ver tecnología completa
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={tech.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-steel text-text-muted font-sans text-sm rounded hover:border-nova-blue hover:text-nova-blue transition-colors"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      Descargar brochure
                    </a>
                  </div>
                </div>

                {/* Líneas de producto */}
                <div className={`${isEven ? "lg:order-2" : "lg:order-1"} ${accent.bg} border ${accent.border} rounded-xl p-7`}>
                  <h3 className="label-tech text-nova-blue mb-4">Líneas de producto</h3>
                  <ul className="space-y-3">
                    {tech.productLines.map((pl) => (
                      <li
                        key={pl}
                        className="flex items-start gap-3 pb-3 border-b border-nova-blue/10 last:border-0 last:pb-0"
                      >
                        <span className="mt-1 w-5 h-5 rounded-full bg-nova-blue/15 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-nova-blue" aria-hidden="true" />
                        </span>
                        <span className="text-sm font-sans text-text-primary">{pl}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Sectores aplicables */}
                  <div className="mt-5 pt-5 border-t border-nova-blue/10">
                    <p className="label-tech text-text-muted mb-2">Sectores</p>
                    <div className="flex flex-wrap gap-2">
                      {tech.industries.map((ind) => (
                        <span
                          key={ind}
                          className="px-2.5 py-1 bg-white border border-steel rounded-full text-[11px] font-mono text-text-muted uppercase tracking-wide"
                        >
                          {ind.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Comparativa rápida */}
      <SectionWrapper bg="light">
        <SectionHeader
          label="¿Cuál tecnología necesita?"
          title="Guía rápida de selección"
          subtitle="Las tres marcas se complementan. En muchos proyectos las combinamos para cubrir todas las variables de proceso."
          centered
        />
        <div className="overflow-x-auto mt-4 rounded-xl border border-steel">
          <table className="w-full min-w-[600px] text-sm font-sans">
            <thead>
              <tr className="bg-nova-navy text-white">
                <th className="px-5 py-3 text-left font-display font-bold text-xs tracking-wide">Variable</th>
                <th className="px-5 py-3 text-center font-display font-bold text-xs tracking-wide text-nova-cyan">Flexim</th>
                <th className="px-5 py-3 text-center font-display font-bold text-xs tracking-wide">Smar</th>
                <th className="px-5 py-3 text-center font-display font-bold text-xs tracking-wide">UWT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel">
              {[
                ["Medición de caudal (líquidos)",  "✅ Primaria", "—", "—"],
                ["Medición de caudal (gases)",      "✅ Primaria", "—", "—"],
                ["Presión y presión diferencial",   "—", "✅ Primaria", "—"],
                ["Temperatura de proceso",          "—", "✅ Primaria", "—"],
                ["Posicionamiento de válvulas",     "—", "✅ Primaria", "—"],
                ["Nivel en líquidos",               "—", "✅ Primaria", "✅ Primaria"],
                ["Nivel en sólidos a granel",       "—", "—", "✅ Primaria"],
                ["Concentración / Brix",            "✅ PIOX R", "—", "—"],
                ["Comunicación Fieldbus",           "Disponible", "✅ DFI302", "—"],
                ["Zonas ATEX / IECEx",              "✅ Certificado", "✅ Certificado", "✅ Certificado"],
              ].map(([variable, flexim, smar, uwt]) => (
                <tr key={variable} className="hover:bg-steel/30 transition-colors">
                  <td className="px-5 py-3 text-text-primary font-medium">{variable}</td>
                  <td className="px-5 py-3 text-center text-text-muted">{flexim}</td>
                  <td className="px-5 py-3 text-center text-text-muted">{smar}</td>
                  <td className="px-5 py-3 text-center text-text-muted">{uwt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      <CTABanner
        title="¿No está seguro qué tecnología necesita?"
        subtitle="Cuéntenos su proceso y nuestro equipo de ingeniería le recomienda la solución exacta, sin compromiso."
        primaryLabel="Consultar con un ingeniero"
      />
    </>
  );
}
