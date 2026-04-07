"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  label?: string;
}

function FaqAccordion({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const id = `faq-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border border-steel rounded-xl overflow-hidden bg-white">
      <button
        id={id}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-steel/30 transition-colors"
      >
        <span className="font-display font-bold text-base text-text-primary leading-snug">
          {item.question}
        </span>
        <ChevronDown
          className={[
            "w-5 h-5 text-nova-blue shrink-0 transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={id}
        hidden={!open}
        className={[
          "px-6 overflow-hidden transition-all duration-300",
          open ? "pb-5 max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <p className="text-text-muted text-sm leading-relaxed font-sans border-t border-steel pt-4">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function FaqSection({
  items,
  title = "Preguntas frecuentes",
  label = "FAQ",
}: FaqSectionProps) {
  /* Schema FAQ para Google AI Overviews */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <SectionWrapper bg="light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Encabezado */}
        <div>
          <SectionHeader label={label} title={title} />
          <p className="text-text-muted text-sm font-sans -mt-8 leading-relaxed">
            ¿No encuentra su pregunta? Escríbanos directamente — respondemos en menos de 24 horas.
          </p>
        </div>

        {/* Acordeón */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item, i) => (
            <FaqAccordion key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
