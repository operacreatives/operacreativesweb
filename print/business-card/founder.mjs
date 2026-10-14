// Founder edition: the NFC PVC card and the metal card that the founders keep for themselves (never handed out).
// Same brand, but personal: name on the front, tap to connect, big logo and the QR on the back.
//
// mode "pvc"     colour print, black front / red back, with bleed
// mode "engrave" one colour, black on white, for laser engraving (no bleed)
// mode "mock"    what the engraving looks like on black metal (preview only)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import QRCode from "qrcode";

const here = path.dirname(fileURLToPath(import.meta.url));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const inline = async (f) => (await fs.readFile(path.join(here, "assets", f), "utf8")).replace('fill="#000"', 'fill="currentColor"');

export const NFC_SVG = (c, w = 2) => `<svg viewBox="0.5 -1 16 26" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round">${[6, 10, 14, 18]
  .map((r) => `<path d="M${(-3 + r * 0.766).toFixed(2)} ${(12 - r * 0.643).toFixed(2)}A${r} ${r} 0 0 1 ${(-3 + r * 0.766).toFixed(2)} ${(12 + r * 0.643).toFixed(2)}"/>`)
  .join("")}</svg>`;

export async function founderDoc({ person, mode, W, H, bleed = 0, site, baseUrl, content }) {
  const pvc = mode === "pvc";
  const metal = !pvc;
  const PW = W + bleed * 2;
  const PH = H + bleed * 2;
  const m = 5.5 + bleed; // safe margin measured from the page edge
  const CREAM = "#f8e7d8";
  const INK = "#0b0b0b";

  const T =
    mode === "pvc"
      ? { frontBg: `linear-gradient(135deg,#171717,${INK} 55%)`, backBg: `linear-gradient(135deg,#171717,${INK} 55%)`, fText: CREAM, fSoft: "rgba(248,231,216,.72)", bText: CREAM, bSoft: "rgba(248,231,216,.85)", accent: CREAM, qrBox: CREAM, qrDark: INK }
      : mode === "engrave"
        ? { frontBg: "#fff", backBg: "#fff", fText: "#000", fSoft: "#000", bText: "#000", bSoft: "#000", accent: "#000", qrBox: "#000", qrDark: "#fff" }
        : { frontBg: "linear-gradient(115deg,#0b0b0d,#17171a 45%,#0b0b0d)", backBg: "linear-gradient(115deg,#0b0b0d,#17171a 45%,#0b0b0d)", fText: "#d9dade", fSoft: "#d9dade", bText: "#d9dade", bSoft: "#d9dade", accent: "#d9dade", qrBox: "#d9dade", qrDark: "#0e0e10" };

  const qrSvg = await QRCode.toString(`${baseUrl}/${person.id}`, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: T.qrDark, light: "#0000" } });
  const logoSvg = await inline("logo-mark.svg");
  const logoPng = pathToFileURL(path.join(here, "assets/logo-mark.png")).href;
  const frontLogo = pvc ? `<img src="${logoPng}" alt="Opera Creatives logo">` : logoSvg;
  const mono = metal ? "font-weight:700;" : "";
  const rows = [["Email", person.email], ["Call", person.phone], ["Web", site]].map(([k, v]) => `<li><span>${esc(k)}</span>${esc(v)}</li>`).join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Opera Creatives founder card: ${esc(person.name)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
@page{size:${PW}mm ${PH}mm;margin:0}
:root{--sans:"Inter",system-ui,sans-serif;--mono:"Space Mono",ui-monospace,monospace}
*{box-sizing:border-box;margin:0;padding:0}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:${mode === "engrave" ? "#fff" : mode === "mock" ? "#222" : "#777"}}
.page{position:relative;width:${PW}mm;height:${PH}mm;overflow:hidden;break-after:page;font-family:var(--sans)}
${mode === "mock" ? ".page{border-radius:3mm}" : ""}
@media screen{.page{margin:0 0 6mm}}
svg{display:block}

/* ----- front: centred logo, studio line, tap symbol ----- */
.front{background:${T.frontBg};color:${T.fText}}
.front .mark{position:absolute;left:50%;transform:translateX(-50%);top:${bleed + 8.5}mm;width:26mm}
.front .mark img,.front .mark svg{width:100%;height:auto;display:block}
.front .brand{position:absolute;left:0;right:0;top:${bleed + 30}mm;text-align:center}
.front .brand b{display:block;font-weight:800;font-size:5mm;letter-spacing:-.045em;line-height:1}
.front .brand span{display:block;margin-top:2mm;font-family:var(--mono);${mono}font-size:${metal ? 6.2 : 6}pt;letter-spacing:.13em;text-transform:uppercase;color:${T.fSoft}}

/* ----- back: name, contact, QR ----- */
.back{background:${T.backBg};color:${T.bText}}
.back .left{position:absolute;left:${m}mm;top:${m}mm;bottom:${m}mm;width:52mm;display:flex;flex-direction:column;justify-content:space-between}
.back .person b{display:block;font-weight:800;font-size:16pt;letter-spacing:-.045em;line-height:1}
.back .person span{display:block;margin-top:2mm;font-family:var(--mono);${mono}font-size:${metal ? 6 : 5.4}pt;letter-spacing:.12em;text-transform:uppercase;color:${T.accent}}
.back .contact{list-style:none;display:flex;flex-direction:column;gap:1.3mm;font-weight:600;font-size:7pt;letter-spacing:-.01em;margin-bottom:.5mm}
.back .contact li{display:flex;gap:2mm;align-items:baseline}
.back .contact li span{width:8mm;flex:none;font-family:var(--mono);${mono}font-size:${metal ? 6 : 5.2}pt;letter-spacing:.1em;text-transform:uppercase;color:${T.accent}}
.back .nfc{position:absolute;right:${m}mm;top:${m}mm}
.back .nfc svg{width:5.6mm;height:9.1mm}
.back .qr{position:absolute;right:${m}mm;bottom:${m}mm;width:21mm}
.back .qrbox{width:21mm;height:21mm;border-radius:2mm;background:${T.qrBox};padding:2.2mm}
.back .qrbox svg{width:100%;height:100%}
</style></head><body>
<section class="page front" id="front">
  <div class="mark">${frontLogo}</div>
  <div class="brand"><b>Opera Creatives</b><span>${esc(content.studioLine)}</span></div>
</section>
<section class="page back" id="back">
  <div class="left">
    <div class="person"><b>${esc(person.name)}</b><span>${esc(person.title)}</span></div>
    <ul class="contact">${rows}</ul>
  </div>
  <div class="nfc">${NFC_SVG(T.bText)}</div>
  <div class="qr"><div class="qrbox">${qrSvg}</div></div>
</section></body></html>`;
}
