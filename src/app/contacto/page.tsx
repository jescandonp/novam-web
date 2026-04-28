"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Upload,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/data/navigation";
import type { Metadata } from "next";

/* Schema de validación */
const schema = z.object({
  name: z.string().min(2, "Ingrese su nombre"),
  company: z.string().min(2, "Ingrese su empresa"),
  role: z.string().optional(),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Ingrese su teléfono o WhatsApp"),
  city: z.string().min(1, "Seleccione su ciudad"),
  application: z.string().min(1, "Seleccione una aplicación"),
  message: z.string().min(10, "Cuéntenos brevemente su reto (mínimo 10 caracteres)"),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Debe aceptar la política de privacidad" }),
  }),
});

type FormData = z.infer<typeof schema>;

const CITIES = [
  "Bogotá",
  "Barranquilla",
  "Bucaramanga",
  "Medellín",
  "Cali",
  "Cartagena",
  "Otra ciudad",
];

const APPLICATIONS = [
  "Caudal de líquido (clamp-on)",
  "Caudal de gas",
  "Caudal de vapor",
  "Refractometría / Concentración",
  "Presión diferencial",
  "Nivel industrial",
  "Posicionador de válvula",
  "Temperatura",
  "Sistema Foundation Fieldbus",
  "Auditoría / Verificación portátil",
  "Otro",
];

const OFFICE_INFO = [
  { city: "Barranquilla", role: "Gerencia General" },
  { city: "Bogotá", role: "Zona Centro · Llanos" },
  { city: "Bucaramanga", role: "Zona Santander" },
  { city: "Barranquilla", role: "Zona Norte" },
  { city: "Cali", role: "Zona Pacífico · Sur" },
];

export default function ContactoPage() {
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
      const res = await fetch("/api/contact", {
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
    <>
      {/* Hero de página */}
      <div className="bg-nova-navy pt-[72px]">
        <div className="container mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-20">
          <p className="label-tech text-nova-cyan mb-3">Contacto</p>
          <h1 className="heading-xl text-white mb-4">
            Hablemos de su reto de medición
          </h1>
          <p className="text-white/65 text-lg font-sans max-w-xl">
            Respuesta técnica en menos de 24 horas hábiles. Cuéntenos su
            proceso y nuestros ingenieros le proponen la solución más adecuada.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="bg-steel/20 py-16 lg:py-20">
        <div className="container mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Formulario — 3/5 */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-steel shadow-[0_8px_40px_rgba(10,25,47,0.08)] p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-success" aria-hidden="true" />
                  </div>
                  <h2 className="heading-lg text-text-primary mb-3">
                    ¡Solicitud recibida!
                  </h2>
                  <p className="text-text-muted font-sans max-w-sm mx-auto">
                    Un ingeniero de Nova Measurement le contactará en menos de 24 horas hábiles.
                  </p>
                  <Button href="/" variant="secondary" className="mt-8">
                    Volver al inicio
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  aria-label="Formulario de solicitud de cotización"
                >
                  <h2 className="heading-md text-text-primary mb-8">
                    Solicitud de consultoría técnica
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nombre */}
                    <div>
                      <label htmlFor="c-name" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                        Nombre completo *
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        autoComplete="name"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors ${errors.name ? "border-error" : "border-steel-dark"}`}
                        placeholder="Ing. Juan Pérez"
                        {...register("name")}
                        aria-describedby={errors.name ? "c-name-err" : undefined}
                      />
                      {errors.name && <p id="c-name-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.name.message}</p>}
                    </div>

                    {/* Empresa */}
                    <div>
                      <label htmlFor="c-company" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                        Empresa *
                      </label>
                      <input
                        id="c-company"
                        type="text"
                        autoComplete="organization"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors ${errors.company ? "border-error" : "border-steel-dark"}`}
                        placeholder="Su empresa"
                        {...register("company")}
                        aria-describedby={errors.company ? "c-company-err" : undefined}
                      />
                      {errors.company && <p id="c-company-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.company.message}</p>}
                    </div>

                    {/* Cargo */}
                    <div>
                      <label htmlFor="c-role" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                        Cargo
                      </label>
                      <input
                        id="c-role"
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-steel-dark text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors"
                        placeholder="Ingeniero de Instrumentación"
                        {...register("role")}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="c-email" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                        Email corporativo *
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        autoComplete="work email"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors ${errors.email ? "border-error" : "border-steel-dark"}`}
                        placeholder="jperez@empresa.com"
                        {...register("email")}
                        aria-describedby={errors.email ? "c-email-err" : undefined}
                      />
                      {errors.email && <p id="c-email-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.email.message}</p>}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label htmlFor="c-phone" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        autoComplete="tel"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors ${errors.phone ? "border-error" : "border-steel-dark"}`}
                        placeholder="+57 300 000 0000"
                        {...register("phone")}
                        aria-describedby={errors.phone ? "c-phone-err" : undefined}
                      />
                      {errors.phone && <p id="c-phone-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.phone.message}</p>}
                    </div>

                    {/* Ciudad */}
                    <div>
                      <label htmlFor="c-city" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                        Ciudad *
                      </label>
                      <select
                        id="c-city"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors bg-white ${errors.city ? "border-error" : "border-steel-dark"}`}
                        {...register("city")}
                        aria-describedby={errors.city ? "c-city-err" : undefined}
                      >
                        <option value="">Seleccione...</option>
                        {CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.city && <p id="c-city-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.city.message}</p>}
                    </div>

                    {/* Aplicación — ancho completo */}
                    <div className="sm:col-span-2">
                      <label htmlFor="c-app" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                        ¿Cuál es su aplicación? *
                      </label>
                      <select
                        id="c-app"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors bg-white ${errors.application ? "border-error" : "border-steel-dark"}`}
                        {...register("application")}
                        aria-describedby={errors.application ? "c-app-err" : undefined}
                      >
                        <option value="">Seleccione...</option>
                        {APPLICATIONS.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                      {errors.application && <p id="c-app-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.application.message}</p>}
                    </div>

                    {/* Mensaje — ancho completo */}
                    <div className="sm:col-span-2">
                      <label htmlFor="c-msg" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">
                        Cuéntenos su reto *
                      </label>
                      <textarea
                        id="c-msg"
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors resize-none ${errors.message ? "border-error" : "border-steel-dark"}`}
                        placeholder="Describa el fluido, diámetro de tubería, condiciones del proceso, o cualquier detalle relevante..."
                        {...register("message")}
                        aria-describedby={errors.message ? "c-msg-err" : undefined}
                      />
                      {errors.message && <p id="c-msg-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.message.message}</p>}
                    </div>

                    {/* Privacidad */}
                    <div className="sm:col-span-2">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-0.5 w-4 h-4 rounded border-steel-dark text-nova-blue focus:ring-nova-blue shrink-0"
                          {...register("privacy")}
                          aria-describedby={errors.privacy ? "c-privacy-err" : undefined}
                        />
                        <span className="text-xs text-text-muted font-sans leading-relaxed">
                          Acepto la{" "}
                          <a href="/politica-de-privacidad" className="text-nova-blue hover:underline">
                            política de privacidad
                          </a>{" "}
                          de Nova Measurement SAS y autorizo el tratamiento de mis datos conforme a la Ley 1581 de 2012.
                        </span>
                      </label>
                      {errors.privacy && <p id="c-privacy-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.privacy.message}</p>}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    className="mt-6"
                    disabled={loading}
                  >
                    {loading ? "Enviando solicitud..." : "Enviar solicitud"}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar info — 2/5 */}
            <aside className="lg:col-span-2 space-y-6">
              {/* WhatsApp */}
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-[#25D366]/8 border border-[#25D366]/25 rounded-xl hover:bg-[#25D366]/15 transition-colors group"
                aria-label="Contactar por WhatsApp"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display font-bold text-text-primary">WhatsApp directo</p>
                  <p className="text-sm text-text-muted font-sans">{contactInfo.phone}</p>
                  <p className="text-xs text-text-muted font-sans mt-0.5">L–V 7am–6pm Colombia</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 p-5 bg-white border border-steel rounded-xl hover:border-nova-blue transition-colors"
              >
                <div className="w-12 h-12 bg-nova-cyan-light rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-nova-blue" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display font-bold text-text-primary">Email</p>
                  <p className="text-sm text-nova-blue font-sans">{contactInfo.email}</p>
                </div>
              </a>

              {/* Teléfono */}
              <a
                href={contactInfo.phoneHref}
                className="flex items-center gap-4 p-5 bg-white border border-steel rounded-xl hover:border-nova-blue transition-colors"
              >
                <div className="w-12 h-12 bg-nova-cyan-light rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-nova-blue" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display font-bold text-text-primary">Teléfono</p>
                  <p className="text-sm text-text-muted font-sans">{contactInfo.phone}</p>
                </div>
              </a>

              {/* Ciudades */}
              <div className="bg-white border border-steel rounded-xl p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <MapPin className="w-5 h-5 text-nova-cyan" aria-hidden="true" />
                  <p className="font-display font-bold text-text-primary">Presencia en Colombia</p>
                </div>
                <ul className="space-y-3">
                  {OFFICE_INFO.map(({ city, role }) => (
                    <li key={city} className="flex items-center justify-between text-sm font-sans">
                      <span className="font-medium text-text-primary">{city}</span>
                      <span className="text-text-muted">{role}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tiempo de respuesta */}
              <div className="bg-nova-navy rounded-xl p-5 text-white">
                <p className="font-display font-bold text-lg mb-1">
                  &lt; 24 horas hábiles
                </p>
                <p className="text-white/65 text-sm font-sans">
                  Tiempo de respuesta técnica garantizado para todas las solicitudes recibidas.
                </p>
        