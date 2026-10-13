import Image from "next/image";
import { SERVICES } from "@/lib/v2/site";
import { resolvePic, type WorkData } from "@/lib/v2/work";

export function Pic({ pic, work, sizes }: { pic: string; work: WorkData; sizes: string }) {
  const ref = resolvePic(pic, work);
  if (!ref) return null;
  if (ref.kind === "poster") {
    return <Image src={ref.src} alt="" width={600} height={800} sizes={sizes} loading="lazy" />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={ref.thumb} alt="" loading="lazy" />;
}

export function Services({ work }: { work: WorkData }) {
  return (
    <section className="pad on-light" id="services" style={{ paddingTop: 0 }}>
      <span className="slate">Services</span>
      <h2 className="display h2 rv">What we make</h2>
      <div className="slist">
        {SERVICES.map((s, i) => (
          <div className="srow rv" key={s.name}>
            <span className="n mono">{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.name}</h3>
            <p>{s.text}</p>
            <div className="pic">
              <Pic pic={s.pic} work={work} sizes="160px" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
