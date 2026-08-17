# Social Share Cards

Square (1080x1080, 1:1) shareable images for every procrastination type, rendered
in the same visual language as the book covers (Space Grotesk / Space Mono, muted
per-type palette, paper grain, vignette, corner ticks, "PROCRASTITYPE" wordmark).

The card reads: **"I'm an [TYPE] Procrastinator!"** with the quiz URL
(`procrastitype.jnorthwood.com/quiz`) and a hook. It is designed to be shared on Instagram,
WhatsApp, TikTok, and anywhere else.

## Files

```
share-cards/
├── share-card-template.html   # single template; per-type palette CSS vars
├── share-cards.config.js      # per-type data: article, title lines, palette, copy
├── generate-share-cards.js    # Puppeteer renderer
└── (output) → ../procrastinator-type-website/public/share-cards/<slug>.png
```

## Quick start

```bash
# all 7 types
node share-cards/generate-share-cards.js

# one type
node share-cards/generate-share-cards.js --only active
```

Output lands in `procrastinator-type-website/public/share-cards/` and is served
by the site at `/share-cards/<slug>.png`. The site references these from the
quiz results page via `src/lib/payhip-links.ts` (`getShareCardUrl`).

Design notes:

- The cards bake in the **exact Payhip product URL** for each book (`payhip.com/b/…`,
  from `PayhipLinks.md`) and the shop URL (`payhip.com/Procrastitype`), plus the quiz
  URL (`procrastitype.jnorthwood.com/quiz`). Keep these URLs in sync with
  `PayhipLinks.md` and with `procrastinator-type-website/src/lib/payhip-links.ts`.
- No em dashes in any copy (per `writing_style.md`).
- The article ("a" / "an") is set per type in the config to stay grammatical.
- Title text must fit its panel; if a title overflows, reduce `titleSize` in the
  config before regenerating.

## Regenerate after content or font changes

```bash
node share-cards/generate-share-cards.js
```
