import { defineField, defineType } from "sanity";

export const MINISTRY_CATEGORIES = [
  { title: "Watch & listen", value: "watch" },
  { title: "Connect", value: "connect" },
  { title: "Grow in faith", value: "grow" },
  { title: "Serve", value: "serve" },
  { title: "Missions & global", value: "missions" },
  { title: "Church life & stories", value: "church-life" },
] as const;

export const ministryPageType = defineType({
  name: "ministryPage",
  title: "Ministry page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: [...MINISTRY_CATEGORIES] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "canonicalPath",
      title: "Primary site path",
      description:
        "If set, cards and links go here instead of /ministries/[slug] (use for Give, Live, Blog, etc.).",
      type: "string",
    }),
    defineField({
      name: "scheduleLabel",
      title: "Schedule label",
      type: "string",
      description: "e.g. Every Wednesday · 6:30 PM CT",
    }),
    defineField({
      name: "scheduleDetails",
      title: "Schedule details",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "venueName", title: "Venue name", type: "string" }),
    defineField({ name: "venueAddress", title: "Venue address", type: "text", rows: 2 }),
    defineField({ name: "zoomLink", title: "Zoom link", type: "url" }),
    defineField({ name: "liveStreamLink", title: "Live stream link", type: "url" }),
    defineField({ name: "externalUrl", title: "External URL", type: "url" }),
    defineField({ name: "ctaLabel", title: "CTA label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA href", type: "string" }),
    defineField({
      name: "heroImageUrl",
      title: "Hero image URL",
      description: "External image URL (Unsplash, pastor site, etc.).",
      type: "url",
    }),
    defineField({ name: "imageAlt", title: "Hero image alt text", type: "string" }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first in ministry listings.",
    }),
    defineField({
      name: "showOnHome",
      title: "Feature on home page",
      type: "boolean",
      initialValue: false,
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
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2 }),
  ],
  orderings: [
    { title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
