# Pages & ministries map (May 2026)

Pastor's 46-item vision mapped to **one route each** — no duplicate URLs. Content is editable in **Sanity Studio** (`ministryPage` documents) after running `pnpm seed:ministries`.

## Already live (dedicated routes)

| # | Topic | URL | CMS / source |
|---|--------|-----|----------------|
| 1 | Donations | `/give` | Sanity `siteConfig` + Zeffy |
| 2 | Live stream | `/live` | Sanity live fields |
| 3 | Blog | `/blog` | Sanity `blogPost` + Pastor RSS import |
| 4 | FAQ | `/faq` | i18n + JSON-LD |
| 5 | About leaders | `/about/leaders` | Sanity `staffBio` |
| 6 | Beliefs | `/beliefs` | i18n + optional Sanity `page` |
| 7 | Plan your visit | `/visit` | i18n + Sanity `page` |
| 8 | Upcoming events | `/events` | Supabase + staff portal |
| 9 | Sermon archives | `/sermons` | Sanity `sermon` |
| 10 | Upcoming sermon highlight | Home → **This week at Lake Shore** | Sanity `thisWeek` (CP-1); `siteConfig` fallback |
| 11 | Prayer requests | `/prayer` | Supabase + staff |
| 12 | Testimonies | `/testimonies` | ✅ Sample testimonies seeded via `testimony` schema |
| — | Home year promise (3 John) | Home → blue banner | Sanity `yearPromise*` + `familyVisionLine` |
| — | Dedication / new believers | `/dedication` | i18n |

## Ministry hub (all services catalogued)

**Index:** `/ministries`  
**Detail:** `/ministries/[slug]` (redirects to canonical path when set)

| # | Title | Slug | Canonical / notes |
|---|--------|------|-------------------|
| 13 | Sunday school | `sunday-school` | Detail page |
| 14 | Wednesday prayer | `wednesday-prayer` | Featured on home; join uses unified `/join` (Sunday + Wednesday same room) |
| 15 | Multi conferences | `multi-conferences` | Phase 2 |
| 16 | Planting home churches | `planting-home-churches` | |
| 17 | Multilingual resources | `multilingual-resources` | → `/resources` |
| 18 | Men's ministry | `mens-ministry` | |
| 19 | Women's ministry | `womens-ministry` | |
| 20 | Worship team | `worship-team` | |
| 21 | Coffee with Pastor | `coffee-with-pastor` | → `/contact` |
| 22 | Holy Spirit baptism | `holy-spirit-baptism` | → `/beliefs` + detail |
| 23 | Get involved | `get-involved` | |
| 24 | Radio ministry | `radio-ministry` | |
| 25 | Podcasts | `podcasts` | Libsyn external link |
| 26 | Cooking / potluck | `cooking-ministry` | |
| 27 | Home visit request | `pastor-home-visit` | → `/prayer` |
| 28 | Join our prayers | `join-our-prayers` | Home featured |
| 29 | Levites | `levites` | |
| 30 | Technology team | `technology-team` | |
| 31 | Admin / finance | `admin-staff` | |
| 32 | New believers | `new-believers` | → `/dedication` |
| 33 | Water baptism testimonies | `water-baptism-testimonies` | → `/testimonies` |
| 34 | Personal development | `personal-development` | |
| 35 | Street ministry (Tracks) | `street-ministry` | |
| 36 | God test | `god-test` | Interactive — roadmap |
| 37 | Bible theology assistant | `bible-theology-assistant` | MCP pilot — roadmap |
| 38 | Heaven & hell | `heaven-and-hell` | |
| 39 | Missionaries | `missionaries` | → `/give` missions |
| 40 | Simple ministers | `simple-ministers` | → `/testimonies` |
| 41 | Church pillars / early days | `church-pillars` | → `/about` |
| 42 | Membership | `church-membership` | → `/visit` |
| 43 | Life of Pastor Brian | `life-of-pastor-brian` | → `/about#pastor` + craigbrianlarson.com |
| 44 | Prophecies | `prophecies` | Staff translations workflow |
| 45 | Year promise / family vision | Home sections | `siteConfig` |

## Pastor external content

| Source | URL |
|--------|-----|
| Blog / articles | https://craigbrianlarson.com/ |
| RSS blog | https://craigbrianlarson.com/feed/ |
| Podcast | https://craigbrianlarson.libsyn.com/rss |

Import: `pnpm import:pastor-blog-rss` (dry-run) · `pnpm import:pastor-blog-rss -- --apply`

## Seed & edit

```bash
# From lsc-platform/ (requires SANITY_WRITE_TOKEN in env)
pnpm seed:ministries
# Or full content seed:
pnpm seed:content
```

Church photos live at `/church/*` (from `packages/media`). Set **Church Zoom join URL** in Sanity (direct one-click invite with embedded `?pwd=...`) and re-seed:

```bash
# Optional (for seed scripts) in apps/web/.env.local (do not commit)
CHURCH_ZOOM_JOIN_URL=https://usXXweb.zoom.us/j/83078837399?pwd=YOUR_EMBEDDED_PWD

pnpm seed:site-config
```

Or follow `docs/ZOOM_JOIN.md` for the full one-click Zoom setup.

## Phase 2 (not built in this pass)

- Coffee with Pastor — calendar booking (Cal.com / Calendly)
- Testimony CMS (video/audio upload)
- GOD Test interactive
- Bible MCP theology assistant
- Full multilingual UI
- Global home-church map
- Missionary profile videos (5 families)

See [ROADMAP.md](./ROADMAP.md) and [PASTOR_PRIORITIES.md](./PASTOR_PRIORITIES.md).
