import type { Metadata } from "next";
import { getGivingHistory, getGivingTotals } from "@repo/db";
import { requireMemberPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "My Giving",
  robots: { index: false, follow: false },
};

export default async function MemberGivingPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const session = await requireMemberPortal();
  const params = await searchParams;
  const year = Number.parseInt(params.year ?? String(new Date().getFullYear()), 10);
  const supabase = await createSupabaseServerClient();

  const [records, totals] = await Promise.all([
    getGivingHistory({ memberId: session.userId, year }, supabase),
    getGivingTotals({ memberId: session.userId, year }, supabase),
  ]);

  return (
    <>
      <h1 className="font-display text-h2 text-brand-primary">My giving</h1>
      <form className="mt-4 flex flex-wrap items-end gap-3" method="get">
        <label className="text-sm font-semibold">
          Year
          <select
            name="year"
            defaultValue={String(year)}
            className="ml-2 min-h-[44px] rounded-md border border-default bg-surface px-3"
          >
            {[2026, 2025, 2024].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="min-h-[44px] rounded-md border border-default px-4 font-semibold"
        >
          View
        </button>
      </form>

      <p className="mt-6 text-lg font-semibold">
        Total {year}: ${totals.total.toFixed(2)}
      </p>

      <div className="mt-6 overflow-x-auto rounded-card border border-default">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-2">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Fund</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Frequency</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t border-default">
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3 capitalize">{r.fund}</td>
                <td className="px-4 py-3">${Number(r.amount).toFixed(2)}</td>
                <td className="px-4 py-3">{r.frequency ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {records.length === 0 ? (
          <p className="p-6 text-foreground-muted">No giving records for this year.</p>
        ) : null}
      </div>

      <a
        href={`/api/tithing-statement?year=${year}`}
        className="mt-8 inline-flex min-h-[44px] items-center rounded-md bg-brand-primary px-6 font-semibold text-white"
      >
        Download {year} statement (PDF)
      </a>
    </>
  );
}
