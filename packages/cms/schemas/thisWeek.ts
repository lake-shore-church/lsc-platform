import { defineField, defineType } from "sanity";

export const thisWeekType = defineType({
  name: "thisWeek",
  title: "This Week",
  type: "document",
  fields: [
    defineField({
      name: "week_of",
      title: "Week of (Sunday)",
      type: "date",
      description: "The Sunday that starts this week — update every Tuesday.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sunday_date",
      title: "Sunday date",
      type: "date",
    }),
    defineField({
      name: "sunday_time",
      title: "Sunday time",
      type: "string",
      initialValue: "10:00 A.M. CT",
    }),
    defineField({
      name: "sermon_title",
      title: "Sermon title",
      type: "string",
    }),
    defineField({
      name: "sermon_scripture",
      title: "Scripture",
      type: "string",
    }),
    defineField({
      name: "sermon_description",
      title: "Sermon description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "venue_name",
      title: "Venue name",
      type: "string",
      initialValue: "Merit School of Music",
    }),
    defineField({
      name: "venue_address",
      title: "Venue address",
      type: "string",
      initialValue: "38 S. Peoria St",
    }),
    defineField({
      name: "venue_room",
      title: "Venue room",
      type: "string",
      initialValue: "2nd floor, room 210",
    }),
    defineField({
      name: "zoom_link",
      title: "Zoom link",
      type: "url",
    }),
    defineField({
      name: "zoom_passcode",
      title: "Zoom passcode",
      type: "string",
    }),
    defineField({
      name: "wednesday_date",
      title: "Wednesday date",
      type: "date",
    }),
    defineField({
      name: "wednesday_time",
      title: "Wednesday time",
      type: "string",
      initialValue: "7:00 PM CT",
    }),
    defineField({
      name: "wednesday_topic",
      title: "Wednesday topic",
      type: "string",
    }),
    defineField({
      name: "wednesday_zoom_link",
      title: "Wednesday Zoom link",
      type: "url",
    }),
    defineField({
      name: "wednesday_venue",
      title: "Wednesday venue",
      type: "string",
    }),
    defineField({
      name: "sunday_school_topic",
      title: "Sunday School topic",
      type: "string",
    }),
    defineField({
      name: "sunday_school_scripture",
      title: "Sunday School scripture",
      type: "string",
    }),
    defineField({
      name: "sunday_school_teacher",
      title: "Sunday School teacher",
      type: "string",
    }),
    defineField({
      name: "special_announcement",
      title: "Special announcement",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "is_published",
      title: "Published",
      type: "boolean",
      initialValue: false,
      description: "When on, this week appears on the website and app.",
    }),
  ],
  preview: {
    select: {
      title: "sermon_title",
      week: "week_of",
      published: "is_published",
    },
    prepare({ title, week, published }) {
      return {
        title: title || "This Week",
        subtitle: `${week ?? "No date"} · ${published ? "Published" : "Draft"}`,
      };
    },
  },
});
