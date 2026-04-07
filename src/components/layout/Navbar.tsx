"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { navItems, contactInfo } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/types";

/* ─── Logo SVG ───────────────────────────────────────────────── */
function Logo({ white = false }: { white?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Nova Measurement — Inicio"
      className="flex items-center gap-2.5 shrink-0"
    >
      {/* Isotipo: tres cubos isométricos simplificados */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Cubo grande */}
        <polygon points="18,2 30,9 30,23 18,30 6,23 6,9" fill={white ? "#00A8E8" : "#0056B3"} />
        <polygon points="18,2 30,9 18,16 6,9" fill={white ? "#FFFFFF" : "#0A192F"} opacity="0.6" />
        <polygon points="18,16 30,9 30,23 18,30" fill={white ? "#00A8E8" : "#003D80"} />
        {/* Cubo pequeño superior derecha */}
        <polygon points="28,1 34,4.5 34,11 28,14 22,10.5 22,4" fill={white ? "#FFFFFF" : "#E0E5EC"} opacity="0.85" />
        {/* Cubo pequeño inferior izquierda */}
        <polygon points="8,25 14,28.5 14,35 8,38 2,34.5 2,28" fill={white ? "#00A8E8" : "#0056B3"} opacity="0.7" />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className={[
            "font-display font-black text-xl tracking-tight",
            white ? "text-white" : "text-nova-navy",
          ].join(" ")}
        >
          nova
        </span>
        <span
          className={[
            "font-sans text-[9px] font-medium tracking-[0.18em] uppercase",
            white ? "text-nova-cyan" : "text-nova-blue",
          ].join(" ")}
        >
          MEASUREMENT
        </span>
      </div>
    </Link>
  );
}

/* ─── Dropdown de mega menú ─────────────────────────────────── */
function DropdownMenu({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  /* Cerrar con Escape (accesibilidad) */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  /* Cerrar al hacer click fuera */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        aria-haspopup="true"
        aria-expanded={open}
        className={[
          "flex items-center gap-1 px-1 py-2 text-sm font-medium font-sans transition-colors duration-150 whitespace-nowrap",
          isActive
            ? "text-nova-blue"
            : "text-white/85 hover:text-white",
        ].join(" ")}
      >
        {item.label}
        <ChevronDown
          className={[
            "w-3.5 h-3.5 transition-transform duration-200",
            open ? "rotate-180" : "",
          ].join(" ")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-[0_16px_48px_rgba(10,25,47,0.18)] border border-steel py-2 z-50"
          role="menu"
        >
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={[
                "flex items-center px-4 py-2.5 text-sm font-sans transition-colors duration-100",
                pathname === child.href
                  ? "text-nova-blue font-medium bg-nova-cyan-light"
                  : "text-text-primary hover:bg-steel/50 hover:text-nova-blue",
              ].join(" ")}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Navbar principal ──────────────────────────────────────── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Cerrar menú mobile al navegar */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-nova-navy/98 backdrop-blur-sm shadow-[0_2px_20px_rgba(10,25,47,0.4)]"
          : "bg-nova-navy",
      ].join(" ")}
    >
      <div className="container mx-auto max-w-[1280px] px-6 lg:px-8">
        <nav
          className="flex items-center justify-between h-[72px] gap-8"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <Logo white />

          {/* Desktop nav */}
          <div
            className="hidden lg:flex items-center gap-6"
            onMouseLeave={() => {}}
          >
            {navItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.href} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "px-1 py-2 text-sm font-medium font-sans transition-colors duration-150 whitespace-nowrap",
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/")
                      ? "text-nova-cyan"
                      : "text-white/85 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href={contactInfo.phoneHref}
              className="flex items-center gap-1.5 text-sm text-white/70 hover:text-nova-cyan transition-colors font-sans"
              aria-label="Llamar a Nova Measurement"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{contactInfo.phone}</span>
            </a>
            <Button href="/contacto" size="sm" variant="primary">
              Cotizar
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-white focus-visible:ring-2 focus-visible:ring-nova-cyan rounded"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-nova-navy border-t border-white/10 px-6 py-4 space-y-1"
        >
          {navItems.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className={[
                  "block px-2 py-3 text-base font-medium font-sans border-b border-white/5 transition-colors",
                  pathname.startsWith(item.href)
                    ? "text-nova-cyan"
                    : "text-white/85 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4 space-y-1 mb-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-2 py-2 text-sm text-white/60 hover:text-nova-cyan transition-colors font-sans"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4">
            <Button href="/contacto" fullWidth>
              Solicitar Cotización
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
