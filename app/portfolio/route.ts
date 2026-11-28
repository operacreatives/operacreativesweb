import { PORTFOLIO_SEO, renderV2Page } from "@/lib/v2page";

// The shareable portfolio (/portfolio, /portfolio?cat=anime ...). Page: site-v2/portfolio.html.
export const dynamic = "force-static";

export function GET(): Response {
  return renderV2Page("portfolio.html", PORTFOLIO_SEO);
}
