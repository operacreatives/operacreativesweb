import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { pageHeroes, roles } from "@/data/content";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore fictional open roles at Opera Creatives.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero {...pageHeroes.careers} />
      <section className="careers-intro">
        <p className="section-kicker">Working here</p>
        <h2>Serious about the work. Curious about almost everything else.</h2>
        <div>
          <p>
            We value strong opinions that improve under pressure, craft that survives close inspection, and collaborators
            who make the room more generous.
          </p>
          <p>
            These roles are fictional and included to demonstrate the careers experience. No application data is collected.
          </p>
        </div>
      </section>
      <section className="roles-section" aria-labelledby="roles-title">
        <div className="roles-section__heading">
          <p className="section-kicker">Open roles</p>
          <h2 id="roles-title">Find your part.</h2>
        </div>
        <div className="role-list">
          {roles.map((role) => (
            <article key={role.title}>
              <div>
                <span>{role.discipline}</span>
                <h3>{role.title}</h3>
              </div>
              <p>{role.location}</p>
              <p>{role.type}</p>
              <Link href={`/contact?role=${encodeURIComponent(role.title)}#project-form`} aria-label={`Ask about ${role.title}`}>
                ↗
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
