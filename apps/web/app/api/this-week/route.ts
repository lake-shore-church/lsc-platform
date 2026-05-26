import { NextResponse } from "next/server";
import { getResolvedThisWeek } from "@repo/cms";

export const revalidate = 300;

/** Current published week (Sanity thisWeek → siteConfig fallback). */
export async function GET() {
  const thisWeek = await getResolvedThisWeek();
  return NextResponse.json(thisWeek);
}
