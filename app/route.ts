import { HOME_SEO, renderV2Page } from "@/lib/v2page";

// The live homepage. The page itself is site-v2/index.html; its SEO head is generated in lib/v2page.ts.
// The previous homepage is kept at /v1 (app/v1/page.tsx).
export const dynamic = "force-static";

export function GET(): Response {
  return renderV2Page("index.html", HOME_SEO);
}
