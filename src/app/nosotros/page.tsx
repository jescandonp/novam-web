import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { CTABanner } from "@/components/sections/CTABanner";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Phone, Mail } from "lucide-react";
import { contactInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Nosotros — Misión, Visión y Valores",
  description:
    "Nova Measurement SAS: referente técnico en medición industrial no intrusiva en Colombia. Conoce nuestra misión, visión, política integral y valores corporativos.",
};

/* Valores corporativos — fuente: Gestión Estratégica 2025-2030 */
const VALUES = [
  {
    title: "Fidelidad Técnica",
    description:
      "Garantizamos precisión, estabilidad y trazabilidad en cada medición. Nuestras soluciones cumplen estándares internacionales y son validadas en campo para asegurar resultados confiables y decisiones operativas seguras.",
  },
  {
    title: "Integridad Consultiva",
    description:
      "Actuamos con transparencia y responsabilidad técnica. Cada recomendación nace de comprender el proceso del cliente y proponer soluciones alineadas con sus objetivos, riesgos y normativas aplicables.",
  },
  {
    title: "Innovación Aplicada",
    description:
      "Adoptamos tecnologías de última generación que elevan la eficiencia, reducen riesgos y generan ventajas competitivas sostenibles para nuestros clientes y aliados.",
  },
  {
    title: "Excelencia en la Experiencia",
    description:
      "Convertimos cada interacción en una oportunidad de crear valor. Escuchamos, anticipamos necesidades y acompañamos con una atención multicanal coherente durante todo el ciclo de vida del servicio.",
  },
  {
    title: "Soporte Confiable",
    description:
      "Nuestra relación no termina con la venta. Ofrecemos acompañamiento técnico especializado, mantenimiento, seguimiento y postventa enfocada en disponibilidad operativa y tranquilidad.",
  },
  {
    title: "Colaboración Estratégica",
    description:
      "Construimos soluciones junto a nuestros clientes y aliados. Integramos conocimiento técnico, visión compartida y trabajo conjunto para alcanzar resultados superiores durante todo el ciclo de vida del servicio.",
  },
  {
    title: "Rigor y Control en la Ejecución",
    description:
      "Aplicamos disciplina operativa en cada proyecto. Desde la selección del equipo hasta la instalación y el soporte, garantizamos cumplimiento normativo, trazabilidad, seguridad y excelencia técnica.",
  },
  {
    title: "Compromiso con la Sostenibilidad",
    description:
      "Actuamos de forma responsable con el entorno, promoviendo prácticas seguras, eficientes y ambientalmente responsables en todas nuestras operaciones.",
  },
];

const OFFICES = [
  {
    city: "Barranquilla",
    role: "Gerencia General",
    region: "Atlántico",
    name: "Antonio Sancivier",
    phone: "+57 321 535 4908",
    phoneHref: "tel:+573215354908",
    email: "asancivier@novam.com.co",
  },
  {
    city: "Bogotá",
    role: "Zona Centro · Llanos",
    region: "Cundinamarca",
    name: "Cristian Medina",
    phone: "+57 311 870 7943",
    phoneHref: "tel:+573118707943",
    email: "cmedina@novam.com.co",
  },
  {
    city: "Bucaramanga",
    role: "Zona Santander",
    region: "Santander",
    name: "Brandon Delgado",
    phone: "+57 316 749 8585",
    phoneHref: "tel:+573167498585",
    email: "bdelgado@novam.com.co",
  },
  {
    city: "Barranquilla",
    role: "Zona Norte",
    region: "Atlántico",
    name: "Nikol Carrillo",
    phone: "+57 300 616 6214",
    phoneHref: "tel:+573006166214",
    email: "ncarrillo@novam.com.co",
  },
  {
    city: "Cali",
    role: "Zona Pacífico · Sur",
    region: "Valle del Cauca",
    name: "Carolina González",
    phone: "+57 310 879 0678",
    phoneHref: "tel:+573108790678",
    email: "cgonzalez@novam.com.co",
  },
];

const ALLIANCES = [
  {
    name: "Flexim (Emerson)",
    role: "Distribuidor Autorizado",
    detail: "Medición ultrasónica no intrusiva clamp-on. +30 años de innovación. 150 países.",
  },
  {
    name: "Smar",
    role: "Partner Exclusivo en Colombia",
    detail: "Instrumentación y control industrial. +50 años de trayectoria. +30 patentes.",
  },
  {
    name: "UWT",
    role: "Alianza Estratégica",
    detail: "Tecnología alemana de medición de nivel. 6 años de garantía. 90+ países.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Nosotros" }]}
        label="Nova Measurement SAS"
        title="El socio técnico que Colombia industrial necesita"
        subtitle="Somos especialistas en soluciones de medición, automatización y control para la industria de procesos. Nos diferenciamos por nuestra consultoría técnica cercana y transferencia de conocimiento constante."
      />

      {/* Misión y Visión */}
      <SectionWrapper bg="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader label="01" title="Nuestra Misión" />
            <p className="text-text-primary text-lg leading-relaxed font-sans">
              Impulsamos la eficiencia, confiabilidad y sostenibilidad de la industria de procesos en
              Colombia a través de soluciones de medición, automatización y control de última generación.
              Como socios estratégicos, integramos tecnologías de alta precisión — incluyendo medición
              no intrusiva — para resolver los desafíos críticos de operación.
            </p>
            <p className="mt-4 text-text-muted text-base leading-relaxed font-sans">
              Nos diferenciamos por ofrecer una consultoría técnica cercana y transferencia de
              conocimiento constante, asegurando que nuestros clientes obtengan no solo la mejor
              tecnología, sino el respaldo experto para garantizar disponibilidad operativa y
              resultados tangibles.
            </p>
          </div>
          <div>
            <SectionHeader label="02" title="Nuestra Visión" />
            <p className="text-text-primary text-lg leading-relaxed font-sans">
              Consolidarnos como el referente técnico indiscutible en Colombia para la optimización
              de procesos industriales, liderando el mercado mediante la integración de tecnologías
              de medición y automatización de vanguardia.
            </p>
            <p className="mt-4 text-text-muted text-base leading-relaxed font-sans">
              Aspiramos a ser reconocidos no solo por la precisión de nuestras soluciones, sino por
              nuestra capacidad de transformar desafíos complejos en eficiencia operativa y
              sostenibilidad para nuestros clientes, construyendo relaciones de largo plazo basadas
              en la transferencia de conocimiento, la excelencia en el servicio y la confianza absoluta.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Valores */}
      <SectionWrapper bg="light">
        <SectionHeader
          label="Valores Corporativos"
          title="Lo que guía cada decisión"
          subtitle="Nuestros valores no son palabras en una pared — son los criterios con los que tomamos decisiones técnicas y comerciales todos los días."
          centered
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <article key={v.title} className="card-base p-6">
              <span
                className="font-mono text-xs text-nova-cyan font-bold mb-3 block"
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <h3 className="font-display font-bold text-base text-text-primary mb-2">
                {v.title}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed font-sans">{v.description}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* Política integral */}
      <SectionWrapper bg="dark" pattern>
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            label="Política Integral"
            title="Compromiso con la calidad, la seguridad y el medioambiente"
            light
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[
              { icon: "🏆", label: "Calidad", desc: "ISO 9001 como referente de excelencia técnica" },
              { icon: "🦺", label: "Seguridad", desc: "SST: prevención de incidentes y bienestar del equipo" },
              { icon: "🌿", label: "Medioambiente", desc: "Uso eficiente de recursos y prácticas responsables" },
              { icon: "🤝", label: "Ética", desc: "Transparencia, integridad y responsabilidad en cada acción" },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-colors">
                <span className="text-3xl mb-3 block" aria-hidden="true">{item.icon}</span>
                <h3 className="font-display font-bold text-white mb-1">{item.label}</h3>
                <p className="text-white/55 text-xs font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Alianzas */}
      <SectionWrapper bg="white">
        <SectionHeader
          label="Alianzas Comerciales"
          title="Tecnología de clase mundial, soporte colombiano"
          subtitle="Representamos las marcas líderes globales con el conocimiento local para aplicarlas correctamente."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALLIANCES.map((a) => (
            <div key={a.name} className="card-base p-6">
              <Badge variant="tech" className="mb-4">{a.role}</Badge>
              <h3 className="font-display font-black text-2xl text-nova-navy mb-1">{a.name}</h3>
              <p className="text-text-muted text-sm font-sans leading-relaxed">{a.detail}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Presencia */}
      <SectionWrapper bg="light">
        <SectionHeader
          label="Cobertura Nacional"
          title="Presencia en toda Colombia"
          subtitle="Ingenieros radicados en las principales ciudades industriales del país para respuesta rápida y soporte técnico en campo."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFICES.map((o) => (
            <address key={`${o.city}-${o.name}`} className="not-italic card-base p-6">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-nova-cyan" aria-hidden="true" />
                <span className="font-display font-bold text-xl text-text-primary">{o.city}</span>
              </div>
              <p className="text-nova-blue text-sm font-medium font-sans mb-1">{o.role}</p>
              <p className="text-text-muted text-sm font-sans">{o.region}, Colombia</p>
              <p className="text-text-primary text-sm font-medium font-sans mt-3">{o.name}</p>
              <div className="mt-3 pt-3 border-t border-steel space-y-2">
                <a href={o.phoneHref} className="flex items-center gap-2 text-sm text-text-muted hover:text-nova-blue transition-colors font-sans">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  {o.phone}
                </a>
                <a href={`mailto:${o.email}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-nova-blue transition-colors font-sans">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  {o.email}
                </a>
              </div>
            </address>
          ))}
        </div>
      </SectionWrapper>

      <CTABanner
        title="¿Quiere conocer más sobre Nova Measurement?"
        subtitle="Hablemos de cómo podemos convertirnos en el socio técnico de referencia para su planta."
        primaryLabel="Contáctenos"
      />
    </>
  );
}
