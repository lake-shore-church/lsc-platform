import type { Metadata } from "next";
import {
  getExpenseTotals,
  getExpenses,
  getAllGivingForYear,
  createGivingAdminClient,
} from "@repo/db";
import { GivingByMonthChart } from "@/components/staff/FinancialCharts";
import { ExpenseForm } from "@/components/staff/ExpenseForm";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Financials",
  robots: { index: false, follow: false },
};

function monthKey(date: string) {
  return date.slice(0, 7);
}

export default async function StaffFinancialsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  await requireStaffPortal();
  const params = await searchParams;
  const year = Number.parseInt(params.year ?? String(new Date().getFullYear()), 10);
  const supabase = await createSupabaseServerClient();
  const admin = createGivingAdminClient();

  const [expenses, expenseTotals, income] = await Promise.all([
    getExpenses({ year, limit: 100 }, supabase),
    getExpenseTotals(year, supabase),
    getAllGivingForYear(year, admin).catch(() => []),
  ]);

  const incomeTotal = income.reduce((s, r) => s + Number(r.amount), 0);
  const byMonthMap = new Map<string, number>();
  for (const r of income) {
    const m = monthKey(r.date);
    byMonthMap.set(m, (byMonthMap.get(m) ?? 0) + Number(r.amount));
  }
  const chartData = [...byMonthMap.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({ month, total }));

  const byFund = { general: 0, building: 0, missions: 0, other: 0 };
  for (const r of income) {
    byFund[r.fund] += Number(r.amount);
  }

  const uniqueGivers = new Set(income.map((r) => r.member_id).filter(Boolean)).size;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-h2 text-brand-primary">Financial dashboard</h1>
        <form method="get" className="flex items-center gap-2">
          <select
            name="year"
            defaultValue={String(year)}
            className="min-h-[44px] rounded-md border border-default px-3"
          >
            {[2026, 2025, 2024].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <button type="submit" className="min-h-[44px] rounded-md border px-4 font-semibold">
            View
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Income YTD" value={`$${incomeTotal.toFixed(2)}`} />
        <StatCard label="Expenses YTD" value={`$${expenseTotals.total.toFixed(2)}`} />
        <StatCard
          label="Net balance"
          value={`$${(incomeTotal - expenseTotals.total).toFixed(2)}`}
        />
        <StatCard label="Active givers" value={String(uniqueGivers)} />
      </div>

      <section className="mt-10 rounded-card border border-default bg-surface p-6">
        <h2 className="font-display text-h3">Income by month</h2>
        <div className="mt-4">
          <GivingByMonthChart data={chartData} />
        </div>
        <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
          {Object.entries(byFund).map(([fund, amt]) => (
            <li key={fund}>
              <span className="capitalize">{fund}</span>: ${amt.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-card border border-default bg-surface p-6">
        <h2 className="font-display text-h3">Expenses</h2>
        <ExpenseForm />
        <ul className="mt-6 space-y-2">
          {expenses.map((e) => (
            <li
              key={e.id}
              className="flex justify-between border-b border-default py-2 text-sm"
            >
              <span>
                {e.date} — {e.description} ({e.category})
              </span>
              <span className="font-semibold">${Number(e.amount).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>

      <a
        href={`/api/financial-report?year=${year}`}
        className="mt-8 inline-flex min-h-[44px] items-center rounded-md bg-brand-primary px-6 font-semibold text-white"
      >
        Download {year} annual report (PDF)
      </a>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-default bg-surface p-5">
      <p className="text-sm text-foreground-muted">{label}</p>
      <p className="font-display text-xl text-brand-primary">{value}</p>
    </div>
  );
}
