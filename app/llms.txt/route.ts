import { CAL_URL, CONTACT_EMAIL, FAQS, PROCESS, SERVICES, SHOWREEL_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIALS, OWNED_PAGES, WORK_NOTES } from "@/lib/site";

// /llms.txt: a plain-text summary of the studio for AI assistants and answer engines.
// Generated from lib/site.ts, so it always matches what the website says.
export const dynamic = "force-static";

export function GET(): Response {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "From product shot to full blown film.",
    "",
    "## Services",
    ...SERVICES.map((s) => `- ${s.name}: ${s.text}`),
    "",
    "## Work",
    `- [Showreel](${SITE_URL}/#showreel): our showreel. Also on Vimeo: https://vimeo.com/${SHOWREEL_ID}`,
    `- [Selected work](${SITE_URL}/#work): ${WORK_NOTES.films}`,
    `- Static creatives: ${WORK_NOTES.statics}`,
    `- FIFA World Cup Anime Series: ${WORK_NOTES.fifa}`,
    `- Blockchain: ${WORK_NOTES.blockchain}`,
    "",
    "## How we work",
    ...PROCESS.map((p, i) => `${i + 1}. ${p.title} (${p.tag}): ${p.text}`),
    "",
    "## Frequently asked questions",
    ...FAQS.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Contact",
    `- Book a discovery call: ${CAL_URL}`,
    `- Email: ${CONTACT_EMAIL}`,
    ...SOCIALS.map((s) => `- ${s.label} (official): ${s.href}`),
    "",
    "## Pages owned and managed by Opera Creatives",
    ...OWNED_PAGES.map((p) => `- ${p.label} ${p.handle}: ${p.href}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
