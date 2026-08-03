// Build a publishable book PDF for one cognitive dismantling book:
//   front cover + interior (title page, copyright, note to readers,
//   chapters, finale, series page) + back cover, all 6x9 in.
//
// Usage:
//   node book-publisher/build-book.js --slug active --dir "cognitive_dismantling_books/active procrastinator"
//
// The covers come from book-covers/output/<slug>-front.png / -back.png.
// Output: book-publisher/output/<slug>-book.pdf

const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const MarkdownIt = require("markdown-it");

const ROOT = path.join(__dirname, "..");
const COVERS = path.join(ROOT, "book-covers", "output");
const OUT_DIR = path.join(__dirname, "output");
const INTERIOR_TEMPLATE = fs.readFileSync(path.join(__dirname, "interior-template.html"), "utf8");

const SERIES = [
  { vol: "01", edition: "Avoidance" },
  { vol: "02", edition: "Arousal" },
  { vol: "03", edition: "Active" },
  { vol: "04", edition: "Decisional" },
  { vol: "05", edition: "Emotion-Regulation" },
  { vol: "06", edition: "Passive" },
  { vol: "07", edition: "Perfectionist" },
];

function parseArgs(argv) {
  const args = { slug: "active", dir: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--slug") args.slug = argv[++i];
    if (argv[i] === "--dir") args.dir = argv[++i];
  }
  if (!args.dir) args.dir = path.join(ROOT, "cognitive_dismantling_books", args.slug + " procrastinator");
  return args;
}

// Load markdown files in reading order.
function loadBookFiles(dir) {
  const files = fs.readdirSync(dir).filter(
    (f) => /^chapter_\d+\.md$/.test(f) || f === "finale.md" || f === "note-to-readers.md"
  );
  files.sort((a, b) => {
    if (a === "note-to-readers.md") return -1;
    if (b === "note-to-readers.md") return 1;
    if (a === "finale.md") return 1;
    if (b === "finale.md") return -1;
    return parseInt(a.match(/^chapter_(\d+)/)[1]) - parseInt(b.match(/^chapter_(\d+)/)[1]);
  });
  return files.map((f) => ({ file: f, markdown: fs.readFileSync(path.join(dir, f), "utf8") }));
}

// Convert one chapter markdown file to HTML. The `# Chapter N: Title` line
// becomes a kicker + styled h1; everything else is normal markdown.
function chapterToHtml(md, text) {
  md.block.ruler.disable(["code"]);
  const lines = text.split("\n");
  const m = lines[0].match(/^#\s*Chapter\s+(\d+)\s*:\s*(.*)$/);
  let kicker = null, title = null, body;
  if (m) {
    kicker = "Chapter " + m[1];
    title = m[2].trim();
    body = md.render(lines.slice(1).join("\n"));
  } else {
    body = md.render(text);
  }
  const kickerHtml = kicker ? `<p class="chapter-kicker">${kicker}</p>` : "";
  const titleHtml = title ? `<h1>${title}</h1>` : "";
  return `<section class="chapter">${kickerHtml}${titleHtml}<div class="chapter-rule"></div>${body}</section>`;
}

function renderBody(md, text) {
  md.block.ruler.disable(["code"]);
  return md.render(text);
}

function buildBody(md, files) {
  const note = files.find((f) => f.file === "note-to-readers.md");
  const finale = files.find((f) => f.file === "finale.md");
  const chapters = files.filter(
    (f) => f.file !== "note-to-readers.md" && f.file !== "finale.md"
  );

  const year = new Date().getFullYear();
  const seriesItems = SERIES.map(
    (s) =>
      `<div class="series-item"><span class="vol">N&deg;&nbsp;${s.vol}</span>` +
      `<strong>${s.edition}</strong> Procrastinator</div>`
  ).join("");

  let html = "";

  // 1. Title page
  html += `
<section class="title-page">
  <div class="series-eyebrow">P&nbsp;R&nbsp;O&nbsp;C&nbsp;R&nbsp;A&nbsp;S&nbsp;T&nbsp;I&nbsp;T&nbsp;Y&nbsp;P&nbsp;E<span class="dot"></span>A&nbsp;F&nbsp;I&nbsp;E&nbsp;L&nbsp;D&nbsp;&nbsp;G&nbsp;U&nbsp;I&nbsp;D&nbsp;E</div>
  <h1>Breaking the Procrastination Pattern</h1>
  <div class="edition">Active Edition</div>
  <p class="subtitle">The Complete Guide to Breaking Your Active Procrastination Pattern</p>
  <div class="rule"></div>
  <div class="author">Jonathan Northwood</div>
</section>
`;

  // 2. Copyright page
  html += `
<section class="copyright-page">
  <p>Copyright &copy; ${year} Jonathan Northwood. All rights reserved.</p>
  <p>No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.</p>
  <p class="edition-line">First Edition, ${year}.</p>
  <p>Published by Procrastitype. Series design, typography, and cover art &copy; ${year} Procrastitype.</p>
</section>
`;

  // 3. Note to readers
  if (note) html += `<section class="frontmatter">${renderBody(md, note.markdown)}</section>`;

  // 4. Chapters
  html += chapters.map((c) => chapterToHtml(md, c.markdown)).join("\n");

  // 5. Finale
  if (finale) html += `<section class="frontmatter">${renderBody(md, finale.markdown)}</section>`;

  // 6. Series page (back matter)
  html += `
<section class="series-page">
  <h2>Also in the Procrastitype Series</h2>
  ${seriesItems}
  <div class="close-rule"></div>
  <div class="series-eyebrow" style="font-family:'Space Mono',monospace;font-size:9pt;letter-spacing:0.42em;text-transform:uppercase;color:#8a8a80;">P&nbsp;R&nbsp;O&nbsp;C&nbsp;R&nbsp;A&nbsp;S&nbsp;T&nbsp;I&nbsp;T&nbsp;Y&nbsp;P&nbsp;E</div>
</section>
`;

  return html;
}

function buildInteriorHtml(bodyHtml) {
  return INTERIOR_TEMPLATE
    .replace("{{TITLE}}", "Breaking the Procrastination Pattern")
    .replace("{{EDITION}}", "Active Edition")
    .replace("{{CONTENT}}", bodyHtml);
}

function coverHtml(pngPath) {
  // Full-bleed cover page. PNG is 1800x2700 @300dpi = 6x9in; embed at 100%.
  // The PNG is inlined as a data URI because page.setContent() runs on an
  // about:blank origin, where Chrome blocks file:/// resource loads.
  const dataUri = "data:image/png;base64," + fs.readFileSync(pngPath).toString("base64");
  return `<!doctype html><html><head><meta charset="utf-8" />
<style>
  @page { size: 6in 9in; margin: 0; }
  html, body { margin: 0; padding: 0; }
  img { width: 6in; height: 9in; display: block; }
</style></head><body><img src="${dataUri}" /></body></html>`;
}

async function renderPdf(puppeteer, html, opts = {}) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  try {
    await page.evaluate(() => document.fonts.ready);
  } catch {}
  const pdf = await page.pdf(opts);
  await browser.close();
  return pdf;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const dir = path.resolve(args.dir);

  if (!fs.existsSync(dir)) {
    console.error(`Book directory not found: ${dir}`);
    process.exit(1);
  }

  const frontPng = path.join(COVERS, `${args.slug}-front.png`);
  const backPng = path.join(COVERS, `${args.slug}-back.png`);
  if (!fs.existsSync(frontPng) || !fs.existsSync(backPng)) {
    console.error("Missing cover PNGs. Run book-covers/generate-covers.js first.");
    console.error(`  expected: ${frontPng}`);
    console.error(`  expected: ${backPng}`);
    process.exit(1);
  }

  // Render interior to PDF via Puppeteer (shares the cached Chrome).
  let puppeteer;
  const localPuppeteer = path.join(ROOT, "book-cover-generator", "node_modules", "puppeteer");
  if (fs.existsSync(localPuppeteer)) puppeteer = require(localPuppeteer);
  else puppeteer = require("puppeteer");

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const md = new MarkdownIt({ html: false, linkify: false, typographer: false });
  const files = loadBookFiles(dir);
  const bodyHtml = buildBody(md, files);
  const interiorHtml = buildInteriorHtml(bodyHtml);

  const [frontPdf, interiorPdf, backPdf] = await Promise.all([
    renderPdf(puppeteer, coverHtml(frontPng), { width: "6in", height: "9in", printBackground: true }),
    renderPdf(puppeteer, interiorHtml, {
      width: "6in",
      height: "9in",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate:
        '<div style="width:100%;text-align:center;font-size:8px;font-family:\'Space Mono\',monospace;color:#8a8a80;">' +
        '<span class="pageNumber"></span></div>',
      margin: { top: "0.85in", bottom: "0.9in", left: "0.95in", right: "0.95in" },
    }),
    renderPdf(puppeteer, coverHtml(backPng), { width: "6in", height: "9in", printBackground: true }),
  ]);

  // Merge: front cover + interior + back cover.
  const outPdf = await PDFDocument.create();
  for (const src of [frontPdf, interiorPdf, backPdf]) {
    const doc = await PDFDocument.load(src);
    const pages = await outPdf.copyPages(doc, doc.getPageIndices());
    pages.forEach((p) => outPdf.addPage(p));
  }

  const outPath = path.join(OUT_DIR, `${args.slug}-book.pdf`);
  fs.writeFileSync(outPath, await outPdf.save());
  console.log(`Done: ${outPath} (${outPdf.getPageCount()} pages)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
