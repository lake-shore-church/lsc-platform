import { defineField, defineType } from "sanity";

export const sermonSeriesType = defineType({
  name: "sermonSeries",
  title: "Sermon series",
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
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "artwork", title: "Artwork", type: "image", options: { hotspot: true } }),
    defineField({ name: "startDate", title: "Start date", type: "date" }),
    defineField({ name: "endDate", title: "End date", type: "date" }),
    defineField({
      name: "themeColor",
      title: "Theme color",
      type: "string",
      initialValue: "#1B4F8A",
    }),
  ],
  preview: {
    select: { title: "title", media: "artwork" },
  },
});
