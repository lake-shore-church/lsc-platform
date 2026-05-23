# Zeffy setup — Lake Shore Church

**501(c)(3) nonprofit · 0% platform fees**  
Use this when creating the church donation form in [Zeffy](https://www.zeffy.com).

---

## Designated funds (add all 5 in Zeffy)

When Zeffy asks for **fund options**, **designated funds**, or **donation designations**, add these exactly:

| # | Fund name in Zeffy | Short description (optional) |
|---|-------------------|------------------------------|
| 1 | **Tithe / Offering** | General giving — weekly ministry and worship |
| 2 | **Missions** | Outreach and missions |
| 3 | **Building Fund** | Church building |
| 4 | **Mercy Fund** | Helping those in need |
| 5 | **Other** | Miscellaneous giving |

Enable **donor choice** (dropdown or buttons) so givers pick one fund per gift.

---

## Where you are in Zeffy (screen guide)

Zeffy’s menus change over time. Use the **page title** and **question** to know your step.

### Step 0 — You clicked **Donation** (or **Create a form** → **Donation**)

You are starting the **donation form wizard**. You should see one of:

- **“Create your donation form”** / **“Set up donations”**
- A progress bar or steps: Campaign → Amounts → Funds → Bank → Publish

**If you only see the Zeffy dashboard:** look for **Forms**, **Fundraising**, or **+ Create** → choose **Donation form** (not Event, Membership, or Raffle).

---

### Step 1 — Campaign name & description

**Screen looks like:** “Name your campaign” / “Form title” / “What are you raising funds for?”

**Enter:**

| Field | Suggested text |
|-------|----------------|
| **Campaign / form name** | `Give to Lake Shore Church` |
| **Description** | `Support Lake Shore Church in Chicago's West Loop. Your gift helps us worship, teach God's Word, serve our community, and reach the world with the gospel. Lake Shore Church is a registered 501(c)(3) nonprofit.` |

Click **Continue** / **Next**.

---

### Step 2 — Suggested amounts

**Screen looks like:** “Suggested donation amounts” / preset buttons ($25, $50, …) and **custom amount** toggle.

**Suggested:**

- Turn **ON** “Allow custom amount” (donors choose any amount).
- Optional presets: `$25`, `$50`, `$100`, `$250` (adjust with Pastor).
- Turn **ON** **recurring / monthly** if Zeffy offers it (recommended for tithe).

Click **Continue**.

---

### Step 3 — Fund options (important)

**Screen looks like:** “Designated funds” / “Where should donations go?” / “Add fund” / “Allocation”.

**Add each fund** (use **+ Add fund** or similar):

1. Tithe / Offering  
2. Missions  
3. Building Fund  
4. Mercy Fund  
5. Other  

Set **required** or **default** to **Tithe / Offering** if Zeffy asks.

Click **Continue**.

---

### Step 4 — Bank account (can wait)

**Screen looks like:** “Connect your bank” / Plaid / “Payout account” for the **church** (not personal).

- Use the **church bank account** when finance provides it.
- **You can still get the embed URL before the bank is linked** — the form can appear on the website; live card charges usually start after bank verification.

Skip for now if you do not have church banking details. Return via dashboard **Link your bank** or **Finances** later.

---

### Step 5 — Publish & embed URL (do this now)

**Screen looks like:** “Your form is ready” / **Share** / **Embed** / **Website**.

1. **Publish** the form.
2. Copy the **embed link** or **iframe URL** (often under **Embed on website** or **Integrations**).
3. Paste into **Sanity Studio** → **Site configuration** → **Zeffy embed URL** → **Publish**.
4. Test: open https://lsc-platform-kappa.vercel.app/give — Zeffy form should appear.

Also paste the embed URL into `docs/PHASE_2A_SETUP.md` credential worksheet (local only — not git).

---

## After Zeffy is live

| Task | Who |
|------|-----|
| Test $1 donation on each fund (then refund if needed) | Finance / tech steward |
| Confirm email receipts to donors | Zeffy settings |
| Export / sync for bookkeeping | Finance (Zeffy → `giving_records` sync is a later code task) |

---

## Map Zeffy funds → platform (for future sync)

| Zeffy fund | Database `giving_fund` (Supabase) |
|------------|-----------------------------------|
| Tithe / Offering | `general` |
| Missions | `missions` |
| Building Fund | `building` |
| Mercy Fund | `other` (label “Mercy” in reports until enum extended) |
| Other | `other` |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No “funds” step | Look under **Advanced** or **Form settings** after creating the form |
| Embed blank on `/give` | URL must be HTTPS iframe/embed URL from Zeffy, not the public marketing link only |
| Nonprofit verification pending | Complete Zeffy 501(c)(3) verification; use EIN when asked |
| PayPal also needed | Keep **PayPal Giving Fund** as secondary in Sanity — Zeffy stays primary |

See also [PHASE_2A_SETUP.md](./PHASE_2A_SETUP.md).
