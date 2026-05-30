import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@repo/cms/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "7hl877lg";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "lsc-platform",
  title: "Lake Shore Church",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("📅 This Week")
              .schemaType("thisWeek")
              .child(
                S.documentTypeList("thisWeek")
                  .title("This Week")
                  .defaultOrdering([{ field: "week_of", direction: "desc" }]),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "thisWeek",
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
