import { SHOWREEL, SHOWREEL_ID } from "@/lib/site";
import { ShowreelPlayer } from "./ShowreelPlayer";

// The showreel, right under the hero: it plays by itself once you scroll to it.
export function Showreel() {
  return (
    <section className="reel pad on-light" id="showreel">
      <div className="reel__head">
        <span className="slate">{SHOWREEL.label}</span>
        <h2 className="display h2 rv">{SHOWREEL.title}</h2>
      </div>
      <div className="reel__frame rv">
        <ShowreelPlayer id={SHOWREEL_ID} />
      </div>
    </section>
  );
}
