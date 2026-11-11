import { getWork } from "@/lib/work";
import { WorkGallery } from "./WorkGallery";

export async function Work() {
  const work = await getWork();
  return <WorkGallery films={work.films} fifa={work.fifa} blockchain={work.blockchain} posters={work.posters} />;
}
