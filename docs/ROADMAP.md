# LSC Platform — Roadmap

**Last updated:** 2026-05-20

Phases align with `.cursorrules` and the Lake Shore Church build blueprint.

---

## Phase 1 — Foundation (current)

**Goal:** Monorepo, database, CMS, public site shell, auth, core pages.

| Item | Status |
|------|--------|
| Turborepo + pnpm monorepo | ✅ |
| Supabase schema (14 tables + RLS) | ✅ |
| `@repo/db` package | ✅ |
| Expo mobile scaffold | ✅ |
| Sanity `packages/cms` | ⏳ |
| Tailwind + Radix design system | ⏳ |
| Public routes: Home, Sermons, Events, Give, Prayer, Blog, About, Visit, Contact | ⏳ |
| Magic link auth (member) | ⏳ |
| Zeffy embed on `/give` | ⏳ |
| Project status page `/platform` | 🟡 |
| Vercel deploy (web) | ⏳ |

---

## Phase 2 — Staff & member portals

**Goal:** Internal tools for church team; member dashboard.

| Item | Status |
|------|--------|
| Staff route group: prayers, sermons upload, events, blog, members | ⏳ |
| Financial dashboard `/staff/financials` | ⏳ |
| Expense entry + Zeffy giving sync | ⏳ |
| Member dashboard, groups, resources | ⏳ |
| Tithing statement PDF (`@react-pdf/renderer`) | ⏳ |
| Cloudflare R2 media pipeline | ⏳ |
| Resend + React Email | ⏳ |
| OneSignal push (mobile) | ⏳ |
| Whisper transcription Edge Function | ⏳ |
| Sanity Studio embed `/studio` | ⏳ |

---

## Phase 3 — Multilingual & growth

**Goal:** i18n, translation pipeline, SEO polish, PayPal Giving Fund toggle.

| Item | Status |
|------|--------|
| `next-intl` routes `/es` `/fr` `/pt` `/zh` | ⏳ |
| DeepL subtitle pipeline | ⏳ |
| `hreflang` + advanced SEO | ⏳ |
| PayPal Giving Fund (Sanity toggle) | ⏳ |
| EAS production builds (iOS + Android) | ⏳ |

---

## Legend

- ✅ Shipped
- 🟡 In progress
- ⏳ Not started
- ⚪ Deferred / optional
