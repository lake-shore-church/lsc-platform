"use server";

import { revalidatePath } from "next/cache";
import { updatePrayer, type PrayerStatus } from "@repo/db";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updatePrayerStatus(formData: FormData) {
  await requireStaffPortal();
  const supabase = await createSupabaseServerClient();

  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || typeof status !== "string") return;

  const allowed: PrayerStatus[] = ["new", "assigned", "prayed"];
  if (!allowed.includes(status as PrayerStatus)) return;

  await updatePrayer(
    {
      id,
      updates: {
        status: status as PrayerStatus,
        responded_at: status === "prayed" ? new Date().toISOString() : null,
      },
    },
    supabase,
  );

  revalidatePath("/staff/prayers");
}
