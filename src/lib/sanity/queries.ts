import { sanityClient } from "./client";

/* ─── Queries GROQ — Nova Measurement CMS ───────────────────── */

/* Todos los casos de éxito (para listado y página de casos) */
export const CASE_STUDIES_QUERY = `
  *[_type == "caseStudy"] | order(year desc) {
    slug, client, title, application, fluid, diameter,
    technology, sector, location, year, summary, highlights,
    "image": image.asset->url
  }
`;

/* Caso por slug */
export const CASE_STUDY_BY_SLUG_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    slug, client, title, application, fluid, diameter,
    technology, sector, location, year, summary, highlights,
    "image": image.asset->url,
    "gallery": gallery[].asset->url
  }
`;

/* Todas las tecnologías */
export const TECHNOLOGIES_QUERY = `
  *[_type == "technology"] | order(order asc) {
    slug, name, tagline, description, features, productLines,
    industries, brochureUrl,
    "logo": logo.asset->url
  }
`;

/* Blog posts (últimos N) */
export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
    "slug": slug.current, title, excerpt, publishedAt, category,
    "image": mainImage.asset->url
  }
`;

/* ─── Helpers tipados ───────────────────────────────────────── */
export async function getCaseStudiesCMS() {
  return sanityClient.fetch(CASE_STUDIES_QUERY);
}

export async function getCaseStudyBySlugCMS(slug: string) {
  return sanityClient.fetch(CASE_STUDY_BY_SLUG_QUERY, { slug });
}

export async function getTechnologiesCMS() {
  return sanityClient.fetch(TECHNOLOGIES_QUERY);
}

export async function getBlogPostsCMS(limit = 6) {
  return sanityClient.fetch(BLOG_POSTS_QUERY, { limit });
}
