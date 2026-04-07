import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/data/caseStudies";

const SECTOR_LABELS: Record<string, string> = {
  "oil-gas": "Oil & Gas",
  energia: "Energía",
  alimentos: "Alimentos",
  agua: "Agua",
  quimica: "Química",
  general: "Industrial",
};

const BRAND_LABELS: Record<string, string> = {
  flexim: "Flexim",
  smar: "Smar",
  uwt: "UWT",
};

export function CasesPreview() {
  const preview = caseStudies.slice(0, 6);

  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="Casos de Éxito"
        title="Instalaciones reales en Colombia"
        subtitle="Proyectos ejecutados con tecnología de clase mundial y soporte técnico local. Cada instalación, una historia de precisión sin paradas."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {preview.map((cs) => (
          <article
            key={cs.slug}
            className="card-base overflow-hidden flex flex-col group"
          >
            {/* Imagen */}
            <div className="relative aspect-[16/10] bg-nova-navy overflow-hidden">
              <Image
                src={cs.image}
                alt={`${cs.client}: ${cs.application}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nova-navy/60 to-transparent" aria-hidden="true" />

              {/* Badges sobre imagen */}
              <div className="absolute bottom-3 left-3 flex gap-2">
                <Badge variant="sector">{SECTOR_LABELS[cs.sector]}</Badge>
                <Badge variant="brand">{BRAND_LABELS[cs.technology]}</Badge>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 flex flex-col flex-1">
              {/* Cliente + año */}
              <div className="flex items-center justify-between mb-2">
                <span className="label-tech text-nova-blue">{cs.client}</span>
                <span className="label-tech text-text-muted">{cs.year}</span>
              </div>

              <h3 className="heading-md text-text-primary mb-3 line-clamp-2">
                {cs.title}
              </h3>

              {/* Ficha rápida */}
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4 text-xs font-sans">
                <dt className="text-text-muted">Fluido</dt>
                <dd className="text-text-primary font-medium">{cs.fluid}</dd>
                {cs.diameter && (
                  <>
                    <dt className="text-text-muted">Diámetro</dt>
                    <dd className="text-text-primary font-medium font-mono">{cs.diameter}</dd>
                  </>
                )}
                <dt className="text-text-muted">Ubicación</dt>
                <dd className="text-text-primary font-medium">{cs.location.split(",")[0]}</dd>
              </dl>

              <p className="text-text-muted text-sm leading-relaxed font-sans line-clamp-3 mb-5 flex-1">
                {cs.summary}
              </p>

              <Link
                href={`/casos-de-exito/${cs.slug}`}
                className="mt-auto flex items-center gap-1.5 text-sm font-medium text-nova-blue hover:text-nova-blue-dark transition-colors font-sans group/link"
                aria-label={`Ver caso completo: ${cs.title}`}
              >
                Ver caso completo
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* CTA ver todos */}
      <div className="mt-12 text-center">
        <Button href="/casos-de-exito" variant="secondary" size="lg">
          Ver todos los casos de éxito
        </Button>
      </div>
    </SectionWrapper>
  );
}
