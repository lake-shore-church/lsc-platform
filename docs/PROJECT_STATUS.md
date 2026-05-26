# LSC Platform — Project Status

**Last updated:** 2026-05-26  
**Active branch:** `feature/cp-1-this-week` (Phase CP-1 — This Week single source of truth)  
**Repository:** https://github.com/lake-shore-church/lsc-platform  
**Production (web):** https://lsc-platform-kappa.vercel.app  
**Pastor visit:** May 2026 — site approved; priorities in [PASTOR_PRIORITIES.md](./PASTOR_PRIORITIES.md)  

---

## Summary

Lake Shore Church **lsc-platform** — Next.js public site (**8 locales:** en, es, zh, ja, ta, tl, hi, fr), member/staff portals, Expo mobile app, Supabase, Sanity CMS.

**Voice & content:** Pastor Brian’s words from [lschurch.com](https://lschurch.com/) — resurrection-centred hero, distinctives on About/Beliefs, exact Sunday service copy (`Begins at 10 A.M.`, Merit School of Music). No “Authentic Christianity Together” on the site.

**Livestream:** Manual Sanity toggle + staff **Go live** on `/staff/sermons`; `/live` page; mobile **Sermons → Live** tab; site-wide live banner. See [LIVESTREAM_SETUP.md](./LIVESTREAM_SETUP.md).

**Presenter mode:** Staff/admin mobile `/presenter` — slide control + Realtime sync for web viewers. Requires Supabase migration — see [PRESENTER_MODE.md](./PRESENTER_MODE.md).

**Mobile:** Five tabs, web-parity home (hero, themes, ministry cards, testimonials), Live/Archive sermons, shared API, Supabase auth. See [MOBILE_SETUP.md](./MOBILE_SETUP.md).

---

## Infrastructure & credentials

| Service | Status | Notes |
|---------|--------|-------|
| GitHub | ✅ | `lake-shore-church/lsc-platform`; `main` only |
| Supabase | ✅ | `zstnygokvxrrszvkfejs`; core migration applied |
| Supabase `presentation_state` | 🟡 | Run `supabase/migrations/20260521_presentation_state.sql` + Realtime |
| Sanity | ✅ | `7hl877lg` / `production`; refresh Site Config for new hero fields |
| Vercel (web) | ✅ | Auto-deploy from `main`; env vars updated May 2026 |
| Custom domain `lschurch.com` | 🟡 | Cloudflare NS set; pending **Active** → Vercel DNS |
| EAS (mobile) | 🟡 | `eas.json` ready; `eas init` for store builds |
| Cloudflare R2 | ⏳ | Phase 2 — audio hosting |
| OneSignal | 🟡 | Keys on Vercel; Web SDK on branch — merge + deploy |
| Resend | ✅ | Contact form tested on production (`onboarding@resend.dev`) |
| OpenAI / Whisper | ⏳ | Phase 2 |
| Church handover doc | ✅ | `docs/handover/CHURCH_ACCOUNTS.local.md` (gitignored) |

---

## Monorepo structure

| Path | Status | Description |
|------|--------|-------------|
| `apps/web` | ✅ | Next.js 16; localized site; livestream; presenter web sync |
| `apps/mobile` | ✅ | Expo 54; Live/Archive sermons; presenter mode; live banner |
| `packages/db` | ✅ | Supabase types + queries (`presentation_state` typed) |
| `packages/cms` | ✅ | Sanity schemas, livestream + sermon slides |
| `packages/media` | ✅ | Shared homepage images (web + mobile) |
| `packages/ui` | ✅ | Web components (`LiveCountdown`, themes, etc.) |
| `docs/` | ✅ | Living docs — see [README.md](./README.md) |

---

## Web features (high level)

| Area | Status |
|------|--------|
| Public pages (home, about, beliefs, visit, sermons, live, …) | ✅ |
| Ministries hub + FAQ + leaders + testimonies | ✅ |
| Unified Zoom join redirect (`/join`) | ✅ |
| Home year promise + weekly gatherings (incl. Join on Zoom) | ✅ |
| **This Week CMS + `/api/this-week`** (CP-1) | ✅ branch |
| 8-locale i18n + CMS hero (English) | ✅ |
| Member / staff portals, Studio, APIs | ✅ |
| Livestream (`/live`, `/api/live-status`, staff go-live) | ✅ |
| Presenter sync on sermon detail pages | ✅ (after Supabase migration) |
| `/podcast.xml`, `/dedication`, `/platform` | ✅ |

---

## Mobile app

| Feature | Status |
|---------|--------|
| Home (hero, service cards, series, ministry, events, testimonials) | ✅ |
| Home “Join on Zoom” (one-click `/join`) | ✅ |
| **This Week** card + service strip from `/api/mobile/home` | ✅ branch |
| Themes (Bold / Warm / Advent / Easter) | ✅ |
| Sermons — **Live** + **Archive** tabs | ✅ |
| Give (web), Prayer, More | ✅ |
| Presenter Mode (staff/admin) | ✅ |
| Magic-link auth | ✅ [AUTH_TROUBLESHOOTING.md](./AUTH_TROUBLESHOOTING.md) |
| Push notifications (go-live) | ⏳ OneSignal keys |

---

## Git hygiene

| Item | Status |
|------|--------|
| `main` up to date with production features | ✅ |
| `feature/presenter-mode` merged | ✅ |
| Working tree clean | ✅ |
| `main` pushed to GitHub | ✅ (2026-05-26) |

---

## Phase 2A (code shipped; follow-up tasks)

| Item | Code | Needs Pastor/Vercel |
|------|------|---------------------|
| 501(c)(3) trust badge + PayPal toggle | ✅ | EIN in Sanity when ready |
| Zeffy embed on web + mobile | ✅ | Paste Zeffy URL in Studio |
| Resend acknowledgements | ✅ | `RESEND_*` on Vercel — contact verified |
| Prayer API (service role) | ✅ code | `SUPABASE_SERVICE_ROLE_KEY` on Vercel; merge prayer fix to `main` |
| OneSignal Web SDK | ✅ code (branch) | Push + merge; keys already on Vercel |
| OneSignal scheduled crons | ✅ | `ONESIGNAL_*` + `CRON_SECRET` on Vercel |
| Mevo → Restream docs | ✅ | RTMP key in Mevo app only |
| WordPress RSS import | ⏳ | Pastor URL decision |
| Zeffy → `giving_records` sync | ⏳ | Phase 2A follow-up |

See [PHASE_2A_SETUP.md](./PHASE_2A_SETUP.md).

---

## Content platform phases

| Phase | Status | Notes |
|-------|--------|-------|
| **CP-0** | ✅ | Pastor IA sign-off doc (`CONTENT_PLATFORM_EVALUATION.md`) |
| **CP-1** | ✅ | `thisWeek` Sanity type, `/api/this-week`, homepage + mobile wired; seed + migrate scripts |
| **CP-2** | ⏳ **Next** | Pastor-simple PATCH editing; remove duplicate `siteConfig` weekly fields |
| **CP-3** | ⏳ | Optional `/connect` merge (events + prayer) |
| **CP-4** | ⏳ | `/updates` weekly archive |

See [CONTENT_PLATFORM_EVALUATION.md](./CONTENT_PLATFORM_EVALUATION.md).

## Immediate next steps

1. **Merge CP-1** — review PR `feature/cp-1-this-week` → `main`; deploy; run `pnpm seed:this-week` on production dataset if needed.
2. **Weekly workflow:** Sanity Studio → **📅 This Week** (first nav item) — update every Tuesday; homepage + mobile refresh within 5 minutes.
3. **Set Zoom join target (optional):** in Sanity → `Site configuration` → **Church Zoom join URL**. See `docs/ZOOM_JOIN.md`.
4. Continue Phase 2A: prayer (Supabase role) + OneSignal subscribe + Zeffy embed URL in Sanity.
5. Resend: verify `lschurch.com` when DNS is Active.

---

## Verification

```bash
pnpm install
pnpm --filter web check-types
pnpm --filter mobile check-types
pnpm run verify   # full monorepo lint + typecheck
```

Local web: `pnpm --filter web dev` → http://localhost:3000
