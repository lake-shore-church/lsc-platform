import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import {
  getGivingHistory,
  getGivingTotals,
  getProfile,
} from "@repo/db";
import { TithingStatementPdf } from "@/lib/pdf/tithingStatement";
import { getAuthSession, isStaffRole } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const year = Number.parseInt(searchParams.get("year") ?? String(new Date().getFullYear()), 10);
  const memberId = searchParams.get("memberId") ?? session.userId;
  if (memberId !== session.userId && !isStaffRole(session.profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const supabase = await createSupabaseServerClient();
  const [records, totals, memberProfile] = await Promise.all([
    getGivingHistory({ memberId, year }, supabase),
    getGivingTotals({ memberId, year }, supabase),
    getProfile(memberId, supabase),
  ]);

  const buffer = await renderToBuffer(
    TithingStatementPdf({
      churchName: "Lake Shore Church — West Loop",
      memberName: memberProfile?.full_name ?? "Member",
      memberAddress: memberProfile?.address,
      year,
      records,
      total: totals.total,
    }),
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="tithing-statement-${year}.pdf"`,
    },
  });
}
