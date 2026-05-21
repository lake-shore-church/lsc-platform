# Lake Shore Church — lsc-platform

Monorepo for the Lake Shore Church West Loop digital platform: **Next.js** public site (8 locales), member/staff portals, **Expo** mobile app, **Supabase**, **Sanity CMS**.

**Repository:** https://github.com/lake-shore-church/lsc-platform  
**Docs:** [docs/README.md](docs/README.md) · **Agents:** [AGENTS.md](AGENTS.md) · **Status:** [docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md)

---

## Quick start

```bash
pnpm install
pnpm --filter web dev          # http://localhost:3000
```

Copy `apps/web/.env.local.example` → `apps/web/.env.local` (see [TECH-TEAM-GUIDE](docs/TECH-TEAM-GUIDE.md)).

**Mobile:** [docs/MOBILE_SETUP.md](docs/MOBILE_SETUP.md) — requires web dev server for `/api/mobile/*`.

```bash
pnpm --filter mobile start
```

**Verify before push:**

```bash
pnpm run verify
```

---

## Apps & packages

| Path | Description |
|------|-------------|
| `apps/web` | Next.js 16 — public site, `/studio`, `/member`, `/staff` |
| `apps/mobile` | Expo 54 — five tabs, Supabase auth |
| `packages/db` | Supabase client + queries |
| `packages/cms` | Sanity schemas + seed |
| `packages/config` | Shared Tailwind tokens |
| `packages/ui` | Web (and growing native) components |

---

## Common commands

| Command | Purpose |
|---------|---------|
| `pnpm seed:content` | Seed Sanity + sample Supabase events |
| `pnpm promote:member <email> member\|staff` | Promote profile role after first login |
| `pnpm --filter web build` | Production web build |

---

## Merged work

- [PR #1](https://github.com/lake-shore-church/lsc-platform/pull/1) — platform scaffold, portals, Studio
- [PR #2](https://github.com/lake-shore-church/lsc-platform/pull/2) — mobile native foundation (auth, MOBILE_SETUP)

Active branch: **`main`** only.
