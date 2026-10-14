import { SHOWREEL, SHOWREEL_ID } from "@/lib/site";
import { fetchVimeoAspect, upscaleVimeoThumbnail } from "@/lib/vimeo";
import { ShowreelPlayer } from "./ShowreelPlayer";

// The showreel, right under the hero: one big frame, tap to play.
export async function Showreel() {
  const v = await fetchVimeoAspect(SHOWREEL_ID, 86400);
  const poster = upscaleVimeoThumbnail(v.thumbnailUrl, 1920);

  return (
    <section className="reel pad on-light" id="showreel">
      <div className="reel__head">
        <div>
          <span className="slate">{SHOWREEL.label}</span>
          <h2 className="display h2 rv">{SHOWREEL.title}</h2>
        </div>
        <p className="reel__note">{SHOWREEL.text}</p>
      </div>
      <div className="reel__frame rv">
        <ShowreelPlayer id={SHOWREEL_ID} poster={poster} />
      </div>
    </section>
  );
}
