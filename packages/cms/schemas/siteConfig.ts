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
      type: "text",
      rows: 2,
      initialValue:
        "In a world of pain, death, and evil, there is hope in the Son of God.",
    }),
    defineField({
      name: "heroCtaText",
      title: "Hero CTA line (below buttons)",
      type: "string",
      initialValue: "Our church can help you follow Jesus.",
    }),
    defineField({
      name: "distinctives",
      title: "Church distinctives",
      description: "Used on About and Beliefs pages.",
      type: "text",
      rows: 2,
      initialValue:
        "Find inerrant truth from Scripture in a world of confusion.",
    }),
    defineField({
      name: "serviceInvitation",
      title: "Visit page invitation",
      type: "string",
      initialValue: "We hope to see you there!",
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
    defineField({
      name: "isLiveNow",
      title: "Is live now",
      description:
        "Turn ON when Sunday service is streaming. Website and app show the live player.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "liveVideoId",
      title: "Live video ID",
      description: "YouTube video ID for the current live stream (11 characters).",
      type: "string",
    }),
    defineField({
      name: "liveStreamUrl",
      title: "Live stream URL",
      description: "Full YouTube watch URL for the current broadcast.",
      type: "url",
    }),
    defineField({
      name: "youtubeChannelId",
      title: "YouTube channel ID",
      description:
        "Optional. Used for /live embed when live without a video ID (live_stream?channel=…).",
      type: "string",
    }),
    defineField({
      name: "nextServiceDate",
      title: "Next service date (override)",
      description:
        "Optional. Overrides automatic next-Sunday 10:00 AM CT countdown.",
      type: "datetime",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site configuration" }),
  },
});
