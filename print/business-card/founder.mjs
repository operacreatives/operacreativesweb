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

export const NFC_SVG = (c, w = 2) => `<svg viewBox="-1 -1 14 26" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round">${[6, 10, 14, 18]
  .map((r) => `<path d="M${(-3 + r * 0.766).toFixed(2)} ${(12 - r * 0.643).toFixed(2)}A${r} ${r} 0 0 1 ${(-3 + r * 0.766).toFixed(2)} ${(12 + r * 0.643).toFixed(2)}"/>`)
  .join("")}</svg>`;

export async function founderDoc({ person, mode, W, H, bleed = 0, site, baseUrl }) {
  const pvc = mode === "pvc";
  const metal = !pvc;
  const PW = W + bleed * 2;
  const PH = H + bleed * 2;
  const m = 5.5 + bleed; // safe margin measured from the page edge
  const RED = "#ea0916";
  const CREAM = "#f8e7d8";
  const INK = "#0b0b0b";

  // colours per face
  const T =
    mode === "pvc"
      ? { frontBg: `radial-gradient(circle at 100% 0%,rgba(234,9,22,.4),rgba(234,9,22,0) 48%),${INK}`, backBg: `radial-gradient(circle at 0% 100%,rgba(0,0,0,.28),rgba(0,0,0,0) 60%),${RED}`, fText: CREAM, fAccent: "#ff4a54", fSoft: "rgba(248,231,216,.72)", bText: CREAM, bSoft: "rgba(248,231,216,.85)", qrBox: CREAM, qrDark: INK }
      : mode === "engrave"
        ? { frontBg: "#fff", backBg: "#fff", fText: "#000", fAccent: "#000", fSoft: "#000", bText: "#000", bSoft: "#000", qrBox: "#000", qrDark: "#fff" }
        : { frontBg: "linear-gradient(115deg,#0b0b0d,#17171a 45%,#0b0b0d)", backBg: "linear-gradient(115deg,#0b0b0d,#17171a 45%,#0b0b0d)", fText: "#d9dade", fAccent: "#d9dade", fSoft: "#d9dade", bText: "#d9dade", bSoft: "#d9dade", qrBox: "#d9dade", qrDark: "#0e0e10" };

  const qrSvg = await QRCode.toString(`${baseUrl}/${person.id}`, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: T.qrDark, light: "#0000" } });
  const logoSvg = await inline("logo-mark.svg");
  const mascotSvg = await inline("mascot.svg");
  const logoPng = pathToFileURL(path.join(here, "assets/logo-mark.png")).href;
  const mascotPng = pathToFileURL(path.join(here, "assets/mascot.png")).href;
  const frontLogo = pvc ? `<img src="${logoPng}" alt="Opera Creatives logo">` : logoSvg;
  const frontMascot = pvc ? `<img src="${mascotPng}" alt="">` : mascotSvg;
  const lw = metal ? 700 : 400; // mono weight: bold for engraving
  const mono = metal ? "font-weight:700;" : "";
  const rows = [["Email", person.email], ["Call", person.phone]].map(([k, v]) => `<li><span>${esc(k)}</span>${esc(v)}</li>`).join("");

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
.mono{font-family:var(--mono);${mono}text-transform:uppercase}

/* ----- front: black, name, tap ----- */
.front{background:${T.frontBg};color:${T.fText}}
.front .mark{position:absolute;left:${m}mm;top:${m}mm;width:12mm}
.front .mark img,.front .mark svg{width:100%;height:auto;display:block}
.front .brand{position:absolute;left:${m + 14.2}mm;top:${m + 3.6}mm;font-weight:800;font-size:4mm;letter-spacing:-.045em;line-height:1}
.front .nfc{position:absolute;right:${m}mm;top:${m}mm;display:flex;flex-direction:column;align-items:flex-end;gap:1.2mm}
.front .nfc svg{width:4.9mm;height:9.1mm}
.front .nfc span{font-family:var(--mono);${mono}font-size:${metal ? 5 : 4.4}pt;letter-spacing:.12em;text-transform:uppercase;color:${T.fSoft}}
.front .me{position:absolute;left:${m}mm;top:${bleed + 21.5}mm}
.front .me b{display:block;font-weight:800;font-size:17pt;letter-spacing:-.045em;line-height:1}
.front .me span{display:block;margin-top:2mm;font-family:var(--mono);${mono}font-size:${metal ? 6 : 5.6}pt;letter-spacing:.12em;text-transform:uppercase;color:${T.fAccent}}
.front .contact{position:absolute;left:${m}mm;bottom:${bleed + 8}mm;list-style:none;display:flex;flex-direction:column;gap:1.2mm;font-weight:600;font-size:6.6pt;letter-spacing:-.01em}
.front .contact li{display:flex;gap:2mm;align-items:baseline}
.front .contact li span{width:8mm;flex:none;font-family:var(--mono);${mono}font-size:${metal ? 6 : 5.2}pt;letter-spacing:.1em;text-transform:uppercase;color:${T.fAccent}}
.front .base{position:absolute;left:0;right:0;bottom:${bleed + 3.45}mm;height:.4mm;background:${T.fText}}
.front .peek{position:absolute;right:${bleed + 3.5}mm;bottom:${bleed + 1.6}mm;width:36mm}
.front .peek img,.front .peek svg{width:100%;height:auto;display:block}

/* ----- back: red (or etched), big logo, tagline, QR ----- */
.back{background:${T.backBg};color:${T.bText}}
.back .big{position:absolute;left:${m}mm;top:${m}mm;width:33mm}
.back .big svg{width:100%;height:auto;color:${T.bText}}
.back .tag{position:absolute;left:${m}mm;bottom:${m}mm;width:44mm;font-weight:800;font-size:10pt;line-height:1;letter-spacing:-.05em}
.back .site{position:absolute;left:${m}mm;bottom:${m + 9.8}mm;font-family:var(--mono);${mono}font-size:${metal ? 6 : 5.4}pt;letter-spacing:.12em;text-transform:uppercase;color:${T.bSoft}}
.back .qr{position:absolute;right:${m}mm;bottom:${m}mm;width:21mm;text-align:center}
.back .qrbox{width:21mm;height:21mm;border-radius:2mm;background:${T.qrBox};padding:2.2mm}
.back .qrbox svg{width:100%;height:100%}
.back .cap{margin-top:1.8mm;font-family:var(--mono);${mono}font-size:${metal ? 5.4 : 4.6}pt;letter-spacing:.1em;text-transform:uppercase;color:${T.bText}}
</style></head><body>
<section class="page front" id="front">
  <div class="mark">${frontLogo}</div>
  <div class="brand">Opera Creatives</div>
  <div class="nfc">${NFC_SVG(T.fText)}<span>Tap to connect</span></div>
  <div class="me"><b>${esc(person.name)}</b><span>${esc(person.title)}</span></div>
  <ul class="contact">${rows}</ul>
  <div class="base"></div><div class="peek">${frontMascot}</div>
</section>
<section class="page back" id="back">
  <div class="big">${logoSvg}</div>
  <div class="site">${esc(site)}</div>
  <p class="tag">From product shot to full blown film.</p>
  <div class="qr"><div class="qrbox">${qrSvg}</div><div class="cap">Scan or tap</div></div>
</section></body></html>`;
}
