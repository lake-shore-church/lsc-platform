import type { Metadata } from "next";
import { getDirectoryProfiles, getGivingTotals } from "@repo/db";
import { promoteToStaff } from "./actions";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Members",
  robots: { index: false, follow: false },
};

const year = new Date().getFullYear();

export default async function StaffMembersPage() {
  const session = await requireStaffPortal();
  const supabase = await createSupabaseServerClient();

  const profiles = await getDirectoryProfiles(supabase).catch(() => []);

  const givingByUser = await Promise.all(
    profiles.map(async (p) => {
      const totals = await getGivingTotals({ memberId: p.id, year }, supabase).catch(
        () => ({ total: 0, byFund: { general: 0, building: 0, missions: 0, other: 0 }, count: 0 }),
      );
      return { id: p.id, total: totals.total };
    }),
  );
  const givingMap = Object.fromEntries(givingByUser.map((g) => [g.id, g.total]));

  return (
    <>
      <h1 className="font-display text-h2 text-brand-primary">Members</h1>
      <p className="mt-2 text-foreground-secondary">
        Directory and giving totals for {year}. Promote to staff (admin only).
      </p>

      <div className="mt-6 overflow-x-auto rounded-card border border-default">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-2">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Giving {year}</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p) => (
              <tr key={p.id} className="border-t border-default">
                <td className="px-4 py-3">{p.full_name ?? "—"}</td>
                <td className="px-4 py-3">{p.email ?? "—"}</td>
                <td className="px-4 py-3 capitalize">{p.role}</td>
                <td className="px-4 py-3">${(givingMap[p.id] ?? 0).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <a
                    href={`/api/tithing-statement?year=${year}&memberId=${p.id}`}
                    className="mr-3 text-brand-primary"
                  >
                    Statement
                  </a>
                  {session.profile.role === "admin" && p.role === "member" ? (
                    <form action={promoteToStaff} className="inline">
                      <input type="hidden" name="userId" value={p.id} />
                      <button type="submit" className="text-brand-secondary">
                        Promote to staff
                      </button>
                    </form>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
