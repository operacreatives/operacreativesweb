import { WorkMarquee } from "@/components/WorkMarquee";
import { WorkGrid } from "@/components/WorkGrid";
import { CollaborateForm } from "@/components/CollaborateForm";

export default function HomePage() {
  return (
    <>
      <WorkMarquee />
      <WorkGrid />
      <CollaborateForm />
    </>
  );
}
