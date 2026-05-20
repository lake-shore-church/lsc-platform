"use server";

import { revalidatePath } from "next/cache";
import { updateProfile } from "@repo/db";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function promoteToStaff(formData: FormData) {
  const session = await requireStaffPortal();
  if (session.profile.role !== "admin") return;

  const userId = formData.get("userId");
  if (typeof userId !== "string") return;

  const supabase = await createSupabaseServerClient();
  await updateProfile(userId, { role: "staff" }, supabase);
  revalidatePath("/staff/members");
}
