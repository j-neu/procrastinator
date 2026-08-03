# Book Cover Generator

Data-driven front / back / full-wrap covers for all 7 Procrastitype books, rendered
with HTML/CSS + Puppeteer (the same approach used for the workbooks).

```
book-covers/
├── cover-template.html   # single template; front / back / wrap variants, palette CSS vars
├── covers.config.js      # per-book data: palette, title, subtitle, hook, blurb, bio, pages
├── generate-covers.js    # Puppeteer renderer
├── check-overflow.js     # verifies no text overflows its panel
└── output/               # <slug>-front.png / -back.png / -wrap.png (+ -wrap.pdf, previews)
```

## Quick start

```bash
# all 7 books, PNG + PDF
node book-covers/generate-covers.js

# one book
node book-covers/generate-covers.js --only active

# skip the print PDF
node book-covers/generate-covers.js --no-pdf
```

Requires Node and the Puppeteer install already present in `book-cover-generator/node_modules`
(the generator resolves it automatically). Output lands in `book-covers/output/`:

- `<slug>-front.png` — 1800x2700 px (6x9 in @ 300 dpi)
- `<slug>-back.png` — 1800x2700 px
- `<slug>-wrap.png` — back + spine + front (2400 px + spine, @ 300 dpi)
- `<slug>-wrap.pdf` — print-ready wrap at exact physical size
- `*-preview.html` — browser-inspectable variants (auto-fit to viewport)

## Adding / editing a book

Edit `covers.config.js`. Each book needs:

| field | what it is |
|---|---|
| `slug` | filename stem, e.g. `"avoidance"` |
| `volume` | series volume label, e.g. `"N&deg;&nbsp;01"` |
| `pages` | estimated page count, drives spine width |
| `palette` | `{ primary, deep, shade }` muted background tones (bone-white type stays constant) |
| `titleLines` | front-cover title, one string per line, e.g. `["Avoidance", "Procrastinator"]` |
| `titleSize` | font size for the title block (98 px fits a 13-char line) |
| `subtitle` | front-cover subtitle |
| `hook` | back-cover hook line |
| `blurb` | array of paragraphs for the back cover |
| `bio` | shared author bio (from `BIO` in the config) |

## Design rules

- **Style:** Space Grotesk + Space Mono, muted palette per type, paper grain + vignette,
  corner registration ticks. Series wordmark ("PROCRASTITYPE") and volume stay at 18 px.
- **No em dashes** anywhere in hooks/blurbs (per `writing_style.md`). Blurbs are linted
  with `tools/prose_lint.py`.
- **No fake ISBN / barcode.** The back-cover bottom-right zone is deliberately empty.
  Add a real barcode only at the print service (KDP/Lulu) once a real ISBN exists.
- **No text overflow.** Every front title, subtitle, and back-cover blurb must fit its
  panel. After any content or font change, run the overflow check below.

## Print math

The template is designed at 200 dpi (1200x1800 px = 6x9 in). The renderer screenshots at
`deviceScaleFactor 1.5` → 300 dpi output. Spine width follows the standard 60# cream
paperback formula: `pages x 0.002252 in` (at 200 dpi: `pages x 0.4504 px`).

Current spine widths: avoidance 40 px, arousal 43 px, active 36 px, decisional 43 px,
emotion-regulation 36 px, passive 45 px, perfectionist 72 px.

## Verifying no overflow

After changing any text or font sizes, confirm all covers still fit:

```bash
node book-covers/check-overflow.js
```

Every line must read `frame=0 title=0 sub=0`. A nonzero value means text is being
clipped; reduce type size or trim content before regenerating.

## Palette per type

| Book | Palette |
|---|---|
| Avoidance | sage `#8a9a82 / #6f8169 / #7d8d75` |
| Arousal | terracotta `#b97a55 / #96614a / #aa6f4e` |
| Active | slate `#5b7691 / #40596f / #506a82` |
| Decisional | teal `#4f8a8a / #396b6b / #457a7a` |
| Emotion-Regulation | plum `#8a7a99 / #6b5d78 / #7d6f8c` |
| Passive | dusty indigo `#6d6a9e / #514e7d / #605d8d` |
| Perfectionist | charcoal `#6b7078 / #4d525a / #5d626a` |
