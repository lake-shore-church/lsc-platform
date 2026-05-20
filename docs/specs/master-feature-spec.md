# Master feature spec (index)

**Authoritative detail** lives in:

1. **[`.cursorrules`](../../.cursorrules)** — architecture, routes, packages, RLS, SEO, design tokens (in repo)
2. **Lake Shore Church build blueprint** — `LSAG Church/LakeShoreChurch_BuildBlueprint_Final.html` (parent folder)
3. **`supabase-migration.sql`** — full schema + policies

This file is the **agent index** so you do not guess scope.

---

## Packages map

| Package | Responsibility |
|---------|----------------|
| `@repo/db` | Supabase client, types, queries ✅ |
| `@repo/cms` | Sanity client, schemas, GROQ ⏳ |
| `@repo/ui` | Design system web + native ⏳ |
| `@repo/config` | Shared eslint/tsconfig/tailwind ⏳ |

---

## Web route groups (from blueprint)

| Group | Routes | Auth |
|-------|--------|------|
| `(public)/` | Home, Sermons, Events, Give, Prayer, Blog, About, Beliefs, Visit, Contact, Resources, Live | None |
| `(member)/` | Dashboard, Groups, Resources | `member` |
| `(staff)/` | Prayer, Sermons, Events, Blog, Financials, Members | `staff` |
| `[locale]/` | `/es` `/fr` `/pt` `/zh` | Phase 3 |
| `studio/` | Sanity Studio embed | `staff` |
| `api/` | tithing-statement, financial-report, webhooks, revalidate | Server |

---

## Database tables (14)

`profiles`, `sermons`, `sermon_series`, `prayer_requests`, `events`, `rsvps`, `blog_posts`, `email_subscribers`, `members`, `small_groups`, `giving_records`, `expenses`, `notification_prefs`, `translations`

Queries: **`packages/db/queries/`** — do not reimplement in apps.

---

## Mobile tabs

`(tabs)/home`, `sermons`, `give`, `prayer`, `more` — see `.cursorrules` for feature list per tab.

---

## When implementing a feature

1. Read the matching section in **`.cursorrules`**
2. Use existing **`@repo/db`** query if data-related
3. Specify file path, RSC vs client, and metadata requirements in prompts
4. Update **`docs/PROJECT_STATUS.md`** + **`docs/CHANGELOG.md`**
