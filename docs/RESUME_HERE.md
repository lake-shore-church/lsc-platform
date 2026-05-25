# Resume here — Lake Shore Church platform

**Last session:** 2026-05-22  
**Help finding dashboards:** [HELP_DASHBOARD_NAV.md](./HELP_DASHBOARD_NAV.md)  
**Steward:** Usha — `ushadevi.pitchandi@gmail.com`

Good work today. Rest first. Pick up from the top item below.

---

## Done today

- [x] Bluehost → Cloudflare nameservers for `lschurch.com`
- [x] Resend on Vercel — **contact form works** on production
- [x] OneSignal account (Free) + Web config + API keys on Vercel
- [x] `CRON_SECRET` on Vercel
- [x] `SUPABASE_SERVICE_ROLE_KEY` on Vercel (already there)
- [x] Vercel **Redeploy**
- [x] Handover file with all keys: `docs/handover/CHURCH_ACCOUNTS.local.md` (gitignored)
- [x] Docs updated (CONTEXT, PROJECT_STATUS, PHASE_2A, CHANGELOG, Claude sync)

---

## First thing today (15 min)

1. **Fix prayer on Vercel** — re-paste `SUPABASE_SERVICE_ROLE_KEY` (service_role from Supabase, **not** anon) → Redeploy. See [HELP_DASHBOARD_NAV.md](./HELP_DASHBOARD_NAV.md).
2. **Cloudflare** → click `lschurch.com` → top should say **Active** (not Pending).
3. **Test prayer** — **Public**, 10+ words → submit.
4. **OneSignal Audience** — left menu **Audience** → All Users (after Allow on site in Chrome).
5. **Pastor RSS links** — paste in chat; we can wire import next.

---

## Waiting on others / later

| Item | Who |
|------|-----|
| Cloudflare DNS → Vercel | After Active |
| Zeffy embed URL + bank | Pastor / church |
| `lakeshorechurch@lschurch.com` inbox | Church |
| `hello@lschurch.com` in Resend | After domain verify |
| Apple / Google dev accounts | Later |

---

## Secret reference (on your Mac only)

`docs/handover/CHURCH_ACCOUNTS.local.md` — never commit.

---

## Help

- Step-by-step activation: [PHASE_2A_SETUP.md](./PHASE_2A_SETUP.md)
- Full status: [PROJECT_STATUS.md](./PROJECT_STATUS.md)
