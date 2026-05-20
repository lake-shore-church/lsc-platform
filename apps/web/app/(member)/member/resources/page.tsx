import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Member resources",
  robots: { index: false, follow: false },
};

export default function MemberResourcesPage() {
  return (
    <>
      <h1 className="font-display text-h2 text-brand-primary">Member resources</h1>
      <p className="mt-3 max-w-prose text-foreground-secondary">
        Member-only documents will appear here. For now, use these public resources.
      </p>
      <ul className="mt-8 space-y-3">
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
    </>
  );
}
