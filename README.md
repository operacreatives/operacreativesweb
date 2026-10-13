# Opera Creatives

An editorial, image-led creative agency portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

The project content is demonstration-only. Images are locally stored placeholders sourced through Lorem Picsum. The contact form validates in the browser and never transmits data.

## Site structure

- `/` is the live site (`app/(main)`), with its own layout and `app/globals.css`.
- `/v2` is the redesign preview (`app/v2`, `components/v2`, `lib/v2`). It has its own layout and a fully scoped stylesheet (`app/v2/v2.css`, every rule under `.v2`), is marked `noindex`, and does not affect `/`.
- Homepage copy for v2 lives in `lib/v2/site.ts`; its work gallery data comes from `data/vimeo-projects.ts`, `data/fifa-projects.ts` and `data/posters.ts`.
- `backup/live-site-before-redesign` is a snapshot of the live site before the redesign work started.
