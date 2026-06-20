import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { pageHeroes } from "@/data/content";

export const metadata: Metadata = {
  title: "About",
  description: "Meet the thinking and working principles behind Opera Creatives.",
};

const capabilities = [
  ["Brand", "Strategy, positioning, naming, identity systems, and guidelines built to be used."],
  ["Campaign", "Platform ideas, launch systems, social thinking, and work that travels between formats."],
  ["Experience", "Digital direction, editorial design, environments, and the details people actually touch."],
  ["Production", "Film, photography, motion, sound, and the practical intelligence that gets ideas made well."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero {...pageHeroes.about} />
      <section className="editorial-intro">
        <p className="section-kicker">Our premise</p>
        <h2>One idea should be able to conduct the whole orchestra.</h2>
        <div className="editorial-intro__body">
          <p>
            Opera Creatives is a fictional independent agency demonstration with a real point of view: strategy and craft
            should not arrive in separate rooms. We build the thought and its expression together.
          </p>
          <p>
            Our teams stay intentionally mixed and close to the work. That makes decisions faster, references richer, and
            every handoff less like a loss in translation.
          </p>
        </div>
      </section>
      <section className="capabilities" aria-labelledby="capabilities-title">
        <div className="capabilities__heading">
          <p className="section-kicker">Capabilities</p>
          <h2 id="capabilities-title">From first question to final frame.</h2>
        </div>
        <div className="capabilities__list">
          {capabilities.map(([title, copy], index) => (
            <article key={title}>
              <span aria-hidden="true">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="quote-band">
        <blockquote>“Make it precise enough to be unmistakable, and open enough to become part of culture.”</blockquote>
        <p>Studio principle No. 01</p>
      </section>
    </>
  );
}
