// Generate book covers for the full Procrastitype series.
//
// Reads covers.config.js + cover-template.html and renders, for every book:
//   - front cover PNG  (300 dpi, 6x9 in)
//   - back cover PNG   (300 dpi, 6x9 in)
//   - full wrap PNG    (back + spine + front, 300 dpi)
//   - full wrap PDF    (print-ready, exact physical size)
//   - preview HTML per variant (open in a browser to inspect)
//
// Usage:
//   node book-covers/generate-covers.js            # all books, all variants
//   node book-covers/generate-covers.js --only avoidance
//   node book-covers/generate-covers.js --no-pdf
//
// Print math: the template is built at 200 dpi (1200x1800 px for 6x9 in).
// deviceScaleFactor 1.5 scales the screenshot to 300 dpi. Spine width follows
// the standard 60# cream paperback formula: pages x 0.002252 inch.

const fs = require("fs");
const path = require("path");
const config = require("./covers.config.js");

const OUT_DIR = path.join(__dirname, "output");
const TMP_DIR = path.join(__dirname, ".tmp");
const TEMPLATE = fs.readFileSync(path.join(__dirname, "cover-template.html"), "utf8");

const COVER_W = 1200;
const COVER_H = 1800;
const DPR = 1.5; // 200 dpi -> 300 dpi
const SPINE_INCH_PER_PAGE = 0.002252;

let puppeteer;
const localPuppeteer = path.join(__dirname, "..", "book-cover-generator", "node_modules", "puppeteer");
if (fs.existsSync(localPuppeteer)) {
  puppeteer = require(localPuppeteer);
} else {
  puppeteer = require("puppeteer");
}

function spinePx(pages) {
  return Math.round(pages * SPINE_INCH_PER_PAGE * 200);
}

function fillTemplate(book, variant, mode) {
  const spine = spinePx(book.pages);
  const titleHtml = book.titleLines.map((line) => `<span>${line}</span>`).join("");
  const eyebrow =
    config.EYEBROW_LEFT +
    '<span class="dot"></span>' +
    config.EYEBROW_RIGHT;
  const blurb = book.blurb.map((p) => `<p>${p}</p>`).join("");

  return TEMPLATE
    .replace(/\{\{TITLE\}\}/g, book.titleLines.join(" "))
    .replace(/\{\{TITLE_HTML\}\}/g, titleHtml)
    .replace(/\{\{TITLE_SIZE\}\}/g, String(book.titleSize))
    .replace(/\{\{PALETTE_PRIMARY\}\}/g, book.palette.primary)
    .replace(/\{\{PALETTE_DEEP\}\}/g, book.palette.deep)
    .replace(/\{\{PALETTE_SHADE\}\}/g, book.palette.shade)
    .replace(/\{\{SPINE_PX\}\}/g, String(spine))
    .replace(/\{\{COVER_W\}\}/g, String(COVER_W))
    .replace(/\{\{COVER_H\}\}/g, String(COVER_H))
    .replace(/\{\{VARIANT\}\}/g, variant)
    .replace(/\{\{MODE\}\}/g, mode)
    .replace(/\{\{SERIES_NAME\}\}/g, config.SERIES_NAME)
    .replace(/\{\{VOLUME\}\}/g, book.volume)
    .replace(/\{\{HOOK\}\}/g, book.hook)
    .replace(/\{\{BLURB\}\}/g, blurb)
    .replace(/\{\{BIO\}\}/g, config.BIO)
    .replace(/\{\{EYEBROW\}\}/g, eyebrow)
    .replace(/\{\{SUBTITLE\}\}/g, book.subtitle)
    .replace(/\{\{AUTHOR\}\}/g, config.AUTHOR);
}

async function render(browser, html, cssW, cssH, { asPdf = false } = {}) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: Math.ceil(cssW), height: Math.ceil(cssH), deviceScaleFactor: DPR });
    await page.setContent(html, { waitUntil: "networkidle0" });
    if (asPdf) {
      const pdf = await page.pdf({
        width: `${cssW / 200}in`,
        height: `${cssH / 200}in`,
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      });
      return { pdf };
    }
    const el = await page.$("#wrap");
    const shot = await el.screenshot({ captureBeyondViewport: true });
    return { png: shot };
  } finally {
    await page.close();
  }
}

function wrapSize(book) {
  const spine = spinePx(book.pages);
  return { w: COVER_W * 2 + spine, h: COVER_H };
}

async function main() {
  const args = process.argv.slice(2);
  const onlyIdx = args.indexOf("--only");
  const only = onlyIdx >= 0 ? args[onlyIdx + 1] : null;
  const withPdf = !args.includes("--no-pdf");

  const books = config.BOOKS.filter((b) => !only || b.slug === only);
  if (!books.length) {
    console.error(`No book matching --only ${only}`);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: "new" });
  console.log(`Rendering ${books.length} book(s)...`);

  try {
    for (const book of books) {
      const { w: wrapW, h: wrapH } = wrapSize(book);

      for (const variant of ["front", "back", "wrap"]) {
        const html = fillTemplate(book, variant, "print");

        const fname = `${book.slug}-${variant}`;
        fs.writeFileSync(path.join(TMP_DIR, `${fname}.html`), html);

        if (variant === "wrap") {
          const { png } = await render(browser, html, wrapW, wrapH);
          fs.writeFileSync(path.join(OUT_DIR, `${fname}.png`), png);
          if (withPdf) {
            const { pdf } = await render(browser, html, wrapW, wrapH, { asPdf: true });
            fs.writeFileSync(path.join(OUT_DIR, `${fname}.pdf`), pdf);
          }
        } else {
          const { png } = await render(browser, html, COVER_W, COVER_H);
          fs.writeFileSync(path.join(OUT_DIR, `${fname}.png`), png);
        }

        // preview HTML (browser-inspectable, auto-fit)
        const preview = fillTemplate(book, variant, "preview");
        fs.writeFileSync(path.join(OUT_DIR, `${fname}-preview.html`), preview);

        console.log(`  ok ${fname}.png` + (variant === "wrap" && withPdf ? ` + ${fname}.pdf` : ""));
      }
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
