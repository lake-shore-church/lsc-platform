import { redirect } from "next/navigation";
import { getProfile, type Profile, type UserRole } from "@repo/db";
import { createSupabaseServerClient } from "../supabase/server";

export type AuthSession = {
  userId: string;
  email: string | undefined;
  profile: Profile;
};

const MEMBER_ROLES: UserRole[] = ["member", "staff", "admin"];
const STAFF_ROLES: UserRole[] = ["staff", "admin"];

export async function getAuthSession(): Promise<AuthSession | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await getProfile(user.id, supabase);
  if (!profile) return null;

  return {
    userId: user.id,
    email: user.email,
    profile,
  };
}

export async function requireAuth(redirectTo = "/login"): Promise<AuthSession> {
  const session = await getAuthSession();
  if (!session) redirect(`${redirectTo}?message=sign-in`);
  return session;
}

export async function requireMemberPortal(): Promise<AuthSession> {
  const session = await requireAuth();
  if (!MEMBER_ROLES.includes(session.profile.role)) {
    redirect("/login?message=pending");
  }
  return session;
}

export async function requireStaffPortal(): Promise<AuthSession> {
  const session = await requireAuth();
  if (!STAFF_ROLES.includes(session.profile.role)) {
    redirect("/login?message=staff-only");
  }
  return session;
}

export function isStaffRole(role: UserRole): boolean {
  return STAFF_ROLES.includes(role);
}
