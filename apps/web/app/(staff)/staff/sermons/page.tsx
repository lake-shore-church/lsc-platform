import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@repo/cms";
import { getSermons as getSupabaseSermons } from "@repo/db";
import { LivestreamControl } from "@/components/staff/LivestreamControl";
import { requireStaffPortal } from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sermons admin",
  robots: { index: false, follow: false },
};

export default async function StaffSermonsPage() {
  await requireStaffPortal();
  const config = await getSiteConfig();
  const supabase = await createSupabaseServerClient();
  const sermons = await getSupabaseSermons({ limit: 50 }, supabase).catch(() => []);

  return (
    <>
      <h1 className="font-display text-h2 text-brand-primary">Sermons & media</h1>
      <p className="mt-3 max-w-prose text-foreground-secondary">
        Publish sermons in Sanity Studio. Video upload to Cloudflare R2 will connect here
        in a later phase — use Studio for titles, scripture, and video URLs today.
      </p>
      <LivestreamControl
        isLiveNow={Boolean(config.isLiveNow)}
        liveVideoId={config.liveVideoId}
        streamMode={config.liveStreamMode}
        livePlaybackUrl={config.livePlaybackUrl}
      />

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/staff/sermons/import"
          className="inline-flex min-h-[44px] items-center rounded-md bg-brand-accent px-6 font-semibold text-white"
        >
          Import from YouTube
        </Link>
        <Link
          href="/studio"
          className="inline-flex min-h-[44px] items-center rounded-md border border-default px-6 font-semibold text-brand-primary"
        >
          Open Sanity Studio
        </Link>
      </div>

      {sermons.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-h3">Supabase sermons (legacy)</h2>
          <ul className="mt-4 space-y-2">
            {sermons.map((s) => (
              <li key={s.id} className="rounded-md border border-default px-4 py-3 text-sm">
                {s.title} — transcript: {s.transcript_status ?? "pending"}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
