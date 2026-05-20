import Link from "next/link";
import { Container } from "@/components/ui/Container";

const nav = [
  { href: "/", label: "Home" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/give", label: "Give" },
  { href: "/prayer", label: "Prayer" },
  { href: "/about", label: "About" },
  { href: "/beliefs", label: "Beliefs" },
  { href: "/visit", label: "Plan a Visit" },
  { href: "/contact", label: "Contact" },
];

export function PublicHeader({ churchName }: { churchName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-default bg-background/95 backdrop-blur">
      <Container className="flex min-h-[64px] items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold text-brand-primary sm:text-xl">
          {churchName}
        </Link>
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground-secondary transition-colors hover:bg-surface hover:text-brand-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="relative xl:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-default px-3 py-2 text-sm font-semibold text-brand-primary">
            Menu
          </summary>
          <nav
            className="absolute right-0 top-full z-50 mt-1 min-w-[12rem] rounded-lg border border-default bg-background py-2 shadow-lg"
            aria-label="Mobile"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-foreground-secondary hover:bg-surface hover:text-brand-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}
