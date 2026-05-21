# LSC Platform — Project Status

**Last updated:** 2026-05-21 (end of day)  
**Active branch:** `main` (single branch; feature branches merged and deleted)  
**Repository:** https://github.com/lake-shore-church/lsc-platform  
**Production (web):** https://lsc-platform-kappa.vercel.app  

---

## Summary

Lake Shore Church **lsc-platform** — Next.js public site (**8 locales:** en, es, zh, ja, ta, tl, hi, fr), member/staff portals, Expo mobile app, Supabase, Sanity CMS.

**Voice & content:** Pastor Brian’s words from [lschurch.com](https://lschurch.com/) — resurrection-centred hero, distinctives on About/Beliefs, exact Sunday service copy (`Begins at 10 A.M.`, Merit School of Music). No “Authentic Christianity Together” on the site.

**Livestream:** Manual Sanity toggle + staff **Go live** on `/staff/sermons`; `/live` page; mobile **Sermons → Live** tab; site-wide live banner. See [LIVESTREAM_SETUP.md](./LIVESTREAM_SETUP.md).

**Presenter mode:** Staff/admin mobile `/presenter` — slide control + Realtime sync for web viewers. Requires Supabase migration — see [PRESENTER_MODE.md](./PRESENTER_MODE.md).

**Mobile:** Five tabs, shared API, Supabase magic-link auth. See [MOBILE_SETUP.md](./MOBILE_SETUP.md).

---

## Infrastructure & credentials

| Service | Status | Notes |
|---------|--------|-------|
| GitHub | ✅ | `lake-shore-church/lsc-platform`; `main` only |
| Supabase | ✅ | `zstnygokvxrrszvkfejs`; core migration applied |
| Supabase `presentation_state` | 🟡 | Run `supabase/migrations/20260521_presentation_state.sql` + Realtime |
| Sanity | ✅ | `7hl877lg` / `production`; refresh Site Config for new hero fields |
| Vercel (web) | ✅ | Auto-deploy from `main` |
| EAS (mobile) | 🟡 | `eas.json` ready; `eas init` for store builds |
| Cloudflare R2 | ⏳ | Phase 2 — audio hosting |
| OneSignal | ⏳ | Optional; env keys for go-live push |
| Resend / OpenAI | ⏳ | Phase 2 |

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
| Home (quote card, live banner, latest sermon) | ✅ |
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
| Working tree clean | ✅ (after final doc commit) |

---

## Immediate next steps (pastor / ops)

1. **Sanity Studio** — Site Config: confirm hero copy + `Begins at 10 A.M.` (or `pnpm seed:site-config` with token).
2. **Supabase** — Run presenter migration SQL; enable Realtime on `presentation_state`.
3. **Supabase Auth** — Redirect URLs for mobile (`lschurch://`); see [MOBILE_SETUP.md](./MOBILE_SETUP.md).
4. **Test livestream** — Staff `/staff/sermons` → Go live with test YouTube ID; check `/live` + mobile Live tab.
5. **EAS** — `cd apps/mobile && npx eas init` when ready for TestFlight.

---

## Verification

```bash
pnpm install
pnpm --filter web check-types
pnpm --filter mobile check-types
pnpm run verify   # full monorepo lint + typecheck
```

Local web: `pnpm --filter web dev` → http://localhost:3000
