import { About } from "@/components/About";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Showreel } from "@/components/Showreel";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { jsonLdString } from "@/lib/seo";
import { PROCESS } from "@/lib/site";
import { getWork, resolvePic } from "@/lib/work";

export default async function HomePage() {
  const work = await getWork();
  const processPics = PROCESS.map((step) => step.pics.map((ref) => resolvePic(ref, work)));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString() }} />
      <Hero />
      <Showreel />
      <About />
      <Work />
      <Services work={work} />
      <Process pics={processPics} />
      <Faq />
      <CtaBand />
    </>
  );
}
