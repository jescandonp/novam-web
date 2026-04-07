/* ─── Tipos globales del sitio Nova Measurement ─────────────── */

export type Sector =
  | "oil-gas"
  | "energia"
  | "alimentos"
  | "agua"
  | "quimica"
  | "general";

export type Brand = "flexim" | "smar" | "uwt";

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  application: string;
  fluid: string;
  diameter?: string;
  technology: Brand;
  sector: Sector;
  location: string;
  year: number;
  image: string;
  summary: string;
  highlights: string[];
}

export interface Technology {
  slug: Brand;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  accentColor: string;
  features: string[];
  productLines: string[];
  industries: string[];
  brochureUrl: string;
}

export interface Industry {
  slug: Sector;
  name: string;
  description: string;
  applications: string[];
  image: string;
  technologies: Brand[];
  clients: string[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

export interface LeadFormData {
  name: string;
  company: string;
  role: string;
  email: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  city: string;
  application: string;
  message: string;
}
