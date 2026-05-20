import Link from "next/link";
import { Container } from "@/components/ui/Container";

const nav = [
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/give", label: "Give" },
  { href: "/prayer", label: "Prayer" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/visit", label: "Visit" },
  { href: "/contact", label: "Contact" },
];

export function PublicHeader({ churchName }: { churchName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-default bg-background/95 backdrop-blur">
      <Container className="flex min-h-[64px] items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold text-brand-primary sm:text-xl">
          {churchName}
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground-secondary transition-colors hover:bg-surface hover:text-brand-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/live"
            className="ml-2 rounded-md bg-brand-accent px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Watch Live
          </Link>
        </nav>
        <Link
          href="/live"
          className="rounded-md bg-brand-accent px-3 py-2 text-sm font-semibold text-white lg:hidden"
        >
          Live
        </Link>
      </Container>
    </header>
  );
}
