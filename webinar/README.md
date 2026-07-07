# Leave at the Bell — Webinar Registration Page

The registration funnel for the free live training that leads into the **Leave at the Bell** founding cohort. No build step — host the folder anywhere (Netlify drop, Vercel, any static host) or open the files directly.

- `index.html` — registration page (redirects to the thank-you page on signup)
- `thanks.html` — thank-you page (calendar add, inbox rescue, "bring your most annoying task" micro-commitment)
- `emails.md` — the full Brevo confirmation + reminder sequence with send timing, plus optional SMS lines

## Before launch — 4 swaps, all in one place

Everything you need to touch is in the `CONFIG` block at the top of the `<script>` in `index.html`:

1. **Date & time** — set `webinarDate` (ISO format with timezone) and the matching `dateLabel` / `timeLabel`. The countdown, calendar links, and both date lines update automatically. Current values are PLACEHOLDERS. **Update the matching CONFIG in `thanks.html` too**, and the `{{DATE}}`/`{{TIME}}` placeholders in `emails.md`.
2. **Brevo** — paste your Brevo form's POST action URL into `brevoFormAction`. Field names already match Brevo defaults (`FIRSTNAME`, `EMAIL`). Until you set it, the form runs in demo mode (shows the success state, sends nothing).
3. **Hero photo** — drop a `hero.jpg` into this folder and the page upgrades from the gradient automatically. Two candidates matching the brief ("teacher walking out of school in daylight, relieved, bag empty") are already generated and waiting in your Higgsfield library (July 6, soul_2, 16:9, 2K).
4. **JD's headshot** — save it as `jd.jpg` in this folder, then in `index.html` replace the placeholder inside `#host-photo` with the commented-out `<img>` tag right above it.

Optional: set `thankYouUrl` to redirect to a dedicated thank-you page after signup (recommended later — that's where the show-up sequence starts).

## What's deliberately NOT on this page

- **No price, no cohort pitch.** This page sells one thing only: registering for the free training. The $497 offer stack belongs in the webinar itself.
- **No replay promise.** "A replay is not guaranteed" is intentional show-up psychology — don't soften it.
