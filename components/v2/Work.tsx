import { getWork } from "@/lib/v2/work";
import { WorkGallery } from "./WorkGallery";

export async function Work() {
  const work = await getWork();
  return <WorkGallery films={work.films} fifa={work.fifa} posters={work.posters} />;
}
