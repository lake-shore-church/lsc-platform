# Lake Shore Church — accounts & infrastructure (TEMPLATE)

Copy this file to `CHURCH_ACCOUNTS.local.md` (gitignored) and fill in blanks.
Store passwords and API keys in 1Password / Bitwarden — not in this file.

---

## Church identity

| Field | Value |
|-------|-------|
| Legal / Zeffy org name | |
| Public name | Lake Shore Church — West Loop |
| Address | 38 S. Peoria St, Chicago, IL |
| Phone | (312) 464-1834 |
| Pastor | Craig Brian Larson |
| Service | Sundays 10:00 AM |
| Denomination | Assemblies of God |
| 501(c)(3) | Yes / No / Pending |
| EIN | XX-XXXXXXX |

---

## DNS & domain

| Service | Login URL | Account email | Notes |
|---------|-----------|---------------|-------|
| Registrar | Bluehost | | Domain: lschurch.com |
| DNS | Cloudflare | | NS1: ________.ns.cloudflare.com |
| | | | NS2: ________.ns.cloudflare.com |
| Web host | Vercel | | Project: lsc-platform |

### Cloudflare DNS (website → Vercel)

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | @ | 76.76.21.21 | Proxied |
| CNAME | www | cname.vercel-dns.com | Proxied |

---

## Platform (code & data)

| Service | URL | ID / slug | Login email |
|---------|-----|-----------|-------------|
| GitHub | https://github.com/lake-shore-church/lsc-platform | | |
| Vercel production | https://lsc-platform-kappa.vercel.app | | |
| Sanity | /studio on deployed site | project: `7hl877lg`, dataset: `production` | |
| Supabase | https://supabase.com/dashboard | project: `zstnygokvxrrszvkfejs` | |

**Env files (gitignored):** `apps/web/.env.local`, `apps/mobile/.env`  
**Vercel:** Project → Settings → Environment Variables

---

## Giving

| Service | URL | Notes |
|---------|-----|--------|
| Zeffy (primary) | https://www.zeffy.com | Embed URL → Sanity `zeffyEmbedUrl` |
| PayPal Giving (secondary) | | Sanity `paypalGivingUrl` |

**Zeffy funds:** Tithe/Offering, Missions, Building Fund, Mercy Fund, Other

---

## Email & push

| Service | URL | Notes |
|---------|-----|--------|
| Resend | https://resend.com | Verify lschurch.com; `RESEND_*` on Vercel |
| OneSignal | https://onesignal.com | `NEXT_PUBLIC_ONESIGNAL_*`, `ONESIGNAL_REST_*` |

---

## Livestream & social

| Service | URL | Notes |
|---------|-----|--------|
| YouTube | | Channel ID → Sanity |
| Facebook | https://www.facebook.com/lschurchchicago | |
| Mevo / Restream | | See docs/LIVESTREAM_SETUP.md |

---

## Mobile (App Store)

| Service | URL | Notes |
|---------|-----|--------|
| Expo / EAS | https://expo.dev | Bundle: `com.lakeshorechurch.westloop` |
| Apple Developer | https://developer.apple.com | |
| Google Play Console | https://play.google.com/console | |

**Auth callback:** `lschurch://auth/callback`

---

## People

| Role | Name | Email | Access |
|------|------|-------|--------|
| Pastor | | | |
| Director of Technology | | | GitHub, Vercel, Supabase, Sanity |

---

## Domain go-live checklist

- [ ] Cloudflare status: Active
- [ ] DNS A + CNAME → Vercel
- [ ] Vercel: lschurch.com + www
- [ ] `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_APP_URL` = https://lschurch.com
- [ ] Supabase redirect: https://lschurch.com/auth/callback
- [ ] Resend domain verified
- [ ] Test /give, /login, magic link mobile
