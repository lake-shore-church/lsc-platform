import { redirect } from "next/navigation";
import { getSiteConfig, resolveChurchZoomJoinUrl } from "@repo/cms";

export const dynamic = "force-dynamic";

/** Redirect to church Zoom (Sunday + Wednesday). Served at /join via next-intl as-needed routing. */
export default async function JoinPage() {
  const config = await getSiteConfig();
  const target = resolveChurchZoomJoinUrl(config, process.env);
  redirect(target);
}
