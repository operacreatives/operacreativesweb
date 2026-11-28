import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildJsonLd } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";

// The live homepage (/) and portfolio (/portfolio) are hand-built HTML pages kept in site-v2/.
// Their <head> SEO is generated here from lib/site.ts, so titles, descriptions, Open Graph,
// Twitter cards and structured data always match the rest of the site.

export interface PageSeo {
  path: string; // "/" or "/portfolio"
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  imageAlt?: string;
  jsonLd: object;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function seoHead(seo: PageSeo): string {
  const url = seo.path === "/" ? SITE_URL : `${SITE_URL}${seo.path}`;
  const image = `${SITE_URL}/og-image.png`;
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDesc = seo.ogDescription ?? seo.description;
  const alt = seo.imageAlt ?? `${SITE_NAME}, AI native production studio`;
  const ld = JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c");
  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}">`,
    `<meta name="keywords" content="${esc(SITE_KEYWORDS.join(", "))}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `<meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `<meta name="author" content="${SITE_NAME}">`,
    `<meta name="application-name" content="${SITE_NAME}">`,
    `<meta name="theme-color" content="#f4f1ec">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:title" content="${esc(ogTitle)}">`,
    `<meta property="og:description" content="${esc(ogDesc)}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(alt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(ogTitle)}">`,
    `<meta name="twitter:description" content="${esc(ogDesc)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<link rel="icon" href="/favicon.ico" sizes="any">`,
    `<link rel="icon" type="image/png" sizes="32x32" href="/icon-32.png">`,
    `<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">`,
    `<link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png">`,
    `<link rel="manifest" href="/site.webmanifest">`,
    `<script type="application/ld+json">${ld}</script>`,
    // Vercel Web Analytics (same script the rest of the site loads through @vercel/analytics)
    `<script defer src="/_vercel/insights/script.js"></script>`,
  ].join("\n");
}

export function renderV2Page(file: "index.html" | "portfolio.html", seo: PageSeo): Response {
  const html = readFileSync(join(process.cwd(), "site-v2", file), "utf8");
  if (!html.includes("<!--SEO-->")) throw new Error(`site-v2/${file} is missing its <!--SEO--> placeholder`);
  return new Response(html.replace("<!--SEO-->", seoHead(seo)), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export const HOME_SEO: PageSeo = {
  path: "/",
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  jsonLd: buildJsonLd(),
};

export const PORTFOLIO_TITLE = `Portfolio | ${SITE_NAME}`;
export const PORTFOLIO_DESCRIPTION =
  "The full Opera Creatives portfolio: commercials, FIFA World Cup anime series, brand films, product films, Web3 concepts and posters.";

export function portfolioJsonLd() {
  const url = `${SITE_URL}/portfolio`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: PORTFOLIO_TITLE,
        description: PORTFOLIO_DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: url },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon-512.png`,
      },
    ],
  };
}

export const PORTFOLIO_SEO: PageSeo = {
  path: "/portfolio",
  title: PORTFOLIO_TITLE,
  description: PORTFOLIO_DESCRIPTION,
  ogDescription: "Commercials, anime series, brand films, product films and posters by Opera Creatives. Tap any frame to play.",
  jsonLd: portfolioJsonLd(),
};
