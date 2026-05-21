import { defineArrayMember, defineField, defineType } from "sanity";
import { translationEntryFields } from "./translationEntry";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog post",
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
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "content", title: "Content", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
    defineField({ name: "featuredImage", title: "Featured image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "staffBio" }],
    }),
    defineField({
      name: "translations",
      title: "Translations",
      type: "array",
      of: [defineArrayMember({ type: "object", fields: translationEntryFields })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "featuredImage" },
  },
});
