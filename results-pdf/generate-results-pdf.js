// Generate the "Your Results, Explained" one-page PDF for each of the 7
// procrastination types. This is the email-gated lead magnet on
// /quiz/results, replacing the old "notify me when the workbook launches"
// pitch with something delivered immediately.
//
// Cheap version: one static PDF per type, not per-user, so it carries no
// actual quiz scores. Reuses the type's existing square share-card image
// (already rendered by share-cards/generate-share-cards.js) rather than
// generating new art.
//
// Output goes straight into the site's public/ so it's served at
// /results-pdf/<cardSlug>.pdf.
//
// Usage:
//   node results-pdf/generate-results-pdf.js            # all 7 types
//   node results-pdf/generate-results-pdf.js --only active

const fs = require("fs");
const path = require("path");
const config = require("./results-pdf.config.js");

const SRC_DIR = __dirname;
const TEMPLATE = fs.readFileSync(path.join(SRC_DIR, "template.html"), "utf8");

const SHARE_CARDS_DIR = path.join(
  SRC_DIR,
  "..",
  "procrastinator-type-website",
  "public",
  "share-cards"
);

const OUT_DIR = path.join(
  SRC_DIR,
  "..",
  "procrastinator-type-website",
  "public",
  "results-pdf"
);

let puppeteer;
const localPuppeteer = path.join(SRC_DIR, "..", "book-cover-generator", "node_modules", "puppeteer");
if (fs.existsSync(localPuppeteer)) {
  puppeteer = require(localPuppeteer);
} else {
  puppeteer = require("puppeteer");
}

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function relatedItems(related) {
  return related
    .map(
      (r) =>
        `<div class="related-item"><div class="name">${r.title}</div><div class="why">${r.why}</div></div>`
    )
    .join("");
}

function displayUrl(url) {
  return url.replace(/^https?:\/\//, "");
}

function fillTemplate(type) {
  const cardImgPath = path.join(SHARE_CARDS_DIR, `${type.cardSlug}.png`);
  if (!fs.existsSync(cardImgPath)) {
    throw new Error(`Missing share card for ${type.key}: ${cardImgPath}. Run share-cards/generate-share-cards.js first.`);
  }
  // Puppeteer pages created via setContent() have an opaque origin, so
  // file:// image loads are blocked by Chromium regardless of URL format.
  // Same reason book-publisher/build-book.js inlines its cover PNGs as data
  // URIs instead of file paths -- do the same here.
  const cardImgDataUri = `data:image/png;base64,${fs.readFileSync(cardImgPath).toString("base64")}`;

  return TEMPLATE
    .replace(/\{\{TITLE\}\}/g, type.title)
    .replace(/\{\{DESCRIPTION\}\}/g, type.description)
    .replace(/\{\{START_HERE\}\}/g, type.strategies[0])
    .replace(/\{\{STRATEGIES_HTML\}\}/g, listItems(type.strategies))
    .replace(/\{\{STRENGTHS_HTML\}\}/g, listItems(type.strengths))
    .replace(/\{\{RELATED_HTML\}\}/g, relatedItems(type.related))
    .replace(/\{\{CARD_IMG_SRC\}\}/g, cardImgDataUri)
    .replace(/\{\{BOOK_TITLE\}\}/g, type.bookTitle)
    .replace(/\{\{BOOK_PRICE_LABEL\}\}/g, config.BOOK_PRICE_LABEL)
    .replace(/\{\{BOOK_URL_DISPLAY\}\}/g, displayUrl(type.bookUrl))
    .replace(/\{\{SITE_URL_DISPLAY\}\}/g, displayUrl(config.SITE_URL))
    .replace(/\{\{QUIZ_URL\}\}/g, config.QUIZ_URL)
    .replace(/\{\{PALETTE_PRIMARY\}\}/g, type.palette.primary)
    .replace(/\{\{PALETTE_DEEP\}\}/g, type.palette.deep)
    .replace(/\{\{PALETTE_SHADE\}\}/g, type.palette.shade);
}

async function main() {
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf("--only");
  const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

  const types = config.TYPES.filter((t) => !only || t.key === only || t.cardSlug === only);
  if (!types.length) {
    console.error(`No type matching --only ${only}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: "new" });
  console.log(`Rendering ${types.length} results PDF(s) to ${path.relative(process.cwd(), OUT_DIR)}`);

  try {
    for (const type of types) {
      const html = fillTemplate(type);
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      try {
        await page.evaluate(() => document.fonts.ready);
      } catch {}
      const pdf = await page.pdf({
        width: "8.5in",
        height: "11in",
        printBackground: true,
        preferCSSPageSize: true,
      });
      await page.close();

      const outPath = path.join(OUT_DIR, `${type.cardSlug}.pdf`);
      fs.writeFileSync(outPath, pdf);
      console.log(`  ok ${type.cardSlug}.pdf`);
    }
  } finally {
    await browser.close();
  }

  console.log(`\nDone. Output in ${path.relative(process.cwd(), OUT_DIR)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
