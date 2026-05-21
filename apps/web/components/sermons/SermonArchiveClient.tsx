"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Sermon, SermonSeries } from "@repo/cms";
import { SermonCard } from "./SermonCard";
import { slugValue } from "@/lib/sanity";

export function SermonArchiveClient({
  sermons,
  series,
}: {
  sermons: Sermon[];
  series: SermonSeries[];
}) {
  const t = useTranslations("sermons");
  const [query, setQuery] = useState("");
  const [seriesFilter, setSeriesFilter] = useState("");
  const [pastorFilter, setPastorFilter] = useState("");

  const pastors = useMemo(
    () =>
      [...new Set(sermons.map((s) => s.pastor?.name).filter(Boolean))] as string[],
    [sermons],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return sermons.filter((s) => {
      if (seriesFilter && slugValue(s.series?.slug) !== seriesFilter) return false;
      if (pastorFilter && s.pastor?.name !== pastorFilter) return false;
      if (!q) return true;
      const hay = [s.title, s.summary, s.scripture, s.pastor?.name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [sermons, query, seriesFilter, pastorFilter]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 rounded-xl border border-default bg-surface p-4 sm:flex-row sm:flex-wrap">
        <input
          type="search"
          placeholder={t("search")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-[44px] flex-1 rounded-lg border border-default bg-background px-3 text-sm text-foreground-primary"
          aria-label={t("search")}
        />
        <select
          value={seriesFilter}
          onChange={(e) => setSeriesFilter(e.target.value)}
          className="min-h-[44px] rounded-lg border border-default bg-background px-3 text-sm"
          aria-label={t("all_series")}
        >
          <option value="">{t("all_series")}</option>
          {series.map((s) => (
            <option key={s._id} value={slugValue(s.slug)}>
              {s.title}
            </option>
          ))}
        </select>
        <select
          value={pastorFilter}
          onChange={(e) => setPastorFilter(e.target.value)}
          className="min-h-[44px] rounded-lg border border-default bg-background px-3 text-sm"
          aria-label={t("all_speakers")}
        >
          <option value="">{t("all_speakers")}</option>
          {pastors.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((sermon) => (
          <SermonCard key={sermon._id} sermon={sermon} />
        ))}
      </div>
    </div>
  );
}
