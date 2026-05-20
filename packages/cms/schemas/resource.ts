import { defineField, defineType } from "sanity";

export const resourceType = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Book", value: "book" },
          { title: "PDF", value: "pdf" },
          { title: "Link", value: "link" },
        ],
      },
      initialValue: "book",
    }),
    defineField({ name: "externalUrl", title: "External URL", type: "url" }),
    defineField({
      name: "isPublic",
      title: "Public",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "type" },
  },
});
