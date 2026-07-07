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

## Deploy

The site auto-deploys to **GitHub Pages** on every push to `main`
(`.github/workflows/deploy-pages.yml`) at:

> https://iwillfindawayormakeone.github.io/anthem-site/

To use a custom domain instead: repo Settings → Pages → Custom domain, then
update the canonical/OG URLs in `index.html`. Netlify, Cloudflare Pages, and
Vercel also work (static site, no build command) if you ever want to switch.

## Imagery

All photos are AI-generated (Higgsfield Soul 2.0) — warm, film-like, and containing
no identifiable real children. Regeneration prompts live in
[IMAGE-BRIEFS.md](IMAGE-BRIEFS.md).
