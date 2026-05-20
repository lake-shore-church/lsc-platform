import type { Metadata } from "next";
import { getActiveSmallGroups, getMemberRecord } from "@repo/db";
import { requireMemberPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Small groups",
  robots: { index: false, follow: false },
};

export default async function MemberGroupsPage() {
  const session = await requireMemberPortal();
  const supabase = await createSupabaseServerClient();

  const [member, groups] = await Promise.all([
    getMemberRecord(session.userId, supabase),
    getActiveSmallGroups(supabase),
  ]);

  return (
    <>
      <h1 className="font-display text-h2 text-brand-primary">Small groups</h1>

      {member?.small_group ? (
        <div className="mt-6 rounded-card border border-brand-primary/30 bg-surface p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-secondary">
            Your group
          </p>
          <h2 className="mt-2 font-display text-h3">{member.small_group.name}</h2>
          {member.small_group.description ? (
            <p className="mt-2 text-foreground-secondary">
              {member.small_group.description}
            </p>
          ) : null}
          {member.small_group.schedule ? (
            <p className="mt-2 text-foreground-muted">{member.small_group.schedule}</p>
          ) : null}
        </div>
      ) : null}

      <h2 className="mt-10 font-display text-h3">All active groups</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {groups.map((g) => (
          <li key={g.id} className="rounded-card border border-default bg-surface p-5">
            <h3 className="font-semibold">{g.name}</h3>
            {g.description ? (
              <p className="mt-2 text-sm text-foreground-secondary">{g.description}</p>
            ) : null}
            {g.schedule ? (
              <p className="mt-2 text-sm text-foreground-muted">{g.schedule}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}
