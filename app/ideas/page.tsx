import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { articles, pageHeroes } from "@/data/content";

export const metadata: Metadata = {
  title: "Ideas",
  description: "Notes from Opera Creatives on culture, identity, craft, and attention.",
};

export default function IdeasPage() {
  return (
    <>
      <PageHero {...pageHeroes.ideas} />
      <section className="ideas-section" aria-labelledby="ideas-title">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Studio notes</p>
            <h2 id="ideas-title">Recent provocations.</h2>
          </div>
          <p>Original demonstration copy. No newsletter gate, no thought-leadership fog.</p>
        </div>
        <div className="ideas-grid">
          {articles.map((article, index) => (
            <article key={article.slug} className={index === 0 ? "idea-card idea-card--lead" : "idea-card"}>
              <div className="idea-card__image">
                <Image src={article.image} alt="" fill sizes={index === 0 ? "66vw" : "33vw"} />
              </div>
              <div className="idea-card__meta">
                <span>{article.category}</span>
                <time>{article.date}</time>
              </div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
