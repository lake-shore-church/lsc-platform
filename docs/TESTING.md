# Testing — LSC Platform

## Quick verify (every PR)

```bash
pnpm run verify   # turbo check-types + lint
pnpm --filter web build
```

## Supabase (`@repo/db`)

```bash
pnpm --filter @repo/db check-types
```

**Live connection test** (anon key from `apps/web/.env.local`):

```bash
cd packages/db
export $(grep -E '^NEXT_PUBLIC_SUPABASE' ../../apps/web/.env.local | xargs)
node -e "
const { createClient } = require('@supabase/supabase-js');
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
sb.from('events').select('id', { count: 'exact', head: true }).then(r => console.log(r.error || 'events OK'));
"
```

All 14 tables should return OK (empty tables are fine).

## Web app

```bash
pnpm --filter web dev
```

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Home (starter) |
| http://localhost:3000/platform | Living project status |

## Mobile app

Requires web API running:

```bash
pnpm --filter web dev    # terminal 1
pnpm --filter mobile start   # terminal 2
```

| Check | Notes |
|-------|-------|
| Five tabs load | Home, Sermons, Prayer, Give, More |
| Sermon list | From `/api/mobile/sermons` |
| Language picker | 8 locales on More |
| Magic link auth | `lschurch://auth/callback` in Supabase redirects — see [MOBILE_SETUP.md](./MOBILE_SETUP.md) |

Copy `apps/mobile/.env.example` → `apps/mobile/.env` (never commit real keys).

## Manual RLS checks (when auth ships)

1. Anonymous: read published sermons/events; submit public prayer
2. Member: read own giving; submit private prayer
3. Staff: read all prayers; enter expenses
4. Admin: manage giving sync records

## CI (planned)

GitHub Actions: `pnpm install --frozen-lockfile`, `pnpm run verify`, `pnpm --filter web build`.
