# Lake Shore Church — Mobile app setup (pastor / tech meeting)

Use this checklist when configuring church credentials. **Never commit real keys** — only `apps/mobile/.env` (gitignored) and Vercel/Supabase dashboards.

## Architecture (what we actually built)

| Layer | Approach |
|-------|----------|
| Shared photos (hero, ministry cards) | **`packages/media`** — same files as web (`import { homeImages } from "@repo/media"`) |
| Sermons, blog, resources | **Next.js API** (`EXPO_PUBLIC_APP_URL/api/mobile/*`) — same data as web |
| Auth, prayers, RSVP, profile | **Supabase** in the app (`EXPO_PUBLIC_SUPABASE_*`) |
| Styling | **NativeWind** + shared tokens in `packages/config/tailwind.config.js` |
| Languages | **8 locales:** en, es, zh, ja, ta, tl, hi, fr (not Nagamese) |
| Livestream | **`/api/live-status`** — Sermons → **Live** tab; home live banner |
| Presenter (staff) | **`/presenter`** — see [PRESENTER_MODE.md](./PRESENTER_MODE.md) (requires Supabase SQL) |

We do **not** bundle Sanity GROQ in the app yet — fewer secrets on device, one API surface.

---

## 1. Copy environment variables

From `apps/web/.env.local` into `apps/mobile/.env`:

```bash
cp apps/web/.env.local apps/mobile/.env
# Then ensure these names exist:
```

| Variable | Where to get it |
|----------|-----------------|
| `EXPO_PUBLIC_APP_URL` | Production: `https://lsc-platform-kappa.vercel.app` or `https://lschurch.com` when live |
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Same (anon/public key only) |
| `EXPO_PUBLIC_SANITY_PROJECT_ID` | `7hl877lg` |
| `EXPO_PUBLIC_SANITY_DATASET` | `production` |

---

## 2. Supabase Auth — mobile magic link

In [Supabase Auth → URL Configuration](https://supabase.com/dashboard/project/zstnygokvxrrszvkfejs/auth/url-configuration):

**Redirect URLs** (add all — wildcards cover changing LAN IPs):

- `http://localhost:3000/auth/callback`
- `https://lsc-platform-kappa.vercel.app/auth/callback`
- `lschurch://auth/callback`
- `lschurch://**`
- `exp://**` (Expo Go — replaces per-IP URLs like `exp://192.168.x.x:8081/--/auth/callback`)
- `http://localhost:8081/**` (Expo **web** in Chrome — port shown on sign-in screen after sending link)

If magic link still fails, see **[AUTH_TROUBLESHOOTING.md](./AUTH_TROUBLESHOOTING.md)**.

**Site URL:** your production web URL.

---

## 3. Expo / EAS (App Store later)

| Item | Action |
|------|--------|
| Expo account | [expo.dev](https://expo.dev) — church or tech steward email |
| EAS project ID | Run `cd apps/mobile && npx eas init` → paste into `app.json` `extra.eas.projectId` |
| Apple Developer | $99/yr — needed for TestFlight / App Store |
| Google Play | $25 one-time — Android |
| Bundle ID | `com.lakeshorechurch.westloop` (iOS + Android in `app.json`) |

---

## 4. Push notifications (Phase 2)

| Service | Notes |
|---------|--------|
| Expo push | Uses EAS project ID |
| OneSignal | Optional — keys in web `.env.local` when ready |

---

## 5. Run the app locally

```bash
# From repo root (recommended):
pnpm mobile:start

# Or from apps/mobile:
cd apps/mobile
pnpm start -- --clear
```

Then scan the **QR code** with **Expo Go** on your iPhone (same Wi‑Fi as your Mac).

**Do not** use `pnpm start:web` for phone testing — that is browser-only and causes **HTTP 500** in Expo Go.

If Expo Go shows *“problem running the requested app — 500”*:

1. Stop any old server (`Ctrl+C` in the terminal).
2. Run from **`apps/mobile`**: `pnpm start -- --clear`
3. Force-quit **Expo Go** on your phone and scan the **new** QR code (not an old “Recent” project).
4. Mac and phone must be on the **same Wi‑Fi**.

Expected tabs when it works: **Home · Sermons · Prayer · Give · More**

---

## 6. Test auth after Supabase redirect URLs are set

1. Open app → **More** → **Sign in**
2. Enter email → magic link
3. Open link on device → should return to app (`lschurch://`)
4. **More** tab should show name / Sign out

Promote role for member features:

```bash
pnpm promote:member pastor@email.com member
```

---

## 7. What’s next (after today’s meeting)

- [ ] EAS development build for Pastor’s phone (TestFlight)
- [ ] Zeffy giving URL in Sanity → Give tab WebView
- [ ] Sermon audio download + background play (`expo-av`)
- [ ] Push notification permission + token save
- [ ] Per-locale mobile strings (beliefs/dedication copy)

**Related:** [PASTOR_MEETING_CHECKLIST.md](./PASTOR_MEETING_CHECKLIST.md), [PROJECT_STATUS.md](./PROJECT_STATUS.md), [TECH-TEAM-GUIDE.md](./TECH-TEAM-GUIDE.md)
