import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export async function PublicFooter({
  churchName,
  address,
  phone,
}: {
  churchName: string;
  address?: string;
  phone?: string;
}) {
  const t = await getTranslations("footer");

  const links = [
    { href: "/visit" as const, label: t("link_visit") },
    { href: "/sermons" as const, label: t("link_sermons") },
    { href: "/events" as const, label: t("link_events") },
    { href: "/prayer" as const, label: t("link_prayer") },
    { href: "/give" as const, label: t("link_give") },
    { href: "/contact" as const, label: t("link_contact") },
  ];

  return (
    <footer className="mt-auto border-t border-default bg-surface py-10">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-h3 text-brand-primary">{churchName}</p>
          <p className="mt-2 text-base leading-relaxed text-foreground-secondary">
            {t("tagline")}
          </p>
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
        <p>
          © {new Date().getFullYear()} {churchName}
        </p>
        <span className="hidden text-foreground-muted sm:inline" aria-hidden>
          ·
        </span>
        <Link href="/dedication" className="link-hover text-sm text-foreground-muted">
          {t("dedication")}
        </Link>
        <span className="hidden text-foreground-muted sm:inline" aria-hidden>
          ·
        </span>
        <Link href="/login" className="link-hover text-sm text-foreground-muted">
          {t("sign_in")}
        </Link>
        <span className="hidden text-foreground-muted sm:inline" aria-hidden>
          ·
        </span>
        <Link href="/platform/tech" className="link-hover text-sm text-foreground-muted">
          {t("tech_guide")}
        </Link>
      </Container>
    </footer>
  );
}
