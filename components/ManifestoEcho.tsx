interface ManifestoEchoProps {
  eyebrow: string;
  title: string;
  manifesto: string;
}

export function ManifestoEcho({ eyebrow, title, manifesto }: ManifestoEchoProps) {
  return (
    <section className="manifesto-echo" data-hero-region>
      <div className="manifesto-echo__stack">
        <div className="manifesto-echo__block">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{manifesto}</p>
        </div>
        <div className="manifesto-echo__block" aria-hidden="true">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{manifesto}</p>
        </div>
        <div className="manifesto-echo__block" aria-hidden="true">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{manifesto}</p>
        </div>
        <div className="manifesto-echo__block" aria-hidden="true">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{manifesto}</p>
        </div>
      </div>
    </section>
  );
}
