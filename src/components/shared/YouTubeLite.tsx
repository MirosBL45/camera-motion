"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "cn";
import { Play } from "lucide-react";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

interface IYouTubeLiteProps {
  /** YouTube ID; dok je prazan (placeholder u `services.ts`), prikazuje se opis kadra. */
  videoId: string;
  title: string;
  placeholderLabel: string;
  className?: string;
}

// Facade embed: do klika stoji samo thumbnail, `iframe` se ubacuje tek kad korisnik pokrene video.
// Time YouTube ne postavlja kolačiće niti učitava svoj player pri otvaranju stranice.
export function YouTubeLite({ videoId, title, placeholderLabel, className }: IYouTubeLiteProps) {
  const t = useTranslations("common.video");
  const [isPlaying, setIsPlaying] = useState(false);

  const frameClasses = cn(
    "relative aspect-video w-full overflow-hidden rounded-xl border border-border",
    className
  );

  if (isPlaying) {
    return (
      <div className={frameClasses}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
    );
  }

  // TODO: pravi YouTube ID — dok ga nema, stoji opis željenog snimka umesto thumbnail-a.
  if (!videoId) {
    return (
      <div className={frameClasses}>
        <MediaPlaceholder label={placeholderLabel} className="size-full" />
        <PlayBadge />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsPlaying(true)}
      aria-label={t("play", { title })}
      className={cn(
        frameClasses,
        "group cursor-pointer transition-[box-shadow,border-color] duration-200 hover:border-accent-gold hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      )}
    >
      {/* Thumbnail je 4:3, a okvir 16:9 — zato `fill` + `object-cover` umesto fiksnih dimenzija. */}
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <PlayBadge />
    </button>
  );
}

function PlayBadge() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
      data-slot="play-badge"
    >
      <span className="flex size-14 items-center justify-center rounded-full border border-accent-gold bg-surface/95 shadow-card transition-colors duration-200 group-hover:bg-surface">
        <Play className="ml-0.5 size-5 fill-accent-gold text-accent-gold" />
      </span>
    </span>
  );
}
