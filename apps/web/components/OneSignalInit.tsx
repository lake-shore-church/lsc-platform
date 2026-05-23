"use client";

import Script from "next/script";

const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;

/** Loads OneSignal Web SDK when App ID is configured (Vercel / .env.local). */
export function OneSignalInit() {
  if (!appId) return null;

  return (
    <>
      <Script
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        strategy="afterInteractive"
        defer
      />
      <Script id="onesignal-init" strategy="afterInteractive">
        {`
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "${appId}",
              serviceWorkerPath: "/OneSignalSDKWorker.js",
              serviceWorkerUpdaterPath: "/OneSignalSDKUpdaterWorker.js",
            });
          });
        `}
      </Script>
    </>
  );
}
