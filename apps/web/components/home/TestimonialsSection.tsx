import { Container } from "@/components/ui/Container";

const TESTIMONIALS = [
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

export function TestimonialsSection() {
  return (
    <section className="section-pad bg-surface">
      <Container>
        <h2 className="font-display text-h2 text-brand-primary">What People Say</h2>
        <p className="mt-2 text-base text-foreground-secondary">
          5.0 ★ on Google · 4.3 ★ on Facebook
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-card border border-default bg-background p-6 shadow-card"
            >
              <p className="text-brand-accent" aria-label="5 stars">
                ★★★★★
              </p>
              <p className="mt-4 text-base leading-relaxed text-foreground-primary">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <cite className="not-italic font-semibold text-brand-primary">{t.name}</cite>
                {"detail" in t && t.detail ? (
                  <p className="text-sm text-foreground-muted">{t.detail}</p>
                ) : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
