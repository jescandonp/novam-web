"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, CheckCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { contactInfo } from "@/data/navigation";

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

const CITIES = ["Bogotá", "Barranquilla", "Bucaramanga", "Medellín", "Cali", "Cartagena", "Otra ciudad"];

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

/* Ingenieros por zona — coherente con /nosotros */
const ZONE_CONTACTS = [
  {
    zone: "Gerencia General · Zona Norte",
    city: "Barranquilla",
    name: "Antonio Sancivier",
    phone: "+57 321 535 4908",
    phoneHref: "tel:+573215354908",
    whatsapp: "https://wa.me/573215354908",
    email: "asancivier@novam.com.co",
  },
  {
    zone: "Zona Centro · Llanos",
    city: "Bogotá",
    name: "Cristian Medina",
    phone: "+57 311 870 7943",
    phoneHref: "tel:+573118707943",
    whatsapp: "https://wa.me/573118707943",
    email: "cmedina@novam.com.co",
  },
  {
    zone: "Zona Santanderes",
    city: "Bucaramanga",
    name: "Brandon Delgado",
    phone: "+57 316 749 8585",
    phoneHref: "tel:+573167498585",
    whatsapp: "https://wa.me/573167498585",
    email: "bdelgado@novam.com.co",
  },
  {
    zone: "Zona Occidente",
    city: "Cali",
    name: "Carolina González",
    phone: "+57 310 879 0678",
    phoneHref: "tel:+573108790678",
    whatsapp: "https://wa.me/573108790678",
    email: "cgonzalez@novam.com.co",
  },
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
      {/* Hero */}
      <div className="bg-nova-navy pt-[72px]">
        <div className="container mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-20">
          <p className="label-tech text-nova-cyan mb-3">Contacto</p>
          <h1 className="heading-xl text-white mb-4">Hablemos de su reto de medición</h1>
          <p className="text-white/65 text-lg font-sans max-w-xl">
            Respuesta técnica en menos de 24 horas hábiles. Cuéntenos su proceso y nuestros ingenieros le proponen la solución más adecuada.
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
                  <h2 className="heading-lg text-text-primary mb-3">¡Solicitud recibida!</h2>
                  <p className="text-text-muted font-sans max-w-sm mx-auto">
                    Un ingeniero de Nova Measurement le contactará en menos de 24 horas hábiles.
                  </p>
                  <Button href="/" variant="secondary" className="mt-8">Volver al inicio</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Formulario de solicitud de cotización">
                  <h2 className="heading-md text-text-primary mb-8">Solicitud de consultoría técnica</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nombre */}
                    <div>
                      <label htmlFor="c-name" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">Nombre completo *</label>
                      <input
                        id="c-name" type="text" autoComplete="name"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors ${errors.name ? "border-error" : "border-steel-dark"}`}
                        placeholder="Ing. Juan Pérez"
                        {...register("name")}
                        aria-describedby={errors.name ? "c-name-err" : undefined}
                      />
                      {errors.name && <p id="c-name-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.name.message}</p>}
                    </div>

                    {/* Empresa */}
                    <div>
                      <label htmlFor="c-company" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">Empresa *</label>
                      <input
                        id="c-company" type="text" autoComplete="organization"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors ${errors.company ? "border-error" : "border-steel-dark"}`}
                        placeholder="Su empresa"
                        {...register("company")}
                        aria-describedby={errors.company ? "c-company-err" : undefined}
                      />
                      {errors.company && <p id="c-company-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.company.message}</p>}
                    </div>

                    {/* Cargo */}
                    <div>
                      <label htmlFor="c-role" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">Cargo</label>
                      <input
                        id="c-role" type="text"
                        className="w-full px-4 py-3 rounded-lg border border-steel-dark text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors"
                        placeholder="Ingeniero de Instrumentación"
                        {...register("role")}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="c-email" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">Email corporativo *</label>
                      <input
                        id="c-email" type="email" autoComplete="work email"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors ${errors.email ? "border-error" : "border-steel-dark"}`}
                        placeholder="jperez@empresa.com"
                        {...register("email")}
                        aria-describedby={errors.email ? "c-email-err" : undefined}
                      />
                      {errors.email && <p id="c-email-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.email.message}</p>}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label htmlFor="c-phone" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">Teléfono / WhatsApp *</label>
                      <input
                        id="c-phone" type="tel" autoComplete="tel"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors ${errors.phone ? "border-error" : "border-steel-dark"}`}
                        placeholder="+57 300 000 0000"
                        {...register("phone")}
                        aria-describedby={errors.phone ? "c-phone-err" : undefined}
                      />
                      {errors.phone && <p id="c-phone-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.phone.message}</p>}
                    </div>

                    {/* Ciudad */}
                    <div>
                      <label htmlFor="c-city" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">Ciudad *</label>
                      <select
                        id="c-city"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors bg-white ${errors.city ? "border-error" : "border-steel-dark"}`}
                        {...register("city")}
                        aria-describedby={errors.city ? "c-city-err" : undefined}
                      >
                        <option value="">Seleccione...</option>
                        {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.city && <p id="c-city-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.city.message}</p>}
                    </div>

                    {/* Aplicación */}
                    <div className="sm:col-span-2">
                      <label htmlFor="c-app" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">¿Cuál es su aplicación? *</label>
                      <select
                        id="c-app"
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-nova-blue transition-colors bg-white ${errors.application ? "border-error" : "border-steel-dark"}`}
                        {...register("application")}
                        aria-describedby={errors.application ? "c-app-err" : undefined}
                      >
                        <option value="">Seleccione...</option>
                        {APPLICATIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                      {errors.application && <p id="c-app-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.application.message}</p>}
                    </div>

                    {/* Mensaje */}
                    <div className="sm:col-span-2">
                      <label htmlFor="c-msg" className="block text-sm font-medium text-text-primary mb-1.5 font-sans">Cuéntenos su reto *</label>
                      <textarea
                        id="c-msg" rows={4}
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
                          <a href="/politica-de-privacidad" className="text-nova-blue hover:underline">política de privacidad</a>
                          {" "}de Nova Measurement SAS y autorizo el tratamiento de mis datos conforme a la Ley 1581 de 2012.
                        </span>
                      </label>
                      {errors.privacy && <p id="c-privacy-err" className="mt-1 text-xs text-error font-sans" role="alert">{errors.privacy.message}</p>}
                    </div>
                  </div>

                  <Button type="submit" fullWidth size="lg" className="mt-6" disabled={loading}>
                    {loading ? "Enviando solicitud..." : "Enviar solicitud"}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar — 2/5 */}
            <aside className="lg:col-span-2 space-y-5">

              {/* WhatsApp CTA */}
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-[#25D366]/8 border border-[#25D366]/25 rounded-xl hover:bg-[#25D366]/15 transition-colors"
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

              {/* Ingenieros por zona */}
              <div className="bg-white border border-steel rounded-xl overflow-hidden">
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-steel bg-steel/30">
                  <MapPin className="w-4 h-4 text-nova-blue shrink-0" aria-hidden="true" />
                  <p className="text-sm font-display font-bold text-text-primary">Ingenieros por zona</p>
                </div>

                <address className="not-italic divide-y divide-steel">
                  {ZONE_CONTACTS.map(({ zone, city, name, phoneHref, phone, whatsapp, email }) => (
                    <div key={`${zone}-${name}`} className="px-5 py-4">
                      {/* Zona */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-medium uppercase tracking-widest text-nova-blue font-sans">{zone}</span>
                        <span className="text-[10px] text-text-muted font-sans">{city}</span>
                      </div>
                      {/* Nombre */}
                      <p className="text-sm font-medium text-text-primary font-sans mb-2.5">{name}</p>
                      {/* Acciones */}
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={phoneHref}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-steel text-xs text-text-muted font-sans hover:border-nova-blue hover:text-nova-blue transition-colors"
                          aria-label={`Llamar a ${name}`}
                        >
                          <Phone className="w-3 h-3 shrink-0" aria-hidden="true" />
                          {phone}
                        </a>
                        <a
                          href={whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#25D366]/10 border border-[#25D366]/30 text-xs text-[#25D366] font-sans hover:bg-[#25D366]/20 transition-colors"
                          aria-label={`WhatsApp a ${name}`}
                        >
                          WA
                        </a>
                        <a
                          href={`mailto:${email}`}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-steel text-xs text-text-muted font-sans hover:border-nova-blue hover:text-nova-blue transition-colors"
                          aria-label={`Email a ${name}`}
                        >
                          <Mail className="w-3 h-3 shrink-0" aria-hidden="true" />
                          {email}
                        </a>
                      </div>
                    </div>
                  ))}
                </address>
              </div>

              {/* Tiempo de respuesta */}
              <div className="bg-nova-navy rounded-xl p-5 text-white">
                <p className="font-display font-bold text-lg mb-1">&lt; 24 horas hábiles</p>
                <p className="text-white/65 text-sm font-sans">
                  Tiempo de respuesta técnica garantizado para todas las solicitudes recibidas.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
