import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada — Nova Measurement",
  description: "La página que busca no existe. Vuelva al inicio o explore nuestras soluciones de medición industrial.",
};

const QUICK_LINKS = [
  { label: "Soluciones Oil & Gas", href: "/soluciones/oil-gas" },
  { label: "Soluciones Energía", href: "/soluciones/energia" },
  { label: "Tecnología Flexim", href: "/tecnologias/flexim" },
  { label: "Tecnología Smar", href: "/tecnologias/smar" },
  { label: "Casos de Éxito", href: "/casos-de-exito" },
  { label: "Contacto", href: "/contacto" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-nova-navy flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Isometric background pattern */}
      <div className="absolute inset-0 pattern-iso opacity-[0.04]" aria-hidden="true" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,168,232,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 display */}
        <div className="font-mono font-bold text-[120px] lg:text-[180px] leading-none text-white/5 select-none mb-4" aria-hidden="true">
          404
        </div>

        <div className="-mt-8 lg:-mt-14 mb-8">
          <span className="inline-block px-3 py-1 bg-nova-cyan/10 border border-nova-cyan/20 rounded-full text-nova-cyan text-xs font-mono font-bold tracking-widest uppercase mb-6">
            Página no encontrada
          </span>
          <h1 className="font-display font-black text-3xl lg:text-4xl text-white mb-4 leading-tight">
            Esta tubería no lleva a ningún lado
          </h1>
          <p className="text-white/55 text-base font-sans leading-relaxed max-w-md mx-auto">
            La página que busca no existe o fue movida. Use los enlaces de abajo para encontrar
            la información técnica que necesita.
          </p>
        </div>

        {/* Acciones principales */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nova-blue text-white font-display font-bold text-sm uppercase tracking-wide rounded hover:bg-nova-blue-dark transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Ir al inicio
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/20 text-white font-display font-bold text-sm uppercase tracking-wide rounded hover:border-nova-cyan/60 hover:text-nova-cyan transition-colors"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Hablar con un ingeniero
          </Link>
        </div>

        {/* Links rápidos */}
        <div>
          <p className="text-white/30 text-xs font-sans uppercase tracking-widest mb-4">
            Páginas más visitadas
          </p>
          <nav aria-label="Páginas sugeridas">
            <ul className="flex flex-wrap justify-center gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 hover:text-nova-cyan hover:border-nova-cyan/30 transition-colors font-sans group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
}
