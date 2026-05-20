import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function PublicFooter({
  churchName,
  address,
}: {
  churchName: string;
  address?: string;
}) {
  return (
    <footer className="mt-auto border-t border-default bg-surface py-10">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-semibold text-brand-primary">{churchName}</p>
          {address ? (
            <p className="mt-2 text-sm text-foreground-muted">{address}</p>
          ) : null}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground-primary">Connect</p>
          <ul className="mt-2 space-y-1 text-sm text-foreground-secondary">
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/prayer">Prayer</Link></li>
            <li><Link href="/give">Give</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground-primary">Explore</p>
          <ul className="mt-2 space-y-1 text-sm text-foreground-secondary">
            <li><Link href="/sermons">Sermons</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/resources">Resources</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground-primary">Visit</p>
          <ul className="mt-2 space-y-1 text-sm text-foreground-secondary">
            <li><Link href="/visit">Plan a Visit</Link></li>
            <li><Link href="/beliefs">What We Believe</Link></li>
            <li><Link href="/about">About Us</Link></li>
          </ul>
        </div>
      </Container>
      <Container className="mt-8 border-t border-default pt-6 text-center text-xs text-foreground-muted">
        © {new Date().getFullYear()} {churchName}. All rights reserved.
      </Container>
    </footer>
  );
}
