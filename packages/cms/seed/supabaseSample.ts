import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../db/types";

const EVENT_IDS = {
  sunday: "a1000001-0001-4001-8001-000000000001",
  mens: "a1000001-0001-4001-8001-000000000002",
  lunch: "a1000001-0001-4001-8001-000000000003",
} as const;

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for seeding.",
    );
  }
  return createClient<Database>(url, key);
}

/** Next calendar occurrence of weekday (0=Sun) at local hour:minute. */
function upcomingLocal(weekday: number, hour: number, minute = 0): Date {
  const d = new Date();
  let days = (weekday - d.getDay() + 7) % 7;
  if (days === 0 && (d.getHours() > hour || (d.getHours() === hour && d.getMinutes() >= minute))) {
    days = 7;
  }
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d;
}

export async function seedSupabaseSample(): Promise<void> {
  const supabase = getAdminClient();

  const sundayStart = upcomingLocal(0, 10, 0);
  const sundayEnd = new Date(sundayStart.getTime() + 90 * 60 * 1000);
  const wednesdayStart = upcomingLocal(3, 19, 0);
  const wednesdayEnd = new Date(wednesdayStart.getTime() + 90 * 60 * 1000);
  const welcomeLunchStart = new Date("2026-06-01T16:30:00.000Z");
  const welcomeLunchEnd = new Date("2026-06-01T18:00:00.000Z");

  const events = [
    {
      id: EVENT_IDS.sunday,
      title: "Sunday Worship Service",
      description:
        "Join us every Sunday for scripture-based teaching from Pastor Brian, worship, and community. Everyone is welcome.",
      starts_at: sundayStart.toISOString(),
      ends_at: sundayEnd.toISOString(),
      location:
        "Merit School of Music, 38 S. Peoria St, 2nd floor, room 210, Chicago IL 60607",
      ministry_area: "Worship",
      is_recurring: true,
    },
    {
      id: EVENT_IDS.mens,
      title: "Men's Bible Study",
      description:
        "Weekly men's group studying scripture together. All men welcome — bring your Bible.",
      starts_at: wednesdayStart.toISOString(),
      ends_at: wednesdayEnd.toISOString(),
      location: "Merit School of Music — Room 210",
      ministry_area: "Men's Ministry",
      is_recurring: false,
    },
    {
      id: EVENT_IDS.lunch,
      title: "Welcome Lunch — New Members",
      description:
        "Join Pastor Brian for lunch after Sunday service. A chance to meet the community and ask questions about Lake Shore Church.",
      starts_at: welcomeLunchStart.toISOString(),
      ends_at: welcomeLunchEnd.toISOString(),
      location: "Merit School of Music — Room 210",
      ministry_area: "Community",
      capacity: 30,
      is_recurring: false,
    },
  ];

  for (const event of events) {
    const { error } = await supabase.from("events").upsert(event, { onConflict: "id" });
    if (error) throw error;
  }

  const prayerSnippet =
    "Please pray for our church as we grow in the West Loop. Pray for Pastor Brian's teaching and for new members to find community here.";

  const { data: existing } = await supabase
    .from("prayer_requests")
    .select("id")
    .eq("content", prayerSnippet)
    .limit(1);

  if (!existing?.length) {
    const { error: prayerError } = await supabase.from("prayer_requests").insert({
      content: prayerSnippet,
      is_private: false,
      status: "new",
    });
    if (prayerError) throw prayerError;
  }
}
