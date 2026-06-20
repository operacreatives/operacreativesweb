import type { PageHeroContent } from "@/data/types";
import { ManifestoEcho } from "./ManifestoEcho";

export function PageHero(props: PageHeroContent) {
  return (
    <section className="page-hero" data-hero-region>
      <ManifestoEcho {...props} />
    </section>
  );
}
