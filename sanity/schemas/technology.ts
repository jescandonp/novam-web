import { defineField, defineType } from "sanity";

export const technologySchema = defineType({
  name: "technology",
  title: "Tecnología / Marca",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre de la marca",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "string",
      options: {
        list: [
          { title: "Flexim", value: "flexim" },
          { title: "Smar", value: "smar" },
          { title: "UWT", value: "uwt" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Orden de aparición",
      type: "number",
      initialValue: 1,
    }),
    defineField({
      name: "tagline",
      title: "Tagline corto",
      type: "string",
      description: "Ej: Medición no intrusiva clamp-on",
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: false },
    }),
    defineField({
      name: "features",
      title: "Características clave",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "productLines",
      title: "Líneas de productos",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "industries",
      title: "Sectores que atiende",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "brochureUrl",
      title: "URL del catálogo PDF",
      type: "string",
      description: "Ruta relativa: /downloads/catalogo-flexim.pdf",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "logo" },
  },
});
