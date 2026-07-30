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
}

const marqueeItems1: MarqueeItem[] = [
  { id: "1", image: "/assets/images/ashkswjhb6bdrh0oosjy_1_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "2", image: "/assets/images/ausufpwcwwwdlxekgqf9_2_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "3", image: "/assets/images/cwgbzxnxcjpp4gzampnj_1_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "4", image: "/assets/images/cxocu2gdhvtfzackkeev_3_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "5", image: "/assets/images/cxyvno1sevgbn66timc3_4_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "6", image: "/assets/images/fbzme9nljpwj9smdxc3j_5_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "7", image: "/assets/images/g5fhbzdujtu2p7gse15b_2_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "8", image: "/assets/images/jggjprw8eis8xxp6t4nm_3_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "9", image: "/assets/images/kxtuxs3rw0owipywhd8x_4_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "10", image: "/assets/images/lqsqd68x3jqryoj11xha_6_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "11", image: "/assets/images/lylshvpv1lmeoeglyloz_5_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "12", image: "/assets/images/mma28e8rytowtgvc5wh0_6_11zon.webp", client: "OPERA", tag: "WORK" },
];

const marqueeItems2: MarqueeItem[] = [
  { id: "13", image: "/assets/images/mpeaw82hci1p77l5n6no_7_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "14", image: "/assets/images/oa0njakxpd8nneyinpvq_8_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "15", image: "/assets/images/oiwoucseok4wmhj45bpv_9_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "16", image: "/assets/images/qulvn2ldqkfceqklunu3_10_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "17", image: "/assets/images/rhmiibdhu9bnwtn0d6au_11_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "18", image: "/assets/images/riusghm36dr5lb0ivnaw_12_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "19", image: "/assets/images/w6zjb8o4xhj1dbvzrsm8_7_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "20", image: "/assets/images/wfmpe9gonaklcy6en40q_8_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "21", image: "/assets/images/wjvbdb6ih6iotjzlqln9_9_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "22", image: "/assets/images/y1rld47q3s5ipe9qjpav_10_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "23", image: "/assets/images/yu6jm2do2bveqskobr5e_13_11zon.webp", client: "OPERA", tag: "WORK" },
  { id: "24", image: "/assets/images/ywlw2f2hz0xmlrjzweiz_11_11zon.webp", client: "OPERA", tag: "WORK" },
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
      className="marquee-card marquee-card--portrait"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="marquee-card__media">
        <Image
          src={item.image}
          alt={item.client}
          width={600}
          height={800}
          sizes="(max-width: 768px) 180px, 220px"
          loading="lazy"
          quality={80}
        />
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
        <div className="marquee-section__brand">
          <LogoMark className="marquee-section__brand-logo" priority />
          <span className="marquee-section__brand-name">Opera Creatives</span>
        </div>
        <h2>The production house for the next decade of brands.</h2>
        <p className="marquee-section__intro">
          An AI-native creative studio built for the speed that e-commerce demands. We blend AI pipelines with sharp creative direction to produce UGC-style videos, animated visuals, product visuals, and scroll-stopping ad content.
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
