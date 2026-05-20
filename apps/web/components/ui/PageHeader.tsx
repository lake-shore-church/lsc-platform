import { Container } from "./Container";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-default bg-surface py-10 sm:py-14">
      <Container>
        <h1 className="text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-lg text-foreground-secondary">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
