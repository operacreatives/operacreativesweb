"use client";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Creative Strategy & Alignment",
    description: "Tell us about your brand goals. We map out high-performing creative angles, visual hooks, and script directions tailored to your audience.",
  },
  {
    number: "02",
    title: "AI-Native Production",
    description: "We utilize next-generation AI image and video pipelines blended with human post-production to create cinematic assets and UGC-style content at lightspeed.",
  },
  {
    number: "03",
    title: "Rapid Feedback & Delivery",
    description: "Receive scroll-stopping videos, product visuals, and ad creatives in days, not weeks. Fully optimized for e-commerce performance.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works__inner">
        <h2 className="how-it-works__heading">
          HOW IT <span className="text-highlight">WORKS</span>
        </h2>
        
        <div className="how-it-works__grid">
          {steps.map((step, index) => (
            <div key={index} className="how-it-works__card">
              <div className="how-it-works__card-header">
                <span className="how-it-works__card-num">{step.number}</span>
                <div className="how-it-works__card-line" />
              </div>
              <h3 className="how-it-works__card-title">{step.title}</h3>
              <p className="how-it-works__card-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
