import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/caseStudies";
import { technologies } from "@/data/technologies";
import { industries } from "@/data/industries";
import { blogPosts } from "@/data/blogPosts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.novam.com.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Páginas estáticas ─────────────────────────────────────── */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/nosotros`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/soluciones`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tecnologias`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/casos-de-exito`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/recursos/descargas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${BASE_URL}/recursos/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/recursos/calculadora-roi`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  /* ── Páginas de sector ─────────────────────────────────────── */
  const sectorRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${BASE_URL}/soluciones/${industry.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  /* ── Páginas de tecnología ─────────────────────────────────── */
  const techRoutes: MetadataRoute.Sitemap = technologies.map((tech) => ({
    url: `${BASE_URL}/tecnologias/${tech.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  /* ── Casos de éxito ────────────────────────────────────────── */
  const caseRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE_URL}/casos-de-exito/${cs.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.75,
  }));

  /* ── Blog posts ────────────────────────────────────────────── */
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/recursos/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.65,
  }));

  return [
    ...staticRoutes,
    ...sectorRoutes,
    ...techRoutes,
    ...caseRoutes,
    ...blogRoutes,
  ];
}
