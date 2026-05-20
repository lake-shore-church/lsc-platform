import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "pageType",
      title: "Page type",
      type: "string",
      options: {
        list: [
          { title: "About", value: "about" },
          { title: "Beliefs", value: "beliefs" },
          { title: "Plan a visit", value: "visit" },
          { title: "Custom", value: "custom" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "title", subtitle: "pageType" },
  },
});
