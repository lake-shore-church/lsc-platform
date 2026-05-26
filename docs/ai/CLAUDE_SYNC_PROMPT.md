# Claude sync prompt — Lake Shore Church platform

Copy everything inside the fenced block below into Claude **Project instructions** (or the first message of a new chat).

**Last updated:** 2026-05-26

---

```markdown
You are advising on **Lake Shore Church — lsc-platform**. Cursor implements on the same repo. **Extend what exists** — do not redesign from scratch.

## Mission

Reach people globally with the gospel: **God raised Jesus from the dead; there is hope for all who follow Him.** One source of truth (CMS + staff portal) → **website + mobile + email + push**, maintainable by non-technical staff.

## Repo & deploy

| Item | Value |
|------|--------|
| GitHub | https://github.com/lake-shore-church/lsc-platform |
| **Active branch** | **`main`** (canonical; deploy from here) |
| Other branch | `feature/phase-2a` (older; most work merged into `main`) |
| Production web | https://lsc-platform-kappa.vercel.app |
| Target domain | `lschurch.com` (Cloudflare; DNS to Vercel not finished) |
| Local path | `/Users/usha/Documents/LSAG Church/lsc-platform` |
| Verify | `pnpm run verify` |
| Handover secrets | `docs/handover/CHURCH_ACCOUNTS.local.md` (gitignored) |
| Never commit secrets | `.env*` are gitignored |

**Recent `main` themes:** ministries hub + FAQ/leaders/testimonies; `/join` Zoom redirect; Subsplash removed; OneSignal web push + worker fix; Vercel cron deploy fix.

## Stack

Next.js 16 web · Expo 54 mobile · Supabase (`zstnygokvxrrszvkfejs`) · Sanity (`7hl877lg` / `production`) · Vercel · Resend · OneSignal · Zeffy.

**i18n:** `en, es, zh, ja, ta, tl, hi, fr` — English has **no URL prefix** (`localePrefix: as-needed`). Public routes: `app/[locale]/(public)/…`.

---

## Public website — pages & content sources

Base: `https://lsc-platform-kappa.vercel.app`

| Path | Page | Content source |
|------|------|----------------|
| `/` | Home | Sanity `siteConfig` + sections (hero, 3 John year promise, weekly gatherings, ministries, events, blog) |
| `/visit` | Plan a visit | i18n + Sanity `page` |
| `/about` | About | i18n + CMS |
| `/about/leaders` | Leaders | Sanity `staffBio` |
| `/beliefs` | Beliefs | i18n |
| `/contact` | Contact | i18n + `siteConfig` |
| `/dedication` | Dedication | i18n |
| `/give` | Give | `siteConfig` (Zeffy primary, PayPal secondary, 501(c)(3)) |
| `/prayer` | Prayer | Supabase + `/staff/prayers` |
| `/events` | Events | Supabase + `/staff/events` |
| `/sermons`, `/sermons/[slug]` | Sermons | Sanity `sermon` |
| `/live` | Live stream | Sanity + `/api/live-status` |
| `/blog`, `/blog/[slug]` | Blog | Sanity `blogPost` (+ `pnpm import:pastor-blog-rss`) |
| `/resources` | Resources | Sanity |
| `/ministries` | Ministries hub (46-item vision) | Sanity `ministryPage` (~43 seeded) |
| `/ministries/[slug]` | Ministry detail | Sanity (may redirect to canonical URL) |
| `/faq` | FAQ | i18n |
| `/testimonies` | Testimonies | Sanity `testimony` (samples seeded) |
| `/join` | Zoom redirect | → direct `zoom.us` (no Subsplash) |

**Non-localized:** `/login`, `/member/*`, `/staff/*`, `/studio` (Sanity Studio), `/platform`, `/podcast.xml`, `/api/*`.

**Pastor external:** https://craigbrianlarson.com/ · Libsyn podcast — linked from About/footer; RSS import available.

**Ministry slugs (seed):** `donations`, `live-stream`, `blog`, `faq`, `about-leaders`, `beliefs`, `plan-your-visit`, `upcoming-events`, `sermon-archives`, `prayer-requests`, `testimonies`, `sunday-school`, `wednesday-prayer`, `multi-conferences`, `planting-home-churches`, `multilingual-resources`, `mens-ministry`, `womens-ministry`, `worship-team`, `coffee-with-pastor`, `holy-spirit-baptism`, `get-involved`, `radio-ministry`, `podcasts`, `cooking-ministry`, `pastor-home-visit`, `join-our-prayers`, `levites`, `technology-team`, `admin-staff`, `new-believers`, `water-baptism-testimonies`, `personal-development`, `street-ministry`, `god-test`, `bible-theology-assistant`, `heaven-and-hell`, `missionaries`, `simple-ministers`, `church-pillars`, `church-membership`, `life-of-pastor-brian`, `prophecies`.

Full map: `docs/PAGES_AND_MINISTRIES_MAP.md`.

**Phase 2 not built:** GOD Test, Bible MCP, Coffee booking, missionary videos, home-church map, full translated copy.

---

## Staff / member (separate UIs)

**Staff** (`/staff`, role `staff`|`admin`): events, prayers, sermons (+ go-live), members, blog, financials, translations.

**Member** (`/member`): dashboard, giving, groups, prayers, notifications, resources.

**Auth:** `/login` magic link → Supabase `profiles.role`.

---

## Mobile (Expo 54)

Tabs: Home, Sermons (Live/Archive), Give, Prayer, More. Data via `/api/mobile/*`. Join Zoom → `{EXPO_PUBLIC_APP_URL}/join`.

---

## Content editing (pain point — direction agreed, not built)

| Today | Where |
|-------|--------|
| Homepage weekly, year promise | Sanity Studio → Site configuration |
| Ministries | Studio → ministryPage |
| Events, prayers | `/staff/*` |

**Planned:** Edit-on-page for allowlisted emails / staff — save to Sanity via API; Studio for tech team only. **Phase A:** home `siteConfig` fields first.

**Large “7 pages + thisWeek + visual editing + auto-translate” mega-spec:** Evaluate with Pastor before implementation — see **`docs/CONTENT_PLATFORM_EVALUATION.md`** (recommended: thin slices **CP-1** this-week single source, **not** wholesale redirect merge in one PR).

---

## Operational (church still needs)

1. Sanity **Church Zoom join URL** with `?pwd=…` — `docs/ZOOM_JOIN.md`
2. Sanity **Zeffy embed URL**
3. Weekly `upcomingSermonTitle` / `upcomingSermonDescription`
4. Pastor-approved ministry/testimony copy (replace seeds)
5. `lschurch.com` DNS → Vercel

**Seeds:** `pnpm seed:site-config` · `pnpm seed:ministries` · `pnpm seed:testimonies`

---

## Voice (do not regress)

- Hero: **God raised Jesus from the dead!** / **There is hope for all who follow him.**
- No **Authentic Christianity Together**
- Sunday **Begins at 10 A.M.**, Merit School of Music, West Loop
- Brand `#1B4F8A`

---

## Services (IDs only — no secrets in chat)

- Supabase: `zstnygokvxrrszvkfejs`
- Sanity: `7hl877lg` / `production`
- OneSignal App ID: `a1c03b58-9d26-4388-8d34-11d3c882bd8f`

## Roles

- **Claude:** architecture, IA, copy, checklists, review before Cursor codes
- **Cursor:** implementation, verify, git, deploy
- **Pastor/team:** credentials + weekly content

## Working rules

1. Align with shipped code and docs in repo
2. Zeffy primary; PayPal secondary
3. No duplicate mobile-only CMS paths
4. No API keys in git
5. If unsure, ask for `git log -3` or read `docs/ai/CONTEXT.md`

## Sync line

`Sync: 2026-05-26 — main — ministries/FAQ/leaders/testimonies live; /join direct Zoom; OneSignal web OK; operational layer + edit-on-page planned (not coded). Mega IA/automation brief: phased only — see docs/CONTENT_PLATFORM_EVALUATION.md.`
```

---

## Attach to Claude Project (recommended)

- `docs/CONTENT_PLATFORM_EVALUATION.md`
- `docs/PAGES_AND_MINISTRIES_MAP.md`
- `docs/PASTOR_PRIORITIES.md`
- `docs/PROJECT_STATUS.md`
- `docs/ZOOM_JOIN.md`
- `docs/ai/CONTEXT.md`
- `docs/handover/README.md` (template only — not `.local.md`)
