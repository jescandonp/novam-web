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
        {/* Panel de instrumentos industriales */}
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <circle cx="8" cy="10" r="2.5" />
        <path d="M8 7.5V6M5.5 10H4M10.5 10H8" />
        <path d="M14 7h5M14 10h5M14 13h3" />
      </svg>
    ),
    title: "Instrumentación completa Smar",
    description:
      "Más allá del caudal: presión, temperatura, densidad, concentración y posición de válvulas con instrumentación Smar. Ajuste local completo en campo, cortos tiempos de entrega y stock disponible en Colombia.",
    highlight: "Presión · Temperatura · Posición",
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
      "Ingenieros con experiencia en campo radicados en Barranquilla, Bogotá, Bucaramanga y Cali. Visita técnica, comisionamiento, calibración y postventa — todo desde Colombia.",
    highlight: "5 ciudades con presencia directa",
  },
];

export function ValueProps() {
  return (
    <SectionWrapper bg="light" id="valor">
      <SectionHeader
        label="Por qué Nova Measurement"
        title="La diferencia que mide"
        subtitle="Tres razones por las que los ingenieros de instrumentación en Colombia confían en Nova Measurement para sus procesos más críticos."
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-steel">
        {VALUE_PROPS.map((prop, i) => (
          <article
            key={i}
            className="bg-white p-10 flex flex-col gap-6 hover:bg-steel/20 transition-colors group"
          >
            {/* Ícono — cuadrado con borde, fill en hover */}
            <div
              className="w-12 h-12 border border-nova-blue text-nova-blue flex items-center justify-center shrink-0 group-hover:bg-nova-blue group-hover:text-white transition-colors duration-200"
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
