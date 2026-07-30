// import { Showreel } from "@/components/Showreel";
import { WorkMarquee } from "@/components/WorkMarquee";
import { VimeoGrid } from "@/components/VimeoGrid";
import { FifaWorldCup } from "@/components/FifaWorldCup";
import { WorkShowcase } from "@/components/WorkShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { CollaborateForm } from "@/components/CollaborateForm";



export default function HomePage() {
  return (
    <>
      {/* <Showreel /> */}
      <WorkMarquee />
      <WorkShowcase selectedWork={<VimeoGrid />} fifaWork={<FifaWorldCup />} />
      <HowItWorks />
      <CollaborateForm />
    </>
  );
}
