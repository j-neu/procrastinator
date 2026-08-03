// Verify that no front-cover text overflows its panel for all configured books.
//
// Usage:
//   node book-covers/check-overflow.js
//
// Every line must read: frame=0 title=0 sub=0
// A nonzero value means text is being clipped and the config/template needs
// smaller type or less content.

const fs = require("fs");
const os = require("os");
const path = require("path");
const puppeteer = require(path.join(__dirname, "..", "book-cover-generator", "node_modules", "puppeteer"));
const config = require("./covers.config.js");
const TEMPLATE = fs.readFileSync(path.join(__dirname, "cover-template.html"), "utf8");

function fill(book, variant) {
  return TEMPLATE
    .replace(/\{\{TITLE\}\}/g, book.titleLines.join(" "))
    .replace(/\{\{TITLE_HTML\}\}/g, book.titleLines.map((l) => `<span>${l}</span>`).join(""))
    .replace(/\{\{TITLE_SIZE\}\}/g, String(book.titleSize))
    .replace(/\{\{PALETTE_PRIMARY\}\}/g, book.palette.primary)
    .replace(/\{\{PALETTE_DEEP\}\}/g, book.palette.deep)
    .replace(/\{\{PALETTE_SHADE\}\}/g, book.palette.shade)
    .replace(/\{\{SPINE_PX\}\}/g, String(Math.round(book.pages * 0.002252 * 200)))
    .replace(/\{\{COVER_W\}\}/g, "1200")
    .replace(/\{\{COVER_H\}\}/g, "1800")
    .replace(/\{\{VARIANT\}\}/g, variant)
    .replace(/\{\{MODE\}\}/g, "print")
    .replace(/\{\{SERIES_NAME\}\}/g, config.SERIES_NAME)
    .replace(/\{\{VOLUME\}\}/g, book.volume)
    .replace(/\{\{HOOK\}\}/g, book.hook)
    .replace(/\{\{BLURB\}\}/g, book.blurb.map((p) => `<p>${p}</p>`).join(""))
    .replace(/\{\{BIO\}\}/g, config.BIO)
    .replace(/\{\{EYEBROW\}\}/g, config.EYEBROW_LEFT + '<span class="dot"></span>' + config.EYEBROW_RIGHT)
    .replace(/\{\{SUBTITLE\}\}/g, book.subtitle)
    .replace(/\{\{AUTHOR\}\}/g, config.AUTHOR);
}

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  let failures = 0;
  try {
    for (const book of config.BOOKS) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 1800, deviceScaleFactor: 1 });
      const file = path.join(os.tmpdir(), `ov-${book.slug}.html`);
      fs.writeFileSync(file, fill(book, "front"));
      await page.goto("file:///" + file.replace(/\\/g, "/"), { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const r = await page.evaluate(() => {
        const frame = document.querySelector(".panel.front .frame");
        const title = document.querySelector(".panel.front .title");
        const subtitle = document.querySelector(".subtitle");
        return {
          frame: frame.scrollHeight - frame.clientHeight,
          title: title.scrollWidth - title.clientWidth,
          sub: subtitle.scrollHeight - subtitle.clientHeight,
        };
      });
      const ok = r.frame === 0 && r.title === 0 && r.sub === 0;
      if (!ok) failures++;
      console.log(
        `${book.slug.padEnd(18)} frame=${r.frame} title=${r.title} sub=${r.sub} ${ok ? "" : "  <-- OVERFLOW"}`
      );
      await page.close().catch(() => {});
    }
  } finally {
    await browser.close();
  }
  if (failures) {
    console.error(`\n${failures} book(s) overflow. Fix type size/content before regenerating.`);
    process.exit(1);
  }
  console.log("\nAll covers fit. OK.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
