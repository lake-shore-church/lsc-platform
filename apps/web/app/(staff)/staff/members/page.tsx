import type { Metadata } from "next";
import { getAllMembers, getDirectoryProfiles } from "@repo/db";
import { PortalShell } from "@/components/layout/PortalShell";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Members",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/staff/prayers", label: "Prayers" },
  { href: "/staff/sermons", label: "Sermons" },
  { href: "/staff/events", label: "Events" },
  { href: "/staff/financials", label: "Financials" },
  { href: "/staff/members", label: "Members" },
];

export default async function StaffMembersPage() {
  const session = await requireStaffPortal();
  const supabase = await createSupabaseServerClient();

  const [members, profiles] = await Promise.all([
    getAllMembers(supabase).catch(() => []),
    getDirectoryProfiles(supabase).catch(() => []),
  ]);

  return (
    <PortalShell title="Staff portal" role={session.profile.role} nav={NAV}>
      <h1 className="font-display text-h2 text-brand-primary">Members</h1>
      <p className="mt-2 text-foreground-secondary">
        Member records and portal roles. To grant access, set{" "}
        <code className="text-sm">role</code> to <strong>member</strong> or{" "}
        <strong>staff</strong> in Supabase → profiles (admin).
      </p>

      <h2 className="mt-10 font-display text-h3">Directory ({profiles.length})</h2>
      <ul className="mt-4 divide-y divide-default rounded-card border border-default bg-surface">
        {profiles.map((p) => (
          <li key={p.id} className="flex flex-wrap justify-between gap-2 px-4 py-3 text-sm">
            <span>
              {p.full_name ?? "—"} · {p.email ?? "no email"}
            </span>
            <span className="font-semibold capitalize text-brand-secondary">{p.role}</span>
          </li>
        ))}
      </ul>
      {profiles.length === 0 ? (
        <p className="mt-4 text-foreground-muted">
          No member/staff profiles yet. New sign-ins default to role{" "}
          <code className="text-sm">public</code> until promoted.
        </p>
      ) : null}

      <h2 className="mt-10 font-display text-h3">Member records ({members.length})</h2>
      <ul className="mt-4 space-y-3">
        {members.map((m) => (
          <li
            key={m.id}
            className="rounded-card border border-default bg-surface px-4 py-3 text-sm"
          >
            {m.profile?.full_name ?? m.id} — joined{" "}
            {m.joined_at
              ? new Date(m.joined_at).toLocaleDateString()
              : "unknown"}
            {m.small_group?.name ? ` · ${m.small_group.name}` : ""}
          </li>
        ))}
      </ul>
    </PortalShell>
  );
}
