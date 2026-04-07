import { type ReactNode } from "react";

type BgVariant = "white" | "light" | "dark" | "blue";

interface SectionWrapperProps {
  children: ReactNode;
  bg?: BgVariant;
  className?: string;
  id?: string;
  pattern?: boolean;
}

const bgStyles: Record<BgVariant, string> = {
  white: "bg-white",
  light: "bg-steel/30",
  dark:  "bg-nova-navy text-white",
  blue:  "bg-nova-blue text-white",
};

export function SectionWrapper({
  children,
  bg = "white",
  className = "",
  id,
  pattern = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={[
        "py-20 lg:py-[7.5rem]",
        bgStyles[bg],
        pattern && bg === "dark" ? "pattern-iso" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container mx-auto max-w-[1280px] px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

/* Cabecera de sección reutilizable */
interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={[
        "mb-14",
        centered ? "text-center" : "",
        centered ? "mx-auto max-w-3xl" : "max-w-2xl",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label && (
        <p
          className={[
            "label-tech mb-3",
            light ? "text-nova-cyan" : "text-nova-blue",
          ].join(" ")}
        >
          {label}
        </p>
      )}
      <h2
        className={[
          "heading-xl",
          !centered ? "accent-line" : "",
          light ? "text-white" : "text-text-primary",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={[
            "mt-4 text-lg leading-relaxed",
            light ? "text-steel/90" : "text-text-muted",
          ].join(" ")}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
