import { StaffNav } from "@/components/layout/StaffNav";
import { requireStaffPortal } from "@/lib/auth/session";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireStaffPortal();
  const name = session.profile.full_name ?? session.profile.email ?? "Staff";

  return (
    <div className="min-h-screen bg-background lg:flex">
      <StaffNav name={name} role={session.profile.role} />
      <main className="min-w-0 flex-1 px-4 py-8 lg:px-8">{children}</main>
    </div>
  );
}
