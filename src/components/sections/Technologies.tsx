import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { technologies } from "@/data/technologies";

export function Technologies() {
  return (
    <SectionWrapper bg="dark" pattern>
      <SectionHeader
        label="Nuestras Tecnologías"
        title={"Tecnología de clase mundial,\nsoporte colombiano"}
        subtitle="Representamos las marcas líderes globales con el conocimiento local para aplicarlas en los procesos más exigentes de Colombia."
        light
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {technologies.map((tech) => (
          <article
            key={tech.slug}
            className="relative bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-nova-cyan/30 transition-all duration-300 flex flex-col group"
          >
            {/* Accent top line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 gradient-line rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

            {/* Nombre de marca */}
            <div className="mb-6">
              <h3 className="font-display font-black text-3xl text-white mb-1">
                {tech.name}
              </h3>
              <p className="label-tech text-nova-cyan">{tech.tagline}</p>
            </div>

            {/* Descripción */}
            <p className="text-white/65 text-sm leading-relaxed font-sans mb-6 flex-1">
              {tech.description}
            </p>

            {/* Features */}
            <ul className="space-y-2 mb-8">
              {tech.features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-white/80 font-sans">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-nova-cyan shrink-0" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Sectores badge */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tech.industries.slice(0, 3).map((ind) => (
                <Badge key={ind} variant="brand" className="text-[10px]">
                  {ind === "oil-gas" ? "O&G" :
                   ind === "energia" ? "Energía" :
                   ind === "alimentos" ? "Alimentos" :
                   ind === "agua" ? "Agua" :
                   ind === "quimica" ? "Química" : ind}
                </Badge>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Link
                href={`/tecnologias/${tech.slug}`}
                className="flex items-center gap-1.5 text-sm font-medium text-nova-cyan hover:text-white transition-colors font-sans"
              >
                Ver tecnología
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <a
                href={tech.brochureUrl}
                className="flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-white transition-colors font-sans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Descargar catálogo ${tech.name}`}
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                Catálogo PDF
              </a>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
