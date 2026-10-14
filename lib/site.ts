// All homepage copy lives here. Components only render it.

export const SITE_URL = "https://www.operacreatives.com";
export const SITE_NAME = "Opera Creatives";
export const SITE_TITLE = "Opera Creatives | AI native studio for anime, VFX & dubbing";
export const SITE_DESCRIPTION =
  "Opera Creatives is the AI native production studio for animation, hybrid VFX, dubbing, brand films, commercials, UGC videos and product visuals. Book a call.";

// The "Book a discovery call" buttons go straight to this Cal.com page.
export const CAL_URL = "https://cal.com/operacreatives/talk";
export const BOOK_LABEL = "Book a discovery call";
export const CONTACT_EMAIL = "hi@operacreatives.com";
export const SHOWREEL_ID = "1233639706";

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/operacreatives_" },
  { label: "LinkedIn", href: "https://linkedin.com/company/operacreatives" },
  { label: "X", href: "https://x.com/operacreatives_" },
];

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export const HERO = {
  lead: "From product shot to",
  accent: "full blown film.",
  blurb: "Opera Creatives is the AI native production studio for ad creatives, anime series, brand films and more.",
};

export const ABOUT = {
  label: "About us",
  before: "Opera Creatives is the",
  accent: "AI native production studio",
  after: "for animation, hybrid VFX, dubbing, brand films, commercials, UGC videos, product visuals and more.",
  sub: "One team, start to finish. Fast turnarounds, no handoffs, and work made to be seen.",
};

export interface Service {
  name: string;
  text: string;
  // "poster:N" uses a static creative, "fifa:N" / "reel:N" use a video thumbnail.
  pic: string;
}

export const SERVICES: Service[] = [
  { name: "Anime style animation", text: "Stylised anime for launches, series and campaigns, from character design to final frame.", pic: "fifa:2" },
  { name: "Anime series & event films", text: "Anime-themed series built for big moments, like our FIFA World Cup Anime Series.", pic: "fifa:0" },
  { name: "Hybrid VFX", text: "Send us ready footage. We add flames, smoke, sparks and more so it looks filmed that way.", pic: "poster:8" },
  { name: "Dubbing", text: "Natural multi-language voices with lip-sync, so one film speaks to every market.", pic: "reel:6" },
  { name: "Brand films", text: "Story-led films that make people remember the name.", pic: "reel:2" },
  { name: "Commercials", text: "Sharp, scroll-stopping ads for TV, social and everything between.", pic: "poster:16" },
  { name: "UGC videos", text: "Native, creator-style content built to perform in feed.", pic: "poster:23" },
  { name: "Product visuals", text: "Hero shots and motion that make products look premium.", pic: "poster:12" },
];

export type ProcessVisual = "mood" | "story" | "image" | "wave" | "dub";

export interface ProcessStep {
  title: string;
  text: string;
  tag: string;
  visual: ProcessVisual;
  // "poster:N" / "reel:N" / "fifa:N" references, resolved in lib/work.ts
  pics: string[];
}

export const PROCESS: ProcessStep[] = [
  { title: "Brief", text: "Tell us the goal. We turn it into angles, hooks and a direction built for your audience.", tag: "Day 0", visual: "mood", pics: ["poster:9", "poster:2", "poster:3", "poster:12", "poster:22"] },
  { title: "Storyboard", text: "Every shot planned and styled before a single frame is made.", tag: "Day 1", visual: "story", pics: ["poster:0", "poster:9", "poster:17"] },
  { title: "Production", text: "We build the world, characters and motion, or take your ready footage into VFX.", tag: "Days 2\u20134", visual: "image", pics: ["fifa:0"] },
  { title: "Sound design", text: "Original sound, music and mix built alongside the picture.", tag: "Days 3\u20135", visual: "wave", pics: [] },
  { title: "VFX", text: "Flames, smoke, sparks and compositing, locked to the look of the film.", tag: "Days 4\u20136", visual: "image", pics: ["poster:6"] },
  { title: "Dub & deliver", text: "Multi-language dubbing, masters and cutdowns for every platform.", tag: "Final cut", visual: "dub", pics: ["fifa:1"] },
];

export const FAQS = [
  { q: "Do you shoot with real cameras?", a: "No, we don't shoot. For hybrid VFX you send us footage that's already shot, and we add the effects on top. Everything else we build from the storyboard up." },
  { q: "What is hybrid VFX?", a: "You bring ready footage. We layer in effects like flames, smoke, sparks and explosions so they look like they were filmed on the day. Most of our VFX projects work this way." },
  { q: "How fast can you deliver a film?", a: "Most projects reach a first cut in days, not weeks. Exact timing depends on length and complexity, and we'll scope it on the call." },
  { q: "Do you do dubbing?", a: "Yes. We dub films into multiple languages with natural voices and lip-sync, so one film can launch in every market." },
  { q: "Can you make anime style videos?", a: "Yes. Anime style animation is one of our specialities, from short loops to full series." },
  { q: "What does a project cost?", a: "It depends on scope, length and volume. Book a discovery call, share the brief, and we'll follow with a clear quote." },
];

export const CTA = {
  lines: ["Have an idea?", "Put it on screen."],
  text: "Book a short, no pressure call. We’ll show you our work and how we’d bring your idea to life.",
  note: "Pick a time that suits you",
};

export const WORK_NOTES = {
  films: "A look at what we make, from anime style animation to brand films. Click any film to watch it.",
  statics: "Posters, ad creatives and product visuals made for brands. Click any to view it full size.",
  fifa: "Anime series released during the FIFA World Cup, generating over 150 million impressions across social media.",
};
