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
      initialValue: "Lake Shore Church — West Loop",
    }),
    defineField({
      name: "tagline",
      title: "Hero tagline (H1)",
      type: "text",
      rows: 2,
      description: "Primary headline on the home page.",
    }),
    defineField({
      name: "subTagline",
      title: "Hero sub-tagline (H2)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroBody",
      title: "Hero body copy",
      type: "string",
      initialValue: "Our church can help you follow Jesus.",
    }),
    defineField({
      name: "addressLine1",
      title: "Address line 1",
      type: "string",
      description: "Building or venue name.",
    }),
    defineField({
      name: "addressLine2",
      title: "Address line 2",
      type: "string",
      description: "Street address.",
    }),
    defineField({
      name: "cityStateZip",
      title: "City, state, ZIP",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Full address (legacy)",
      type: "text",
      rows: 3,
      description: "Optional; structured lines above are preferred.",
    }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "serviceDay",
      title: "Service day",
      type: "string",
      initialValue: "Sunday",
    }),
    defineField({
      name: "serviceTime",
      title: "Service time",
      type: "string",
      initialValue: "10:00 AM",
    }),
    defineField({
      name: "pastorName",
      title: "Lead pastor name",
      type: "string",
    }),
    defineField({
      name: "serviceTimes",
      title: "Service times (legacy list)",
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
          { title: "Bold (everyday — sermon-first)", value: "bold" },
          { title: "Warm (welcoming & community)", value: "warm" },
          { title: "Advent (Christmas season)", value: "advent" },
          { title: "Easter (spring & resurrection)", value: "easter" },
        ],
      },
      initialValue: "bold",
    }),
    defineField({
      name: "paypalGivingEnabled",
      title: "PayPal Giving Fund active",
      description: "Toggle when 501(c)(3) approved — no code change required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "zeffyEmbedUrl",
      title: "Zeffy embed URL",
      type: "string",
      description: "Leave empty until Zeffy account is ready.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site configuration" }),
  },
});
