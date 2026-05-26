import type { SiteConfig } from "@repo/cms";
import { Container } from "@/components/ui/Container";

export function ChurchYearPromiseSection({ config }: { config: SiteConfig }) {
  const scripture = config.yearPromiseScripture;
  const theme = config.yearPromiseTheme;
  const body = config.yearPromiseBody;
  const vision = config.familyVisionLine;

  if (!scripture && !theme && !body && !vision) return null;

  return (
    <section className="section-pad border-y border-default bg-brand-primary text-white">
      <Container className="max-w-4xl text-center">
        {scripture ? (
          <p className="text-label font-semibold uppercase tracking-wide text-brand-accent">
            {scripture}
          </p>
        ) : null}
        {theme ? (
          <h2 className="mt-3 font-display text-h2 sm:text-3xl">{theme}</h2>
        ) : null}
        {body ? (
          <blockquote className="mt-4 text-lg leading-relaxed text-white/90">{body}</blockquote>
        ) : null}
        {vision ? (
          <p className="mt-8 border-t border-white/20 pt-8 text-base leading-relaxed text-white/85">
            {vision}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
