# Pastor Brian — Meeting Checklist

**Lake Shore Church Digital Platform**  
**Date:** May 2026  
**Purpose:** Collect credentials and accounts needed to fully activate the LSC digital platform.

**Related technical docs (do not duplicate secrets here):**

- Mobile env + Supabase redirects → [MOBILE_SETUP.md](./MOBILE_SETUP.md)
- Deploy + Studio → [TECH-TEAM-GUIDE.md](./TECH-TEAM-GUIDE.md)
- Living status → [PROJECT_STATUS.md](./PROJECT_STATUS.md)

---

## Before the meeting (Director of Technology)

- [ ] **Supabase Auth → Redirect URLs** ([dashboard](https://supabase.com/dashboard/project/zstnygokvxrrszvkfejs/auth/url-configuration))
  - `http://localhost:3000/auth/callback`
  - `https://lsc-platform-kappa.vercel.app/auth/callback`
  - `lschurch://auth/callback`
  - `exp://**` and `lschurch://**` (Expo Go / app deep links — see [AUTH_TROUBLESHOOTING.md](./AUTH_TROUBLESHOOTING.md))
- [ ] **`apps/mobile/.env` created** (real file — **not** `.env.example`). Copy from `apps/web/.env.local` and use `EXPO_PUBLIC_*` names. See [MOBILE_SETUP.md](./MOBILE_SETUP.md).
- [ ] **Web running for mobile test:** `pnpm --filter web dev` + `pnpm --filter mobile start`
- [ ] **Magic link tested** on iOS Simulator (More → Sign in → open link → returns to app)
- [ ] **Your login promoted** (after first magic-link sign-in):
  ```bash
  pnpm promote:member your@email.com staff
  # or admin if needed:
  pnpm promote:member your@email.com admin
  ```

---

## 501(c)(3) nonprofit status

- [x] **Confirmed** — Lake Shore Church is a registered 501(c)(3) nonprofit (May 2026 Pastor visit).
- [ ] **EIN (tax ID)** — from IRS determination letter (`XX-XXXXXXX`). Needed for:
  - PayPal Giving Fund verification
  - Google for Nonprofits ([nonprofits.google.com](https://www.nonprofits.google.com))
  - Give page trust badge (paste in Sanity → **Church EIN**)
- [ ] **TechSoup** registration (optional) — [techsoup.org](https://www.techsoup.org) — unlocks Microsoft/Google nonprofit bundles.

**Platform:** PayPal Giving Fund defaults **ON** in Sanity; Zeffy remains **primary** (0% platform fee). See [PHASE_2A_SETUP.md](./PHASE_2A_SETUP.md).

---

## During the meeting — credentials to collect

### Critical (platform cannot fully go live without these)

- [ ] **Church email address**
  - Used as sender for church emails and service signups
  - Email: ___________________________

- [ ] **Resend** — [resend.com](https://resend.com)
  - Sign up with church email; verify domain `lschurch.com` when ready
  - Create API key named `lsc-platform-production`
  - API Key: ___________________________
  - From email: `hello@lschurch.com` (or verified domain address)

- [ ] **Zeffy** — [zeffy.com](https://zeffy.com)
  - Sign up with church email
  - Organisation: Lake Shore Church West Loop
  - Add church bank account details
  - Create donation form with funds (e.g. General, Building, Missions)
  - Enable recurring giving
  - **Embed URL** (for iframe on Give page): ___________________________

### High priority (App Store / Play launch)

- [ ] **Apple Developer Account** — [developer.apple.com](https://developer.apple.com)
  - $99/year — church card
  - Apple ID used: ___________________________
  - Team ID: ___________________________
  - Bundle ID already in repo: `com.lakeshorechurch.westloop`

- [ ] **Google Play Console** — [play.google.com/console](https://play.google.com/console)
  - $25 one-time
  - Account email: ___________________________

- [ ] **Expo / EAS account** — [expo.dev](https://expo.dev)
  - Church or tech steward email
  - Needed before `eas build` / TestFlight

- [ ] **OneSignal** — [onesignal.com](https://onesignal.com) *(collect now; wiring is Phase 2 in code)*
  - Create app: `Lake Shore Church`
  - Platforms: Web + iOS + Android
  - App ID: ___________________________
  - REST API Key: ___________________________

### Important (marketing / SEO — not blocking core site)

- [ ] **Google Business Profile** — [business.google.com](https://business.google.com)
  - Claim listing; verify via **(312) 464-1834**
  - Photos + service times
  - Status: ___________________________

- [ ] **Google for Nonprofits** — [nonprofits.google.com](https://www.google.com/nonprofits/)
  - Optional: up to $10,000/month Google Ads credit
  - Needs church email + 501(c)(3) documentation
  - Application status: ___________________________

- [ ] **PayPal Giving Fund** — only after 501(c)(3) confirmed
  - Do **not** enable `paypalGivingEnabled` in Sanity until legal confirms
  - Status: ___________________________

---

## Information to confirm with Pastor

- [ ] Church official email: ___________________________
- [ ] 501(c)(3) status: Yes / No / Pending
- [ ] YouTube channel URL: ___________________________
- [ ] Facebook admin access for embed: Yes / No
- [ ] Pastor full name: Craig Brian Larson ✓
- [ ] Service time: 10:00 AM Sundays ✓
- [ ] Denomination: Assemblies of God ✓
- [ ] Church logo files (PNG/SVG): Yes / No
- [ ] Congregation photos for site: Yes / No

---

## After the meeting — Director of Technology

### Step 1 — Add credentials to environment

**Local:** `apps/web/.env.local`

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@lschurch.com
NEXT_PUBLIC_ONESIGNAL_APP_ID=
ONESIGNAL_REST_API_KEY=
```

**Mobile:** `apps/mobile/.env` (gitignored)

```env
EXPO_PUBLIC_APP_URL=https://lsc-platform-kappa.vercel.app
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
EXPO_PUBLIC_SANITY_PROJECT_ID=7hl877lg
EXPO_PUBLIC_SANITY_DATASET=production
```

**Vercel:** Project → Settings → Environment Variables — same keys as web; Production + Preview.

Never commit `.env` or `.env.local`.

---

### Step 2 — Update Sanity siteConfig

Open **`/studio`** → **Site configuration**:

| Field in Studio | What to paste |
|-----------------|---------------|
| `zeffyEmbedUrl` | Zeffy embed URL from meeting |
| `paypalGivingEnabled` | `false` until 501(c)(3) confirmed; then `true` |

Publish after editing.

---

### Step 3 — OneSignal (collect keys today; implement with Cursor later)

Code today: env vars are referenced in docs; **push is not fully wired** on web service worker or mobile yet. After meeting, ask Cursor:

> OneSignal App ID and REST key are in Vercel and `.env.local`. Wire web push and mobile registration per ROADMAP Phase 2.

---

### Step 4 — Submit podcast feeds

**RSS URL:** `https://lsc-platform-kappa.vercel.app/podcast.xml`  
(Use `https://lschurch.com/podcast.xml` when custom domain is live.)

| Platform | Steps |
|----------|--------|
| **Apple Podcasts** | [podcastsconnect.apple.com](https://podcastsconnect.apple.com) → Add show → paste RSS → Validate → Submit |
| **Spotify** | [podcasters.spotify.com](https://podcasters.spotify.com) → Add podcast → same RSS |

Allow 24–48 hours for Apple approval.

---

### Step 5 — EAS build (after Apple Developer account exists)

```bash
cd "/Users/usha/Documents/LSAG Church/lsc-platform/apps/mobile"
npx eas init
npx eas build --platform all
# TestFlight first, then store submit when ready:
npx eas submit --platform all
```

---

### Step 6 — Verify after credentials are added

| Test | Expected |
|------|----------|
| Prayer form | Email to staff (Resend configured) |
| Contact form | Email to church inbox |
| Event RSVP | Confirmation email |
| Give page | Zeffy iframe loads (not “coming soon”) |
| Web login | Magic link at `/login` |
| Mobile login | Magic link → `lschurch://` callback |
| Podcast | Submitted to Apple/Spotify (not instant) |
| Push notification | ⏳ After OneSignal wiring in Phase 2 |
| TestFlight / Play internal | ⏳ After EAS build + store accounts |

---

## Platform status (accurate as of 2026-05-21)

| Feature | Status |
|---------|--------|
| Website (Vercel preview) | ✅ https://lsc-platform-kappa.vercel.app |
| 10 sermons + devotionals | ✅ Sanity CMS |
| Member + staff portals | ✅ Magic link + RLS |
| 8 languages | ✅ en, es, zh, ja, ta, tl, hi, fr |
| Beliefs + dedication pages | ✅ Web |
| Mobile app (local / Expo) | ✅ 5 tabs + API + auth scaffold |
| Email (Resend) | ✅ API on Vercel; contact tested; verify `lschurch.com` when DNS ready |
| Online giving (Zeffy) | ⏳ Needs embed URL in Sanity |
| Push (OneSignal) | 🟡 Keys on Vercel; web SDK on branch — merge to `main` |
| iOS App Store / TestFlight | ⏳ Apple Developer + EAS build |
| Android Play Store | ⏳ Play Console + EAS build |
| Podcast Apple / Spotify | ⏳ Submit RSS after meeting |
| Custom domain lschurch.com | 🟡 Cloudflare NS set; pending Active → DNS ([handover](../handover/README.md)) |
| Cloudflare R2 media | ⏳ Phase 2+ |
| Whisper transcription | ⏳ Phase 2+ |

---

*Prepared for Lake Shore Church — West Loop, Chicago*  
*38 S. Peoria St · (312) 464-1834 · [lschurch.com](https://lschurch.com)*
