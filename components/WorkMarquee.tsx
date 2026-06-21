"use client";

import Image from "next/image";

interface MarqueeItem {
  id: string;
  type: "ugc" | "youtube" | "instagram" | "product";
  image: string;
  title: string;
  subtitle?: string;
  user?: string;
  views?: string;
  likes?: string;
  price?: string;
}

const marqueeItems1: MarqueeItem[] = [
  { id: "1", type: "ugc", image: "/work/work-01.webp", title: "Unboxing the Future", user: "@sanchit_dev", likes: "42.8K" },
  { id: "2", type: "youtube", image: "/work/work-02.webp", title: "Opera Creatives: Studio Session 01", views: "148K views", subtitle: "12:45" },
  { id: "3", type: "instagram", image: "/work/work-03.webp", title: "Visual language studies for Casa Forma.", user: "operacreatives", likes: "1.2K" },
  { id: "4", type: "product", image: "/work/work-04.webp", title: "FORM CHAIR", subtitle: "Minimalist Seating System", price: "$299" },
  { id: "5", type: "ugc", image: "/work/work-05.webp", title: "Day in the life of a designer", user: "@anya_design", likes: "12.3K" },
  { id: "6", type: "youtube", image: "/work/work-08.webp", title: "How to Build Memory in Digital Spaces", views: "89K views", subtitle: "08:19" },
];

const marqueeItems2: MarqueeItem[] = [
  { id: "7", type: "instagram", image: "/work/work-06.webp", title: "Behind the lens for our latest campaign.", user: "operacreatives", likes: "890" },
  { id: "8", type: "product", image: "/work/work-09.webp", title: "LUME LIGHT", subtitle: "Ambient Workspace Illumination", price: "$149" },
  { id: "9", type: "ugc", image: "/work/work-12.webp", title: "Styling the new season drops", user: "@noah_style", likes: "55.4K" },
  { id: "10", type: "youtube", image: "/work/work-10.webp", title: "Why Less is More: The Design Manifesto", views: "210K views", subtitle: "15:32" },
  { id: "11", type: "instagram", image: "/work/work-07.webp", title: "Details of physical models in progress.", user: "operacreatives", likes: "2.3K" },
  { id: "12", type: "product", image: "/work/work-11.webp", title: "ECHO PODS", subtitle: "Noise Cancelling Audio", price: "$199" },
];

function WorkCard({ item }: { item: MarqueeItem }) {
  switch (item.type) {
    case "ugc":
      return (
        <div className="marquee-card marquee-card--ugc">
          <div className="marquee-card__media">
            <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 180px, 240px" />
            <div className="marquee-card__ugc-ui">
              <span className="marquee-card__badge">UGC</span>
              <div className="marquee-card__ugc-bottom">
                <p className="marquee-card__user">{item.user}</p>
                <p className="marquee-card__caption">{item.title}</p>
              </div>
              <div className="marquee-card__ugc-actions">
                <div className="marquee-card__action-btn">❤️ <span>{item.likes}</span></div>
                <div className="marquee-card__action-btn">💬 <span>142</span></div>
              </div>
              <div className="marquee-card__play-btn-overlay">
                <div className="marquee-card__play-icon" />
              </div>
            </div>
          </div>
        </div>
      );

    case "youtube":
      return (
        <div className="marquee-card marquee-card--youtube">
          <div className="marquee-card__media">
            <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 300px, 420px" />
            <span className="marquee-card__duration">{item.subtitle}</span>
            <div className="marquee-card__youtube-play">
              <div className="marquee-card__youtube-play-icon" />
            </div>
          </div>
          <div className="marquee-card__content">
            <h4 className="marquee-card__title">{item.title}</h4>
            <p className="marquee-card__meta">{item.views}</p>
          </div>
        </div>
      );

    case "instagram":
      return (
        <div className="marquee-card marquee-card--instagram">
          <div className="marquee-card__insta-header">
            <div className="marquee-card__avatar" />
            <span className="marquee-card__username">{item.user}</span>
          </div>
          <div className="marquee-card__media">
            <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 200px, 280px" />
          </div>
          <div className="marquee-card__content">
            <div className="marquee-card__insta-actions">
              <span>❤️</span> <span>💬</span> <span>✈️</span>
            </div>
            <p className="marquee-card__likes-count">{item.likes} likes</p>
            <p className="marquee-card__caption">
              <strong>{item.user}</strong> {item.title}
            </p>
          </div>
        </div>
      );

    case "product":
      return (
        <div className="marquee-card marquee-card--product">
          <div className="marquee-card__media">
            <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 220px, 300px" />
          </div>
          <div className="marquee-card__content">
            <span className="marquee-card__product-kicker">New Release</span>
            <h4 className="marquee-card__title">{item.title}</h4>
            <p className="marquee-card__desc">{item.subtitle}</p>
            <div className="marquee-card__product-footer">
              <span className="marquee-card__price">{item.price}</span>
              <span className="marquee-card__buy">View Project ↗</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function WorkMarquee() {
  return (
    <section className="marquee-section" data-hero-region>
      <div className="marquee-section__heading">
        <p className="section-kicker">Creative Archive</p>
        <h2>Work in motion.</h2>
        <p className="marquee-section__intro">
          We craft content that travels. An ongoing reel of UGC stories, social-first visual concepts, YouTube projects, and minimalist physical product launches.
        </p>
      </div>

      <div className="marquee-wrapper">
        {/* Row 1 - Right to Left */}
        <div className="marquee-row marquee-row--left">
          <div className="marquee-track">
            {marqueeItems1.map((item) => (
              <WorkCard key={`r1-${item.id}`} item={item} />
            ))}
            {/* Duplicate for infinite loop */}
            {marqueeItems1.map((item) => (
              <WorkCard key={`r1-dup-${item.id}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2 - Left to Right */}
        <div className="marquee-row marquee-row--right">
          <div className="marquee-track">
            {marqueeItems2.map((item) => (
              <WorkCard key={`r2-${item.id}`} item={item} />
            ))}
            {/* Duplicate for infinite loop */}
            {marqueeItems2.map((item) => (
              <WorkCard key={`r2-dup-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
