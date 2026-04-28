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

export function TrustBar() {
  return (
    <div
      className="bg-white border-b border-steel py-6"
      aria-label="Empresas que confían en Nova Measurement"
    >
      <div className="container mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Label */}
          <p className="label-tech text-text-muted shrink-0 whitespace-nowrap">
            Empresas que confían:
          </p>

          {/* Línea divisora */}
          <div className="hidden sm:block w-px h-5 bg-steel-dark shrink-0" aria-hidden="true" />

          {/* Lista de clientes con overflow */}
          <div className="relative w-full overflow-hidden">
            {/* Gradiente de fade en los bordes */}
            <div
              className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, white, transparent)" }}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, white, transparent)" }}
              aria-hidden="true"
            />

            <ul
              className="flex flex-wrap sm:flex-nowrap sm:overflow-x-auto gap-x-7 gap-y-2 scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {CLIENTS.map((client) => (
                <li
                  key={client}
                  className="shrink-0 text-sm font-medium text-text-muted hover:text-nova-blue transition-colors font-sans whitespace-nowrap"
                >
                  {client}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
