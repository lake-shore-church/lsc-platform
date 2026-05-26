# Church Zoom — one link for all meetings

Lake Shore Church uses **one Zoom room** for Sunday worship, Wednesday prayer, and special gatherings.

## Why Subsplash “just worked”

The old mobile link ([Subsplash](https://lakeshoreassemblyofgod.subspla.sh/kfcjjpv)) redirects to Zoom with the **passcode embedded** in the URL (`?pwd=…`). Zoom then opens without asking for a passcode.

Typing **Meeting ID `830 7883 7399`** and **Passcode `662215`** manually always prompts — that is normal Zoom behavior.

## Our replacement (web + mobile)

| What | URL |
|------|-----|
| **Church short link** | `https://your-domain.com/join` |
| **What it does** | Server redirect → configured one-click join URL |

- **Web:** buttons link to `/join`
- **Mobile app:** opens `{EXPO_PUBLIC_APP_URL}/join` (same redirect, always up to date from Sanity)

Configure the target URL in **Sanity Studio → Site configuration → Church Zoom join URL**.

## Get a true one-click Zoom link (drop Subsplash)

1. Sign in to [Zoom](https://zoom.us) as the church account admin.
2. **Settings → Meeting → Security** (or meeting-level security).
3. Enable **Embed passcode in invite link for one-click join**.
4. Open the recurring meeting → **Copy invitation** or **Copy invite link**.
5. The link should look like:  
   `https://usXXweb.zoom.us/j/83078837399?pwd=xxxxxxxxxxxxxxxx`
6. Paste that full URL into Sanity **Church Zoom join URL** (and optionally in `.env.local` as `CHURCH_ZOOM_JOIN_URL` for seeds).

Until that link is set, we keep the Subsplash URL as the redirect target — it still works.

## Environment (optional, for seed scripts)

```bash
# apps/web/.env.local — do not commit
CHURCH_ZOOM_JOIN_URL=https://usXXweb.zoom.us/j/83078837399?pwd=YOUR_EMBEDDED_PWD
```

Then run:

```bash
pnpm seed:site-config
```

## Display fields (fallback)

Stored in Site configuration for people joining manually:

- **Meeting ID:** `830 7883 7399`
- **Passcode:** `662215`

Shown on the home page under “Join on Zoom” when someone cannot use the one-click button.

## Mobile app note

`EXPO_PUBLIC_APP_URL` must point at production (e.g. `https://lsc-platform-kappa.vercel.app`) so `/join` resolves correctly on devices.

When `lschurch.com` is live, update that env and the redirect will use the custom domain automatically.
