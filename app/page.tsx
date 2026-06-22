// import { Showreel } from "@/components/Showreel";
import { WorkMarquee } from "@/components/WorkMarquee";
import { VimeoGrid } from "@/components/VimeoGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { CollaborateForm } from "@/components/CollaborateForm";

export default function HomePage() {
  return (
    <>
      {/* <Showreel /> */}
      <WorkMarquee />
      <VimeoGrid />
      <HowItWorks />
      <CollaborateForm />
    </>
  );
}
