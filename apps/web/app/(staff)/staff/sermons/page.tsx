import type { Metadata } from "next";
import Link from "next/link";
import { PortalShell } from "@/components/layout/PortalShell";
import { requireStaffPortal } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Sermons",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/staff/prayers", label: "Prayers" },
  { href: "/staff/sermons", label: "Sermons" },
  { href: "/staff/events", label: "Events" },
  { href: "/staff/financials", label: "Financials" },
  { href: "/staff/members", label: "Members" },
];

export default async function StaffSermonsPage() {
  const session = await requireStaffPortal();

  return (
    <PortalShell title="Staff portal" role={session.profile.role} nav={NAV}>
      <h1 className="font-display text-h2 text-brand-primary">Sermons & media</h1>
      <p className="mt-3 max-w-prose text-foreground-secondary">
        Publish and edit sermon pages, series, and blog posts in Sanity Studio. Video
        upload to Cloudflare R2 will connect here in a later phase.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/studio"
          className="inline-flex min-h-[44px] items-center rounded-md bg-brand-primary px-6 text-base font-semibold text-white hover:opacity-90"
        >
          Open Sanity Studio
        </Link>
        <Link
          href="/sermons"
          className="inline-flex min-h-[44px] items-center rounded-md border border-default px-6 text-base font-semibold text-brand-primary hover:bg-surface"
        >
          View public sermons
        </Link>
      </div>
    </PortalShell>
  );
}
