import { MemberNav } from "@/components/layout/MemberNav";
import { requireMemberPortal } from "@/lib/auth/session";

export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireMemberPortal();
  const name = session.profile.full_name ?? session.profile.email ?? "Member";

  return (
    <div className="min-h-screen bg-background">
      <MemberNav name={name} />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
