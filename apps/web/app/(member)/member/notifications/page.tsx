import type { Metadata } from "next";
import { getNotificationPrefs } from "@repo/db";
import { NotificationPrefsForm } from "@/components/member/NotificationPrefsForm";
import { requireMemberPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Notifications",
  robots: { index: false, follow: false },
};

export default async function MemberNotificationsPage() {
  const session = await requireMemberPortal();
  const supabase = await createSupabaseServerClient();
  const prefs = await getNotificationPrefs(session.userId, supabase);

  return (
    <>
      <h1 className="font-display text-h2 text-brand-primary">Notification preferences</h1>
      <p className="mt-2 text-foreground-secondary">
        Choose what you would like to be notified about.
      </p>
      <NotificationPrefsForm
        userId={session.userId}
        initial={{
          service_reminder: prefs?.service_reminder ?? true,
          event_reminder: prefs?.event_reminder ?? true,
          new_sermon: prefs?.new_sermon ?? true,
          emergency: prefs?.emergency ?? true,
        }}
      />
    </>
  );
}
