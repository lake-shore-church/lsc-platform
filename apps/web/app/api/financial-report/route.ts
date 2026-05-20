import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { getExpenses, getAllGivingForYear, createGivingAdminClient } from "@repo/db";
import { FinancialReportPdf } from "@/lib/pdf/financialReport";
import { getAuthSession, isStaffRole } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const session = await getAuthSession();
  if (!session || !isStaffRole(session.profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const year = Number.parseInt(searchParams.get("year") ?? String(new Date().getFullYear()), 10);

  const supabase = await createSupabaseServerClient();
  const admin = createGivingAdminClient();
  const [income, expenses] = await Promise.all([
    getAllGivingForYear(year, admin),
    getExpenses({ year }, supabase),
  ]);

  const buffer = await renderToBuffer(
    FinancialReportPdf({ year, income, expenses }),
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="financial-report-${year}.pdf"`,
    },
  });
}
