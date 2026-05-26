import { redirect } from "next/navigation";
import { getSiteConfig, resolveChurchZoomJoinUrl } from "@repo/cms";

/** Server redirect — works with next-intl (root Route Handlers were 404 on Vercel). */
export const dynamic = "force-dynamic";

export default async function JoinPage() {
  const config = await getSiteConfig();
  const target = resolveChurchZoomJoinUrl(config, process.env);
  redirect(target);
}
