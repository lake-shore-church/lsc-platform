import type { Metadata } from "next";
import { getPrayers } from "@repo/db";
import { PrayerKanban } from "@/components/staff/PrayerKanban";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Prayer triage",
  robots: { index: false, follow: false },
};

export default async function StaffPrayersPage() {
  await requireStaffPortal();
  const supabase = await createSupabaseServerClient();
  const prayers = await getPrayers({ limit: 200 }, supabase);

  return (
    <>
      <h1 className="font-display text-h2 text-brand-primary">Prayer requests</h1>
      <p className="mt-2 text-foreground-secondary">
        Triage public and private requests. Private items are visible to staff only.
      </p>
      <PrayerKanban prayers={prayers} />
    </>
  );
}
