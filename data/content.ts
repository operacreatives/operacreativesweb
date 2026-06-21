import type { Article, PageHeroContent, Project, Role, TeamMember, WorkRow } from "./types";

const projectSeeds: Array<[string, string]> = [
  ["Vela Running", "AI Motion Campaign — Cinema-Grade Film"],
  ["Morrow Hotels", "Brand Film & Aesthetic Travel Shorts"],
  ["Paloma Skin", "High-Fidelity UGC Skin Ritual Campaign"],
  ["Orchid Mobile", "Visual Identity & Sound — Signal in Full Colour"],
  ["Alta Cinema", "AI Narrative Feature & Stories for a Crowd"],
  ["Aster Records", "AI Audio-Visual Campaign — The Sound Has Shape"],
];

export const projects: Project[] = projectSeeds.map(([client, title], index) => {
  const id = index + 1;
  return {
    id,
    image: `/work/work-${String(id).padStart(2, "0")}.webp`,
    alt: `Demo project artwork for ${client}: ${title}`,
    client,
    title,
    sourceCredit: "Placeholder photography via Lorem Picsum",
    focalPosition: index % 5 === 0 ? "50% 35%" : index % 7 === 0 ? "50% 70%" : "50% 50%",
    fallbackLabel: client.slice(0, 2).toUpperCase(),
  };
});

const rowHeights: WorkRow["height"][] = ["standard", "standard"];

export const workRows: WorkRow[] = Array.from({ length: 2 }, (_, rowIndex) => ({
  id: rowIndex + 1,
  height: rowHeights[rowIndex % rowHeights.length],
  projects: projects.slice(rowIndex * 3, rowIndex * 3 + 3),
}));

export const homeManifesto = {
  eyebrow: "Opera Creatives",
  title: "Brands need more than noise.",
  manifesto:
    "They need a point of view strong enough to travel, an image worth remembering, and an idea people choose to carry. Opera Creatives brings strategy, storytelling, design, and production into one restless studio, turning attention into affinity and brands into culture.",
};

export const pageHeroes: Record<string, PageHeroContent> = {
  about: {
    eyebrow: "About",
    title: "A creative company built for the full performance.",
    manifesto:
      "We bring brand thinking, visual craft, moving image, and cultural instinct onto one stage. The result is work that knows what it wants to say and exactly how it should enter the room.",
  },
  team: {
    eyebrow: "Team",
    title: "Many disciplines. One point of view.",
    manifesto:
      "Opera is made by strategists who sketch, designers who write, directors who listen, and producers who make the impossible arrive on Tuesday. Different practices make the work richer.",
  },
  ideas: {
    eyebrow: "Ideas",
    title: "Thinking should leave a mark.",
    manifesto:
      "Notes from the studio on culture, identity, image-making, and the strange business of earning attention. No trend reports dressed as prophecy. Just useful provocations.",
  },
  careers: {
    eyebrow: "Careers",
    title: "Bring your range. Keep your edges.",
    manifesto:
      "We are building a studio for generous specialists, unruly generalists, and people who make everybody else’s thinking better. The work is serious. The atmosphere does not have to be.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Give us something to think about.",
    manifesto:
      "A new brand, a stubborn problem, a half-formed possibility, or a collaboration that does not fit neatly in a deck. Start where you are. We will meet you there.",
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Clear language. Minimal data.",
    manifesto:
      "This demonstration site is intentionally simple: no advertising trackers, no hidden form submission, and no appetite for information it does not need.",
  },
};

export const team: TeamMember[] = [
  ["Mira Sen", "Founder & Creative Director"],
  ["Theo Martin", "Strategy Director"],
  ["Anya Rao", "Design Director"],
  ["Jon Bell", "Executive Producer"],
  ["Leila Hart", "Head of Culture"],
  ["Ravi Mehta", "Motion Director"],
  ["Noor Ali", "Senior Writer"],
  ["Eli Ward", "Art Director"],
  ["June Park", "Experience Designer"],
  ["Ishan Bose", "Creative Technologist"],
  ["Clara Moss", "Producer"],
  ["Sam Rivera", "Studio Manager"],
].map(([name, role], index) => ({ name, role, image: projects[index % projects.length].image }));

export const articles: Article[] = [
  ["the-useful-uncanny", "Craft", "The useful uncanny", "Why the most memorable brands leave one detail slightly unresolved.", "June 12, 2026"],
  ["beyond-the-moodboard", "Process", "Beyond the moodboard", "How to turn visual appetite into an idea with consequences.", "May 28, 2026"],
  ["brands-with-body-language", "Identity", "Brands have body language", "The case for treating movement as part of identity, not decoration.", "May 03, 2026"],
  ["against-seamless", "Culture", "Against seamless", "A little friction can make an experience more human and more memorable.", "April 19, 2026"],
  ["the-image-is-the-argument", "Image", "The image is the argument", "When visual direction does more strategic work than a paragraph ever could.", "March 30, 2026"],
  ["small-signals", "Strategy", "Small signals, strong worlds", "Building brand recognition from repeatable details rather than logo exposure.", "March 08, 2026"],
  ["making-for-the-feed", "Platforms", "Make for people, not the feed", "Platform fluency without letting formats flatten the idea.", "February 21, 2026"],
  ["taste-is-a-system", "Leadership", "Taste is a system", "What creative leaders can teach, document, and make less mysterious.", "February 02, 2026"],
  ["new-seriousness", "Opinion", "A new seriousness", "Why wit and ambition are finding each other again.", "January 14, 2026"],
].map(([slug, category, title, summary, date], index) => ({
  slug,
  category,
  title,
  summary,
  date,
  image: projects[index % projects.length].image,
}));

export const roles: Role[] = [
  { title: "Senior Designer", discipline: "Design", location: "Bengaluru / Hybrid", type: "Full-time" },
  { title: "Creative Strategist", discipline: "Strategy", location: "Mumbai / Hybrid", type: "Full-time" },
  { title: "Producer", discipline: "Production", location: "Remote / India", type: "Full-time" },
  { title: "Motion Designer", discipline: "Motion", location: "Bengaluru / Hybrid", type: "Contract" },
  { title: "Senior Copywriter", discipline: "Creative", location: "Remote / India", type: "Full-time" },
  { title: "Design Intern", discipline: "Design", location: "Bengaluru", type: "Internship" },
];

export const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Ideas", href: "/ideas" },
  { label: "Careers", href: "/careers" },
];
