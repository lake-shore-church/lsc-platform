"use server";

import { revalidatePath } from "next/cache";
import {
  createEvent,
  updateEvent,
  deleteEvent,
} from "@repo/db";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createEventAction(formData: FormData) {
  await requireStaffPortal();
  const supabase = await createSupabaseServerClient();

  const title = String(formData.get("title") ?? "").trim();
  const starts_at = String(formData.get("starts_at") ?? "");
  if (!title || !starts_at) return;

  await createEvent(
    {
      title,
      description: String(formData.get("description") ?? "") || null,
      starts_at: new Date(starts_at).toISOString(),
      ends_at: formData.get("ends_at")
        ? new Date(String(formData.get("ends_at"))).toISOString()
        : null,
      location: String(formData.get("location") ?? "") || null,
      ministry_area: String(formData.get("ministry_area") ?? "") || null,
      capacity: formData.get("capacity")
        ? Number.parseInt(String(formData.get("capacity")), 10)
        : null,
      is_recurring: formData.get("is_recurring") === "on",
    },
    supabase,
  );

  revalidatePath("/staff/events");
}

export async function deleteEventAction(formData: FormData) {
  await requireStaffPortal();
  const supabase = await createSupabaseServerClient();
  const id = formData.get("id");
  if (typeof id !== "string") return;
  await deleteEvent(id, supabase);
  revalidatePath("/staff/events");
}
