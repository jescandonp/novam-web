import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/data/navigation";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  showWhatsApp?: boolean;
}

export function CTABanner({
  title = "¿Tiene un reto de medición?",
  subtitle = "Nuestros ingenieros le proponen la solución más adecuada para su proceso. Respuesta técnica en menos de 24 horas hábiles.",
  primaryLabel = "Solicitar consultoría técnica",
  primaryHref = "/contacto",
  showWhatsApp = true,
}: CTABannerProps) {
  return (
    <section
      className="relative bg-nova-navy pattern-iso py-16 lg:py-20 overflow-hidden"
      aria-label="Llamada a la acción"
    >
      {/* Glow decorativo */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at right center, #0056B3 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="heading-xl text-white mb-3">{title}</h2>
            <p className="text-white/65 text-base leading-relaxed font-sans">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              href={primaryHref}
              size="lg"
              variant="primary"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              {primaryLabel}
            </Button>

            {showWhatsApp && (
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded border-2 border-[#25D366] text-[#25D366] text-sm font-bold font-display uppercase tracking-wide hover:bg-[#25D366] hover:text-white transition-all duration-200 whitespace-nowrap"
                aria-label="Contactar por WhatsApp"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
