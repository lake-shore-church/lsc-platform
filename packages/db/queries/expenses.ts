import { getSupabase, type TypedSupabaseClient } from "../client";
import type {
  Expense,
  ExpenseCategory,
  ExpenseTotals,
  TablesInsert,
} from "../types";

function client(db?: TypedSupabaseClient) {
  return db ?? getSupabase();
}

export type GetExpensesOptions = {
  year?: number;
  category?: ExpenseCategory;
  limit?: number;
};

/** List expenses (staff/admin RLS). */
export async function getExpenses(
  options?: GetExpensesOptions,
  db?: TypedSupabaseClient,
): Promise<Expense[]> {
  const supabase = client(db);

  let query = supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });

  if (options?.year) {
    query = query.eq("year", options.year);
  }

  if (options?.category) {
    query = query.eq("category", options.category);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data ?? [];
}

/** Create an expense entry (staff/admin RLS). */
export async function createExpense(
  input: TablesInsert<"expenses">,
  db?: TypedSupabaseClient,
): Promise<Expense> {
  const supabase = client(db);

  const year =
    input.year ??
    new Date(input.date).getFullYear();

  const { data, error } = await supabase
    .from("expenses")
    .insert({ ...input, year })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Aggregate expense totals for a year. */
export async function getExpenseTotals(
  year: number,
  db?: TypedSupabaseClient,
): Promise<ExpenseTotals> {
  const expenses = await getExpenses({ year }, db);

  const byCategory: Record<ExpenseCategory, number> = {
    staff_pastoral: 0,
    utilities: 0,
    venue_building: 0,
    missions: 0,
    events: 0,
    equipment: 0,
    technology: 0,
    administration: 0,
    other: 0,
  };

  let total = 0;

  for (const expense of expenses) {
    const amount = Number(expense.amount);
    total += amount;
    byCategory[expense.category] += amount;
  }

  return {
    total,
    byCategory,
    count: expenses.length,
  };
}
