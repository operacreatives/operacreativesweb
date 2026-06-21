import { WorkMarquee } from "@/components/WorkMarquee";
import { WorkGrid } from "@/components/WorkGrid";
import { CollaborateForm } from "@/components/CollaborateForm";
import { FloatingCTA } from "@/components/FloatingCTA";

export default function HomePage() {
  return (
    <>
      <WorkMarquee />
      <WorkGrid />
      <CollaborateForm />
      <FloatingCTA />
    </>
  );
}
