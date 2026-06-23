"use client";

import Image from "next/image";
import { LogoMark } from "./LogoMark";
import { Fragment, useState } from "react";
import { CustomCursor } from "./CustomCursor";

interface MarqueeItem {
  id: string;
  image: string;
  client: string;
  tag: string;
  aspect: "landscape" | "portrait" | "square";
  videoUrl?: string;
  mediaType?: "image" | "video";
}

const marqueeItems1: MarqueeItem[] = [
  { id: "1", mediaType: "video", image: "/work/work-01.webp", client: "AURA ELECTRONICS", tag: "AI CAMPAIGN", aspect: "landscape", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-with-rain-40036-large.mp4" },
  { id: "2", mediaType: "image", image: "/work/work-02.webp", client: "PALOMA SKIN", tag: "STUDIO SHOT", aspect: "square" },
  { id: "3", mediaType: "video", image: "/work/work-03.webp", client: "CASA FORMA", tag: "UGC VIDEO", aspect: "portrait", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-filming-with-a-retro-camera-in-nature-41753-large.mp4" },
  { id: "4", mediaType: "image", image: "/work/work-04.webp", client: "KINDRED COFFEE", tag: "STILL LIFE", aspect: "square" },
  { id: "5", mediaType: "video", image: "/work/work-05.webp", client: "MONO OBJECTS", tag: "AI FILM", aspect: "landscape", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-flight-over-mountain-peaks-at-sunset-41804-large.mp4" },
  { id: "6", mediaType: "image", image: "/work/work-08.webp", client: "INDEX MAG", tag: "EDITORIAL", aspect: "portrait" },
];

const marqueeItems2: MarqueeItem[] = [
  { id: "7", mediaType: "image", image: "/work/work-06.webp", client: "VELA RUNNING", tag: "STILL LIFE", aspect: "square" },
  { id: "8", mediaType: "video", image: "/work/work-09.webp", client: "LUME LIGHT", tag: "AI COMMERCIAL", aspect: "landscape", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-misty-forest-at-sunset-41711-large.mp4" },
  { id: "9", mediaType: "image", image: "/work/work-12.webp", client: "ALT CINEMA", tag: "PRODUCTION", aspect: "portrait" },
  { id: "10", mediaType: "video", image: "/work/work-10.webp", client: "SECOND SUN", tag: "UGC BRANDING", aspect: "portrait", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-a-vintage-cinema-camera-lens-41764-large.mp4" },
  { id: "11", mediaType: "image", image: "/work/work-07.webp", client: "HARVEST FOODS", tag: "STILL LIFE", aspect: "square" },
  { id: "12", mediaType: "video", image: "/work/work-11.webp", client: "ECHO PODS", tag: "AI RENDER", aspect: "landscape", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-flight-over-mountain-peaks-at-sunset-41804-large.mp4" },
];

function WorkCard({
  item,
  onMouseEnter,
  onMouseLeave,
}: {
  item: MarqueeItem;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className={`marquee-card marquee-card--${item.aspect}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="marquee-card__media">
        <Image src={item.image} alt={item.client} fill sizes="(max-width: 768px) 240px, 320px" loading="lazy" />
      </div>
      <div className="marquee-card__overlay">
        <span className="marquee-card__client">{item.client}</span>
        <span className="marquee-card__badge">{item.tag}</span>
      </div>
    </div>
  );
}

export function WorkMarquee() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="marquee-section" data-hero-region>
      <CustomCursor isHovering={isHovering} />

      <div className="marquee-section__heading">
        <h2>The production house for the next decade of brands.</h2>
        <p className="marquee-section__intro">
          An AI-native creative studio built for the speed that e-commerce demands. We blend AI pipelines with sharp creative direction to produce UGC-style videos, product visuals, and scroll-stopping ad content without the agency overhead.
        </p>
      </div>

      <div className="marquee-wrapper">
        {/* Row 1 - Right to Left */}
        <div className="marquee-row marquee-row--left">
          <div className="marquee-track">
            {marqueeItems1.map((item) => (
              <Fragment key={`r1-${item.id}`}>
                <WorkCard
                  item={item}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </Fragment>
            ))}
            {marqueeItems1.map((item) => (
              <Fragment key={`r1-dup-${item.id}`}>
                <WorkCard
                  item={item}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </Fragment>
            ))}
          </div>
        </div>

        {/* Row 2 - Left to Right */}
        <div className="marquee-row marquee-row--right">
          <div className="marquee-track">
            {marqueeItems2.map((item) => (
              <Fragment key={`r2-${item.id}`}>
                <WorkCard
                  item={item}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </Fragment>
            ))}
            {marqueeItems2.map((item) => (
              <Fragment key={`r2-dup-${item.id}`}>
                <WorkCard
                  item={item}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
