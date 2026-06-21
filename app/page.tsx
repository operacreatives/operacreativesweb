// import { Showreel } from "@/components/Showreel";
import { WorkMarquee } from "@/components/WorkMarquee";
import { WorkGrid } from "@/components/WorkGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { CollaborateForm } from "@/components/CollaborateForm";

export default function HomePage() {
  return (
    <>
      {/* <Showreel /> */}
      <WorkMarquee />
      <WorkGrid />
      <HowItWorks />
      <CollaborateForm />
    </>
  );
}
