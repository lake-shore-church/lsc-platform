import { defineField, defineType } from "sanity";

export const siteConfigType = defineType({
  name: "siteConfig",
  title: "Site configuration",
  type: "document",
  fields: [
    defineField({
      name: "churchName",
      title: "Church name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "serviceTimes",
      title: "Service times",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", type: "string", title: "Day" },
            { name: "time", type: "string", title: "Time" },
            { name: "note", type: "string", title: "Note" },
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Platform" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
    defineField({
      name: "activeTheme",
      title: "Active seasonal theme",
      description:
        "Default site appearance for new visitors (users can override via theme switcher).",
      type: "string",
      options: {
        list: [
          { title: "Default (year-round)", value: "default" },
          { title: "Advent", value: "advent" },
          { title: "Easter", value: "easter" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "paypalGivingEnabled",
      title: "PayPal Giving Fund enabled",
      description: "Toggle when 501(c)(3) approved — no code change required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "zeffyEmbedUrl",
      title: "Zeffy embed URL",
      type: "url",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site configuration" }),
  },
});
