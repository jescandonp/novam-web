import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export function Breadcrumb({ items, light = false }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.novam.com.co" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://www.novam.com.co${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Migas de pan" className="flex items-center gap-1.5 flex-wrap">
        <Link
          href="/"
          className={[
            "text-xs font-sans transition-colors",
            light
              ? "text-white/50 hover:text-white/80"
              : "text-text-muted hover:text-nova-blue",
          ].join(" ")}
        >
          Inicio
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight
              className={[
                "w-3 h-3 shrink-0",
                light ? "text-white/30" : "text-steel-dark",
              ].join(" ")}
              aria-hidden="true"
            />
            {item.href ? (
              <Link
                href={item.href}
                className={[
                  "text-xs font-sans transition-colors",
                  light
                    ? "text-white/50 hover:text-white/80"
                    : "text-text-muted hover:text-nova-blue",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={[
                  "text-xs font-sans font-medium",
                  light ? "text-white/80" : "text-text-primary",
                ].join(" ")}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
