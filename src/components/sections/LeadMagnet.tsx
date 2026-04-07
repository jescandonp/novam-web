"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Download, CheckCircle, FileText } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Ingrese su nombre completo"),
  company: z.string().min(2, "Ingrese el nombre de su empresa"),
  role: z.string().min(2, "Ingrese su cargo"),
  email: z
    .string()
    .email("Ingrese un email válido")
    .refine((v) => !v.includes("gmail") && !v.includes("hotmail") && !v.includes("yahoo"), {
      message: "Use su correo corporativo",
    }),
});

type FormData = z.infer<typeof schema>;

const BENEFITS = [
  "Tabla comparativa: clamp-on vs. convencional por fluido",
  "Criterios de selección para O&G, energía y alimentos",
  "Casos reales con ROI documentado en Colombia",
  "Guía de especificación técnica paso a paso",
];

export function LeadMagnet() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionWrapper bg="white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Columna izquierda: descripción */}
          <div>
            {/* Ícono documento */}
            <div className="w-14 h-14 rounded-xl gradient-corp flex items-center justify-center mb-6">
              <FileText className="w-7 h-7 text-white" aria-hidden="true" />
            </div>

            <p className="label-tech text-nova-blue mb-3">Guía técnica gratuita</p>
            <h2 className="heading-xl text-text-primary mb-4">
              Medición Clamp-On vs. Tradicional: Guía de Selección 2026
            </h2>
            <p className="text-text-muted text-base leading-relaxed font-sans mb-8">
              Descargue la guía que los ingenieros de instrumentación en Colombia usan para tomar
              mejores decisiones de medición. 12 páginas, datos reales, cero marketing genérico.
            </p>

            <ul className="space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-text-primary font-sans">
                  <CheckCircle
                    className="w-5 h-5 text-success shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Columna derecha: formulario */}
          <div className="bg-steel/30 rounded-2xl border border-steel p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-success" aria-hidden="true" />
                </div>
                <h3 className="heading-md text-text-primary mb-2">
                  ¡Guía enviada!
                </h3>
                <p className="text-text-muted text-sm font-sans">
                  Revise su correo corporativo. Si no la encuentra, verifique la carpeta de spam.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Formulario de descarga de guía técnica"
              >
                <h3 className="heading-md text-text-primary mb-6">
                  Reciba la guía en su correo
                </h3>

                <div className="space-y-4">
                  {/* Nombre */}
                  <div>
                    <label htmlFor="lead-name" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                      Nombre completo *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      autoComplete="name"
                      className={[
                        "w-full px-4 py-3 rounded-lg border bg-white text-text-primary text-sm font-sans placeholder:text-text-muted/60",
                        "focus:outline-none focus:ring-2 focus:ring-nova-blue focus:border-nova-blue transition-colors",
                        errors.name ? "border-error" : "border-steel-dark",
                      ].join(" ")}
                      placeholder="Ing. Juan Pérez"
                      aria-describedby={errors.name ? "lead-name-error" : undefined}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p id="lead-name-error" className="mt-1 text-xs text-error font-sans" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Empresa */}
                  <div>
                    <label htmlFor="lead-company" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                      Empresa *
                    </label>
                    <input
                      id="lead-company"
                      type="text"
                      autoComplete="organization"
                      className={[
                        "w-full px-4 py-3 rounded-lg border bg-white text-text-primary text-sm font-sans placeholder:text-text-muted/60",
                        "focus:outline-none focus:ring-2 focus:ring-nova-blue focus:border-nova-blue transition-colors",
                        errors.company ? "border-error" : "border-steel-dark",
                      ].join(" ")}
                      placeholder="Nombre de su empresa"
                      aria-describedby={errors.company ? "lead-company-error" : undefined}
                      {...register("company")}
                    />
                    {errors.company && (
                      <p id="lead-company-error" className="mt-1 text-xs text-error font-sans" role="alert">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  {/* Cargo */}
                  <div>
                    <label htmlFor="lead-role" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                      Cargo *
                    </label>
                    <input
                      id="lead-role"
                      type="text"
                      className={[
                        "w-full px-4 py-3 rounded-lg border bg-white text-text-primary text-sm font-sans placeholder:text-text-muted/60",
                        "focus:outline-none focus:ring-2 focus:ring-nova-blue focus:border-nova-blue transition-colors",
                        errors.role ? "border-error" : "border-steel-dark",
                      ].join(" ")}
                      placeholder="Ingeniero de Instrumentación"
                      aria-describedby={errors.role ? "lead-role-error" : undefined}
                      {...register("role")}
                    />
                    {errors.role && (
                      <p id="lead-role-error" className="mt-1 text-xs text-error font-sans" role="alert">
                        {errors.role.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="lead-email" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                      Email corporativo *
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      autoComplete="work email"
                      className={[
                        "w-full px-4 py-3 rounded-lg border bg-white text-text-primary text-sm font-sans placeholder:text-text-muted/60",
                        "focus:outline-none focus:ring-2 focus:ring-nova-blue focus:border-nova-blue transition-colors",
                        errors.email ? "border-error" : "border-steel-dark",
                      ].join(" ")}
                      placeholder="jperez@empresa.com"
                      aria-describedby={errors.email ? "lead-email-error" : undefined}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="lead-email-error" className="mt-1 text-xs text-error font-sans" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  className="mt-6"
                  disabled={loading}
                  icon={<Download className="w-4 h-4" />}
                >
                  {loading ? "Enviando..." : "Descargar guía gratis"}
                </Button>

                <p className="mt-3 text-center text-xs text-text-muted font-sans">
                  Sin spam. Solo contenido técnico relevante para su trabajo.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
