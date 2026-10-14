import { SERVICES } from "@/lib/v2/site";
import { resolvePic, type WorkData } from "@/lib/v2/work";
import { ServicesList } from "./ServicesList";

export function Services({ work }: { work: WorkData }) {
  const rows = SERVICES.map((s) => ({ name: s.name, text: s.text, pic: resolvePic(s.pic, work) }));

  return (
    <section className="pad on-light" id="services" style={{ paddingTop: 0 }}>
      <span className="slate">Services</span>
      <h2 className="display h2 rv">What we make</h2>
      <ServicesList rows={rows} />
    </section>
  );
}
