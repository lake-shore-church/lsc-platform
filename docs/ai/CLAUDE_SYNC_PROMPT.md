# Claude sync prompt — Lake Shore Church platform

Copy everything inside the fenced block below into a **new Claude conversation** (or Project instructions) when you want Claude aligned with Cursor and the repo.

---

```markdown
You are helping with **Lake Shore Church — lsc-platform**, a production church digital platform (website + mobile app + staff back office). I also use **Cursor** on the same repo; stay consistent with what is already built—extend, do not duplicate or replace with throwaway demos.

## Mission

Reach people globally with the gospel: **God raised Jesus from the dead; there is hope for all who follow Him.** We are building **long-term infrastructure** (not a one-off demo): one source of truth for content, events, giving, and notifications flowing to **web + mobile + email/push**, maintainable by **non-technical staff** (Pastor, admin, finance).

## Repository

- **GitHub:** https://github.com/lake-shore-church/lsc-platform
- **Branch:** `main` only (feature branches merged)
- **Local path:** `/Users/usha/Documents/LSAG Church/lsc-platform`
- **Verify before claiming done:** `pnpm run verify` (turbo: check-types + lint)
- **Do not commit secrets** (`.env`, `.env.local` are gitignored)

## Production

- **Web:** https://lsc-platform-kappa.vercel.app (Vercel, auto-deploy from `main`)
- **Stack:** Turborepo + pnpm | Next.js 16 (web) | Expo 54 (mobile) | Supabase | Sanity CMS | cost-free tier services where possible

## Architecture (single source of truth)

| Content / data | Staff updates via | Consumed by |
|----------------|-------------------|-------------|
| Hero, themes, live toggle, site copy | Sanity Studio `/studio` | Web + `/api/mobile/config` |
| Sermons, slides, go-live | Sanity + `/staff/sermons` | Web + mobile Sermons/Live |
| Events | `/staff/events` (Supabase) | Web `/events` + `/api/mobile/home` |
| Prayers | Public forms + `/staff/prayers` | Web + mobile Prayer tab |
| Giving | **Zeffy** (501(c)(3), 0% platform fee) → sync `giving_records` | `/staff/financials`, member giving (planned mobile history) |
| Push / email | OneSignal + Resend (Phase 2A) | Wed prayer, Sunday service, go-live |

Mobile must use **`/api/mobile/*`** and shared packages—no parallel CMS-only mobile content.

## What is already shipped (May 2026)

**Web:** 8 locales (en, es, zh, ja, ta, tl, hi, fr); Pastor Brian’s voice on home/about/beliefs/visit; livestream (`/live`, `/api/live-status`, staff Go live); presenter mode (Supabase `presentation_state` + Realtime); member/staff portals; podcast RSS `/podcast.xml`; events with iCal on web.

**Mobile:** Tabs Home | Sermons (Live/Archive) | Prayer | Give | More; home matches web (hero `@repo/media`, service cards, series, ministry cards, testimonials, devotionals); themes Bold/Warm/Advent/Easter; live banner; Supabase magic-link auth (`lschurch://` + web callback); presenter mode for staff/admin.

**Recent commits on main (may be ahead of origin):**
- `feat(mobile): web-parity home, shared themes, hero images`
- `fix(mobile): durable auth on web and native; document pastor priorities`

## Pastor visit outcome (May 2026)

Pastor **approved the site**. Wants next:
- Easy **back office** for non-technical admins (Sanity + staff portals)
- **Zeffy** giving with bookkeeping (amount, donor, email/phone, recurring, fund types)
- Quality **live stream** (YouTube/Restream, no paid hosts unless decided later)
- **Events** + **calendar** on app
- **Notifications** (Wednesday evening prayer, Sunday worship) + email
- Blog / optional **WordPress RSS** (decision pending)
- Payment / **giving history** for members and finance team
- Global reach (languages, SEO, sermons)—vision aligns with existing 8-locale work

Full plan: repo file `docs/PASTOR_PRIORITIES.md`. Phase 2A in `docs/ROADMAP.md`.

## Phase 2A — build next (no temporary fixes)

1. Zeffy live URL in Sanity + donation flow + sync to `giving_records`
2. OneSignal + Resend scheduled notifications
3. Mobile: native About, Events, calendar add; signed-in giving history
4. Staff UX polish for events/notifications
5. EAS / TestFlight when Apple/Google accounts exist

**Blocked until church provides:** Zeffy account, Sanity editor logins, YouTube/Restream, optional OneSignal keys.

## Key paths

- Web app: `apps/web/`
- Mobile app: `apps/mobile/`
- DB types/queries: `packages/db/`
- CMS: `packages/cms/`
- Shared images: `packages/media/`
- Docs: `docs/` — start with `PROJECT_STATUS.md`, `PASTOR_PRIORITIES.md`, `docs/ai/CONTEXT.md`

## Services (IDs only — never invent or paste secrets)

- Supabase project: `zstnygokvxrrszvkfejs`
- Sanity: `7hl877lg` / `production`

## Working rules

1. Prefer **minimal, correct diffs**; match existing patterns in the monorepo.
2. **Cost-free first:** Sanity, Supabase, Vercel, Zeffy, YouTube, Restream, Resend/OneSignal free tiers.
3. Do not add throwaway demo UI or duplicate navigation (e.g. mobile quick-actions that repeat tab bar).
4. Update `docs/PROJECT_STATUS.md` / `CHANGELOG.md` when shipping meaningful features.
5. If unsure what Cursor already changed, ask me to paste `git log -5` or read `docs/ai/CONTEXT.md` from the repo.

## How I will use you

I may ask for: architecture advice, Supabase/Sanity schema, staff portal UX, Zeffy integration design, notification templates, Phase 2A task breakdown, or review of a plan before Cursor implements it. Align answers with the shipped codebase and Pastor priorities above.
```

---

## Tips

- Paste the block above as the **first message** in a new Claude chat, or add it to a Claude **Project** knowledge base.
- After Cursor ships work, add one line: `Latest: [date] — [what changed]` at the top of your message.
- Both tools should read `docs/ai/CONTEXT.md` in the repo for the canonical snapshot.
