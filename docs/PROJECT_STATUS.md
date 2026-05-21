# LSC Platform — Project Status

**Last updated:** 2026-05-21  
**Active branch:** `main` (only branch)  
**Repository:** https://github.com/lake-shore-church/lsc-platform  
**Merged PRs:** [#1](https://github.com/lake-shore-church/lsc-platform/pull/1) (platform scaffold), [#2](https://github.com/lake-shore-church/lsc-platform/pull/2) (mobile native foundation)

---

## Summary

Lake Shore Church **lsc-platform** — Next.js public site (**8 locales:** en, es, zh, ja, ta, tl, hi, fr), member/staff portals, Expo mobile app, Supabase, Sanity CMS. **Web:** full [lschurch.com/beliefs](https://lschurch.com/beliefs), `/dedication` (Holy Spirit as Director of Technology + salvation prayer), stable language switching. **Mobile:** five tabs, web API data, Supabase magic-link auth (`lschurch://`). See **[MOBILE_SETUP.md](./MOBILE_SETUP.md)** for pastor meeting credentials.

**Next:** Vercel production env, Supabase mobile redirect URLs, EAS `eas init`, R2 + Zeffy, translate beliefs/dedication per locale.

---

## Infrastructure & credentials

| Service | Status | Notes |
|---------|--------|-------|
| GitHub | ✅ | `lake-shore-church/lsc-platform`; only `main` branch |
| Supabase | ✅ | `zstnygokvxrrszvkfejs`; migration applied |
| Sanity | ✅ | `7hl877lg` / `production` |
| Vercel (web) | 🟡 | Deploy from `main`; see TECH-TEAM-GUIDE |
| EAS (mobile) | 🟡 | `eas.json` ready; run `eas init` for project ID |
| Cloudflare R2 | ⏳ | Keys not in `.env.local` |
| Resend / OpenAI / OneSignal | ⏳ | Phase 2+ |

---

## Monorepo structure

| Path | Status | Description |
|------|--------|-------------|
| `apps/web` | ✅ | Next.js 16; localized public site; member/staff portals; Studio; APIs |
| `apps/mobile` | 🟡 | Expo 54; 5 tabs; auth; NativeWind wired; API + Supabase |
| `packages/db` | ✅ | Typed Supabase client + queries |
| `packages/cms` | ✅ | Sanity schemas, seed, GROQ |
| `packages/config` | ✅ | Shared `tailwind.config.js` (web + mobile) |
| `packages/ui` | 🟡 | Web components; mobile uses local `components/ui` |
| `docs/` + `AGENTS.md` | ✅ | Living docs + MOBILE_SETUP |

---

## Next.js routes (high level)

| Area | Status |
|------|--------|
| `[locale]/(public)/` — all main pages + dedication | ✅ |
| `/member/*`, `/staff/*`, `/login`, `/studio` | ✅ |
| `/api/mobile/*`, `/api/prayers`, `/api/translate*` | ✅ |
| `/podcast.xml` | ✅ |
| `/platform`, `/platform/tech` | ✅ |

---

## Mobile app

| Feature | Status |
|---------|--------|
| Home, Sermons, Give, Prayer, More tabs | ✅ styled UI, shared components, sermon images via API |
| Sermon detail (WebView) | ✅ |
| Language picker (8 locales) | ✅ |
| Magic-link auth + profile on More | ✅ [MOBILE_SETUP.md](./MOBILE_SETUP.md) |
| Brand tokens + shared components (`SermonCard`, `EventCard`) | ✅ StyleSheet + `constants/tokens` |
| Offline audio / push notifications | ⏳ Phase 2 |

---

## Git

| Branch | Notes |
|--------|-------|
| `main` | Single branch; feature branches deleted after merge |

---

## Immediate next steps

1. **Pastor meeting** — follow [MOBILE_SETUP.md](./MOBILE_SETUP.md) (env + Supabase redirects)
2. **Vercel** — production deploy from `main`
3. **`pnpm promote:member <email> member|staff`** after first sign-in
4. **EAS** — `cd apps/mobile && npx eas init`
5. **R2 + Zeffy** — live giving embed
6. **Translate** beliefs + dedication for non-English locales
