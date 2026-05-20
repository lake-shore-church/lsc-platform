import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
    defineField({ name: "startsAt", title: "Starts at", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "endsAt", title: "Ends at", type: "datetime" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "ministryArea", title: "Ministry area", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "isRecurring", title: "Recurring", type: "boolean", initialValue: false }),
    defineField({ name: "recurrenceRule", title: "Recurrence rule (iCal RRULE)", type: "string" }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
