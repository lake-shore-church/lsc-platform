# Phase 2A — Activation guide (credentials → production)

**Branch:** `feature/phase-2a`  
**Goal:** Live giving, email acknowledgements, scheduled push, Mevo/YouTube live — **no secrets in git**.

**Full account list (local):** `docs/handover/CHURCH_ACCOUNTS.local.md` (gitignored)

---

## Vercel status (2026-05-21 evening)

| Variable | Status |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ (prayer form) |
| `RESEND_API_KEY` | ✅ |
| `RESEND_FROM_EMAIL` | ✅ `onboarding@resend.dev` (→ `hello@lschurch.com` after domain verify) |
| `NEXT_PUBLIC_ONESIGNAL_APP_ID` | ✅ |
| `ONESIGNAL_REST_API_KEY` | ✅ |
| `CRON_SECRET` | ✅ |
| `SANITY_*` | Verify on Vercel if Studio/go-live needs them |

**Redeploy:** Done after env updates.  
**Production deploys from `main`:** Push `feature/phase-2a` (prayer fix + OneSignal web) and merge for latest code.

---

## 1. Sanity Studio (`/studio` → Site configuration)

| Field | What to paste |
|-------|----------------|
| **Zeffy embed URL** | Full iframe URL from Zeffy dashboard |
| **PayPal Giving Fund active** | ON (501(c)(3) confirmed) |
| **PayPal Giving Fund URL** | Church-specific link (optional) |
| **Church EIN** | `XX-XXXXXXX` when available |
| **YouTube channel ID** | From YouTube Studio |
| **Live stream URL** | Channel or watch URL |
| **Is live now** | OFF until test |

**Publish** after each change.

---

## 2. Domain (Cloudflare → Vercel)

1. Wait for Cloudflare **Active** on `lschurch.com`.
2. DNS: A `@` → `76.76.21.21`; CNAME `www` → `cname.vercel-dns.com` (keep MX for email).
3. Vercel → Domains → add `lschurch.com` + `www`.
4. Resend → verify `lschurch.com` → switch `RESEND_FROM_EMAIL` to `hello@lschurch.com`.

See `docs/handover/CHURCH_ACCOUNTS.local.md` for nameservers (`kaiser` + `meg`).

---

## 3. Test checklist

### Giving
- [ ] `/give` shows Zeffy iframe when embed URL is set
- [ ] PayPal Giving Fund button visible (501(c)(3) badge)
- [ ] Mobile **Give** → opens Zeffy

### Livestream
- [ ] Mevo → Restream ([LIVESTREAM_SETUP.md](./LIVESTREAM_SETUP.md))
- [ ] Sanity live fields + `/live` + mobile Live tab

### Email (Resend)
- [x] Contact form → success on site; Resend logs show delivery
- [ ] Contact → acknowledgement to submitter’s email (use your Gmail on form)
- [ ] Prayer form → success (after `main` has prayer API fix)
- [ ] RSVP confirmation email

### Push (OneSignal)
- [ ] Merge + deploy OneSignal Web SDK to production
- [ ] Visit site → Allow notifications → Audience shows subscriber
- [ ] Optional: manual push from OneSignal dashboard
- [ ] Crons: Wed/Sat/Sun via `apps/web/vercel.json` + `CRON_SECRET`

---

## 4. WordPress RSS (optional)

Pastor confirmed feeds in `docs/PASTOR_RSS_FEEDS.md`. Optional importer is now available:

```bash
# Preview
pnpm import:pastor-blog-rss

# Apply to Sanity
pnpm import:pastor-blog-rss -- --apply
```

Use only after Pastor confirms republishing policy.

---

## 5. After activation

```bash
pnpm run verify
git add -A && git commit -m "feat: Phase 2A activation — prayer, OneSignal web, handover docs"
git push origin feature/phase-2a
git checkout main && git merge feature/phase-2a && git push origin main
```

Update [PROJECT_STATUS.md](./PROJECT_STATUS.md) and [CHANGELOG.md](./CHANGELOG.md).

---

## Credential worksheet (fill in `CHURCH_ACCOUNTS.local.md` — do not commit)

See gitignored handover file for live values.
