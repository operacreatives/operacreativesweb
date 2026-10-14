// Metal NFC card (laser engraving, one colour): the same design as the paper handout and the NFC PVC card,
// plus the tap symbol on the back, without the mascot on the front. Colour only differs: here everything is a single etched colour.
//
// mode "engrave"  black art on white (what the engraver gets; black = etched)
// mode "mock"     what the engraving looks like on black metal (preview only)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const here = path.dirname(fileURLToPath(import.meta.url));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const inline = async (f) => (await fs.readFile(path.join(here, "assets", f), "utf8")).replace('fill="#000"', 'fill="currentColor"');

// Contactless waves (generic, not the NFC Forum N-Mark).
export const NFC_SVG = (c, w = 2) => `<svg viewBox="0.5 -1 16 26" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round">${[6, 10, 14, 18]
  .map((r) => `<path d="M${(-3 + r * 0.766).toFixed(2)} ${(12 - r * 0.643).toFixed(2)}A${r} ${r} 0 0 1 ${(-3 + r * 0.766).toFixed(2)} ${(12 + r * 0.643).toFixed(2)}"/>`)
  .join("")}</svg>`;

export async function founderDoc({ person, mode, W, H, site, baseUrl, content }) {
  const ink = mode === "engrave" ? "#000" : "#d9dade";
  const base = mode === "engrave" ? "#fff" : "#0e0e10";
  const m = 5.5;
  const qrSvg = await QRCode.toString(`${baseUrl}/${person.id}`, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: base, light: "#0000" } });
  const logo = await inline("logo-mark.svg");
  const rows = [["Email", person.email], ["Call", person.phone], ["Web", site]].map(([k, v]) => `<li><span>${esc(k)}</span>${esc(v)}</li>`).join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Opera Creatives metal card: ${esc(person.name)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
@page{size:${W}mm ${H}mm;margin:0}
:root{--ink:${ink};--base:${base};--sans:"Inter",system-ui,sans-serif;--mono:"Space Mono",ui-monospace,monospace}
*{box-sizing:border-box;margin:0;padding:0}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:${mode === "engrave" ? "#fff" : "#222"}}
.page{position:relative;width:${W}mm;height:${H}mm;overflow:hidden;break-after:page;font-family:var(--sans);color:var(--ink);background:var(--base)}
${mode === "mock" ? ".page{border-radius:3mm;background:linear-gradient(115deg,#0b0b0d,#17171a 45%,#0b0b0d)}" : ""}
@media screen{.page{margin:0 0 6mm}}
svg{display:block}
.mono{font-family:var(--mono);font-weight:700;text-transform:uppercase}

/* front: centred logo and studio line */
.front .mark{position:absolute;left:50%;transform:translateX(-50%);top:11.4mm;width:28mm}
.front .mark svg,.back .who .m svg{width:100%;height:auto}
.front .brand{position:absolute;left:0;right:0;top:34mm;text-align:center}
.front .brand b{display:block;font-weight:800;font-size:4.9mm;letter-spacing:-.045em;line-height:1}
.front .brand span{display:block;margin-top:1.7mm;font-family:var(--mono);font-weight:700;font-size:6.2pt;letter-spacing:.13em;text-transform:uppercase}

/* back: logo and name, details, tap symbol, QR */
.left{position:absolute;left:${m}mm;top:${m}mm;bottom:${m}mm;width:52mm;display:flex;flex-direction:column;justify-content:space-between}
.who{display:flex;align-items:center;gap:2mm}
.who .m{width:9mm}
.who b{font-weight:800;font-size:3.6mm;letter-spacing:-.04em;line-height:1}
.person{display:flex;flex-direction:column;gap:1.2mm;margin-bottom:2.4mm}
.person b{font-weight:800;font-size:14pt;letter-spacing:-.04em;line-height:1}
.person span{font-family:var(--mono);font-weight:700;font-size:6pt;letter-spacing:.1em;text-transform:uppercase}
.contact{list-style:none;display:flex;flex-direction:column;gap:1.2mm;font-weight:600;font-size:7pt;letter-spacing:-.01em}
.contact li{display:flex;gap:2mm;align-items:baseline}
.contact li span{width:8mm;flex:none;font-family:var(--mono);font-weight:700;font-size:6pt;letter-spacing:.1em;text-transform:uppercase}
.back .nfc{position:absolute;right:${m}mm;top:${m}mm}
.back .nfc svg{width:5.6mm;height:9.1mm}
.qr{position:absolute;right:${m}mm;bottom:${m}mm;width:21mm;text-align:center}
.qrbox{width:21mm;height:21mm;border-radius:2mm;background:var(--ink);padding:2.2mm}
.qrbox svg{width:100%;height:100%}
.cap{margin-top:1.8mm;font-family:var(--mono);font-weight:700;font-size:5.4pt;letter-spacing:.1em;text-transform:uppercase}
</style></head><body>
<section class="page front" id="front">
  <div class="mark">${logo}</div>
  <div class="brand"><b>Opera Creatives</b><span>${esc(content.studioLine)}</span></div>
</section>
<section class="page back" id="back">
  <div class="left">
    <div class="who"><div class="m">${logo}</div><b>Opera Creatives</b></div>
    <div><div class="person"><b>${esc(person.name)}</b><span>${esc(person.title)}</span></div><ul class="contact">${rows}</ul></div>
  </div>
  <div class="nfc">${NFC_SVG(ink)}</div>
  <div class="qr"><div class="qrbox">${qrSvg}</div><div class="cap">Scan to connect</div></div>
</section></body></html>`;
}
