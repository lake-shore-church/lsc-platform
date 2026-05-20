import type { Metadata } from "next";
import Link from "next/link";
import {
  getGivingHistory,
  getMemberRecord,
  getPrayers,
} from "@repo/db";
import { PortalShell } from "@/components/layout/PortalShell";
import { requireMemberPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Member dashboard",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/member/dashboard", label: "Dashboard" },
  { href: "/member/groups", label: "Groups" },
  { href: "/member/resources", label: "Resources" },
];

export default async function MemberDashboardPage() {
  const session = await requireMemberPortal();
  const supabase = await createSupabaseServerClient();

  const [member, prayers, giving] = await Promise.all([
    getMemberRecord(session.userId, supabase),
    getPrayers({ limit: 5 }, supabase).catch(() => []),
    getGivingHistory({ memberId: session.userId, limit: 5 }, supabase).catch(
      () => [],
    ),
  ]);

  return (
    <PortalShell title="Member portal" role={session.profile.role} nav={NAV}>
      <h1 className="font-display text-h2 text-brand-primary">
        Welcome{session.profile.full_name ? `, ${session.profile.full_name}` : ""}
      </h1>
      <p className="mt-2 text-foreground-secondary">
        Email: {session.profile.email ?? session.email}
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="rounded-card border border-default bg-surface p-6">
          <h2 className="font-display text-h3 text-foreground">Quick links</h2>
          <ul className="mt-4 space-y-2 text-base">
            <li>
              <Link href="/prayer" className="link-hover text-brand-primary">
                Submit a prayer request
              </Link>
            </li>
            <li>
              <Link href="/give" className="link-hover text-brand-primary">
                Give online
              </Link>
            </li>
            <li>
              <Link href="/events" className="link-hover text-brand-primary">
                Upcoming events
              </Link>
            </li>
          </ul>
        </section>

        <section className="rounded-card border border-default bg-surface p-6">
          <h2 className="font-display text-h3 text-foreground">Your group</h2>
          {member?.small_group ? (
            <p className="mt-2 text-foreground-secondary">
              {member.small_group.name}
              {member.small_group.schedule
                ? ` — ${member.small_group.schedule}`
                : ""}
            </p>
          ) : (
            <p className="mt-2 text-foreground-muted">
              No small group on file yet. Contact the church office.
            </p>
          )}
        </section>

        <section className="rounded-card border border-default bg-surface p-6">
          <h2 className="font-display text-h3 text-foreground">Recent prayers</h2>
          {prayers.length === 0 ? (
            <p className="mt-2 text-foreground-muted">No requests yet.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {prayers.map((p) => (
                <li key={p.id} className="text-sm text-foreground-secondary">
                  <span className="font-semibold capitalize">{p.status}</span>
                  {p.is_private ? " · private" : ""} — {p.content.slice(0, 80)}
                  …
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-card border border-default bg-surface p-6">
          <h2 className="font-display text-h3 text-foreground">Giving history</h2>
          {giving.length === 0 ? (
            <p className="mt-2 text-foreground-muted">
              No synced giving records yet. Online gifts through Zeffy will appear
              here when configured.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {giving.map((g) => (
                <li key={g.id} className="text-foreground-secondary">
                  {g.date} — ${Number(g.amount).toFixed(2)} ({g.fund})
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </PortalShell>
  );
}
