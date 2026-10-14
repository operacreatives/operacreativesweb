// Builds the Opera Creatives business card for print.
//
//   npm run card
//
// Output (print/business-card/out/):
//   <id>-print.pdf      2 pages (front, back), 96 x 56 mm = 90 x 50 mm card + 3 mm bleed on every side. Send this to the printer.
//   <id>-front.png      600 dpi, with bleed
//   <id>-back.png       600 dpi, with bleed
//   <id>-preview.png    both sides, trimmed, on a neutral background (for sharing, not for printing)
//
// To put a QR code on the back, save it as print/business-card/qr.svg (or qr.png) and run the build again.
// To make cards for individual team members, add entries to people.json.

import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "out");
const posterDir = path.resolve(here, "../../public/assets/images");

// Card size in millimetres. Change these two numbers for a different card size (the layout scales to the width).
const TRIM_W = 90;
const TRIM_H = 50;
const BLEED = 3;
const PAGE_W = TRIM_W + BLEED * 2;
const PAGE_H = TRIM_H + BLEED * 2;

const SITE = { web: "operacreatives.com", email: "hi@operacreatives.com", instagram: "@operacreatives_" };
const SERVICES = ["Anime style animation · Hybrid VFX", "Dubbing · Brand films · Commercials", "UGC videos · Product visuals"];

// Posters shown on the front (indexes into the alphabetical list of files in public/assets/images).
const FRONT_COLUMNS = [
  [1, 17, 9, 13],
  [8, 23, 3, 20],
  [6, 16, 12, 22],
];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

async function findQr() {
  for (const name of ["qr.svg", "qr.png"]) {
    try {
      const buf = await fs.readFile(path.join(here, name));
      const mime = name.endsWith(".svg") ? "image/svg+xml" : "image/png";
      return `data:${mime};base64,${buf.toString("base64")}`;
    } catch {
      // not there, keep looking
    }
  }
  return null;
}

function cardHtml({ person, posters, qr }) {
  const col = (ids) =>
    `<div class="col">${ids.map((i) => `<img src="${pathToFileURL(path.join(posterDir, posters[i])).href}" alt="">`).join("")}</div>`;

  const qrBox = qr
    ? `<div class="qrbox"><img src="${qr}" alt="QR code"></div>`
    : `<div class="qrbox ph"><span>QR</span><small>CODE GOES HERE</small></div>`;

  const person_ =
    person.name || person.title
      ? `<div class="person">${person.name ? `<b>${esc(person.name)}</b>` : ""}${person.title ? `<span>${esc(person.title)}</span>` : ""}</div>`
      : "";

  const rows = [
    ["Email", SITE.email],
    ["Web", SITE.web],
    ["Insta", SITE.instagram],
    ...(person.phone ? [["Call", person.phone]] : []),
  ]
    .map(([k, v]) => `<li><span>${esc(k)}</span>${esc(v)}</li>`)
    .join("");

  const logo = pathToFileURL(path.join(here, "assets/logo-mark.png")).href;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Opera Creatives business card</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
@page{size:${PAGE_W}mm ${PAGE_H}mm;margin:0}
:root{--red:#ea0916;--cream:#f8e7d8;--ink:#0b0b0b;--sans:"Inter",system-ui,sans-serif;--mono:"Space Mono",ui-monospace,monospace;--display:"Bebas Neue",Impact,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:#777}
.page{position:relative;width:${PAGE_W}mm;height:${PAGE_H}mm;overflow:hidden;break-after:page;font-family:var(--sans)}
@media screen{.page{margin:0 0 6mm}}
.mono{font-family:var(--mono);text-transform:uppercase;letter-spacing:.12em}

/* ---------- front: cream, poster wall, headline ---------- */
.front{background:radial-gradient(circle at 0% 100%,rgba(234,9,22,.22),rgba(234,9,22,0) 58%),radial-gradient(circle at 55% -10%,rgba(255,160,90,.35),rgba(255,160,90,0) 45%),var(--cream);color:var(--ink)}
.wall{position:absolute;right:-9.5mm;top:-16mm;bottom:-16mm;width:47mm;display:grid;grid-template-columns:repeat(3,1fr);gap:1.6mm;transform:rotate(8deg)}
.wall .col{display:flex;flex-direction:column;gap:1.6mm}
.wall .col:nth-child(1){margin-top:-3mm}.wall .col:nth-child(2){margin-top:-12mm}.wall .col:nth-child(3){margin-top:-6mm}
.wall img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:1.6mm;box-shadow:0 .8mm 2mm rgba(11,11,11,.28)}
.front .mark{position:absolute;left:${BLEED + 5}mm;top:${BLEED + 5}mm;width:11mm;height:auto}
.front .brand{position:absolute;left:${BLEED + 5 + 13}mm;top:${BLEED + 5 + 4}mm;font-size:5.4pt;font-weight:700}
.front h1{position:absolute;left:${BLEED + 5}mm;bottom:${BLEED + 11}mm;width:48mm;font-weight:800;font-size:5.5mm;line-height:.94;letter-spacing:-.06em}
.front h1 span{color:var(--red)}
.front .site{position:absolute;left:${BLEED + 5}mm;bottom:${BLEED + 5}mm;font-size:5.4pt;font-weight:700}

/* ---------- back: ink, contact, QR ---------- */
.back{background:radial-gradient(circle at 100% 0%,rgba(234,9,22,.38),rgba(234,9,22,0) 46%),var(--ink);color:var(--cream)}
.left{position:absolute;left:${BLEED + 5}mm;top:${BLEED + 5}mm;bottom:${BLEED + 5}mm;width:46mm;display:flex;flex-direction:column;justify-content:space-between}
.who{display:flex;align-items:center;gap:2.2mm}
.who img{width:9mm;height:auto}
.who b{font-weight:800;font-size:4.1mm;letter-spacing:-.04em;line-height:1}
.mid{display:flex;flex-direction:column;gap:2.6mm}
.person{display:flex;flex-direction:column;gap:.8mm}
.person b{font-weight:800;font-size:10pt;letter-spacing:-.03em;line-height:1.05}
.person span{font-family:var(--mono);font-size:5.4pt;letter-spacing:.12em;text-transform:uppercase;color:#ff4a54}
.contact{list-style:none;display:flex;flex-direction:column;gap:1.3mm;font-weight:600;font-size:7.2pt;letter-spacing:-.01em}
.contact li{display:flex;gap:2mm;align-items:baseline}
.contact li span{width:8.5mm;flex:none;font-family:var(--mono);font-weight:400;font-size:5.4pt;letter-spacing:.12em;text-transform:uppercase;color:#ff4a54}
.svc{white-space:nowrap;font-weight:500;font-size:6pt;line-height:1.4;color:rgba(248,231,216,.72)}
.qr{position:absolute;right:${BLEED + 5}mm;top:${BLEED + 7.5}mm;width:28mm;text-align:center}
.qrbox{width:28mm;height:28mm;border-radius:2.2mm;background:var(--cream);display:grid;place-items:center;padding:2.6mm}
.qrbox img{width:100%;height:100%;display:block}
.qrbox.ph{border:.35mm dashed rgba(11,11,11,.55);color:rgba(11,11,11,.7);align-content:center;gap:1mm}
.qrbox.ph span{font-family:var(--display);font-size:10mm;line-height:.9}
.qrbox.ph small{font-family:var(--mono);font-size:4pt;letter-spacing:.12em}
.cap{margin-top:2.2mm;display:inline-flex;align-items:center;gap:1.6mm;font-size:5.4pt;font-weight:700;color:var(--cream)}
.cap i{display:inline-grid;place-items:center;width:3.4mm;height:3.4mm;border-radius:.7mm;background:var(--red);font-style:normal;font-size:5pt;color:#fff}
</style></head>
<body>
<section class="page front" id="front">
  <div class="wall">${FRONT_COLUMNS.map(col).join("")}</div>
  <img class="mark" src="${logo}" alt="Opera Creatives logo">
  <div class="brand mono">Opera Creatives</div>
  <h1>From product shot to <span>full blown film.</span></h1>
  <div class="site mono">${esc(SITE.web)}</div>
</section>
<section class="page back" id="back">
  <div class="left">
    <div class="who"><img src="${logo}" alt=""><b>Opera Creatives</b></div>
    <div class="mid">${person_}<ul class="contact">${rows}</ul></div>
    <p class="svc">${SERVICES.map(esc).join("<br>")}</p>
  </div>
  <div class="qr">${qrBox}<div class="cap">Scan to see our work <i>↗</i></div></div>
</section>
</body></html>`;
}

// Chromium rounds the page size by a fraction of a millimetre, so tell the printer exactly where the cut is:
// BleedBox = whole page, TrimBox = the 90 x 50 mm card, measured from the top-left like the artwork.
async function markTrimAndBleed(pdfPath) {
  const MM = 72 / 25.4;
  const pdf = await PDFDocument.load(await fs.readFile(pdfPath));
  for (const pg of pdf.getPages()) {
    const { width, height } = pg.getSize();
    const b = BLEED * MM;
    pg.setBleedBox(0, 0, width, height);
    pg.setTrimBox(b, height - b - TRIM_H * MM, TRIM_W * MM, TRIM_H * MM);
  }
  await fs.writeFile(pdfPath, await pdf.save());
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const people = JSON.parse(await fs.readFile(path.join(here, "people.json"), "utf8"));
  const posters = (await fs.readdir(posterDir)).filter((f) => f.endsWith(".webp")).sort();
  const qr = await findQr();

  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"] });
  try {
    for (const person of people) {
      const htmlPath = path.join(outDir, `${person.id}.html`);
      await fs.writeFile(htmlPath, cardHtml({ person, posters, qr }));

      // 600 dpi = 6.25x CSS pixels
      const ctx = await browser.newContext({ viewport: { width: 520, height: 900 }, deviceScaleFactor: 6.25 });
      const page = await ctx.newPage();
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const fontsOk = await page.evaluate(() => ["800 16px Inter", "400 16px 'Bebas Neue'", "700 16px 'Space Mono'"].every((f) => document.fonts.check(f)));
      if (!fontsOk) throw new Error("Fonts did not load (needs internet access to Google Fonts). Run the build again online.");

      const pdfPath = path.join(outDir, `${person.id}-print.pdf`);
      await page.pdf({ path: pdfPath, width: `${PAGE_W}mm`, height: `${PAGE_H}mm`, printBackground: true, preferCSSPageSize: true });
      await markTrimAndBleed(pdfPath);
      await page.locator("#front").screenshot({ path: path.join(outDir, `${person.id}-front.png`) });
      await page.locator("#back").screenshot({ path: path.join(outDir, `${person.id}-back.png`) });
      await ctx.close();

      // Preview: both sides trimmed to the real card edge, on a neutral background
      const crop = (img) =>
        `<div class="c"><img src="${pathToFileURL(path.join(outDir, img)).href}" style="width:${(PAGE_W / TRIM_W) * 100}%;left:${-(BLEED / TRIM_W) * 100}%;top:${-(BLEED / TRIM_H) * 100}%"></div>`;
      const pv = await browser.newContext({ viewport: { width: 1500, height: 560 }, deviceScaleFactor: 1.5 });
      const pvPage = await pv.newPage();
      const pvPath = path.join(outDir, `${person.id}-preview.html`);
      await fs.writeFile(pvPath, `<!doctype html><style>body{margin:0;height:560px;display:flex;gap:56px;align-items:center;justify-content:center;background:linear-gradient(135deg,#e9e6e1,#cfcac3)}
        .c{position:relative;width:630px;height:${(630 * TRIM_H) / TRIM_W}px;border-radius:12px;overflow:hidden;box-shadow:0 30px 50px -20px rgba(0,0,0,.45),0 6px 14px rgba(0,0,0,.18)}
        .c img{position:absolute;display:block}</style>${crop(`${person.id}-front.png`)}${crop(`${person.id}-back.png`)}`);
      await pvPage.goto(pathToFileURL(pvPath).href, { waitUntil: "networkidle" });
      await pvPage.waitForTimeout(400);
      await pvPage.screenshot({ path: path.join(outDir, `${person.id}-preview.png`) });
      await pv.close();
      await fs.rm(pvPath);
      console.log(`built ${person.id}: ${PAGE_W} x ${PAGE_H} mm with bleed${qr ? "" : " (QR placeholder, add qr.svg)"}`);
    }
  } finally {
    await browser.close();
  }
}

await main();
