type Props = {
  churchTaxId?: string | null;
};

export function GiveTrustBadge({ churchTaxId }: Props) {
  const ein = churchTaxId?.trim();

  return (
    <div
      className="mt-8 rounded-xl border border-brand-primary/20 bg-surface p-5 text-sm text-foreground-secondary"
      role="note"
    >
      <p className="font-semibold text-brand-primary">
        Lake Shore Church is a registered 501(c)(3) nonprofit organization.
      </p>
      <p className="mt-2 leading-relaxed">
        Your donation is tax-deductible to the full extent permitted by law.
        {ein ? (
          <>
            {" "}
            EIN: <span className="font-mono text-foreground-primary">{ein}</span>
          </>
        ) : (
          <> Church EIN will be listed here once confirmed by the finance team.</>
        )}
      </p>
    </div>
  );
}
