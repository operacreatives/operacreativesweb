// Builds the Opera Creatives METAL card artwork (laser engraving, one colour).
//
//   npm run card:metal
//
// Output (print/business-card/out/metal/):
//   <id>-metal-engrave.pdf   2 pages (front, back), 85.6 x 54 mm, pure black vector artwork on white, every letter converted
//                            to outlines (no fonts needed). Black = the parts that get engraved. White = bare metal.
//   <id>-metal-engrave-front.svg / -back.svg   the same artwork as outlined SVG, for laser software that prefers SVG.
//   <id>-metal-mockup.png    what it looks like etched into a black metal card (for sharing, not for the engraver)
//
// The logo and mascot are traced to vectors by trace.py (assets/logo-mark.svg, assets/mascot.svg).
// Founder edition (name on the front, tap to connect). Same people.json as the printed cards.

import { chromium } from "@playwright/test";
import { founderDoc } from "./founder.mjs";
import { PDFDocument } from "pdf-lib";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "out", "metal");
const W = 85.6;
const H = 54;
const SITE = { web: "operacreatives.com", base: "https://www.operacreatives.com" };


async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const people = JSON.parse(await fs.readFile(path.join(here, "people.json"), "utf8"));
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"] });
  try {
    for (const person of people) {
      for (const mode of ["engrave", "mock"]) {
        const htmlPath = path.join(outDir, `${person.id}-${mode}.html`);
        await fs.writeFile(htmlPath, await founderDoc({ person, mode, W, H, site: SITE.web, baseUrl: SITE.base }));
        const ctx = await browser.newContext({ viewport: { width: 400, height: 700 }, deviceScaleFactor: 8 });
        const page = await ctx.newPage();
        await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        const ok = await page.evaluate(() => ["800 16px Inter", "700 16px 'Space Mono'"].every((f) => document.fonts.check(f)));
        if (!ok) throw new Error("Fonts did not load (needs internet access to Google Fonts). Run the build again online.");
        if (mode === "engrave") {
          const live = path.join(outDir, `${person.id}-live.pdf`);
          await page.pdf({ path: live, width: `${W}mm`, height: `${H}mm`, printBackground: true, preferCSSPageSize: true });
          // Convert every letter to outlines: PDF -> SVG (glyphs become paths) -> PDF again.
          const out = await PDFDocument.create();
          for (const [i, side] of ["front", "back"].entries()) {
            const svgPath = path.join(outDir, `${person.id}-metal-engrave-${side}.svg`);
            execFileSync("pdftocairo", ["-svg", "-f", String(i + 1), "-l", String(i + 1), live, svgPath]);
            const svg = (await fs.readFile(svgPath, "utf8")).replace(/<svg[^>]*?width="[^"]*"[^>]*?height="[^"]*"/, (m) => m);
            const tmp = path.join(outDir, `${person.id}-${side}-o.html`);
            await fs.writeFile(tmp, `<!doctype html><style>@page{size:${W}mm ${H}mm;margin:0}html,body{margin:0;background:#fff}svg{display:block;width:${W}mm;height:${H}mm}</style>${svg.replace(/^<\?xml[^>]*>\s*/, "")}`);
            const op = await ctx.newPage();
            await op.goto(pathToFileURL(tmp).href);
            const buf = await op.pdf({ width: `${W}mm`, height: `${H}mm`, printBackground: true, preferCSSPageSize: true });
            const src = await PDFDocument.load(buf);
            const [pg] = await out.copyPages(src, [0]);
            out.addPage(pg);
            await op.close();
            await fs.rm(tmp);
          }
          await fs.writeFile(path.join(outDir, `${person.id}-metal-engrave.pdf`), await out.save());
          await fs.rm(live);
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
