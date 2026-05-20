import type { Metadata } from "next";
import Link from "next/link";
import { requireStaffPortal } from "@/lib/auth/session";
import { SermonImportForm } from "./SermonImportForm";

export const metadata: Metadata = {
  title: "Import sermon",
  robots: { index: false, follow: false },
};

export default async function SermonImportPage() {
  await requireStaffPortal();

  return (
    <>
      <Link href="/staff/sermons" className="link-hover text-sm font-semibold text-brand-primary">
        ← Back to sermons
      </Link>
      <h1 className="mt-4 font-display text-h2 text-brand-primary">Import sermon from YouTube</h1>
      <p className="mt-3 max-w-prose text-foreground-secondary">
        Paste a Facebook or YouTube video URL, add scripture and a short excerpt, and publish to
        Sanity in about two minutes. Audio upload to R2 will trigger Whisper transcription when
        that pipeline is enabled.
      </p>
      <SermonImportForm />
    </>
  );
}
