# Opera Creatives — Redesign Plan

Branch: `claude/dreamy-meitner-aqu0ve`
Reference: 2416.in (structure and feel only — our branding, our copy).

> Note: 2416.in could not be opened from the build environment (DNS/proxy blocked), so this plan is
> based on the brief ("cleaner, editorial, with a Book a Discovery Call flow") plus the existing site.
> Section 8 lists what to confirm against the live reference.

## 1. Goals
- Cleaner, calmer, more premium than today's marquee-heavy page.
- One clear action everywhere: **Book a Discovery Call**.
- Keep Opera branding: red `#ea0916`, cream `#f8e7d8`, black/white, Bebas Neue + Inter + Space Mono.
- Rewrite copy in our voice (AI-native production house for e-commerce brands).

## 2. Site map
Single scrolling home page with anchored sections, plus a dedicated booking route.

| Route | Purpose |
|---|---|
| `/` | Home (sections below) |
| `/book` | Discovery call: short qualifier form → Cal.com slot picker |
| `/work` (phase 2) | Full portfolio, filter by category |
| `/deck`, `/qr`, `/nfc`, `/[slug]` | Unchanged |

## 3. Home page sections (in order)
1. **Header** — logo left, anchors (Work, Services, Process, Contact), primary pill button *Book a Discovery Call*. Transparent over hero, solid after scroll. Mobile: full-screen menu.
2. **Hero** — one large statement, one sub-line, two actions (*Book a Discovery Call*, *Watch showreel*). Looping muted showreel as background or framed video.
   Draft: **"Content that sells. At the speed of e-commerce."** / "Opera Creatives is an AI-native production house for brands that need cinematic ads, product films and UGC — in days, not weeks."
3. **Trust strip** — slim logo/stat row (brands, videos shipped, avg. turnaround). *Needs real numbers from you.*
4. **Selected work** — clean 2-column grid of our existing Vimeo projects, hover-play, category tag; FIFA World Cup animations as a featured case study block.
5. **Services** — 4 cards: Brand Films & Ads · Product Visuals · UGC-style Content · AI Animation. Numbered, large type, minimal.
6. **Process** — existing 3 steps (Strategy → AI-native Production → Rapid Delivery), restyled as a sticky-scroll list.
7. **Why Opera** — 3 short differentiators (speed, AI + human craft, performance-minded creative).
8. **Discovery call CTA band** — full-width red/cream block: "Have a product that deserves better content? Let's talk." → opens booking.
9. **Footer** — email, socials, large wordmark (keep current sweeping text), © line.

## 4. "Book a Discovery Call" feature
We already use Cal.com (`cal.com/operacreatives/hello`) and have the Cal MCP available.
- **Entry points:** header button, hero button, CTA band, footer, floating button on mobile.
- **Flow (v1):** modal/`/book` page → step 1: name, work email, brand/website, what you need (chips), rough monthly budget → step 2: embedded Cal.com scheduler pre-filled with those answers → confirmation screen.
- **Lead capture:** store each submission (Supabase table already used by the site for short links) and notify via email/Slack so no lead is lost if they skip the calendar step.
- **Tracking:** PostHog events (`book_open`, `book_form_submit`, `book_scheduled`) with `ref` preserved from QR/NFC links.
- Needs from you: the Cal event type to use (30-min "Discovery Call"?), and where leads should land (email/Slack/Supabase).

## 5. Visual direction
- Mostly white/cream canvas, black text, red used sparingly for CTAs and highlights.
- Very large Bebas Neue headlines, Inter body at generous line height, Space Mono for small labels/indexes.
- 12-column grid, wide margins, lots of whitespace; thin 1px dividers instead of heavy boxes.
- Motion: subtle fade/slide on scroll (framer-motion already installed), hover-play on videos, respects `prefers-reduced-motion`. Retire the heavy preloader/intro animation and custom cursor (or make cursor optional).
- Accessibility: keep skip link, focus states, AA contrast; existing axe e2e tests stay green.

## 6. Technical plan
- Stack unchanged: Next.js App Router, Tailwind v4, TypeScript.
- New components: `Hero`, `TrustStrip`, `Services`, `Process` (replaces HowItWorks), `WhyOpera`, `CtaBand`, `BookCallModal`, `BookCallForm`.
- Content moves to `content/site.ts` so copy edits don't touch components.
- Remove/retire: `Preloader`, `IntroAnimation`, `CustomCursor`, `WorkMarquee`, `CollaborateForm` (replaced by booking flow). Update `tests/` and `e2e/` accordingly.
- Keep: Vimeo grid logic, FIFA data, `/deck`, short links, analytics.

## 7. Delivery phases
1. **Foundation** — design tokens, layout, new header/footer, content file.
2. **Home sections** — hero → work → services → process → CTA.
3. **Booking flow** — form, Cal embed, lead storage, tracking.
4. **Polish** — motion, mobile, SEO/OG, Lighthouse + axe pass, tests.
5. **Phase 2** — `/work` page, case-study pages, team/about.

## 8. To confirm
- Anything on 2416.in you specifically want copied (nav style, hover effects, booking layout) — screenshots help since I can't load it.
- Real client logos, stats, testimonials.
- Services list and positioning line you want to lead with.
- Booking: Cal event type + lead destination.
- Keep red as hero accent, or go mostly black/white with red only on buttons?
