"use server";

import { revalidatePath } from "next/cache";
import { createExpense, type ExpenseCategory } from "@repo/db";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function addExpense(formData: FormData) {
  const session = await requireStaffPortal();
  const supabase = await createSupabaseServerClient();

  const description = formData.get("description");
  const amount = formData.get("amount");
  const date = formData.get("date");
  const category = formData.get("category");

  if (
    typeof description !== "string" ||
    typeof amount !== "string" ||
    typeof date !== "string" ||
    typeof category !== "string"
  ) {
    return;
  }

  const parsed = Number.parseFloat(amount);
  if (!Number.isFinite(parsed) || parsed <= 0) return;

  await createExpense(
    {
      description: description.trim(),
      amount: parsed,
      date,
      category: category as ExpenseCategory,
      entered_by: session.userId,
    },
    supabase,
  );

  revalidatePath("/staff/financials");
}
