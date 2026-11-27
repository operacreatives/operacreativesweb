/* Opera Creatives — shared content for every draft.
   Edit titles, categories or links here; all pages update.
   Films: Vimeo id (+ private hash where needed). Thumbnails are real Vimeo stills saved in public/v2/films/ (posters: public/assets/images/). */
window.OC = {
  site: "https://www.operacreatives.com",
  cal: "https://cal.com/operacreatives/talk",
  email: "hi@operacreatives.com",
  deck: "https://www.operacreatives.com/deck",
  instagram: { handle: "@operacreatives_", href: "https://www.instagram.com/operacreatives_" },
  owned: [
    { label: "Instagram", handle: "@harpoon.aiart", href: "https://www.instagram.com/harpoon.aiart" },
    { label: "X", handle: "@wcaianime", href: "https://x.com/wcaianime" }
  ],
  showreel: { id: "1233639706", title: "Opera Creatives Showreel 2026", dur: 96 },

  cats: [
    { id: "all", label: "All" },
    { id: "anime", label: "Anime" },
    { id: "commercials", label: "Commercials" },
    { id: "films", label: "Films" },
    { id: "product", label: "Product" },
    { id: "web3", label: "Web3" },
    { id: "posters", label: "Posters" }
  ],

  films: [
    // Films & concepts
    { id: "1233647571", t: "Soft Hours", c: "films", d: 58, note: "Brand film" },
    { id: "1233803601", t: "Auto Bags", c: "films", d: 62, note: "Brand film", wide: true },
    { id: "1234104627", t: "Interior Walkthrough", c: "films", d: 45, note: "3D spot" },
    { id: "1233648415", t: "Western Beige", c: "films", d: 30, note: "Music video" },
    { id: "1203214001", t: "Flippers", c: "films", d: 53, note: "Title film" },
    { id: "1203214002", t: "Forest Storm", c: "films", d: 36, note: "Short film" },
    { id: "1203213923", t: "Family Animation", c: "films", d: 70, note: "3D animation" },
    { id: "1203213922", t: "Kill Confirmed", c: "films", d: 33, note: "Trailer · 21:9", wide: true },
    { id: "1197465150", t: "Bank Robbery", c: "films", d: 73, note: "Animated TV" },
    { id: "1188442191", t: "Unleash the Avatar", c: "films", d: 37, note: "Concept edit" },
    { id: "1152866745", t: "One Piece Live-Action", c: "films", d: 37, note: "Concept", wide: true },
    // Commercials
    { id: "1233645586", t: "Lionheart Plastic", c: "commercials", d: 55, note: "UGC ad" },
    { id: "1203214003", t: "Sip & Bite Mango Milk", c: "commercials", d: 27, note: "Commercial" },
    { id: "1186915669", t: "Campa Cola", c: "commercials", d: 46, note: "Spec ad" },
    { id: "1154852720", t: "Mountain Dew", c: "commercials", d: 45, note: "Concept ad" },
    { id: "1153960232", t: "Nerolac", c: "commercials", d: 64, note: "Spec ad" },
    { id: "1152867925", t: "Cadbury Gems", c: "commercials", d: 80, note: "Concept ad" },
    { id: "1152865784", t: "Samsung Galaxy S25 Ultra", c: "commercials", d: 67, note: "Concept ad", wide: true },
    { id: "1152930117", t: "Food Motion Infographic", c: "commercials", d: 49, note: "Motion", wide: true },
    { id: "1197465090", t: "Souled Store", c: "commercials", d: 14, note: "Spec ad · 9:16", tall: true },
    // Product
    { id: "1197791359", t: "Chanel N°5", c: "product", d: 15, note: "Product spec" },
    { id: "1197791360", t: "Lime Sparkling Lemonade", c: "product", d: 15, note: "Product spec" },
    { id: "1197791358", t: "Headphones", c: "product", d: 15, note: "Product spec" },
    { id: "1197791356", t: "Grand Seiko", c: "product", d: 15, note: "Product spec" },
    // Web3
    { id: "1245089928", t: "Starknet", c: "web3", d: 34, note: "Web3 film" },
    { id: "1245089922", t: "Monad", c: "web3", d: 30, note: "Web3 film" },
    { id: "1245089914", t: "Hyperliquid", c: "web3", d: 44, note: "Web3 film" },
    { id: "1245089909", t: "Binance", c: "web3", d: 61, note: "Web3 film" },
    // FIFA World Cup anime series
    { id: "1212302168", h: "680b6f2367", t: "Tournament of Power", c: "anime", d: 84, note: "World Cup anime" },
    { id: "1212301782", h: "64d56e4171", t: "Argentina vs Spain: Luffy & Shanks", c: "anime", d: 81, note: "World Cup anime" },
    { id: "1212302078", h: "47da1e3563", t: "France vs Spain: Gear 5", c: "anime", d: 108, note: "World Cup anime" },
    { id: "1212301919", h: "16a7a7a42f", t: "Marineford: Save Yamal", c: "anime", d: 86, note: "World Cup anime" },
    { id: "1212301923", h: "91bd7c0645", t: "France vs England", c: "anime", d: 54, note: "World Cup anime" },
    { id: "1212301784", h: "12e67bddf7", t: "Dictator Fallen Against Spain", c: "anime", d: 65, note: "World Cup anime" },
    { id: "1212301785", h: "6ffd5a9b1c", t: "Argentina vs England", c: "anime", d: 47, note: "World Cup anime" },
    { id: "1212301783", h: "f5197a78ca", t: "Argentina vs Spain: Hype", c: "anime", d: 43, note: "World Cup anime" },
    { id: "1212301997", h: "4cc9db6eee", t: "France vs England: Prediction", c: "anime", d: 49, note: "World Cup anime" },
    { id: "1212301915", h: "310a8d769d", t: "France vs Sweden", c: "anime", d: 80, note: "World Cup anime" },
    { id: "1212301913", h: "39e466213b", t: "France vs Norway", c: "anime", d: 90, note: "World Cup anime" },
    { id: "1212301850", h: "40376c5e3f", t: "Emperors of Football", c: "anime", d: 27, note: "World Cup anime" }
  ],

  posters: [
    { f: "rhmiibdhu9bnwtn0d6au_11_11zon.webp", t: "Raptor Coupe", alt: "Red sports car in front of large Raptor Coupe Spec lettering" },
    { f: "ausufpwcwwwdlxekgqf9_2_11zon.webp", t: "Orange Sneaker", alt: "Athlete crouching on an oversized orange sneaker against a blue sky" },
    { f: "fbzme9nljpwj9smdxc3j_5_11zon.webp", t: "The Confident Edge", alt: "Black and white editorial cover of a man in a turtleneck" },
    { f: "riusghm36dr5lb0ivnaw_12_11zon.webp", t: "Red Runners", alt: "Red running shoes lit by a spotlight on a dark wooden floor" },
    { f: "lqsqd68x3jqryoj11xha_6_11zon.webp", t: "Fuel the Leap", alt: "Sports ad showing an athlete drinking against a blue sky" },
    { f: "cxocu2gdhvtfzackkeev_3_11zon.webp", t: "Through the Ring", alt: "Person in a red jacket reaching toward a perfume bottle through a metal ring" },
    { f: "mma28e8rytowtgvc5wh0_6_11zon.webp", t: "Earn It. Every Day.", alt: "Dark gym scene with a supplement tub" },
    { f: "lylshvpv1lmeoeglyloz_5_11zon.webp", t: "Aural Headphones", alt: "Aural wireless headphones poster on a dark green background" },
    { f: "cxyvno1sevgbn66timc3_4_11zon.webp", t: "Magazine Cover", alt: "Blue magazine cover with a model in a tan blazer" },
    { f: "g5fhbzdujtu2p7gse15b_2_11zon.webp", t: "Blender Burst", alt: "Blender bursting with fruit against an orange background" },
    { f: "ywlw2f2hz0xmlrjzweiz_11_11zon.webp", t: "CRTN Creatine", alt: "Man in a red hoodie holding a CRTN creatine tub" },
    { f: "mpeaw82hci1p77l5n6no_7_11zon.webp", t: "Floating Perfume", alt: "Perfume bottle floating above a reflective surface" },
    { f: "wfmpe9gonaklcy6en40q_8_11zon.webp", t: "Visor", alt: "Red editorial poster with a model wearing a visor" },
    { f: "y1rld47q3s5ipe9qjpav_10_11zon.webp", t: "Sport Shield", alt: "Tennis player on a court next to Sport Shield sunscreen" },
    { f: "oiwoucseok4wmhj45bpv_9_11zon.webp", t: "Spektra Buds", alt: "Spektra Buds wireless earbuds product ad" },
    { f: "w6zjb8o4xhj1dbvzrsm8_7_11zon.webp", t: "Urban Athlete Chronicles", alt: "Editorial poster with a seated man" },
    { f: "qulvn2ldqkfceqklunu3_10_11zon.webp", t: "Citrus Bliss", alt: "Citrus Bliss juice bottle surrounded by sliced citrus" },
    { f: "wjvbdb6ih6iotjzlqln9_9_11zon.webp", t: "Vita-Glow Gummies", alt: "Man in a yellow hoodie holding Vita-Glow gummies" },
    { f: "kxtuxs3rw0owipywhd8x_4_11zon.webp", t: "Coffee Machine", alt: "Coffee machine with a plume of smoke on a wooden table" },
    { f: "jggjprw8eis8xxp6t4nm_3_11zon.webp", t: "Bicycle Helmet", alt: "Angular black helmet on a red patterned background" },
    { f: "cwgbzxnxcjpp4gzampnj_1_11zon.webp", t: "Fresh. Vibrant. Seasonal.", alt: "Food ad with bowls of grains and vegetables" },
    { f: "yu6jm2do2bveqskobr5e_13_11zon.webp", t: "Aura Speakers", alt: "Three Aura speakers on a dark background" },
    { f: "oa0njakxpd8nneyinpvq_8_11zon.webp", t: "Leather Sneaker", alt: "Brown leather sneaker beside books on a wooden shelf" },
    { f: "ashkswjhb6bdrh0oosjy_1_11zon.webp", t: "Power Drink", alt: "Runner casting a shadow shaped like a Power Drink bottle" }
  ],

  // pic: "film:<id>" or "poster:<file>"
  services: [
    { n: "Anime style animation", x: "Stylised anime for launches, series and campaigns, from character design to final frame.", pic: "film:1212301782" },
    { n: "Anime series & event films", x: "Anime-themed series built for big moments, like our FIFA World Cup Anime Series.", pic: "film:1212302168" },
    { n: "Hybrid VFX", x: "Send us ready footage. We add flames, smoke, sparks and more so it looks filmed that way.", pic: "film:1203214002" },
    { n: "Dubbing", x: "Natural multi-language voices with lip-sync, so one film speaks to every market.", pic: "film:1154852720" },
    { n: "Brand films", x: "Story-led films that make people remember the name.", pic: "film:1233647571" },
    { n: "Commercials", x: "Sharp, scroll-stopping ads for TV, social and everything between.", pic: "film:1186915669" },
    { n: "UGC videos", x: "Native, creator-style content built to perform in feed.", pic: "film:1233645586" },
    { n: "Product visuals", x: "Hero shots and motion that make products look premium.", pic: "film:1197791359" }
  ],

  process: [
    { tag: "Day 0", t: "Brief", x: "Tell us the goal. We turn it into angles, hooks and a direction built for your audience." },
    { tag: "Day 1", t: "Storyboard", x: "Every shot planned and styled before a single frame is made." },
    { tag: "Days 2–4", t: "Production", x: "We build the world, characters and motion, or take your ready footage into VFX." },
    { tag: "Days 3–5", t: "Sound design", x: "Original sound, music and mix built alongside the picture." },
    { tag: "Days 4–6", t: "VFX", x: "Flames, smoke, sparks and compositing, locked to the look of the film." },
    { tag: "Final cut", t: "Dub & deliver", x: "Multi-language dubbing, masters and cutdowns for every platform." }
  ],

  faqs: [
    ["Do you shoot with real cameras?", "No, we don't shoot. For hybrid VFX you send us footage that's already shot, and we add the effects on top. Everything else we build from the storyboard up."],
    ["What is hybrid VFX?", "You bring ready footage. We layer in effects like flames, smoke, sparks and explosions so they look like they were filmed on the day. Most of our VFX projects work this way."],
    ["How fast can you deliver a film?", "Most projects reach a first cut in days, not weeks. Exact timing depends on length and complexity, and we'll scope it on the call."],
    ["Do you do dubbing?", "Yes. We dub films into multiple languages with natural voices and lip-sync, so one film can launch in every market."],
    ["Can you make anime style videos?", "Yes. Anime style animation is one of our specialities, from short loops to full series."],
    ["What does a project cost?", "It depends on scope, length and volume. Book a discovery call, share the brief, and we'll follow with a clear quote."]
  ]
};

/* Helpers shared by every page */
OC.thumb = (id) => `/v2/films/${id}.webp`;
OC.poster = (f) => `/assets/images/${f}`;
OC.pic = (ref) => { const [k, v] = ref.split(":"); return k === "film" ? OC.thumb(v) : OC.poster(v); };
OC.player = (f) => `https://player.vimeo.com/video/${f.id}?${f.h ? "h=" + f.h + "&" : ""}autoplay=1&title=0&byline=0&portrait=0&badge=0&dnt=1&playsinline=1`;
OC.time = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
OC.film = (id) => OC.films.find((f) => f.id === id) || (id === OC.showreel.id ? OC.showreel : null);
// One mixed list for the gallery: films + posters, dealt round-robin across
// categories so "All" shows a varied mix. Reorder OC.films / OC.posters to change it.
OC.work = (() => {
  const items = [
    ...OC.films.map((f) => ({ ...f, kind: "film", src: OC.thumb(f.id) })),
    ...OC.posters.map((p) => ({ ...p, kind: "poster", c: "posters", note: "Poster", src: OC.poster(p.f) }))
  ];
  const order = ["anime", "commercials", "posters", "films", "product", "posters", "web3"];
  const pools = {}; items.forEach((w) => (pools[w.c] = pools[w.c] || []).push(w));
  const out = [];
  while (out.length < items.length) order.forEach((c) => { const w = pools[c] && pools[c].shift(); if (w) out.push(w); });
  return out;
})();
