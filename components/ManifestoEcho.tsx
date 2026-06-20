import type { PageHeroContent } from "@/data/types";

interface ManifestoEchoProps extends PageHeroContent {
  className?: string;
}

export function ManifestoEcho({ eyebrow, title, manifesto, className = "" }: ManifestoEchoProps) {
  return (
    <div className={`manifesto-echo ${className}`}>
      <div className="manifesto-echo__block manifesto-echo__block--real">
        <p className="manifesto-echo__eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{manifesto}</p>
      </div>
      {["55", "25", "08"].map((opacity) => (
        <p
          key={opacity}
          className={`manifesto-echo__block manifesto-echo__copy manifesto-echo__copy--${opacity}`}
          aria-hidden="true"
        >
          {manifesto}
        </p>
      ))}
    </div>
  );
}
