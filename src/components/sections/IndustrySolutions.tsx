"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { industries } from "@/data/industries";

export function IndustrySolutions() {
  const [active, setActive] = useState(0);
  const current = industries[active];

  return (
    <SectionWrapper bg="white">
      <SectionHeader
        label="Sectores Industriales"
        title="Una solución para cada proceso"
        subtitle="Desde oil &amp; gas hasta alimentos — la tecnología correcta para cada fluido, cada industria, cada reto operativo."
      />

      {/* Tabs */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="tablist"
        aria-label="Sectores industriales"
      >
        {industries.map((industry, i) => (
          <button
            key={industry.slug}
            role="tab"
            aria-selected={i === active}
            aria-controls={`panel-${industry.slug}`}
            id={`tab-${industry.slug}`}
            onClick={() => setActive(i)}
            className={[
              "px-5 py-2.5 rounded-full text-sm font-medium font-sans transition-all duration-200 whitespace-nowrap border",
              i === active
                ? "bg-nova-blue text-white border-nova-blue shadow-[0_4px_14px_rgba(0,86,179,0.3)]"
                : "bg-white text-text-muted border-steel hover:border-nova-blue hover:text-nova-blue",
            ].join(" ")}
          >
            {industry.name}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div
        id={`panel-${current.slug}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.slug}`}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Imagen */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-nova-navy">
          <Image
            src={current.image}
            alt={`Instalación Nova Measurement en sector ${current.name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Overlay con sector badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-nova-navy/70 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-4 left-4">
            <Badge variant="brand">{current.name}</Badge>
          </div>
        </div>

        {/* Contenido */}
        <div>
          <p className="text-text-muted text-base leading-relaxed font-sans mb-6">
            {current.description}
          </p>

          {/* Aplicaciones */}
          <h3 className="label-tech text-nova-blue mb-4">
            Aplicaciones principales
          </h3>
          <ul className="space-y-2.5 mb-8">
            {current.applications.map((app) => (
              <li key={app} className="flex items-start gap-2.5 text-sm text-text-primary font-sans">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-nova-cyan shrink-0" aria-hidden="true" />
                {app}
              </li>
            ))}
          </ul>

          {/* Clientes */}
          {current.clients.length > 0 && (
            <div className="mb-8">
              <p className="label-tech text-text-muted mb-3">Clientes en este sector</p>
              <div className="flex flex-wrap gap-2">
                {current.clients.map((client) => (
                  <span
                    key={client}
                    className="px-3 py-1 bg-steel/50 text-text-muted text-xs font-medium rounded-full font-sans"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Button
            href={`/soluciones/${current.slug}`}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Ver solución completa
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
