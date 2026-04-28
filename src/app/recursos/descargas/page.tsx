"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Download, FileText, CheckCircle, Lock, Loader2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Badge } from "@/components/ui/Badge";
import { CTABanner } from "@/components/sections/CTABanner";

/* ─── Catálogos públicos ─────────────────────────────────────── */
const PUBLIC_DOCS = [
  {
    brand: "Flexim",
    title: "Portafolio Flexim — Nova Measurement",
    description: "Línea completa de caudalímetros ultrasónicos clamp-on para líquidos, gases y energía térmica. Casos de aplicación en Colombia.",
    pages: "Brochure completo",
    variant: "brand" as const,
    href: "/downloads/catalogo-flexim.pdf",
    badge: "Distribuidor Autorizado",
  },
  {
    brand: "Smar",
    title: "Portafolio Smar — Nova Measurement",
    description: "Transmisores de presión, temperatura, nivel y posicionadores de válvulas con tecnología Foundation Fieldbus y HART.",
    pages: "Brochure completo",
    variant: "tech" as const,
    href: "/downloads/catalogo-smar.pdf",
    badge: "Partner Exclusivo Colombia",
  },
  {
    brand: "UWT",
    title: "Portafolio UWT — Nova Measurement",
    description: "Detección y medición de nivel en sólidos a granel, polvos y granulados. Rotonivo, NivoRadar y más. Garantía 6 años.",
    pages: "Brochure completo",
    variant: "sector" as const,
    href: "/downloads/catalogo-uwt.pdf",
    badge: "Alianza Estratégica",
  },
];

/* ─── Guía gated ─────────────────────────────────────────────── */
const GUIDE = {
  title: "Guía Técnica: Medición Ultrasónica Clamp-On en Colombia",
  description:
    "35 páginas con criterios de selección, preguntas clave para especificar un caudalímetro, comparativa clamp-on vs. electromagnético y casos reales de retorno de inversión en plantas colombianas.",
  benefits: [
    "Criterios técnicos para seleccionar caudalímetro según fluido y diámetro",
    "Checklist de pre-ingeniería (10 puntos antes de cotizar)",
    "Comparativa TCO: clamp-on vs. electromagnético vs. vortex",
    "3 casos de éxito con datos de ROI reales (Oil & Gas, Alimentos, Energía)",
    "Glosario técnico de medición ultrasónica",
  ],
};

/* ─── Form schema ────────────────────────────────────────────── */
const corporateEmails = ["gmail", "hotmail", "yahoo", "outlook", "live", "icloud"];

const schema = z.object({
  name: z.string().min(2, "Ingrese su nombre completo"),
  company: z.string().min(2, "Ingrese el nombre de su empresa"),
  email: z
    .string()
    .email("Ingrese un correo válido")
    .refine(
      (v) => !corporateEmails.some((d) => v.toLowerCase().includes(`@${d}`)),
      "Use su correo corporativo"
    ),
  phone: z.string().min(7, "Ingrese su teléfono"),
  role: z.string().min(2, "Indique su cargo"),
  privacy: z.literal(true, { errorMap: () => ({ message: "Debe aceptar la política" }) }),
});

type FormData = z.infer<typeof schema>;

/* ─── Component ─────────────────────────────────────────────── */
export default function DescargasPage() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError("");
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setServerError("Error al enviar. Por favor intente nuevamente.");
    }
  }

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Recursos", href: "/recursos" }, { label: "Descargas" }]}
        label="Centro de Recursos"
        title="Catálogos técnicos y guías especializadas"
        subtitle="Acceda a la documentación técnica de Flexim, Smar y UWT, y descargue nuestra guía de medición ultrasónica para la industria colombiana."
      />

      {/* Catálogos públicos */}
      <SectionWrapper bg="white">
        <SectionHeader
          label="Documentación técnica"
          title="Catálogos de descarga directa"
          subtitle="Sin registro. Descarga inmediata en PDF."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PUBLIC_DOCS.map((doc) => (
            <a
              key={doc.title}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-base p-6 flex flex-col group hover:border-nova-blue/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant={doc.variant}>{doc.badge}</Badge>
                <div className="w-10 h-10 bg-nova-cyan-light rounded-lg flex items-center justify-center shrink-0 group-hover:bg-nova-blue/10 transition-colors">
                  <FileText className="w-5 h-5 text-nova-blue" aria-hidden="true" />
                </div>
              </div>
              <h3 className="font-display font-bold text-base text-text-primary mb-2 leading-tight">
                {doc.title}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed font-sans flex-1 mb-4">
                {doc.description}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-steel">
                <span className="text-xs text-text-muted font-sans">{doc.pages}</span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-nova-blue group-hover:text-nova-blue-dark transition-colors font-sans">
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  Descargar PDF
                </span>
              </div>
            </a>
          ))}
        </div>
      </SectionWrapper>

      {/* Guía gated */}
      <SectionWrapper bg="light">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-nova-cyan" aria-hidden="true" />
              <span className="label-tech text-nova-cyan">Guía exclusiva</span>
            </div>
            <SectionHeader
              label=""
              title={GUIDE.title}
            />
            <p className="text-text-muted text-base leading-relaxed font-sans mb-6">
              {GUIDE.description}
            </p>
            <ul className="space-y-3">
              {GUIDE.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle
                    className="w-5 h-5 text-success shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-text-primary text-sm font-sans">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-steel p-8 shadow-sm">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-success" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-xl text-text-primary mb-2">
                  ¡Guía enviada!
                </h3>
                <p className="text-text-muted text-sm font-sans">
                  Revise su correo corporativo. El enlace de descarga llegará en los próximos minutos.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-lg text-text-primary mb-1">
                  Descargue la guía gratis
                </h3>
                <p className="text-text-muted text-sm font-sans mb-6">
                  Reciba el PDF en su correo corporativo al instante.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dl-name" className="label-tech text-text-muted mb-1 block">
                        Nombre completo *
                      </label>
                      <input
                        id="dl-name"
                        type="text"
                        autoComplete="name"
                        {...register("name")}
                        className="w-full px-4 py-2.5 border border-steel rounded-lg text-sm font-sans text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-nova-blue/30 focus:border-nova-blue transition-colors"
                        placeholder="Juan Pérez"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-error font-sans">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="dl-company" className="label-tech text-text-muted mb-1 block">
                        Empresa *
                      </label>
                      <input
                        id="dl-company"
                        type="text"
                        autoComplete="organization"
                        {...register("company")}
                        className="w-full px-4 py-2.5 border border-steel rounded-lg text-sm font-sans text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-nova-blue/30 focus:border-nova-blue transition-colors"
                        placeholder="Refinería del Norte"
                      />
                      {errors.company && (
                        <p className="mt-1 text-xs text-error font-sans">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="dl-role" className="label-tech text-text-muted mb-1 block">
                      Cargo *
                    </label>
                    <input
                      id="dl-role"
                      type="text"
                      {...register("role")}
                      className="w-full px-4 py-2.5 border border-steel rounded-lg text-sm font-sans text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-nova-blue/30 focus:border-nova-blue transition-colors"
                      placeholder="Jefe de Instrumentación"
                    />
                    {errors.role && (
                      <p className="mt-1 text-xs text-error font-sans">{errors.role.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dl-email" className="label-tech text-text-muted mb-1 block">
                      Correo corporativo *
                    </label>
                    <input
                      id="dl-email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      className="w-full px-4 py-2.5 border border-steel rounded-lg text-sm font-sans text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-nova-blue/30 focus:border-nova-blue transition-colors"
                      placeholder="juan@empresa.com.co"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-error font-sans">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dl-phone" className="label-tech text-text-muted mb-1 block">
                      Teléfono *
                    </label>
                    <input
                      id="dl-phone"
                      type="tel"
                      autoComplete="tel"
                      {...register("phone")}
                      className="w-full px-4 py-2.5 border border-steel rounded-lg text-sm font-sans text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-nova-blue/30 focus:border-nova-blue transition-colors"
                      placeholder="+57 300 000 0000"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-error font-sans">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <input
                      id="dl-privacy"
                      type="checkbox"
                      {...register("privacy")}
                      className="mt-0.5 w-4 h-4 accent-nova-blue shrink-0"
                    />
                    <label htmlFor="dl-privacy" className="text-xs text-text-muted font-sans leading-relaxed">
                      Acepto que Nova Measurement SAS procese mis datos para enviar la guía y comunicaciones
                      técnicas relacionadas. Puede cancelar en cualquier momento.
                    </label>
                  </div>
                  {errors.privacy && (
                    <p className="text-xs text-error font-sans">{errors.privacy.message}</p>
                  )}

                  {serverError && (
                    <p className="text-sm text-error font-sans">{serverError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-nova-blue text-white font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-nova-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" aria-hidden="true" />
                        Enviar guía a mi correo
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </SectionWrapper>

      <CTABanner
        title="¿Necesita una evaluación técnica personalizada?"
        subtitle="Nuestros ingenieros analizan su proceso y recomiendan la solución exacta, sin costo."
        primaryLabel="Hablar con un ingeniero"
      />
    </>
  );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              