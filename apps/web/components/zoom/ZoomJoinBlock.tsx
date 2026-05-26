import { Link } from "@/i18n/navigation";
import { churchZoomJoinPath } from "@repo/cms";

export function ZoomJoinBlock({
  meetingId,
  passcode,
  className = "",
}: {
  meetingId: string;
  passcode: string;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-default bg-surface-2 p-4 ${className}`}>
      <Link
        href={churchZoomJoinPath()}
        className="link-hover inline-flex min-h-[44px] items-center font-semibold text-brand-primary"
      >
        Join on Zoom →
      </Link>
      <p className="mt-3 text-sm text-foreground-secondary">
        Same link for <strong>Sunday &amp; Wednesday</strong> meetings. If Zoom asks for a
        passcode, use the details below.
      </p>
      <dl className="mt-3 grid gap-2 text-sm text-foreground-secondary sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-foreground-primary">Meeting ID</dt>
          <dd>{meetingId}</dd>
        </div>
        <div>
          <dt className="font-semibold text-foreground-primary">Passcode (manual)</dt>
          <dd>{passcode}</dd>
        </div>
      </dl>
    </div>
  );
}
