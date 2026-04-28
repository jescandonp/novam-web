"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { navItems, contactInfo } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import type { NavItem } from "@/types";

/* ─── Logo ───────────────────────────────────────────────────── */
/* white=true → navbar oscuro: filtro CSS invierte a blanco      */
/* white=false → fondo claro: logo original a color              */
function Logo({ white = false }: { white?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Nova Measurement — Inicio"
      className="flex items-center shrink-0"
    >
      <Image
        src="/images/logo.png"
        alt="Nova Measurement"
        width={160}
        height={60}
        priority
        className={[
          "h-10 w-auto object-contain",
          white ? "brightness-0 invert" : "",
        ].join(" ")}
      />
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
