import type { Metadata } from "next";
import Link from "next/link";
import { getPrayers } from "@repo/db";
import { requireMemberPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "My prayers",
  robots: { index: false, follow: false },
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded bg-surface-2 px-2 py-0.5 text-xs font-semibold capitalize">
      {status}
    </span>
  );
}

export default async function MemberPrayersPage() {
  const session = await requireMemberPortal();
  const supabase = await createSupabaseServerClient();
  const prayers = await getPrayers({ submitterId: session.userId, limit: 100 }, supabase);

  const publicOnes = prayers.filter((p) => !p.is_private);
  const privateOnes = prayers.filter((p) => p.is_private);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-h2 text-brand-primary">My prayer requests</h1>
        <Link
          href="/prayer"
          className="inline-flex min-h-[44px] items-center rounded-md bg-brand-primary px-5 font-semibold text-white"
        >
          Submit new request
        </Link>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-h3">Public requests</h2>
        <ul className="mt-4 space-y-4">
          {publicOnes.map((p) => (
            <li key={p.id} className="rounded-card border border-default bg-surface p-4">
              <div className="flex gap-2">
                <StatusBadge status={p.status} />
                <span className="text-sm text-foreground-muted">
                  {new Date(p.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-foreground">{p.content}</p>
            </li>
          ))}
          {publicOnes.length === 0 ? (
            <p className="text-foreground-muted">None yet.</p>
          ) : null}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-h3">Private requests</h2>
        <ul className="mt-4 space-y-4">
          {privateOnes.map((p) => (
            <li key={p.id} className="rounded-card border border-brand-secondary/30 bg-surface p-4">
              <div className="flex gap-2">
                <StatusBadge status={p.status} />
                <span className="text-xs font-semibold text-brand-secondary">Private</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-foreground">{p.content}</p>
            </li>
          ))}
          {privateOnes.length === 0 ? (
            <p className="text-foreground-muted">None yet.</p>
          ) : null}
        </ul>
      </section>
    </>
  );
}
