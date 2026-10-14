import type { Metadata } from "next";
import Image from "next/image";
import { BookButton } from "@/components/BookButton";
import { LinkList } from "@/components/LinkList";
import { LinksViewTracker } from "@/components/LinksViewTracker";
import { buildVimeoEmbedUrl } from "@/lib/vimeo";
import { HERO, SHOWREEL_ID, SITE_NAME, SITE_URL } from "@/lib/site";

// Showreel embed: the normal player, but it waits for a tap instead of autoplaying.
const showreel = new URL(buildVimeoEmbedUrl(SHOWREEL_ID, "player"));
showreel.searchParams.set("autoplay", "0");

export const metadata: Metadata = {
  title: "Links",
  description: "Book a discovery call with Opera Creatives, watch our work and find us online. Everything in one place.",
  alternates: { canonical: `${SITE_URL}/links` },
};

export default function LinksPage() {
  return (
    <div className="lk">
      <LinksViewTracker />
      <header className="lk-head">
        <Image src="/logo-oc-mark.webp" alt="" width={360} height={261} priority />
        <h1>{SITE_NAME}</h1>
        <p className="mono">AI native production studio</p>
      </header>

      <div className="lk-reel">
        <iframe
          src={showreel.toString()}
          title="Opera Creatives showreel"
          loading="lazy"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="lk-book">
        <BookButton source="links" large>
          Book a discovery call
        </BookButton>
      </div>

      <LinkList />

      <p className="lk-tag">{HERO.lead} {HERO.accent}</p>

      <div className="lk-peek" aria-hidden="true">
        <Image src="/mascots/peekaboo_mascot.webp" alt="" width={288} height={288} />
      </div>
    </div>
  );
}
