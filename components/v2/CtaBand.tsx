import Image from "next/image";
import { CTA } from "@/lib/v2/site";
import { BookButton } from "./BookButton";

export function CtaBand() {
  return (
    <section className="ctaw on-red">
      <Image className="mascot" src="/mascots/peekaboo_mascot.webp" alt="" width={352} height={352} aria-hidden="true" />
      <div className="cta">
        <h2 className="display">
          {CTA.lines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <div>
          <p>{CTA.text}</p>
          <BookButton source="cta" large />
          <span className="mono">{CTA.note}</span>
        </div>
      </div>
    </section>
  );
}
