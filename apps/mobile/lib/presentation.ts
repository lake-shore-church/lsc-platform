import type { PresentationState } from "@repo/db/types";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { getMobileSupabase } from "./supabase";

/** Singleton row — see supabase/migrations/20260521_presentation_state.sql */
export const PRESENTATION_SESSION_ID = "00000000-0000-4000-a000-000000000001";

export type PresentationRow = PresentationState;

export async function fetchPresentationState(): Promise<PresentationRow | null> {
  const { data, error } = await getMobileSupabase()
    .from("presentation_state")
    .select("*")
    .eq("id", PRESENTATION_SESSION_ID)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function startPresentation(params: {
  sermonId: string;
  totalSlides: number;
  userId: string;
}): Promise<void> {
  const { error } = await getMobileSupabase()
    .from("presentation_state")
    .upsert({
      id: PRESENTATION_SESSION_ID,
      sermon_id: params.sermonId,
      current_slide: 0,
      total_slides: params.totalSlides,
      is_active: true,
      updated_at: new Date().toISOString(),
      updated_by: params.userId,
    });
  if (error) throw error;
}

export async function updatePresentationSlide(
  slideIndex: number,
  userId: string,
): Promise<void> {
  const { error } = await getMobileSupabase()
    .from("presentation_state")
    .update({
      current_slide: slideIndex,
      updated_at: new Date().toISOString(),
      updated_by: userId,
    })
    .eq("id", PRESENTATION_SESSION_ID);
  if (error) throw error;
}

export async function endPresentation(userId: string): Promise<void> {
  const { error } = await getMobileSupabase()
    .from("presentation_state")
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
      updated_by: userId,
    })
    .eq("id", PRESENTATION_SESSION_ID);
  if (error) throw error;
}

export function subscribePresentation(
  onChange: (row: PresentationRow) => void,
): RealtimeChannel {
  const supabase = getMobileSupabase();
  return supabase
    .channel("presentation_state")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "presentation_state",
        filter: `id=eq.${PRESENTATION_SESSION_ID}`,
      },
      (payload) => {
        const row = payload.new as PresentationRow;
        if (row?.id) onChange(row);
      },
    )
    .subscribe();
}
