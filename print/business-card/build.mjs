// Builds the Opera Creatives business card for print.
//
//   npm run card
//
// Output (print/business-card/out/):
//   <id>-print.pdf      2 pages (front, back): CR80 card (85.6 x 54 mm) + 3.175 mm (0.125 in) bleed on every side. Send this to the printer.
//   <id>-front.png      600 dpi, with bleed
//   <id>-back.png       600 dpi, with bleed
//   <id>-preview.png    both sides, trimmed, on a neutral background (for sharing, not for printing)
//
// One card per person in people.json. The QR code on the back points to https://www.operacreatives.com/<id>.
// To add a team member, add an entry to people.json (id, name, title, email, phone) and run the build again.

import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import QRCode from "qrcode";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "out");

// Card size in millimetres: standard CR80 (credit card / PVC NFC card) plus 0.125 in bleed.
const TRIM_W = 85.6;
const TRIM_H = 54;
const BLEED = 3.175;
const PAGE_W = TRIM_W + BLEED * 2;
const PAGE_H = TRIM_H + BLEED * 2;

const SITE = { web: "operacreatives.com", base: "https://www.operacreatives.com" };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

async function qrFor(url) {
  const svg = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#0b0b0b", light: "#0000" } });
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function cardHtml({ person, qr }) {
  const logo = pathToFileURL(path.join(here, "assets/logo-mark.png")).href;
  const mascot = pathToFileURL(path.join(here, "assets/mascot.png")).href;
  const rows = [
    ["Email", person.email],
    ["Call", person.phone],
    ["Web", SITE.web],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `<li><span>${esc(k)}</span>${esc(v)}</li>`)
    .join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Opera Creatives business card: ${esc(person.name)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
@page{size:${PAGE_W}mm ${PAGE_H}mm;margin:0}
:root{--red:#ea0916;--cream:#f8e7d8;--ink:#0b0b0b;--sans:"Inter",system-ui,sans-serif;--mono:"Space Mono",ui-monospace,monospace}
*{box-sizing:border-box;margin:0;padding:0}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:#777}
.page{position:relative;width:${PAGE_W}mm;height:${PAGE_H}mm;overflow:hidden;break-after:page;font-family:var(--sans)}
@media screen{.page{margin:0 0 6mm}}
.mono{font-family:var(--mono);text-transform:uppercase;letter-spacing:.12em}

/* ---------- front: cream, simple, mascot peeking in ---------- */
.front{background:radial-gradient(circle at 0% 100%,rgba(234,9,22,.2),rgba(234,9,22,0) 55%),radial-gradient(circle at 60% -10%,rgba(255,160,90,.32),rgba(255,160,90,0) 45%),var(--cream);color:var(--ink)}
.front .mark{position:absolute;left:${BLEED + 5.5}mm;top:${BLEED + 5.5}mm;width:15mm;height:auto}
.front .brand{position:absolute;left:${BLEED + 5.5 + 17.5}mm;top:${BLEED + 5.5 + 2.4}mm}
.front .brand b{display:block;font-weight:800;font-size:4.3mm;letter-spacing:-.045em;line-height:1}
.front .brand span{display:block;margin-top:1.5mm;font-family:var(--mono);font-size:4.4pt;letter-spacing:.14em;text-transform:uppercase;color:rgba(11,11,11,.62)}
.front .peek{position:absolute;right:${BLEED + 4}mm;bottom:${BLEED + 1.6}mm;width:40mm;height:auto}
.front .base{position:absolute;left:0;right:0;bottom:${BLEED + 3.6 - 0.15}mm;height:.3mm;background:var(--ink)}
.front .me{position:absolute;left:${BLEED + 5.5}mm;bottom:${BLEED + 5.5}mm}
.front .me b{display:block;font-weight:800;font-size:14pt;letter-spacing:-.04em;line-height:1}
.front .me span{display:block;margin-top:1.6mm;font-family:var(--mono);font-size:5pt;letter-spacing:.12em;text-transform:uppercase;color:var(--red)}
.front .me i{display:block;margin-top:2.4mm;font-style:normal;font-family:var(--mono);font-size:5pt;letter-spacing:.12em;text-transform:uppercase;color:rgba(11,11,11,.7)}

/* ---------- back: ink, name, contact, QR ---------- */
.back{background:radial-gradient(circle at 100% 0%,rgba(234,9,22,.38),rgba(234,9,22,0) 46%),var(--ink);color:var(--cream)}
.left{position:absolute;left:${BLEED + 5.5}mm;top:${BLEED + 5.5}mm;bottom:${BLEED + 5.5}mm;width:52mm;display:flex;flex-direction:column;justify-content:space-between}
.who{display:flex;align-items:center;gap:2mm}
.who img{width:8mm;height:auto}
.who b{font-weight:800;font-size:3.6mm;letter-spacing:-.04em;line-height:1}
.person{display:flex;flex-direction:column;gap:1.3mm;margin-bottom:3.2mm}
.person b{font-weight:800;font-size:14pt;letter-spacing:-.04em;line-height:1}
.person span{font-family:var(--mono);font-size:5pt;letter-spacing:.12em;text-transform:uppercase;color:#ff4a54}
.contact{list-style:none;display:flex;flex-direction:column;gap:1.5mm;font-weight:600;font-size:7pt;letter-spacing:-.01em}
.contact li{display:flex;gap:2mm;align-items:baseline}
.contact li span{width:7.5mm;flex:none;font-family:var(--mono);font-weight:400;font-size:5pt;letter-spacing:.12em;text-transform:uppercase;color:#ff4a54}
.qr{position:absolute;right:${BLEED + 5.5}mm;bottom:${BLEED + 5.5}mm;width:21mm;text-align:center}
.qrbox{width:21mm;height:21mm;border-radius:2mm;background:var(--cream);display:grid;place-items:center;padding:2.2mm}
.qrbox img{width:100%;height:100%;display:block}
.cap{margin-top:1.8mm;font-family:var(--mono);font-size:4.2pt;letter-spacing:.1em;text-transform:uppercase;color:rgba(248,231,216,.78)}
</style></head>
<body>
<section class="page front" id="front">
  <img class="mark" src="${logo}" alt="Opera Creatives logo">
  <div class="brand"><b>Opera Creatives</b><span>AI native production studio</span></div>
  <div class="base"></div><img class="peek" src="${mascot}" alt="">
  <div class="me"><b>${esc(person.name)}</b><span>${esc(person.title)}</span><i>${esc(SITE.web)}</i></div>
</section>
<section class="page back" id="back">
  <div class="left">
    <div class="who"><img src="${logo}" alt=""><b>Opera Creatives</b></div>
    <div><div class="person"><b>${esc(person.name)}</b><span>${esc(person.title)}</span></div><ul class="contact">${rows}</ul></div>
  </div>
  <div class="qr"><div class="qrbox"><img src="${qr}" alt="QR code for ${esc(person.name)}"></div><div class="cap">Scan to connect</div></div>
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

  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"] });
  try {
    for (const person of people) {
      const htmlPath = path.join(outDir, `${person.id}.html`);
      const qrUrl = `${SITE.base}/${person.id}`;
      await fs.writeFile(htmlPath, cardHtml({ person, qr: await qrFor(qrUrl) }));

      // 600 dpi = 6.25x CSS pixels
      const ctx = await browser.newContext({ viewport: { width: 520, height: 900 }, deviceScaleFactor: 6.25 });
      const page = await ctx.newPage();
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const fontsOk = await page.evaluate(() => ["800 16px Inter", "400 16px 'Space Mono'"].every((f) => document.fonts.check(f)));
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
      console.log(`built ${person.id}: ${PAGE_W} x ${PAGE_H} mm with bleed (QR: ${qrUrl})`);
    }
  } finally {
    await browser.close();
  }
}

await main();
