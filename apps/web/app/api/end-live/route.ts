import { NextResponse } from "next/server";
import { endLiveInSanity } from "@repo/cms";
import { requireStaffApi } from "@/lib/auth/staff-api";

export async function POST() {
  const auth = await requireStaffApi();
  if (auth instanceof NextResponse) return auth;

  try {
    await endLiveInSanity();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/end-live]", err);
    return NextResponse.json({ error: "Failed to end live." }, { status: 500 });
  }
}
