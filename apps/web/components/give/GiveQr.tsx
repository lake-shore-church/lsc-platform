"use client";

import QRCode from "react-qr-code";

export function GiveQr({ url }: { url: string }) {
  return (
    <div className="inline-block rounded-xl border border-default bg-white p-4">
      <QRCode value={url} size={160} aria-label="QR code for giving" />
      <p className="mt-2 text-center text-xs text-foreground-muted">Scan to give</p>
    </div>
  );
}
