"use server";

import { upsertNotificationPrefs } from "@repo/db";
import { requireMemberPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function saveNotificationPrefs(
  userId: string,
  prefs: {
    service_reminder: boolean;
    event_reminder: boolean;
    new_sermon: boolean;
    emergency: boolean;
  },
) {
  const session = await requireMemberPortal();
  if (session.userId !== userId) return;

  const supabase = await createSupabaseServerClient();
  await upsertNotificationPrefs(userId, prefs, supabase);
}
