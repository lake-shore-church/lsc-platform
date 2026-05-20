import type { Metadata } from "next";
import Link from "next/link";
import { getEvents } from "@repo/db";
import { PortalShell } from "@/components/layout/PortalShell";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Events",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/staff/prayers", label: "Prayers" },
  { href: "/staff/sermons", label: "Sermons" },
  { href: "/staff/events", label: "Events" },
  { href: "/staff/financials", label: "Financials" },
  { href: "/staff/members", label: "Members" },
];

export default async function StaffEventsPage() {
  const session = await requireStaffPortal();
  const supabase = await createSupabaseServerClient();
  const events = await getEvents({ limit: 50 }, supabase);

  return (
    <PortalShell title="Staff portal" role={session.profile.role} nav={NAV}>
      <h1 className="font-display text-h2 text-brand-primary">Events</h1>
      <p className="mt-2 text-foreground-secondary">
        Event management in Supabase. Full create/edit UI coming soon — use Supabase
        dashboard or seed script for now.
      </p>
      <ul className="mt-8 space-y-4">
        {events.map((e) => (
          <li
            key={e.id}
            className="rounded-card border border-default bg-surface p-5"
          >
            <h2 className="font-semibold text-foreground">{e.title}</h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {new Date(e.starts_at).toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "short",
              })}
              {e.location ? ` · ${e.location}` : ""}
            </p>
            {e.description ? (
              <p className="mt-2 text-sm text-foreground-secondary">{e.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
      {events.length === 0 ? (
        <p className="mt-4 text-foreground-muted">No events in database.</p>
      ) : null}
      <p className="mt-6">
        <Link href="/events" className="link-hover text-brand-primary">
          Public events page →
        </Link>
      </p>
    </PortalShell>
  );
}
