import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { navItems, contactInfo } from "@/data/navigation";

function FooterLogo() {
  return (
    <Link href="/" aria-label="Nova Measurement — Inicio" className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polygon points="18,2 30,9 30,23 18,30 6,23 6,9" fill="#00A8E8" />
        <polygon points="18,2 30,9 18,16 6,9" fill="#FFFFFF" opacity="0.4" />
        <polygon points="18,16 30,9 30,23 18,30" fill="#0056B3" />
        <polygon points="28,1 34,4.5 34,11 28,14 22,10.5 22,4" fill="#FFFFFF" opacity="0.7" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display font-black text-lg text-white tracking-tight">nova</span>
        <span className="font-sans text-[8px] font-medium tracking-[0.18em] uppercase text-nova-cyan">MEASUREMENT</span>
      </div>
    </Link>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nova-navy text-white" aria-label="Pie de página">
      {/* Línea decorativa superior */}
      <div className="h-0.5 gradient-line" aria-hidden="true" />

      <div className="container mx-auto max-w-[1280px] px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Columna 1: Marca */}
          <div className="lg:col-span-1">
            <FooterLogo />
            <p className="mt-5 text-sm text-white/60 leading-relaxed font-sans max-w-xs">
              Distribuidor técnico especializado en medición industrial no intrusiva en Colombia.
              Partner exclusivo Smar y distribuidor autorizado Flexim.
            </p>
            <div className="mt-6">
              <a
                href={contactInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded-md text-sm font-medium font-sans hover:bg-[#25D366]/20 transition-colors"
                aria-label="Contactar por WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp directo
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-widest mb-5">
              Sitio
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-nova-cyan transition-colors font-sans"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contacto" className="text-sm text-nova-cyan hover:text-white transition-colors font-sans font-medium">
                  Solicitar Cotización →
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Tecnologías */}
          <div>
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-widest mb-5">
              Tecnologías
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tecnologias/flexim" className="text-sm text-white/60 hover:text-nova-cyan transition-colors font-sans">
                  Flexim — Clamp-On
                </Link>
              </li>
              <li>
                <Link href="/tecnologias/smar" className="text-sm text-white/60 hover:text-nova-cyan transition-colors font-sans">
                  Smar — Instrumentación
                </Link>
              </li>
              <li>
                <Link href="/tecnologias/uwt" className="text-sm text-white/60 hover:text-nova-cyan transition-colors font-sans">
                  UWT — Nivel Industrial
                </Link>
              </li>
              <li className="pt-2 border-t border-white/10">
                <Link href="/recursos/descargas" className="text-sm text-white/60 hover:text-nova-cyan transition-colors font-sans">
                  Catálogos PDF
                </Link>
              </li>
              <li>
                <Link href="/recursos/calculadora-roi" className="text-sm text-white/60 hover:text-nova-cyan transition-colors font-sans">
                  Calculadora de ROI
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-widest mb-5">
              Contacto
            </h3>
            <address className="not-italic space-y-3.5">
              <a
                href={contactInfo.phoneHref}
                className="flex items-start gap-2.5 text-sm text-white/60 hover:text-nova-cyan transition-colors font-sans group"
              >
                <Phone className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-nova-cyan" aria-hidden="true" />
                {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-start gap-2.5 text-sm text-white/60 hover:text-nova-cyan transition-colors font-sans group"
              >
                <Mail className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                {contactInfo.email}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/60 font-sans">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-nova-cyan" aria-hidden="true" />
                <div className="space-y-1">
                  {contactInfo.cities.map((city) => (
                    <div key={city}>{city}</div>
                  ))}
                </div>
              </div>
            </address>

            {/* Social */}
            <div className="mt-6">
              <a
                href="https://www.linkedin.com/company/nova-measurement"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nova Measurement en LinkedIn"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-white/20 text-white/60 hover:border-nova-cyan hover:text-nova-cyan transition-colors"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 font-sans">
          <p>© {currentYear} Nova Measurement SAS. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <Link href="/politica-de-privacidad" className="hover:text-white/70 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white/70 transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
