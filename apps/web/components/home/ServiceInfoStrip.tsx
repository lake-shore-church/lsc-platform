import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

export async function ServiceInfoStrip() {
  const t = await getTranslations("home");

  const cards = [
    {
      icon: "📍",
      label: t("where_we_meet"),
      lines: [
        "Merit School of Music",
        "38 S. Peoria St, 2nd floor",
        "Chicago, IL 60607",
      ],
      href: "https://maps.google.com/?q=Merit+School+of+Music+38+S+Peoria+St+Chicago",
      linkLabel: t("get_directions"),
      external: true,
    },
    {
      icon: "🕙",
      label: t("service_time"),
      lines: [t("every_sunday"), "10:00 AM", t("doors_open")],
      href: "/visit",
      linkLabel: t("plan_visit"),
    },
    {
      icon: "📺",
      label: t("watch_online"),
      lines: [t("miss_service"), t("watch_archive")],
      href: "/live",
      linkLabel: t("watch_now"),
    },
    {
      icon: "🙏",
      label: t("prayer_request"),
      lines: [t("submit_prayer_line1"), t("submit_prayer_line2")],
      href: "/prayer",
      linkLabel: t("request_prayer"),
    },
  ] as const;

  return (
    <section className="border-b border-default bg-surface py-10">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article
              key={card.label}
              className="rounded-card border border-default bg-background p-5 shadow-card"
            >
              <p className="text-label text-brand-accent">
                <span aria-hidden>{card.icon}</span> {card.label.toUpperCase()}
              </p>
              <div className="mt-3 space-y-0.5 text-base text-foreground-primary">
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <TextLink href={card.href} className="mt-4 inline-block text-base" withArrow={false}>
                {card.linkLabel}
              </TextLink>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
