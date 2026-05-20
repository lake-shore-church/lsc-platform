import Link from "next/link";
import type { UserRole } from "@repo/db";
import { isStaffRole } from "@/lib/auth/session";
import { Container } from "@/components/ui/Container";

export function PortalShell({
  title,
  role,
  nav,
  children,
}: {
  title: string;
  role: UserRole;
  nav: { href: string; label: string }[];
  children: React.ReactNode;
}) {
  const staff = isStaffRole(role);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-default bg-surface">
        <Container className="flex min-h-[56px] flex-wrap items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-semibold text-brand-primary">
              ← Public site
            </Link>
            <span className="text-foreground-muted">|</span>
            <p className="font-display text-lg font-semibold text-foreground">{title}</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {staff ? (
              <Link href="/staff/prayers" className="link-hover text-brand-secondary">
                Staff portal
              </Link>
            ) : null}
            {!staff ? (
              <Link href="/member/dashboard" className="link-hover text-brand-secondary">
                Member portal
              </Link>
            ) : null}
            <form action="/auth/signout" method="post">
              <button type="submit" className="link-hover min-h-[44px] text-foreground-secondary">
                Sign out
              </button>
            </form>
          </div>
        </Container>
      </header>
      <Container className="py-8">
        <nav aria-label="Portal" className="mb-8 flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="min-h-[44px] rounded-md border border-default bg-surface px-4 py-2 text-sm font-semibold text-foreground-secondary transition-colors hover:border-brand-primary hover:text-brand-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </Container>
    </div>
  );
}
