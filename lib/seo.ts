import { CAL_URL, CONTACT_EMAIL, FAQS, SERVICES, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, SOCIALS } from "@/lib/site";

// Structured data (schema.org) for search engines and AI assistants.
// Everything is generated from lib/site.ts so it can never drift from the page copy.
export function buildJsonLd() {
  const orgId = `${SITE_URL}/#organization`;
  const siteId = `${SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
        image: `${SITE_URL}/og-image.png`,
        email: CONTACT_EMAIL,
        sameAs: SOCIALS.map((s) => s.href),
        contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: CONTACT_EMAIL, url: CAL_URL }],
        knowsAbout: SERVICES.map((s) => s.name),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${SITE_NAME} services`,
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.text,
              provider: { "@id": orgId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": siteId,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        isPartOf: { "@id": siteId },
        about: { "@id": orgId },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

// Safe to place inside a <script> tag: "<" is escaped so content can never close the tag.
export function jsonLdString(): string {
  return JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");
}
