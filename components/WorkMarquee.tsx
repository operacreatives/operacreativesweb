"use client";

import Image from "next/image";
import { Fragment } from "react";

interface MarqueeItem {
  id: string;
  image: string;
  title: string;
  videoUrl?: string;
  mediaType?: "image" | "video";
}

const marqueeItems1: MarqueeItem[] = [
  { id: "1", mediaType: "video", image: "/work/work-01.webp", title: "Unboxing the Future", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-with-rain-40036-large.mp4" },
  { id: "2", mediaType: "image", image: "/work/work-02.webp", title: "Opera Creatives: Studio Session 01" },
  { id: "3", mediaType: "video", image: "/work/work-03.webp", title: "Visual language studies for Casa Forma.", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-filming-with-a-retro-camera-in-nature-41753-large.mp4" },
  { id: "4", mediaType: "image", image: "/work/work-04.webp", title: "FORM CHAIR" },
  { id: "5", mediaType: "video", image: "/work/work-05.webp", title: "Day in the life of a designer", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-flight-over-mountain-peaks-at-sunset-41804-large.mp4" },
  { id: "6", mediaType: "image", image: "/work/work-08.webp", title: "How to Build Memory in Digital Spaces" },
];

const marqueeItems2: MarqueeItem[] = [
  { id: "7", mediaType: "image", image: "/work/work-06.webp", title: "Behind the lens for our latest campaign." },
  { id: "8", mediaType: "video", image: "/work/work-09.webp", title: "LUME LIGHT", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-misty-forest-at-sunset-41711-large.mp4" },
  { id: "9", mediaType: "image", image: "/work/work-12.webp", title: "Styling the new season drops" },
  { id: "10", mediaType: "video", image: "/work/work-10.webp", title: "Why Less is More: The Design Manifesto", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-a-vintage-cinema-camera-lens-41764-large.mp4" },
  { id: "11", mediaType: "image", image: "/work/work-07.webp", title: "Details of physical models in progress." },
  { id: "12", mediaType: "video", image: "/work/work-11.webp", title: "ECHO PODS", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-flight-over-mountain-peaks-at-sunset-41804-large.mp4" },
];

function WorkCard({ item }: { item: MarqueeItem }) {
  return (
    <div className="marquee-card marquee-card--product">
      <div className="marquee-card__media">
        {item.mediaType === "video" && item.videoUrl ? (
          <video 
            src={item.videoUrl} 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}
          />
        ) : (
          <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 240px, 320px" />
        )}
      </div>
    </div>
  );
}

export function WorkMarquee() {
  return (
    <section className="marquee-section">
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
                <WorkCard item={item} />
              </Fragment>
            ))}
            {marqueeItems1.map((item) => (
              <Fragment key={`r1-dup-${item.id}`}>
                <WorkCard item={item} />
              </Fragment>
            ))}
          </div>
        </div>

        {/* Row 2 - Left to Right */}
        <div className="marquee-row marquee-row--right">
          <div className="marquee-track">
            {marqueeItems2.map((item) => (
              <Fragment key={`r2-${item.id}`}>
                <WorkCard item={item} />
              </Fragment>
            ))}
            {marqueeItems2.map((item) => (
              <Fragment key={`r2-dup-${item.id}`}>
                <WorkCard item={item} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
