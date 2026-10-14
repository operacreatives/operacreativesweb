import { ABOUT } from "@/lib/site";

export function About() {
  return (
    <section className="about pad on-dark" id="about">
      <h2 className="sr-only">About Opera Creatives</h2>
      <span className="slate">{ABOUT.label}</span>
      <p className="st rv">
        {ABOUT.before} <em>{ABOUT.accent}</em> {ABOUT.after}
      </p>
      <p className="sub rv">{ABOUT.sub}</p>
    </section>
  );
}
