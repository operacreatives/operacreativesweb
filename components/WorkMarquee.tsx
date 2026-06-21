"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useCinema } from "@/context/CinemaContext";

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
  videoUrl: string;
  mediaType?: "image" | "video";
}

const marqueeItems1: MarqueeItem[] = [
  { id: "1", type: "product", mediaType: "video", image: "/work/work-01.webp", title: "Unboxing the Future", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-with-rain-40036-large.mp4" },
  { id: "2", type: "product", mediaType: "image", image: "/work/work-02.webp", title: "Opera Creatives: Studio Session 01", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-a-vintage-cinema-camera-lens-41764-large.mp4" },
  { id: "3", type: "product", mediaType: "video", image: "/work/work-03.webp", title: "Visual language studies for Casa Forma.", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-filming-with-a-retro-camera-in-nature-41753-large.mp4" },
  { id: "4", type: "product", mediaType: "image", image: "/work/work-04.webp", title: "FORM CHAIR", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-misty-forest-at-sunset-41711-large.mp4" },
  { id: "5", type: "product", mediaType: "video", image: "/work/work-05.webp", title: "Day in the life of a designer", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-flight-over-mountain-peaks-at-sunset-41804-large.mp4" },
  { id: "6", type: "product", mediaType: "image", image: "/work/work-08.webp", title: "How to Build Memory in Digital Spaces", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-with-rain-40036-large.mp4" },
];

const marqueeItems2: MarqueeItem[] = [
  { id: "7", type: "product", mediaType: "image", image: "/work/work-06.webp", title: "Behind the lens for our latest campaign.", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-filming-with-a-retro-camera-in-nature-41753-large.mp4" },
  { id: "8", type: "product", mediaType: "video", image: "/work/work-09.webp", title: "LUME LIGHT", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-misty-forest-at-sunset-41711-large.mp4" },
  { id: "9", type: "product", mediaType: "image", image: "/work/work-12.webp", title: "Styling the new season drops", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-flight-over-mountain-peaks-at-sunset-41804-large.mp4" },
  { id: "10", type: "product", mediaType: "video", image: "/work/work-10.webp", title: "Why Less is More: The Design Manifesto", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-adjusting-a-vintage-cinema-camera-lens-41764-large.mp4" },
  { id: "11", type: "product", mediaType: "image", image: "/work/work-07.webp", title: "Details of physical models in progress.", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-neon-city-street-with-rain-40036-large.mp4" },
  { id: "12", type: "product", mediaType: "video", image: "/work/work-11.webp", title: "ECHO PODS", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cinematic-flight-over-mountain-peaks-at-sunset-41804-large.mp4" },
];

function WorkCard({ item }: { item: MarqueeItem }) {
  const { openVideo } = useCinema();

  const handleOpen = () => {
    openVideo(item.videoUrl, item.title, item.user || item.price || "Opera Creatives");
  };

  return (
    <div className="marquee-card marquee-card--product" onClick={handleOpen}>
      <div className="marquee-card__media">
        {item.mediaType === "video" ? (
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
  const { openVideo } = useCinema();

  return (
    <section className="marquee-section" data-hero-region>
      <div className="marquee-section__heading">
        <p className="section-kicker">AI Film Production Studio</p>
        <h2>Cinema-grade AI Film & Motion Campaigns.</h2>
        <p className="marquee-section__intro">
          We build cinematic AI commercials, film visuals, motion campaigns, and immersive brand experiences. AI-produced. Cinema-grade. Delivered at startup speed.
        </p>
      </div>

      <div className="marquee-wrapper">
        {/* Row 1 - Right to Left */}
        <div className="marquee-row marquee-row--left">
          <div className="marquee-track">
            {marqueeItems1.map((item, index) => (
              <Fragment key={`r1-${item.id}`}>
                <WorkCard item={item} />
              </Fragment>
            ))}
            {/* Duplicate for infinite loop */}
            {marqueeItems1.map((item, index) => (
              <Fragment key={`r1-dup-${item.id}`}>
                <WorkCard item={item} />
              </Fragment>
            ))}
          </div>
        </div>

        {/* Row 2 - Left to Right */}
        <div className="marquee-row marquee-row--right">
          <div className="marquee-track">
            {marqueeItems2.map((item, index) => (
              <Fragment key={`r2-${item.id}`}>
                <WorkCard item={item} />
              </Fragment>
            ))}
            {/* Duplicate for infinite loop */}
            {marqueeItems2.map((item, index) => (
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
