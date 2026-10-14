import Image from "next/image";
import { posters } from "@/data/posters";
import { HERO } from "@/lib/site";
import { BookButton } from "./BookButton";

// Three slowly scrolling columns of our static creatives sit behind the headline.
function Column({ index }: { index: number }) {
  const mine = posters.filter((_, i) => i % 3 === index);
  return (
    <div className="wcol">
      {[...mine, ...mine].map((file, i) => (
        <Image
          key={`${file}-${i}`}
          src={`/assets/images/${file}`}
          alt=""
          width={600}
          height={800}
          sizes="(max-width: 900px) 80vw, 26vw"
          aria-hidden="true"
          priority={i < 2}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="wall">
          {[0, 1, 2].map((i) => (
            <Column key={i} index={i} />
          ))}
        </div>
      </div>
      <div className="hero__main">
        <h1>
          {HERO.lead} <span>{HERO.accent}</span>
        </h1>
        <p>{HERO.blurb}</p>
        <div className="hero__cta">
          <BookButton source="hero" />
          <a className="btn btn--ghost" href="#work">
            See our work
          </a>
        </div>
      </div>
    </section>
  );
}
