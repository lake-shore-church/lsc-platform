# LSC Platform — Project Status

**Last updated:** 2026-05-26  
**Active branch:** `main` — **demo meeting prep** + in-house livestream plan documented  
**Repository:** https://github.com/lake-shore-church/lsc-platform  
**Production (web):** https://lsc-platform-kappa.vercel.app  
**Pastor visit:** May 2026 — site approved; priorities in [PASTOR_PRIORITIES.md](./PASTOR_PRIORITIES.md)  

---

## Summary

Lake Shore Church **lsc-platform** — Next.js public site (**8 locales:** en, es, zh, ja, ta, tl, hi, fr), member/staff portals, Expo mobile app, Supabase, Sanity CMS.

**Voice & content:** Pastor Brian’s words from [lschurch.com](https://lschurch.com/) — resurrection-centred hero, distinctives on About/Beliefs, exact Sunday service copy (`Begins at 10 A.M.`, Merit School of Music). No “Authentic Christianity Together” on the site.

**Livestream:** `/live` shell + mobile Live tab ✅; **in-house video** (Subsplash replacement) planned — [LIVESTREAM_INHOUSE_PLAN.md](./LIVESTREAM_INHOUSE_PLAN.md). Today’s site demo: [DEMO_MEETING_CHECKLIST.md](./DEMO_MEETING_CHECKLIST.md).

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
| `main` pushed to GitHub | ✅ (2026-05-22) |

---

## Phase 2A (in progress on `feature/phase-2a`)

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

## Immediate next steps

1. **Sleep / resume:** See [PHASE_2A_SETUP.md](./PHASE_2A_SETUP.md) checklist — most Vercel env is done.
2. When Cloudflare shows **Active** → DNS A + CNAME → Vercel domains.
3. **Commit + push** `feature/phase-2a` (prayer fix, OneSignal web, handover template) → merge `main` → Vercel deploy.
4. Test prayer (Public), OneSignal subscribe, Zeffy embed in Sanity.
5. Resend: verify `lschurch.com` when DNS ready.

---

## Verification

```bash
pnpm install
pnpm --filter web check-types
pnpm --filter mobile check-types
pnpm run verify   # full monorepo lint + typecheck
```

Local web: `pnpm --filter web dev` → http://localhost:3000
