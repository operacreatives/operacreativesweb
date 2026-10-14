# Opera Creatives

The Opera Creatives website: an AI native production studio for animation, hybrid VFX, dubbing and brand films. Built with Next.js App Router, React and TypeScript.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```


## Site structure

- `app/page.tsx` is the home page. Its copy lives in `lib/site.ts`; the work gallery reads `data/vimeo-projects.ts`, `data/fifa-projects.ts` and `data/posters.ts` (posters live in `public/assets/images`).
- Every "Book a discovery call" button links straight to the Cal.com page set in `lib/site.ts` (`CAL_URL`).
- Styles are in `app/site.css`, scoped under `.site`.
- Short links (`/qr`, `/nfc`, and anything created in the dashboard) are handled by `app/[slug]/route.ts`; `/deck` serves `content/deck.html`. `e2e/site.spec.ts` checks that these keep working.
- `/v2` redirects to `/` (the redesign was previewed there first).

## Search and AI visibility

- Page title, description, Open Graph and Twitter tags are set in `app/layout.tsx` from `lib/site.ts` (title kept under 60 characters, description under 160; a unit test checks this).
- `lib/seo.ts` builds the schema.org JSON-LD (Organization with its service catalogue, WebSite, WebPage and a FAQPage built from the FAQ list) and the home page embeds it.
- `/llms.txt` (`app/llms.txt/route.ts`) is a plain-text summary of the studio for AI assistants, generated from the same copy as the page.
- Every work image has descriptive alt text; poster alt text lives in `data/posters.ts`. Add an entry there whenever a poster is added.
- Unknown pages show a branded, noindex 404 (`app/not-found.tsx`).

## Business card

Print-ready business card (90 x 50 mm, 3 mm bleed, same fonts, colours, logo and posters as the site) lives in `print/business-card`.

- `npm run card` builds `print/business-card/out/`: `studio-print.pdf` (send this to the printer; it has trim and bleed boxes set), 600 dpi PNGs of both sides, and a preview image. The out folder is not committed; rebuild any time. Needs internet access (Google Fonts) and a Chromium install.
- QR code: save it as `print/business-card/qr.svg` (or `qr.png`) and rebuild. Until then the card shows a "QR code goes here" placeholder.
- Cards for individual people: add entries (name, title, phone) to `print/business-card/people.json`; each entry builds its own PDF.
- Change the card size by editing `TRIM_W` and `TRIM_H` at the top of `build.mjs`.

## Previous site

The previous homepage is preserved on the `backup/live-site-v1` branch. To roll back, deploy that branch or reset `main` to it.
