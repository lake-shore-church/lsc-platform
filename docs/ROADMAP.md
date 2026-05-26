# LSC Platform — Roadmap

**Last updated:** 2026-05-26  
Phases align with `.cursorrules` and [PASTOR_PRIORITIES.md](./PASTOR_PRIORITIES.md) (post–Pastor visit).

---

## Phase 1 — Foundation ✅ (shipped)

**Goal:** Monorepo, database, CMS, public site, auth, core pages.

| Item | Status |
|------|--------|
| Turborepo + pnpm monorepo | ✅ |
| Supabase schema (14 tables + RLS) | ✅ |
| `@repo/db` + `@repo/cms` | ✅ |
| Public routes (Home, Sermons, Events, Give, Prayer, Blog, About, Beliefs, Visit, Contact, Resources, Live, Dedication) | ✅ |
| Member + staff portals + `/login` | ✅ |
| Sanity Studio `/studio` | ✅ |
| Real content seed + homepage redesign | ✅ |
| `/platform` living docs | ✅ |
| Vercel config (`vercel.json`, env example) | 🟡 Deploy to production URL |

---

## Phase 2 — Production hardening & mobile 🟡 (current)

**Goal:** Live deploy, media pipeline, mobile auth, pastor-ready apps.

| Item | Status |
|------|--------|
| 8-locale i18n (en, es, zh, ja, ta, tl, hi, fr) | ✅ |
| Pastor Brian site copy (lschurch.com voice, all locales) | ✅ |
| Full beliefs + dedication pages | ✅ |
| Staff translation dashboard | ✅ |
| Mobile: 5 tabs + Live/Archive sermons + API data | ✅ |
| Mobile: Supabase auth + `lschurch://` deep link | ✅ |
| Livestream (Sanity toggle, `/live`, staff go-live) | ✅ |
| Presenter mode (mobile slides + web Realtime sync) | ✅ (Supabase SQL required) |
| Shared `@repo/media` homepage images | ✅ |
| Ministries hub (`/ministries`), FAQ, leaders, testimonies | ✅ |
| Unified Zoom join redirect (`/join`) | ✅ |
| Homepage year promise + weekly gatherings join on zoom | ✅ |
| `docs/MOBILE_SETUP.md` + `eas.json` | ✅ |
| Cloudflare R2 media | ⏳ |
| Zeffy live URL in Sanity | ⏳ |
| Resend production email | ⏳ |
| EAS project ID + TestFlight | ⏳ |
| Mobile: expo-av player + offline download | ⏳ |
| OneSignal push (go-live) | ⏳ env keys |
| Whisper transcription | ⏳ |

### Phase 2A — Pastor visit follow-up (next)

| Item | Status |
|------|--------|
| Zeffy live + sync → `giving_records` | ⏳ Pastor credentials |
| Member/mobile giving history | ⏳ |
| OneSignal: Wed prayer + Sunday + go-live | ⏳ |
| Resend: event + prayer email templates | ⏳ |
| Staff: notification schedule UI | ⏳ |
| Mobile: native About + Events + calendar add | ⏳ |
| WordPress RSS → blog (if Pastor keeps WP) | ⏳ decision |
| EAS TestFlight for Pastor/staff | ⏳ |
| Set Church Zoom join URL to direct Zoom one-click invite (`?pwd=...`) in Sanity | ⏳ |

---

## Phase 3 — Growth & polish ⏳

**Goal:** SEO depth, PayPal Giving Fund, App Store release, translation quality.

| Item | Status |
|------|--------|
| Per-locale beliefs/dedication copy (not English fallback) | ⏳ |
| DeepL + Google Translate sermon drafts (staff workflow) | 🟡 |
| `hreflang` + advanced SEO | 🟡 |
| PayPal Giving Fund (Sanity toggle) | ⏳ |
| EAS production builds (iOS + Android store) | ⏳ |
| Future locales (yo, tw, ms) | ⚪ Scaffolded only |

---

## Legend

- ✅ Shipped on `main`
- 🟡 In progress / partial
- ⏳ Not started
- ⚪ Deferred
