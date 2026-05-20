import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@repo/db";

/** Public prayer wall — content and date only (no submitter PII). */
export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("prayer_requests")
      .select("id, content, created_at")
      .eq("is_private", false)
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ prayers: data ?? [] });
  } catch {
    return NextResponse.json({ prayers: [] });
  }
}
