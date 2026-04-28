import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { CTABanner } from "@/components/sections/CTABanner";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Soluciones de Medición Industrial por Sector",
  description:
    "Soluciones de medición no intrusiva para Oil & Gas, generación de energía, alimentos, agua y química en Colombia. Tecnología Flexim, Smar y UWT con soporte técnico local.",
};

const SECTOR_COLORS: Record<string, string> = {
  "oil-gas":  "from-nova-navy to-nova-blue-dark",
  energia:    "from-nova-blue-dark to-nova-blue",
  alimentos:  "from-nova-blue to-nova-cyan",
  agua:       "from-nova-cyan to-nova-blue",
  quimica:    "from-nova-navy to-nova-blue",
};

export default function SolucionesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Soluciones" }]}
        label="Por sector industrial"
        title="Medición precisa para cada industria"
        subtitle="Soluciones de instrumentación no intrusiva adaptadas a las condiciones específicas de cada sector. Sin paradas. Sin riesgo. Sin contacto con el fluido."
      />

      <SectionWrapper bg="white">
        <SectionHeader
          label="Sectores que atendemos"
          title="¿En qué industria opera su planta?"
          subtitle="Seleccione su sector para ver las aplicaciones, tecnologías recomendadas y casos de éxito específicos."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {industries.map((industry, i) => (
            <Link
              key={industry.slug}
              href={`/soluciones/${industry.slug}`}
              className="group relative overflow-hidden rounded-xl border border-steel shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Imagen */}
              <div className="relative aspect-[16/9] bg-nova-navy overflow-hidden">
                <Image
                  src={industry.image}
                  alt={`Medición industrial para ${industry.name}`}
                  fill
                  sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${SECTOR_COLORS[industry.slug] ?? "from-nova-navy to-nova-blue"} opacity-60`}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-end p-5">
                  <h2 className="font-display font-black text-xl text-white leading-tight">
                    {industry.name}
                  </h2>
                </div>
              </div>

              {/* Contenido */}
              <div className="flex flex-col flex-1 p-6 bg-white">
                <p className="text-text-muted text-sm leading-relaxed font-sans flex-1 mb-4 line-clamp-3">
                  {industry.description}
                </p>

                {/* Aplicaciones principales */}
                <ul className="space-y-1.5 mb-5">
                  {industry.applications.slice(0, 3).map((app) => (
                    <li key={app} className="flex items-start gap-2 text-xs font-sans text-text-primary">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-nova-cyan shrink-0" aria-hidden="true" />
                      {app}
                    </li>
                  ))}
                  {industry.applications.length > 3 && (
                    <li className="text-xs text-text-muted font-sans pl-3.5">
                      +{industry.applications.length - 3} aplicaciones más
                    </li>
                  )}
                </ul>

                {/* Footer de la card */}
                <div className="flex items-center justify-between pt-4 border-t border-steel">
                  <div className="flex flex-wrap gap-1.5">
                    {industry.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-nova-cyan-light text-nova-blue text-[10px] font-mono font-medium rounded uppercase tracking-wider"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-nova-blue group-hover:gap-2 transition-all font-sans">
                    Ver más
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* Bloque de confianza */}
      <SectionWrapper bg="dark" pattern>
        <SectionHeader
          label="¿Por qué medición no intrusiva?"
          title="La ventaja clamp-on en cualquier sector"
          light
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {[
            {
              icon: "⚡",
              title: "Sin parar el proceso",
              desc: "Instalación con la planta en operación a plena presión y temperatura.",
            },
            {
              icon: "🔒",
              title: "Sin riesgo de fuga",
              desc: "Cero perforaciones. Cero empaques. Cero partes húmedas que fallen.",
            },
            {
              icon: "🔧",
              title: "Mínimo mantenimiento",
              desc: "Sin piezas en contacto con el fluido que desgastar ni reemplazar.",
            },
            {
              icon: "📋",
              title: "Certificado y trazable",
              desc: "ATEX, IECEx, API, AGA, FDA según el sector. Soporte técnico local.",
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <span className="text-4xl mb-3 block" aria-hidden="true">{item.icon}</span>
              <h3 className="font-display font-bold text-white text-sm mb-2">{item.title}</h3>
              <p className="text-white/60 text-xs leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <CTABanner
        title="¿No encuentra su sector?"
        subtitle="Hemos medido más de 50 fluidos distintos en condiciones extremas. Cuéntenos su proceso y lo evaluamos sin costo."
        primaryLabel="Consultar mi aplicación"
      />
    </>
  );
}
