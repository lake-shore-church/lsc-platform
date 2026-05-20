import type { Metadata } from "next";
import Link from "next/link";
import { PortalShell } from "@/components/layout/PortalShell";
import { requireMemberPortal } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Member resources",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/member/dashboard", label: "Dashboard" },
  { href: "/member/groups", label: "Groups" },
  { href: "/member/resources", label: "Resources" },
];

export default async function MemberResourcesPage() {
  const session = await requireMemberPortal();

  return (
    <PortalShell title="Member portal" role={session.profile.role} nav={NAV}>
      <h1 className="font-display text-h2 text-brand-primary">Member resources</h1>
      <p className="mt-3 max-w-prose text-foreground-secondary">
        Member-only documents and study guides will appear here. For now, use the
        public resources page and sermon archive.
      </p>
      <ul className="mt-8 space-y-3 text-base">
        <li>
          <Link href="/resources" className="link-hover text-brand-primary">
            Public resources
          </Link>
        </li>
        <li>
          <Link href="/sermons" className="link-hover text-brand-primary">
            Sermon archive
          </Link>
        </li>
        <li>
          <Link href="/blog" className="link-hover text-brand-primary">
            Blog
          </Link>
        </li>
      </ul>
    </PortalShell>
  );
}
