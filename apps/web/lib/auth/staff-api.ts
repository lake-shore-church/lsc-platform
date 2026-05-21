import { NextResponse } from "next/server";
import type { UserRole } from "@repo/db";
import { getAuthSession, type AuthSession } from "./session";

const STAFF_ROLES: UserRole[] = ["staff", "admin"];

export async function requireStaffApi(): Promise<
  AuthSession | NextResponse
> {
  const session = await getAuthSession();
  if (!session || !STAFF_ROLES.includes(session.profile.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return session;
}
