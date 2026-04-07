"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/sections/CTABanner";
import { caseStudies } from "@/data/caseStudies";

const SECTOR_FILTERS = [
  { value: "all",      label: "Todos" },
  { value: "oil-gas",  label: "Oil & Gas" },
  { value: "energia",  label: "Energía" },
  { value: "alimentos",label: "Alimentos" },
  { value: "agua",     label: "Agua" },
  { value: "quimica",  label: "Química" },
];

const TECH_FILTERS = [
  { value: "all",    label: "Todas" },
  { value: "flexim", label: "Flexim" },
  { value: "smar",   label: "Smar" },
  { value: "uwt",    label: "UWT" },
];

const SECTOR_LABELS: Record<string, string> = {
  "oil-gas": "Oil & Gas", energia: "Energía", alimentos: "Alimentos",
  agua: "Agua", quimica: "Química", general: "Industrial",
};
const BRAND_LABELS: Record<string, string> = {
  flexim: "Flexim", smar: "Smar", uwt: "UWT",
};

export default function CasosPage() {
  const [sector, setSector] = useState("all");
  const [tech, setTech]     = useState("all");

  const filtered = useMemo(() =>
    caseStudies.filter((c) =>
      (sector === "all" || c.sector === sector) &&
      (tech   === "all" || c.technology === tech)
    ),
    [sector, tech]
  );

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Casos de Éxito" }]}
        label="Proyectos"
        title="Instalaciones reales. Resultados comprobados."
        subtitle="Cada caso es una historia de medición precisa en condiciones industriales reales, ejecutada por el equipo de Nova Measurement en Colombia."
      />

      <div className="bg-white py-16 lg:py-20">
        <div className="container mx-auto max-w-[1280px] px-6 lg:px-8">

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 p-5 bg-steel/30 rounded-2xl border border-steel">
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-4 h-4 text-text-muted" aria-hidden="true" />
              <span className="label-tech text-text-muted">Filtrar:</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Sector */}
              <fieldset>
                <legend className="label-tech text-text-muted mb-2">Sector</legend>
                <div className="flex flex-wrap gap-2" role="group">
                  {SECTOR_FILTERS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setSector(f.value)}
                      aria-pressed={sector === f.value}
                      className={[
                        "px-4 py-1.5 rounded-full text-xs font-medium font-sans border transition-all",
                        sector === f.value
                          ? "bg-nova-blue text-white border-nova-blue"
                          : "bg-white text-text-muted border-steel-dark hover:border-nova-blue hover:text-nova-blue",
                      ].join(" ")}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              {/* Tecnología */}
              <fieldset>
                <legend className="label-tech text-text-muted mb-2">Tecnología</legend>
                <div className="flex flex-wrap gap-2" role="group">
                  {TECH_FILTERS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setTech(f.value)}
                      aria-pressed={tech === f.value}
                      className={[
                        "px-4 py-1.5 rounded-full text-xs font-medium font-sans border transition-all",
                        tech === f.value
                          ? "bg-nova-navy text-white border-nova-navy"
                          : "bg-white text-text-muted border-steel-dark hover:border-nova-navy hover:text-nova-navy",
                      ].join(" ")}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
            <p className="label-tech text-text-muted shrink-0 self-end">
              {filtered.length} {filtered.length === 1 ? "caso" : "casos"}
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-muted font-sans">No hay casos con los filtros seleccionados.</p>
              <button
                onClick={() => { setSector("all"); setTech("all"); }}
                className="mt-4 text-nova-blue text-sm font-medium hover:underline"
              >
                Ver todos los casos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((cs) => (
                <article key={cs.slug} className="card-base overflow-hidden flex flex-col group">
                  {/* Imagen */}
                  <div className="relative aspect-[16/10] bg-nova-navy overflow-hidden">
                    <Image
                      src={cs.image}
                      alt={`${cs.client} — ${cs.application}`}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-nova-navy/60 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      <Badge variant="sector">{SECTOR_LABELS[cs.sector]}</Badge>
                      <Badge variant="brand">{BRAND_LABELS[cs.technology]}</Badge>
                    </div>
                  </div>
                  {/* Contenido */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="label-tech text-nova-blue">{cs.client}</span>
                      <span className="label-tech text-text-muted">{cs.year}</span>
                    </div>
                    <h2 className="heading-md text-text-primary mb-3 line-clamp-2">{cs.title}</h2>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-sans mb-4">
                      <dt className="text-text-muted">Fluido</dt>
                      <dd className="text-text-primary font-medium">{cs.fluid}</dd>
                      {cs.diameter && (
                        <>
                          <dt className="text-text-muted">Diámetro</dt>
                          <dd className="text-text-primary font-mono font-medium">{cs.diameter}</dd>
                        </>
                      )}
                      <dt className="text-text-muted">Ubicación</dt>
                      <dd className="text-text-primary font-medium">{cs.location.split(",")[0]}</dd>
                    </dl>
                    <p className="text-text-muted text-sm leading-relaxed font-sans line-clamp-2 mb-5 flex-1">
                      {cs.summary}
                    </p>
                    <Link
                      href={`/casos-de-exito/${cs.slug}`}
                      className="mt-auto flex items-center gap-1.5 text-sm font-medium text-nova-blue hover:text-nova-blue-dark transition-colors font-sans group/link"
                    >
                      Ver caso completo
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <CTABanner
        title="¿Su planta podría ser el próximo caso de éxito?"
        subtitle="Contamos con ingenieros listos para evaluar su proceso y proponer la solución de medición más adecuada."
      />
    </>
  );
}
