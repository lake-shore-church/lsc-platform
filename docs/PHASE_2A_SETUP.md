# Phase 2A — Activation guide (credentials → production)

**Branch:** `feature/phase-2a`  
**Goal:** Live giving, email acknowledgements, scheduled push, Mevo/YouTube live — **no secrets in git**.

---

## 1. Sanity Studio (`/studio` → Site configuration)

Paste values from Pastor (never commit RTMP stream key to the repo).

| Field | What to paste |
|-------|----------------|
| **Zeffy embed URL** | Full iframe URL from Zeffy dashboard |
| **PayPal Giving Fund active** | ON (501(c)(3) confirmed) |
| **PayPal Giving Fund URL** | Church-specific link from PayPal nonprofit setup (optional) |
| **Church EIN** | `XX-XXXXXXX` from IRS letter (when available) |
| **YouTube channel ID** | Channel ID from YouTube Studio |
| **Live stream URL** | e.g. `https://www.youtube.com/channel/UC…` or watch URL |
| **Is live now** | OFF until test; ON during service |

**Publish** after each change.

---

## 2. Vercel environment variables

Project → Settings → Environment Variables (Production + Preview):

| Variable | Required for |
|----------|----------------|
| `RESEND_API_KEY` | Prayer/contact/RSVP email |
| `RESEND_FROM_EMAIL` | Verified church sender (e.g. `hello@lschurch.com`) |
| `NEXT_PUBLIC_ONESIGNAL_APP_ID` | Push notifications |
| `ONESIGNAL_REST_API_KEY` | Push send |
| `CRON_SECRET` | Random string; protects cron routes |
| `SANITY_API_TOKEN` | Staff go-live (already set if livestream works) |
| `NEXT_PUBLIC_SITE_URL` | `https://lsc-platform-kappa.vercel.app` or production domain |

Redeploy after adding variables.

---

## 3. Test checklist

### Giving
- [ ] `/give` shows Zeffy iframe when embed URL is set
- [ ] PayPal Giving Fund button visible (501(c)(3) badge)
- [ ] Mobile **Give** → opens Zeffy (or full give page if URL empty)
- [ ] Test donation on Zeffy (small amount)

### Livestream
- [ ] Mevo → Restream RTMP configured ([LIVESTREAM_SETUP.md](./LIVESTREAM_SETUP.md))
- [ ] Sanity: `youtubeChannelId` + test `isLiveNow` + `liveVideoId`
- [ ] `/live` and mobile **Live** tab show player

### Email (Resend)
- [ ] Submit prayer with email → donor receives acknowledgement
- [ ] Contact form → sender receives acknowledgement
- [ ] RSVP → confirmation email

### Push (OneSignal)
- [ ] Subscribers segment exists
- [ ] Manual test from OneSignal dashboard
- [ ] Vercel crons fire (or hit manually):
  - `GET /api/cron/church-notifications?kind=wednesday_prayer` with `Authorization: Bearer {CRON_SECRET}`
  - Adjust cron UTC times in `apps/web/vercel.json` for **America/Chicago** DST

---

## 4. WordPress RSS (optional — Pastor decision)

If Pastor confirms a WordPress RSS URL, import/sync is Phase 2A optional task — do not enable until URL is confirmed.

---

## 5. After activation

```bash
pnpm run verify
git checkout main && git merge feature/phase-2a
git push origin main
```

Update [PROJECT_STATUS.md](./PROJECT_STATUS.md) and [CHANGELOG.md](./CHANGELOG.md).

---

## Credential worksheet (fill locally — do not commit)

```
Church email:
Zeffy embed URL:
YouTube channel ID:
Restream RTMP URL: (Mevo only — not in git)
Restream stream key: (Mevo only — not in git)
Resend API key:
Resend from email:
OneSignal App ID:
OneSignal REST key:
Church EIN:
PayPal Giving Fund URL:
```
