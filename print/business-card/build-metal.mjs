// Builds the Opera Creatives METAL card artwork (laser engraving, one colour).
//
//   npm run card:metal
//
// Output (print/business-card/out/metal/):
//   <id>-metal-engrave.pdf   2 pages (front, back), 85.6 x 54 mm, pure black vector artwork on white.
//                            Black = the parts that get engraved/etched. White = bare metal (or the card colour).
//   <id>-metal-mockup.png    what it looks like etched into a black metal card (for sharing, not for the engraver)
//
// The logo and mascot are traced to vectors by trace.py (assets/logo-mark.svg, assets/mascot.svg).
// Same people.json as the printed cards.

import { chromium } from "@playwright/test";
import QRCode from "qrcode";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "out", "metal");
const W = 85.6;
const H = 54;
const M = 5.5; // safe margin
const SITE = { web: "operacreatives.com", base: "https://www.operacreatives.com" };
const SERVICES = ["Anime style animation · Hybrid VFX", "Dubbing · Brand films · Commercials", "UGC videos · Product visuals"];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const inlineSvg = async (file) => (await fs.readFile(path.join(here, "assets", file), "utf8")).replace('fill="#000"', 'fill="currentColor"');

async function cardHtml({ person, mode, logo, mascot }) {
  // engrave: black art on white. mock: silver etching on black metal.
  const ink = mode === "engrave" ? "#000" : "#d9dade";
  const base = mode === "engrave" ? "#fff" : "#0e0e10";
  const qrSvg = await QRCode.toString(`${SITE.base}/${person.id}`, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: base, light: "#0000" } });
  const rows = [["Email", person.email], ["Call", person.phone], ["Web", SITE.web]]
    .map(([k, v]) => `<li><span>${esc(k)}</span>${esc(v)}</li>`)
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Opera Creatives metal card: ${esc(person.name)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
@page{size:${W}mm ${H}mm;margin:0}
:root{--ink:${ink};--base:${base};--sans:"Inter",system-ui,sans-serif;--mono:"Space Mono",ui-monospace,monospace}
*{box-sizing:border-box;margin:0;padding:0}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:${mode === "engrave" ? "#fff" : "#222"}}
.page{position:relative;width:${W}mm;height:${H}mm;overflow:hidden;break-after:page;font-family:var(--sans);color:var(--ink);background:var(--base)}
${mode === "mock" ? ".page{border-radius:3mm;background:linear-gradient(115deg,#0b0b0d,#17171a 45%,#0b0b0d)}@media screen{.page{margin:0 0 6mm}}" : ""}
svg{display:block;width:100%;height:auto}
.mono{font-family:var(--mono);text-transform:uppercase}

.front .mark{position:absolute;left:${M}mm;top:${M}mm;width:15mm}
.front .brand{position:absolute;left:${M + 17.5}mm;top:${M + 2.4}mm}
.front .brand b{display:block;font-weight:800;font-size:4.3mm;letter-spacing:-.045em;line-height:1}
.front .brand span{display:block;margin-top:1.5mm;font-family:var(--mono);font-size:4.8pt;letter-spacing:.14em;text-transform:uppercase}
.front .base{position:absolute;left:0;right:0;bottom:3.45mm;height:.35mm;background:var(--ink)}
.front .peek{position:absolute;right:4mm;bottom:1.6mm;width:40mm}

.left{position:absolute;left:${M}mm;top:${M}mm;bottom:${M}mm;width:52mm;display:flex;flex-direction:column;justify-content:space-between}
.who{display:flex;align-items:center;gap:2mm}
.who .m{width:7.2mm}
.who b{font-weight:800;font-size:3.6mm;letter-spacing:-.04em;line-height:1}
.person{display:flex;flex-direction:column;gap:1.2mm;margin-bottom:2.4mm}
.person b{font-weight:800;font-size:14pt;letter-spacing:-.04em;line-height:1}
.person span{font-family:var(--mono);font-size:5.4pt;letter-spacing:.12em;text-transform:uppercase}
.contact{list-style:none;display:flex;flex-direction:column;gap:1.2mm;font-weight:600;font-size:7pt;letter-spacing:-.01em}
.contact li{display:flex;gap:2mm;align-items:baseline}
.contact li span{width:7.5mm;flex:none;font-family:var(--mono);font-size:5.4pt;letter-spacing:.12em;text-transform:uppercase}
.svc{white-space:nowrap;font-weight:500;font-size:5.4pt;line-height:1.4}
.qr{position:absolute;right:${M}mm;bottom:${M}mm;width:21mm;text-align:center}
.qrbox{width:21mm;height:21mm;border-radius:2mm;background:var(--ink);padding:2.2mm}
.cap{margin-top:1.8mm;font-family:var(--mono);font-size:4.6pt;letter-spacing:.1em;text-transform:uppercase}
</style></head><body>
<section class="page front" id="front">
  <div class="mark">${logo}</div>
  <div class="brand"><b>Opera Creatives</b><span>AI native production studio</span></div>
  <div class="base"></div><div class="peek">${mascot}</div>
</section>
<section class="page back" id="back">
  <div class="left">
    <div class="who"><div class="m">${logo}</div><b>Opera Creatives</b></div>
    <div><div class="person"><b>${esc(person.name)}</b><span>${esc(person.title)}</span></div><ul class="contact">${rows}</ul></div>
    <p class="svc">${SERVICES.map(esc).join("<br>")}</p>
  </div>
  <div class="qr"><div class="qrbox">${qrSvg}</div><div class="cap">Scan to connect</div></div>
</section></body></html>`;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const people = JSON.parse(await fs.readFile(path.join(here, "people.json"), "utf8"));
  const logo = await inlineSvg("logo-mark.svg");
  const mascot = await inlineSvg("mascot.svg");
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"] });
  try {
    for (const person of people) {
      for (const mode of ["engrave", "mock"]) {
        const htmlPath = path.join(outDir, `${person.id}-${mode}.html`);
        await fs.writeFile(htmlPath, await cardHtml({ person, mode, logo, mascot }));
        const ctx = await browser.newContext({ viewport: { width: 400, height: 700 }, deviceScaleFactor: 8 });
        const page = await ctx.newPage();
        await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        const ok = await page.evaluate(() => ["800 16px Inter", "400 16px 'Space Mono'"].every((f) => document.fonts.check(f)));
        if (!ok) throw new Error("Fonts did not load (needs internet access to Google Fonts). Run the build again online.");
        if (mode === "engrave") {
          await page.pdf({ path: path.join(outDir, `${person.id}-metal-engrave.pdf`), width: `${W}mm`, height: `${H}mm`, printBackground: true, preferCSSPageSize: true });
        } else {
          const f = path.join(outDir, `${person.id}-f.png`);
          const b = path.join(outDir, `${person.id}-b.png`);
          await page.locator("#front").screenshot({ path: f, omitBackground: true });
          await page.locator("#back").screenshot({ path: b, omitBackground: true });
          const mp = path.join(outDir, `${person.id}-mockup.html`);
          await fs.writeFile(mp, `<!doctype html><style>body{margin:0;height:560px;display:flex;gap:56px;align-items:center;justify-content:center;background:linear-gradient(135deg,#e9e6e1,#cfcac3)}
            img{width:630px;border-radius:12px;box-shadow:0 30px 50px -20px rgba(0,0,0,.5),0 6px 14px rgba(0,0,0,.2)}</style><img src="${pathToFileURL(f).href}"><img src="${pathToFileURL(b).href}">`);
          const pv = await browser.newContext({ viewport: { width: 1500, height: 560 }, deviceScaleFactor: 1.5 });
          const pp = await pv.newPage();
          await pp.goto(pathToFileURL(mp).href, { waitUntil: "networkidle" });
          await pp.screenshot({ path: path.join(outDir, `${person.id}-metal-mockup.png`) });
          await pv.close();
          await Promise.all([fs.rm(f), fs.rm(b), fs.rm(mp)]);
        }
        await ctx.close();
        await fs.rm(htmlPath);
      }
      console.log(`built metal ${person.id}`);
    }
  } finally {
    await browser.close();
  }
}

await main();
