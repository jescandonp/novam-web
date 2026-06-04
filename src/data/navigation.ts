import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    label: "Soluciones",
    href: "/soluciones",
    children: [
      { label: "Oil & Gas", href: "/soluciones/oil-gas" },
      { label: "Generación de Energía", href: "/soluciones/energia" },
      { label: "Alimentos & Bebidas", href: "/soluciones/alimentos" },
      { label: "Agua & Saneamiento", href: "/soluciones/agua" },
      { label: "Química & Petroquímica", href: "/soluciones/quimica" },
    ],
  },
  {
    label: "Tecnologías",
    href: "/tecnologias",
    children: [
      { label: "Flexim — Medición No Intrusiva", href: "/tecnologias/flexim" },
      { label: "Smar — Instrumentación y Control", href: "/tecnologias/smar" },
      { label: "UWT — Medición de Nivel", href: "/tecnologias/uwt" },
    ],
  },
  {
    label: "Casos de Éxito",
    href: "/casos-de-exito",
  },
  {
    label: "Recursos",
    href: "/recursos",
    children: [
      { label: "Blog Técnico", href: "/recursos/blog" },
      { label: "Catálogos y Fichas", href: "/recursos/descargas" },
      { label: "Calculadora de ROI", href: "/recursos/calculadora-roi" },
    ],
  },
  {
    label: "Nosotros",
    href: "/nosotros",
  },
];

export const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/nova-measurement",
    icon: "linkedin",
  },
];

export const contactInfo = {
  phone: "+57 321 535 4908",
  phoneHref: "tel:+573215354908",
  whatsapp: "https://wa.me/573215354908",
  email: "info@novam.com.co",
  cities: ["Bogotá", "Barranquilla", "Bucaramanga"],
};
