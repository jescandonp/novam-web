import Image from "next/image";
import { type ReactNode } from "react";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";

interface PageHeroProps {
  breadcrumb?: BreadcrumbItem[];
  label?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  size?: "default" | "compact";
}

export function PageHero({
  breadcrumb,
  label,
  title,
  subtitle,
  image,
  imageAlt,
  children,
  size = "default",
}: PageHeroProps) {
  return (
    <div
      className={[
        "relative bg-nova-navy pattern-iso overflow-hidden",
        size === "compact" ? "pt-[72px]" : "pt-[72px]",
      ].join(" ")}
    >
      {/* Imagen de fondo real */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-15"
            priority
            quality={80}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,25,47,0.95) 0%, rgba(0,86,179,0.50) 70%, rgba(0,168,232,0.20) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      )}

      {/* Gradiente decorativo (sin imagen) */}
      {!image && (
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 70% 50%, #0056B3 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
      )}

      <div
        className={[
          "relative z-10 container mx-auto max-w-[1280px] px-6 lg:px-8",
          size === "compact" ? "py-12 lg:py-16" : "py-16 lg:py-20",
        ].join(" ")}
      >
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="mb-6">
            <Breadcrumb items={breadcrumb} light />
          </div>
        )}

        {/* Label */}
        {label && (
          <p className="label-tech text-nova-cyan mb-3">{label}</p>
        )}

        {/* Título */}
        <h1 className="heading-xl text-white max-w-2xl mb-4">{title}</h1>

        {/* Subtítulo */}
        {subtitle && (
          <p className="text-white/70 text-lg leading-relaxed font-sans max-w-xl">
            {subtitle}
          </p>
        )}

        {/* Slot adicional (badges, CTAs, etc.) */}
        {children && <div className="mt-6">{children}</div>}
      </div>

      {/* Línea decorativa inferior */}
      <div className="relative z-10 h-0.5 gradient-line" aria-hidden="true" />
    </div>
  );
}
