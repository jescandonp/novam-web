const CLIENTS = [
  "Geopark",
  "Perenco Colombia",
  "Termoguajira",
  "Gases del Caribe",
  "Termovalle",
  "Bioenergy",
  "Linde",
  "Smurfit Kappa",
  "Grantierra",
  "EMCARTAGO",
  "Descafecol",
];

// Duplicamos para el loop continuo sin saltos visibles
const MARQUEE_ITEMS = [...CLIENTS, ...CLIENTS];

export function TrustBar() {
  return (
    <div
      className="bg-white border-b border-steel py-5 overflow-hidden"
      aria-label="Empresas que confían en Nova Measurement"
    >
      <div className="flex items-center">
        {/* Label fijo — fuera del scroll */}
        <div className="shrink-0 pl-6 lg:pl-12 pr-5 flex items-center gap-4 bg-white z-10">
          <p className="label-tech text-text-muted whitespace-nowrap">
            Empresas que confían:
          </p>
          <div className="w-px h-4 bg-steel-dark" aria-hidden="true" />
        </div>

        {/* Pista del carrusel */}
        <div className="relative flex-1 overflow-hidden">
          {/* Fade izquierdo */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, white 30%, transparent)" }}
            aria-hidden="true"
          />
          {/* Fade derecho */}
          <div
            className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, white 30%, transparent)" }}
            aria-hidden="true"
          />

          {/* Banda con animación marquee definida en globals.css / tailwind */}
          <div
            className="flex w-max"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {MARQUEE_ITEMS.map((client, i) => (
              <span
                key={i}
                className="shrink-0 text-sm font-medium text-text-muted font-sans whitespace-nowrap px-6"
                aria-hidden={i >= CLIENTS.length ? "true" : undefined}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes inline para no depender de config Tailwind */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
