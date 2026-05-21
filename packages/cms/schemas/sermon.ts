import { defineArrayMember, defineField, defineType } from "sanity";
import { translationEntryFields } from "./translationEntry";

export const sermonType = defineType({
  name: "sermon",
  title: "Sermon",
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
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
    defineField({ name: "scripture", title: "Scripture reference", type: "string" }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "videoUrl", title: "Video URL (R2 or external)", type: "url" }),
    defineField({ name: "audioUrl", title: "Audio URL", type: "url" }),
    defineField({ name: "featuredImage", title: "Featured image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "series",
      title: "Series",
      type: "reference",
      to: [{ type: "sermonSeries" }],
    }),
    defineField({
      name: "pastor",
      title: "Speaker",
      type: "reference",
      to: [{ type: "staffBio" }],
    }),
    defineField({
      name: "translations",
      title: "Translations",
      description: "AI drafts and volunteer-reviewed translations per language.",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: translationEntryFields })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "scripture", media: "featuredImage" },
  },
});
