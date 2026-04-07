import { defineField, defineType } from "sanity";

export const blogPostSchema = defineType({
  name: "blogPost",
  title: "Artículo del Blog",
  type: "document",
  groups: [
    { name: "content", title: "Contenido" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título del artículo",
      type: "string",
      group: "content",
      validation: (r) => r.required().min(10).max(120),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      group: "content",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Medición No Intrusiva", value: "medicion-no-intrusiva" },
          { title: "Oil & Gas", value: "oil-gas" },
          { title: "Instrumentación Industrial", value: "instrumentacion" },
          { title: "Casos de Aplicación", value: "aplicaciones" },
          { title: "Guías Técnicas", value: "guias" },
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha de publicación",
      type: "datetime",
      group: "content",
    }),
    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Resumen / Extracto",
      type: "text",
      group: "content",
      rows: 3,
      validation: (r) => r.max(300),
    }),
    defineField({
      name: "body",
      title: "Contenido del artículo",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
            defineField({ name: "caption", type: "string", title: "Pie de foto" }),
          ],
        },
      ],
    }),
    defineField({
      name: "metaTitle",
      title: "Meta título SEO",
      type: "string",
      group: "seo",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta descripción SEO",
      type: "text",
      group: "seo",
      rows: 2,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "relatedPosts",
      title: "Artículos relacionados",
      type: "array",
      group: "seo",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "mainImage" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString("es-CO")
          : "Sin fecha",
        media,
      };
    },
  },
});
