"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useLiveStatus } from "@/hooks/useLiveStatus";
import { LiveBadge } from "./LiveBadge";

export function LiveNavLink() {
  const t = useTranslations("nav");
  const { status } = useLiveStatus();

  if (status?.isLive) {
    return <LiveBadge />;
  }

  return (
    <Link
      href="/live"
      className="link-hover block px-4 py-2 text-base text-foreground-secondary hover:bg-surface-2 hover:text-brand-primary"
    >
      {t("live")}
    </Link>
  );
}
