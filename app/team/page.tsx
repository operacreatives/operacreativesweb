import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { pageHeroes, team } from "@/data/content";

export const metadata: Metadata = {
  title: "Team",
  description: "The fictional multidisciplinary team behind the Opera Creatives demo.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero {...pageHeroes.team} />
      <section className="team-section" aria-labelledby="team-title">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">The company</p>
            <h2 id="team-title">A cast, not a hierarchy.</h2>
          </div>
          <p>Fictional profiles created for this portfolio demonstration.</p>
        </div>
        <div className="team-grid">
          {team.map((member, index) => (
            <article key={member.name} className={index % 5 === 0 ? "team-card team-card--wide" : "team-card"}>
              <div className="team-card__image">
                <Image src={member.image} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
