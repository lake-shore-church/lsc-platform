import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

/** Real Google reviews — homepage always uses these (not /testimonies CMS stories). */
const HOME_TESTIMONIALS = [
  {
    quote:
      "Pastor Brian is a legend. A righteous man who truly spends time in prayer before stepping into the pulpit. Lake Shore Church is one place where you can experience heaven on earth.",
    name: "Sujatha Kannan",
    detail: "Member 2013–2020",
  },
  {
    quote: "A place where you can experience the presence of God.",
    name: "Anand Satyaseelan",
  },
  {
    quote: "Nice place of worship. Very good pastor and church members.",
    name: "Angel",
  },
] as const;

export async function TestimonialsSection() {
  const t = await getTranslations("home");
  const items = HOME_TESTIMONIALS;

  return (
    <section className="section-pad bg-surface">
      <Container>
        <h2 className="font-display text-h2 text-brand-primary">
          {t("testimonials_intro")}
        </h2>
        <p className="mt-2 text-base text-foreground-secondary">{t("ratings")}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <blockquote
              key={`${item.name}-${item.quote.slice(0, 24)}`}
              className="rounded-card border border-default bg-background p-6 shadow-card"
            >
              <p className="text-brand-accent" aria-label="5 stars">
                ★★★★★
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground-primary">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <cite className="not-italic font-semibold text-brand-primary">{item.name}</cite>
                {"detail" in item && item.detail ? (
                  <p className="text-sm text-foreground-muted">{item.detail}</p>
                ) : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
