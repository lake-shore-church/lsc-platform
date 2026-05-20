import type { Metadata } from "next";
import Link from "next/link";
import { getGivingTotals, getMemberRecord } from "@repo/db";
import { requireMemberPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Member dashboard",
  robots: { index: false, follow: false },
};

const year = new Date().getFullYear();

export default async function MemberDashboardPage() {
  const session = await requireMemberPortal();
  const supabase = await createSupabaseServerClient();

  const [member, givingTotals] = await Promise.all([
    getMemberRecord(session.userId, supabase),
    getGivingTotals({ memberId: session.userId, year }, supabase).catch(() => ({
      total: 0,
      byFund: { general: 0, building: 0, missions: 0, other: 0 },
      count: 0,
    })),
  ]);

  const name = session.profile.full_name ?? "friend";

  return (
    <>
      <h1 className="font-display text-h2 text-brand-primary">Welcome back, {name}</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <section className="rounded-card border border-default bg-surface p-6">
          <p className="text-sm text-foreground-muted">Giving in {year}</p>
          <p className="font-display text-h2 text-brand-primary">
            ${givingTotals.total.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-foreground-secondary">
            {givingTotals.count} gift{givingTotals.count === 1 ? "" : "s"}
          </p>
        </section>

        {member?.small_group ? (
          <section className="rounded-card border border-default bg-surface p-6">
            <p className="text-sm text-foreground-muted">Your group</p>
            <p className="font-semibold text-foreground">{member.small_group.name}</p>
          </section>
        ) : null}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-h3 text-foreground">Quick links</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <li>
            <Link href="/member/giving" className="link-hover text-brand-primary">
              Giving history
            </Link>
          </li>
          <li>
            <Link href="/member/prayers" className="link-hover text-brand-primary">
              Prayer requests
            </Link>
          </li>
          <li>
            <Link href="/member/groups" className="link-hover text-brand-primary">
              Small groups
            </Link>
          </li>
          <li>
            <Link href="/member/resources" className="link-hover text-brand-primary">
              Resources
            </Link>
          </li>
          <li>
            <Link href="/member/notifications" className="link-hover text-brand-primary">
              Notification settings
            </Link>
          </li>
          <li>
            <Link href="/give" className="link-hover text-brand-primary">
              Give online
            </Link>
          </li>
        </ul>
      </section>

      <div className="mt-10">
        <a
          href={`/api/tithing-statement?year=${year}`}
          className="inline-flex min-h-[44px] items-center rounded-md bg-brand-primary px-6 font-semibold text-white hover:opacity-90"
        >
          Download {year} tithing statement
        </a>
      </div>
    </>
  );
}
