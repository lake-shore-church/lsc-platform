import type { Metadata } from "next";
import Link from "next/link";
import { getSermons } from "@repo/cms";
import { requireStaffPortal } from "@/lib/auth/session";
import { TranslationCellActions } from "@/components/staff/TranslationCellActions";
import {
  locales,
  localeLabels,
  type AppLocale,
} from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Translations",
  robots: { index: false, follow: false },
};

const TRACK_LOCALES = locales.filter((l) => l !== "en") as AppLocale[];

function cellStatus(
  translations: { locale?: string; status?: string; approved?: boolean }[] | undefined,
  locale: string,
): string {
  const row = translations?.find((t) => t.locale === locale);
  if (!row) return "Missing";
  if (row.approved && row.status === "published") return "Published";
  if (row.status === "review") return "Review";
  return "Draft";
}

export default async function StaffTranslationsPage() {
  await requireStaffPortal();
  const sermons = await getSermons({ limit: 50 }).catch(() => []);

  const totalCells = sermons.length * TRACK_LOCALES.length;
  const filled = sermons.reduce((acc, s) => {
    return (
      acc +
      TRACK_LOCALES.filter((loc) => {
        const row = s.translations?.find((t) => t.locale === loc);
        return row?.approved && row.status === "published";
      }).length
    );
  }, 0);
  const pct = totalCells ? Math.round((filled / totalCells) * 100) : 0;

  return (
    <>
      <h1 className="font-display text-h2 text-brand-primary">Translation dashboard</h1>
      <p className="mt-3 max-w-prose text-foreground-secondary">
        Review AI drafts (DeepL / Google) and publish volunteer-approved translations in Sanity
        Studio. Nagamese is manual only.
      </p>
      <p className="mt-4 text-sm font-semibold text-brand-accent">
        Translation coverage: {filled}/{totalCells} languages ({pct}%)
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-default text-left">
              <th className="py-2 pr-4">Sermon</th>
              {TRACK_LOCALES.map((loc) => (
                <th key={loc} className="px-2 py-2">
                  {localeLabels[loc].flag} {localeLabels[loc].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sermons.map((sermon) => {
              const slug = sermon.slug?.current ?? "";
              return (
                <tr key={sermon._id} className="border-b border-default">
                  <td className="py-3 pr-4 font-medium">{sermon.title}</td>
                  {TRACK_LOCALES.map((loc) => (
                    <td key={loc} className="px-2 py-3 align-top">
                      <span className="block text-xs text-foreground-muted">
                        {cellStatus(sermon.translations, loc)}
                      </span>
                      {slug ? (
                        <TranslationCellActions
                          slug={slug}
                          locale={loc}
                          title={sermon.title}
                          excerpt={sermon.summary}
                        />
                      ) : null}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Link href="/studio" className="mt-8 inline-block font-semibold text-brand-primary">
        Open Sanity Studio to approve →
      </Link>
    </>
  );
}
