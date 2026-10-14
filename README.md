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

## Previous site

The previous homepage is preserved on the `backup/live-site-v1` branch. To roll back, deploy that branch or reset `main` to it.
