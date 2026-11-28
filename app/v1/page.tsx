import { About } from "@/components/About";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Showreel } from "@/components/Showreel";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { PROCESS } from "@/lib/site";
import type { Metadata } from "next";
import { getWork, resolvePic } from "@/lib/work";

// The previous homepage, kept as /v1 so it is never lost. The live homepage is app/route.ts (site-v2/).
export const metadata: Metadata = {
  title: "Previous homepage (v1)",
  robots: { index: false, follow: true },
  alternates: { canonical: "/v1" },
};

export default async function V1HomePage() {
  const work = await getWork();
  const processPics = PROCESS.map((step) => step.pics.map((ref) => resolvePic(ref, work)));

  return (
    <>
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
