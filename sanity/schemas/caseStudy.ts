import { defineField, defineType } from "sanity";

export const caseStudySchema = defineType({
  name: "caseStudy",
  title: "Caso de Éxito",
  type: "document",
  groups: [
    { name: "info", title: "Información básica" },
    { name: "media", title: "Fotos y galería" },
    { name: "content", title: "Contenido" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título del caso",
      type: "string",
      group: "info",
      validation: (r) => r.required().min(10).max(120),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      group: "info",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      title: "Cliente",
      type: "string",
      group: "info",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "application",
      title: "Aplicación",
      type: "string",
      group: "info",
      description: "Ej: Caudal de fuel oil, Posicionador de válvula",
    }),
    defineField({
      name: "fluid",
      title: "Fluido medido",
      type: "string",
      group: "info",
    }),
    defineField({
      name: "diameter",
      title: "Diámetro de tubería",
      type: "string",
      group: "info",
      description: 'Ej: 4", 54"',
    }),
    defineField({
      name: "technology",
      title: "Tecnología utilizada",
      type: "string",
      group: "info",
      options: {
        list: [
          { title: "Flexim (clamp-on)", value: "flexim" },
          { title: "Smar (instrumentación)", value: "smar" },
          { title: "UWT (nivel)", value: "uwt" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sector",
      title: "Sector industrial",
      type: "string",
      group: "info",
      options: {
        list: [
          { title: "Oil & Gas", value: "oil-gas" },
          { title: "Generación de Energía", value: "energia" },
          { title: "Alimentos & Bebidas", value: "alimentos" },
          { title: "Agua & Saneamiento", value: "agua" },
          { title: "Química & Petroquímica", value: "quimica" },
          { title: "Industrial general", value: "general" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Ubicación",
      type: "string",
      group: "info",
      description: "Ej: Llanos Orientales, Colombia",
    }),
    defineField({
      name: "year",
      title: "Año del proyecto",
      type: "number",
      group: "info",
    }),
    defineField({
      name: "image",
      title: "Imagen principal",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo (accesibilidad)",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Galería de imágenes",
      type: "array",
      group: "media",
      of: [
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
      name: "summary",
      title: "Resumen del caso",
      type: "text",
      group: "content",
      rows: 4,
      validation: (r) => r.required().min(50).max(400),
    }),
    defineField({
      name: "highlights",
      title: "Resultados / Highlights",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      description: "Máximo 5 resultados concretos y medibles",
    }),
    defineField({
      name: "body",
      title: "Contenido detallado",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "metaDescription",
      title: "Meta descripción SEO",
      type: "text",
      group: "seo",
      rows: 2,
      validation: (r) => r.max(160),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "image" },
  },
});
