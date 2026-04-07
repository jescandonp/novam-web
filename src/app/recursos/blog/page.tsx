"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/sections/CTABanner";
import { blogPosts, CATEGORY_LABELS, type BlogCategory } from "@/data/blogPosts";

const CATEGORIES: { value: "all" | BlogCategory; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "medicion-caudal", label: "Caudal" },
  { value: "automatizacion", label: "Automatización" },
  { value: "nivel", label: "Nivel" },
  { value: "oil-gas", label: "Oil & Gas" },
  { value: "casos", label: "Casos" },
  { value: "normativa", label: "Normativa" },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [active, setActive] = useState<"all" | BlogCategory>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? blogPosts
        : blogPosts.filter((p) => p.category === active),
    [active]
  );

  const [featured, ...rest] = filtered;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Recursos", href: "/recursos" }, { label: "Blog Técnico" }]}
        label="Conocimiento aplicado"
        title="Blog técnico de medición industrial"
        subtitle="Artículos escritos por nuestros ingenieros con aplicaciones reales, comparativas de tecnología y guías prácticas para la industria de procesos en Colombia."
      />

      <div className="bg-white py-16 lg:py-20">
        <div className="container mx-auto max-w-[1280px] px-6 lg:px-8">

          {/* Filtros de categoría */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                aria-pressed={active === cat.value}
                className={[
                  "px-4 py-1.5 rounded-full text-xs font-medium font-sans border transition-all",
                  active === cat.value
                    ? "bg-nova-blue text-white border-nova-blue"
                    : "bg-white text-text-muted border-steel-dark hover:border-nova-blue hover:text-nova-blue",
                ].join(" ")}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-muted font-sans">No hay artículos en esta categoría aún.</p>
              <button
                onClick={() => setActive("all")}
                className="mt-4 text-nova-blue text-sm font-medium hover:underline"
              >
                Ver todos los artículos
              </button>
            </div>
          ) : (
            <>
              {/* Artículo destacado */}
              {featured && (
                <article className="card-base overflow-hidden mb-10 group">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[320px] bg-nova-navy">
                      <Image
                        src={featured.image}
                        alt={featured.imageAlt}
                        fill
                        sizes="(max-width:1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-nova-navy/30 to-transparent lg:from-transparent lg:to-nova-navy/20" aria-hidden="true" />
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="tech">{CATEGORY_LABELS[featured.category]}</Badge>
                        <span className="label-tech text-text-muted">Destacado</span>
                      </div>
                      <h2 className="font-display font-bold text-2xl lg:text-3xl text-text-primary mb-4 leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-text-muted text-base leading-relaxed font-sans mb-6 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-text-muted font-sans mb-6">
                        <span>{formatDate(featured.publishedAt)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {featured.readingTime} min lectura
                        </span>
                      </div>
                      <Link
                        href={`/recursos/blog/${featured.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-nova-blue hover:text-nova-blue-dark transition-colors font-sans group/link"
                      >
                        Leer artículo completo
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              )}

              {/* Grid de artículos restantes */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post) => (
                    <article key={post.slug} className="card-base overflow-hidden flex flex-col group">
                      <div className="relative aspect-[16/10] bg-nova-navy overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.imageAlt}
                          fill
                          sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-nova-navy/50 to-transparent" aria-hidden="true" />
                        <div className="absolute top-3 left-3">
                          <Badge variant="tech">{CATEGORY_LABELS[post.category]}</Badge>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-text-muted font-sans mb-3">
                          <span>{formatDate(post.publishedAt)}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" aria-hidden="true" />
                            {post.readingTime} min
                          </span>
                        </div>
                        <h2 className="font-display font-bold text-base text-text-primary mb-3 leading-tight line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-text-muted text-sm leading-relaxed font-sans line-clamp-3 flex-1 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-steel/60 text-text-muted text-xs font-sans rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/recursos/blog/${post.slug}`}
                          className="mt-auto flex items-center gap-1.5 text-sm font-medium text-nova-blue hover:text-nova-blue-dark transition-colors font-sans group/link"
                        >
                          Leer artículo
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Empty state si solo había 1 artículo */}
          {filtered.length === 1 && rest.length === 0 && (
            <div className="mt-8 p-6 bg-steel/30 rounded-2xl flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-nova-blue shrink-0" aria-hidden="true" />
              <p className="text-text-muted text-sm font-sans">
                Próximamente más artículos sobre este tema. Suscríbase a nuestro boletín técnico para
                recibir las novedades directamente en su correo.
              </p>
            </div>
          )}
        </div>
      </div>

      <CTABanner
        title="¿Tiene un reto técnico que no encuentra resuelto aquí?"
        subtitle="Nuestros ingenieros responden preguntas técnicas sin costo. Cuéntenos su caso."
        primaryLabel="Consultar a un ingeniero"
      />
    </>
  );
}
