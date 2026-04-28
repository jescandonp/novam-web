import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
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
  const [featured, ...rest] = caseStudies.slice(0, 4);

  return (
    <SectionWrapper bg="light">
      <SectionHeader
        label="Casos de Éxito"
        title="Instalaciones reales en Colombia"
        subtitle="Proyectos ejecutados con tecnología de clase mundial y soporte técnico local. Cada instalación, una historia de precisión sin paradas."
      />

      {/* Bento grid — 1 card grande + 3 pequeñas */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[580px]">

        {/* Card principal — ocupa 2 cols × 2 filas */}
        <Link
          href={`/casos-de-exito/${featured.slug}`}
          className="relative md:col-span-2 md:row-span-2 rounded-xl overflow-hidden bg-nova-navy group block"
          aria-label={`Ver caso: ${featured.title}`}
        >
          <Image
            src={featured.image}
            alt={`${featured.client}: ${featured.application}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient fuerte desde abajo */}
          <div className="absolute inset-0 bg-gradient-to-t from-nova-navy/90 via-nova-navy/30 to-transparent" aria-hidden="true" />

          {/* Contenido overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              <Badge variant="sector">{SECTOR_LABELS[featured.sector]}</Badge>
              <Badge variant="brand">{BRAND_LABELS[featured.technology]}</Badge>
            </div>

            {/* Ubicación */}
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin className="w-3.5 h-3.5 text-nova-cyan" aria-hidden="true" />
              <span className="label-tech text-nova-cyan">{featured.location.split(",")[0]}</span>
            </div>

            {/* Título */}
            <h3 className="font-display font-black text-xl text-white leading-tight mb-3 line-clamp-3">
              {featured.title}
            </h3>

            {/* Highlight clave */}
            <p className="text-white/70 text-sm font-sans leading-relaxed line-clamp-2 mb-5">
              {featured.highlights[0]}
            </p>

            {/* CTA inline */}
            <span className="flex items-center gap-1.5 text-sm font-medium text-nova-cyan font-sans group-hover:gap-2.5 transition-all duration-200">
              Ver caso completo
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </div>
        </Link>

        {/* 3 cards pequeñas */}
        {rest.map((cs) => (
          <Link
            key={cs.slug}
            href={`/casos-de-exito/${cs.slug}`}
            className="relative md:col-span-1 md:row-span-1 rounded-xl overflow-hidden bg-nova-navy group block"
            aria-label={`Ver caso: ${cs.title}`}
          >
            <Image
              src={cs.image}
              alt={`${cs.client}: ${cs.application}`}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-nova-navy/85 via-nova-navy/20 to-transparent" aria-hidden="true" />

            {/* Sector badge top-left */}
            <div className="absolute top-3 left-3">
              <Badge variant="sector">{SECTOR_LABELS[cs.sector]}</Ba