import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { pageHeroes } from "@/data/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for the Opera Creatives demonstration website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero {...pageHeroes.privacy} />
      <article className="policy-content">
        <p className="section-kicker">Last updated / June 21, 2026</p>
        <h2>This is a demonstration website.</h2>
        <p>
          The contact form validates entirely in your browser. It does not send, store, or share the information entered.
          Please do not submit sensitive or confidential information.
        </p>
        <h2>Cookies and local storage</h2>
        <p>
          The cookie preference control stores a single local setting in your browser. Analytics and advertising trackers are
          not installed.
        </p>
        <h2>Project imagery</h2>
        <p>
          Project images are locally stored demonstration placeholders sourced through Lorem Picsum. Client names and project
          descriptions are fictional.
        </p>
        <h2>Questions</h2>
        <p>Contact hello@opera-creatives.example for demonstration purposes only.</p>
      </article>
    </>
  );
}
