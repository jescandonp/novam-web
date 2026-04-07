import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

const VALUE_PROPS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        {/* Tubería con sensor externo */}
        <rect x="3" y="9" width="18" height="6" rx="3" />
        <path d="M9 9V7m0 10v-2M15 9V7m0 10v-2" />
        <circle cx="12" cy="4" r="2" />
        <path d="M10 4H8a1 1 0 00-1 1v2" />
        <path d="M14 4h2a1 1 0 011 1v2" />
      </svg>
    ),
    title: "Sin contacto con el fluido",
    description:
      "Los sensores se instalan sobre la tubería existente. Sin perforar, sin bridas, sin válvulas de aislamiento. El proceso sigue corriendo durante la instalación.",
    highlight: "Cero riesgo de fuga",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        {/* Reloj industrial / uptime */}
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 12" />
        <path d="M16.5 3.5l1.5 1.5M7.5 3.5L6 5" />
        <path d="M3 12h1m17 0h-1M12 20v1" />
      </svg>
    ),
    title: "Cero paradas de planta",
    description:
      "Comisione nuevos puntos de medición con el proceso activo, a plena presión y temperatura. Instalación en horas, no en días. Sin necesidad de vaciado ni purga de líneas.",
    highlight: "Instalación en campo activo",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        {/* Mapa Colombia + persona */}
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
        <path d="M18 20c0-2.21-2.69-4-6-4s-6 1.79-6 4" />
      </svg>
    ),
    title: "Soporte técnico local",
    description:
      "Ingenieros con experiencia en campo radicados en Bogotá, Barranquilla y Bucaramanga. Visita técnica, comisionamiento, calibración y postventa — todo desde Colombia.",
    highlight: "3 ciudades de cobertura",
  },
];

export function ValueProps() {
  return (
    <SectionWrapper bg="light" id="valor">
      <SectionHeader
        label="Por qué Nova Measurement"
        title="La diferencia que mide"
        subtitle="Tres razones por las que los ingenieros de instrumentación en Colombia confían en nosotros para sus procesos más críticos."
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {VALUE_PROPS.map((prop, i) => (
          <article
            key={i}
            className="card-base p-8 flex flex-col gap-5"
          >
            {/* Ícono */}
            <div
              className="w-14 h-14 rounded-xl bg-nova-cyan-light flex items-center justify-center text-nova-blue shrink-0"
              aria-hidden="true"
            >
              {prop.icon}
            </div>

            {/* Contenido */}
            <div>
              <h3 className="heading-md text-text-primary mb-2">{prop.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed font-sans">
                {prop.description}
              </p>
            </div>

            {/* Highlight */}
            <div className="mt-auto pt-4 border-t border-steel">
              <span className="label-tech text-nova-blue">✓ {prop.highlight}</span>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
