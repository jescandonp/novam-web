import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./sanity/schemas";

export default defineConfig({
  name: "nova-measurement-cms",
  title: "Nova Measurement — CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "replace-me",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Nova Measurement CMS")
          .items([
            S.listItem()
              .title("Casos de Éxito")
              .child(S.documentTypeList("caseStudy")),
            S.listItem()
              .title("Tecnologías")
              .child(S.documentTypeList("technology")),
            S.listItem()
              .title("Blog Técnico")
              .child(S.documentTypeList("blogPost")),
          ]),
    }),
  ],

  schema: { types: schemas },
});
