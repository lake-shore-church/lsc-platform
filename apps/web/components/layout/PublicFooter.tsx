import Link from "next/link";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/visit", label: "Plan a visit" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/prayer", label: "Prayer" },
  { href: "/give", label: "Give" },
  { href: "/contact", label: "Contact" },
] as const;

export function PublicFooter({
  churchName,
  address,
  phone,
}: {
  churchName: string;
  address?: string;
  phone?: string;
}) {
  return (
    <footer className="mt-auto border-t border-default bg-surface py-10">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-h3 text-brand-primary">{churchName}</p>
          {address ? (
            <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-foreground-muted">
              {address}
            </p>
          ) : null}
          {phone ? (
            <p className="mt-2 text-base text-foreground-muted">
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="link-hover text-brand-primary"
              >
                {phone}
              </a>
            </p>
          ) : null}
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-hover text-base text-foreground-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="mt-8 flex flex-col items-center gap-2 border-t border-default pt-6 text-center text-base text-foreground-muted sm:flex-row sm:justify-center sm:gap-4">
        <p>© {new Date().getFullYear()} {churchName}</p>
        <span className="hidden text-foreground-muted sm:inline" aria-hidden>
          ·
        </span>
        <Link href="/login" className="link-hover text-sm text-foreground-muted">
          Sign in
        </Link>
        <span className="hidden text-foreground-muted sm:inline" aria-hidden>
          ·
        </span>
        <Link
          href="/platform/tech"
          className="link-hover text-sm text-foreground-muted"
        >
          Tech team guide
        </Link>
      </Container>
    </footer>
  );
}
