import { About } from "@/components/v2/About";
import { CtaBand } from "@/components/v2/CtaBand";
import { Faq } from "@/components/v2/Faq";
import { Hero } from "@/components/v2/Hero";
import { Process } from "@/components/v2/Process";
import { Services } from "@/components/v2/Services";
import { Work } from "@/components/v2/Work";
import { PROCESS } from "@/lib/v2/site";
import { getWork, resolvePic } from "@/lib/v2/work";

export default async function HomePage() {
  const work = await getWork();
  const processPics = PROCESS.map((step) => resolvePic(step.pic, work));

  return (
    <>
      <Hero />
      <About />
      <Work />
      <Services work={work} />
      <Process pics={processPics} />
      <Faq />
      <CtaBand />
    </>
  );
}
