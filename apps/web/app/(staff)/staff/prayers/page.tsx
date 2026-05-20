import type { Metadata } from "next";
import { getPrayers } from "@repo/db";
import { PortalShell } from "@/components/layout/PortalShell";
import { PrayerTriageList } from "@/components/staff/PrayerTriageList";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Prayer triage",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/staff/prayers", label: "Prayers" },
  { href: "/staff/sermons", label: "Sermons" },
  { href: "/staff/events", label: "Events" },
  { href: "/staff/financials", label: "Financials" },
  { href: "/staff/members", label: "Members" },
];

export default async function StaffPrayersPage() {
  const session = await requireStaffPortal();
  const supabase = await createSupabaseServerClient();
  const prayers = await getPrayers({ limit: 100 }, supabase);

  return (
    <PortalShell title="Staff portal" role={session.profile.role} nav={NAV}>
      <h1 className="font-display text-h2 text-brand-primary">Prayer requests</h1>
      <p className="mt-2 text-foreground-secondary">
        Update status as your team prays and follows up. Private requests are visible
        here for staff only.
      </p>
      <div className="mt-8">
        <PrayerTriageList prayers={prayers} />
      </div>
    </PortalShell>
  );
}
