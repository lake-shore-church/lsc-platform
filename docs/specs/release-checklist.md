# Release checklist (web + mobile)

**See also:** [ai-agent-preflight.md](./ai-agent-preflight.md)

Use before merging to **`main`** or deploying to production.

## Before opening PR

- [ ] Read [master-feature-spec.md](./master-feature-spec.md) section for this feature
- [ ] Branch name: `feature/<topic>` from latest `main`
- [ ] `pnpm run verify` passes
- [ ] `docs/CHANGELOG.md` + `docs/PROJECT_STATUS.md` updated
- [ ] No secrets in diff (`.env.local` never committed)
- [ ] Supabase migration changes documented in `supabase-migration.sql` if schema changed

## Before Vercel production deploy (web)

- [ ] `pnpm --filter web build` succeeds
- [ ] Env vars set in Vercel project (match `apps/web/.env.local` names)
- [ ] Supabase redirect URLs include production domain
- [ ] Sanity CORS / API tokens valid for production
- [ ] `/platform` still `noindex` unless leadership wants it public

## Before EAS build (mobile)

- [ ] Follow [MOBILE_SETUP.md](../MOBILE_SETUP.md) — env, Supabase redirect `lschurch://auth/callback`
- [ ] `EXPO_PUBLIC_SUPABASE_*` + `EXPO_PUBLIC_API_URL` in EAS secrets
- [ ] `eas.json` + bundle IDs in `app.json` (`com.lschurch.app`)
- [ ] `npx eas init` for project ID
- [ ] Test on iOS + Android simulators with web dev server reachable

## After merge to main

- [ ] Update `docs/ai/CONTEXT.md` session snapshot
- [ ] Tag release optional: `v0.1.0` style when milestone ships
- [ ] Notify church stakeholders if user-facing

## Church-specific checks

- [ ] Prayer privacy: public vs private RLS tested
- [ ] Giving: only member sees own `giving_records` (admin sees all)
- [ ] Financial PDFs: staff/admin only routes
- [ ] Staff cannot expose member PII in client bundles
