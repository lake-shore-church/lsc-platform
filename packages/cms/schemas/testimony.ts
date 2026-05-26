import { defineField, defineType } from "sanity";

export const testimonyType = defineType({
  name: "testimony",
  title: "Testimony",
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
      name: "kind",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Written story", value: "story" },
          { title: "Video", value: "video" },
          { title: "Audio", value: "audio" },
        ],
      },
      initialValue: "story",
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 4 }),
    defineField({ name: "body", title: "Full story", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "imageUrl", title: "Photo URL", type: "url" }),
    defineField({ name: "videoUrl", title: "Video URL", type: "url" }),
    defineField({ name: "audioUrl", title: "Audio URL", type: "url" }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Draft", value: "draft" },
        ],
      },
      initialValue: "published",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "kind" },
  },
});
