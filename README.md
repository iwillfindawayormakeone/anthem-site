# Ariana's Little Star — In-Home Family Childcare

A fast, self-contained static website: `index.html` + `/assets` (custom CSS, vanilla
JS, AI-generated imagery). No build step, no framework, no dependencies.

## Fill in your details

Search `index.html` for these placeholders and replace every occurrence:

| Placeholder | Where it appears |
|---|---|
| `[City/Area]` | title/meta tags, hero, footer, contact, schema |
| `[Full Address]` | contact section, footer, schema |
| `[Phone]` | contact, footer (also update the `tel:+10000000000` links next to it) |
| `[Email]` | contact, footer (also update the `mailto:hello@example.com` links) |
| `[License #]` | trust bar, about, safety, FAQ, footer, schema |
| `[Years of Experience]` | trust bar, about |
| `[Weekly Rate]` | pricing card, schema |
| `[Hours e.g. 7:00 AM–5:30 PM]` | timeline, contact, footer |

Also personalize:

- **Stats counters** — in the About section, edit the `data-count` numbers
  (years, families served) on the `.count` spans.
- **Availability ribbon** — hero text "2 openings for Fall 2026".
- **Canonical URL / Open Graph** — replace `https://arianaslittlestar.com/` in
  `<head>` with your real domain.
- **Forms** — the three forms (tour, waitlist, guide) show a local confirmation
  until you connect a form service. Create a free form at
  [formspree.io](https://formspree.io), then paste its endpoint URL into
  `FORM_ENDPOINT` at the bottom of `assets/js/main.js`.
- **Map** — replace the `.map-placeholder` block in the Contact section with your
  Google Maps embed iframe (Google Maps → Share → Embed a map).
- **Parent Handbook** — replace `assets/parent-handbook.pdf` with your real PDF.
- **Testimonials** — replace the sample quotes with real ones as you collect them.

## Run it locally

Any static server works:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy (free options)

- **Netlify** — drag-and-drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop), or connect this repo (no build command, publish directory: `/`).
- **GitHub Pages** — repo Settings → Pages → deploy from branch, root folder.
- **Cloudflare Pages / Vercel** — connect the repo, framework preset "None".

Then point your domain at it and update the canonical/OG URLs.

## Imagery

All photos are AI-generated (Higgsfield Soul 2.0) — warm, film-like, and containing
no identifiable real children. Regeneration prompts live in
[IMAGE-BRIEFS.md](IMAGE-BRIEFS.md). The one-shot workflow
`.github/workflows/fetch-images.yml` downloaded and optimized them; it's safe to
delete along with this note once you're happy with the images.
