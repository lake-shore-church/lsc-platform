import { defineField } from "sanity";

const LOCALE_OPTIONS = [
  { title: "Español", value: "es" },
  { title: "中文", value: "zh" },
  { title: "日本語", value: "ja" },
  { title: "தமிழ்", value: "ta" },
  { title: "Filipino", value: "tl" },
  { title: "हिन्दी", value: "hi" },
  { title: "Français", value: "fr" },
];

/** Reusable translation row for sermons and blog posts (volunteer review workflow). */
export const translationEntryFields = [
  defineField({
    name: "locale",
    title: "Language",
    type: "string",
    options: { list: LOCALE_OPTIONS },
    validation: (r) => r.required(),
  }),
  defineField({ name: "title", title: "Translated title", type: "string" }),
  defineField({ name: "excerpt", title: "Translated excerpt", type: "text", rows: 4 }),
  defineField({
    name: "status",
    title: "Status",
    type: "string",
    options: {
      list: [
        { title: "Draft", value: "draft" },
        { title: "Review", value: "review" },
        { title: "Published", value: "published" },
      ],
    },
    initialValue: "draft",
  }),
  defineField({ name: "reviewer", title: "Reviewer", type: "string" }),
  defineField({ name: "approved", title: "Approved for publish", type: "boolean", initialValue: false }),
];
