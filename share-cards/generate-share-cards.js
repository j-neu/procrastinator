// Generate square social share cards for every procrastination type.
//
// Renders share-card-template.html for each type and writes a 1080x1080 PNG
// into procrastinator-type-website/public/share-cards/<slug>.png so the site
// can serve them as static assets at /share-cards/<slug>.png.
//
// Usage:
//   node share-cards/generate-share-cards.js            # 7 types + default
//   node share-cards/generate-share-cards.js --only active
//   node share-cards/generate-share-cards.js --only default
//
// The 7 type cards are square (1:1), sized for Instagram/TikTok/WhatsApp. The
// PNG does not bake in the Payhip link (that changes), so the card stays
// evergreen and points people to the quiz; the Payhip link is surfaced in the
// share dialog.
//
// `default.png` is the odd one out: landscape 1200x630, brand-level copy, and
// used as the sitewide og:image fallback by pageMetadata() for routes with no
// type card of their own. See DEFAULT_CARD in share-cards.config.js.

const fs = require("fs");
const path = require("path");
const config = require("./share-cards.config.js");

const SRC_DIR = __dirname;
const TEMPLATE = fs.readFileSync(path.join(SRC_DIR, "share-card-template.html"), "utf8");

// Output into the site's public/ so it is served at /share-cards/<slug>.png
const OUT_DIR = path.join(
  SRC_DIR,
  "..",
  "procrastinator-type-website",
  "public",
  "share-cards"
);

const CARD_W = 1080;
const CARD_H = 1080;

let puppeteer;
const localPuppeteer = path.join(SRC_DIR, "..", "book-cover-generator", "node_modules", "puppeteer");
if (fs.existsSync(localPuppeteer)) {
  puppeteer = require(localPuppeteer);
} else {
  puppeteer = require("puppeteer");
}

function fillTemplate(card) {
  const width = card.width ?? CARD_W;
  const height = card.height ?? CARD_H;
  const titleHtml = card.titleLines.map((line) => `<span>${line}</span>`).join("");

  // Type cards lead with "I'm an / Arousal Procrastinator". The brand default
  // has no type to claim, so it drops the line rather than rendering it empty.
  const claimHtml =
    card.claim === null ? "" : `<p class="claim-small">I'm ${card.article}</p>`;

  // Same reason: no single book belongs on the default card, so it shows the
  // quiz link and the shop only.
  const footerHtml = [
    `<span class="link">${config.QUIZ_URL}</span>`,
    card.bookUrl ? `<span class="link">${card.bookUrl}</span>` : null,
    `<span class="link sub">all books: ${config.SHOP_URL}</span>`,
  ]
    .filter(Boolean)
    .join("\n      ");

  return TEMPLATE
    .replace(/\{\{TITLE\}\}/g, card.titleLines.join(" "))
    .replace(/\{\{CARD_CLASS\}\}/g, card.variant ?? "")
    .replace(/\{\{CLAIM_HTML\}\}/g, claimHtml)
    .replace(/\{\{FOOTER_HTML\}\}/g, footerHtml)
    .replace(/\{\{TITLE_HTML\}\}/g, titleHtml)
    .replace(/\{\{TITLE_SIZE\}\}/g, String(card.titleSize))
    .replace(/\{\{PALETTE_PRIMARY\}\}/g, card.palette.primary)
    .replace(/\{\{PALETTE_DEEP\}\}/g, card.palette.deep)
    .replace(/\{\{PALETTE_SHADE\}\}/g, card.palette.shade)
    .replace(/\{\{CARD_W\}\}/g, String(width))
    .replace(/\{\{CARD_H\}\}/g, String(height))
    .replace(/\{\{SERIES_NAME\}\}/g, config.SERIES_NAME)
    .replace(/\{\{EYEBROW\}\}/g, card.eyebrow ?? config.EYEBROW)
    .replace(/\{\{SUBTITLE\}\}/g, card.subtitle)
    .replace(/\{\{QUIZ_URL\}\}/g, config.QUIZ_URL);
}

async function render(browser, html, card) {
  const page = await browser.newPage();
  try {
    await page.setViewport({
      width: card.width ?? CARD_W,
      height: card.height ?? CARD_H,
      deviceScaleFactor: 1,
    });
    await page.setContent(html, { waitUntil: "networkidle0" });
    const el = await page.$("#card");
    return await el.screenshot();
  } finally {
    await page.close();
  }
}

async function main() {
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf("--only");
  const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

  // The generic 1200x630 default card ships alongside the 7 square type cards.
  const allCards = [...config.CARDS, config.DEFAULT_CARD];
  const cards = allCards.filter((c) => !only || c.slug === only);
  if (!cards.length) {
    console.error(
      `No card matching --only ${only}. Known slugs: ${allCards
        .map((c) => c.slug)
        .join(", ")}`
    );
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: "new" });
  console.log(`Rendering ${cards.length} card(s) to ${path.relative(process.cwd(), OUT_DIR)}`);
  try {
    for (const card of cards) {
      const png = await render(browser, fillTemplate(card), card);
      fs.writeFileSync(path.join(OUT_DIR, `${card.slug}.png`), png);
      console.log(
        `  ok ${card.slug}.png (${card.width ?? CARD_W}x${card.height ?? CARD_H})`
      );
    }
  } finally {
    await browser.close();
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
