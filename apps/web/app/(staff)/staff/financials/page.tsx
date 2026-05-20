import type { Metadata } from "next";
import { getExpenseTotals, getExpenses } from "@repo/db";
import { PortalShell } from "@/components/layout/PortalShell";
import { ExpenseForm } from "@/components/staff/ExpenseForm";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Financials",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/staff/prayers", label: "Prayers" },
  { href: "/staff/sermons", label: "Sermons" },
  { href: "/staff/events", label: "Events" },
  { href: "/staff/financials", label: "Financials" },
  { href: "/staff/members", label: "Members" },
];

export default async function StaffFinancialsPage() {
  const session = await requireStaffPortal();
  const supabase = await createSupabaseServerClient();
  const year = new Date().getFullYear();

  const [expenses, totals] = await Promise.all([
    getExpenses({ year, limit: 50 }, supabase),
    getExpenseTotals(year, supabase),
  ]);

  return (
    <PortalShell title="Staff portal" role={session.profile.role} nav={NAV}>
      <h1 className="font-display text-h2 text-brand-primary">Financial dashboard</h1>
      <p className="mt-2 text-foreground-secondary">
        {year} expenses (staff view). Giving totals from Zeffy sync are admin-only for
        now.
      </p>

      <div className="mt-8 rounded-card border border-default bg-surface p-6">
        <p className="text-sm text-foreground-muted">Total expenses ({year})</p>
        <p className="font-display text-h2 text-brand-primary">
          ${totals.total.toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-foreground-muted">{totals.count} entries</p>
      </div>

      <h2 className="mt-10 font-display text-h3">Add expense</h2>
      <ExpenseForm />

      <h2 className="mt-10 font-display text-h3">Recent expenses</h2>
      <ul className="mt-4 space-y-3">
        {expenses.map((e) => (
          <li
            key={e.id}
            className="flex flex-wrap justify-between gap-2 rounded-md border border-default bg-surface px-4 py-3 text-sm"
          >
            <span>
              {e.date} — {e.description}{" "}
              <span className="text-foreground-muted">({e.category})</span>
            </span>
            <span className="font-semibold">${Number(e.amount).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      {expenses.length === 0 ? (
        <p className="mt-4 text-foreground-muted">No expenses recorded yet.</p>
      ) : null}
    </PortalShell>
  );
}
