// Verify that no title line overflows the card for all configured types, and
// that the whole card (frame) fits without clipping.
//
// Usage:
//   node share-cards/check-share-card-overflow.js  [--only slug]
//
// Prints, per card, the overflow in px for each title line plus the frame.
// Nonzero pixels mean the text is being clipped and the config needs smaller
// type (titleSize) or less content.

const fs = require("fs");
const os = require("os");
const path = require("path");
const puppeteer = require(path.join(
  __dirname,
  "..",
  "book-cover-generator",
  "node_modules",
  "puppeteer"
));
const config = require("./share-cards.config.js");
const TEMPLATE = fs.readFileSync(path.join(__dirname, "share-card-template.html"), "utf8");

function fill(card) {
  const titleHtml = card.titleLines.map((line) => `<span>${line}</span>`).join("");
  return TEMPLATE
    .replace(/\{\{TITLE\}\}/g, card.titleLines.join(" "))
    .replace(/\{\{ARTICLE\}\}/g, card.article)
    .replace(/\{\{TITLE_HTML\}\}/g, titleHtml)
    .replace(/\{\{TITLE_SIZE\}\}/g, String(card.titleSize))
    .replace(/\{\{PALETTE_PRIMARY\}\}/g, card.palette.primary)
    .replace(/\{\{PALETTE_DEEP\}\}/g, card.palette.deep)
    .replace(/\{\{PALETTE_SHADE\}\}/g, card.palette.shade)
    .replace(/\{\{CARD_W\}\}/g, "1080")
    .replace(/\{\{CARD_H\}\}/g, "1080")
    .replace(/\{\{SERIES_NAME\}\}/g, config.SERIES_NAME)
    .replace(/\{\{EYEBROW\}\}/g, config.EYEBROW)
    .replace(/\{\{SUBTITLE\}\}/g, card.subtitle)
    .replace(/\{\{QUIZ_URL\}\}/g, config.QUIZ_URL)
    .replace(/\{\{SHOP_URL\}\}/g, config.SHOP_URL)
    .replace(/\{\{BOOK_URL\}\}/g, card.bookUrl);
}

(async () => {
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf("--only");
  const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null;
  const cards = config.CARDS.filter((c) => !only || c.slug === only);
  if (!cards.length) {
    console.error(`No card matching --only ${only}`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: "new" });
  let failures = 0;
  try {
    for (const card of cards) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
      const file = path.join(os.tmpdir(), `share-ov-${card.slug}.html`);
      fs.writeFileSync(file, fill(card));
      await page.goto("file:///" + file.replace(/\\/g, "/"), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);

      const r = await page.evaluate(() => {
        const spans = Array.from(document.querySelectorAll(".title span"));
        const lines = spans.map((s) => {
          const ow = s.scrollWidth;
          const cw = s.clientWidth;
          return ow - cw;
        });
        // Center is flex:1 (stretched), so measure the real content instead:
        // the last child of .center is the subtitle-rule.
        const center = document.querySelector(".center");
        const lastChild = center.querySelector(".subtitle-rule") || center.lastElementChild;
        const rule = document.querySelector(".bottom-rule");
        const bottom = document.querySelector(".bottom");

        const ruleTop = rule.getBoundingClientRect().top;
        const contentBottom = lastChild.getBoundingClientRect().bottom;
        const bottomBox = bottom.getBoundingClientRect();
        const topRule = document.querySelector(".top-rule");
        const claim = center.querySelector(".claim-small");
        // topRule bottom vs claim top (content above shouldn't hit the top rule)
        const contentTop = claim.getBoundingClientRect().top;
        const topRuleBottom = topRule.getBoundingClientRect().bottom;

        return {
          lines: lines,
          contentVsRule: contentBottom - ruleTop,
          contentVsTop: topRuleBottom - contentTop,
          bottomOverflowY: bottomBox.bottom - window.innerHeight,
        };
      });

      const bad = r.lines.some((o) => o > 0) ||
        r.contentVsRule > 0 ||
        r.contentVsTop > 0 ||
        r.bottomOverflowY > 0;
      if (bad) failures++;

      console.log(
        `${card.slug.padEnd(18)} titleLineOverflow=[${r.lines.join(",")}] ` +
        `contentVsRule=${Math.round(r.contentVsRule)} vsTop=${Math.round(r.contentVsTop)} ` +
        `bottom=${Math.round(r.bottomOverflowY)} ` +
        (bad ? "  <-- OVERFLOW" : "")
      );
      await page.close().catch(() => {});
    }
  } finally {
    await browser.close();
  }
  if (failures) {
    console.error(`\n${failures} card(s) overflow. Fix type size/content before regenerating.`);
    process.exit(1);
  }
  console.log("\nAll cards fit. OK.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
