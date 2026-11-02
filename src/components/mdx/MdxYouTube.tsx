import { YouTubeLite } from "@/components/shared/YouTubeLite";

import { FPV_HOUSE_VIDEO_ID } from "@/data/services";

// Snimci koji se pojavljuju i na stranicama usluga — ID se upisuje samo u `services.ts`.
const SHARED_VIDEOS = {
  fpvHouse: FPV_HOUSE_VIDEO_ID,
} as const;

interface IMdxYouTubeProps {
  /** Naslov snimka — za dugme „Pusti video" i čitače ekrana. */
  title: string;
  /** Ključ zajedničkog snimka iz `SHARED_VIDEOS`. */
  video?: string;
  /** YouTube ID (deo posle `watch?v=`) za snimak koji je samo u članku. */
  id?: string;
}

// U MDX-u: `<YouTube video="fpvHouse" title="…" />` ili `<YouTube id="ZvHHT27JMvc" title="…" />`.
// Facade embed — YouTube se ne učitava dok posetilac ne klikne.
export function MdxYouTube({ title, video, id }: IMdxYouTubeProps) {
  const videoId =
    video && Object.hasOwn(SHARED_VIDEOS, video)
      ? SHARED_VIDEOS[video as keyof typeof SHARED_VIDEOS]
      : id;

  if (!videoId) {
    throw new Error(`[blog] <YouTube> traži poznat \`video\` ključ ili \`id\` (${title})`);
  }

  return (
    <div className="not-prose my-8 md:my-10">
      <YouTubeLite videoId={videoId} title={title} placeholderLabel={title} />
    </div>
  );
}
