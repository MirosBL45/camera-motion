import { useTranslations } from "next-intl";

import { Play } from "lucide-react";

export function HeroVideo() {
  const t = useTranslations("home.hero.videoPlaceholder");

  return (
    <div className="mt-7 md:mt-0 md:flex md:justify-end">
      {/* Okvir 9:16 — po dizajnu 400px široko uz kapu od 660px visine; na md+ širina je
          izvedena iz visine (660 × 9/16 = 371px) da odnos ostane tačan na svim širinama. */}
      <div className="mx-auto flex aspect-9/16 w-full max-w-80 items-center justify-center rounded-xl border-[1.5px] border-accent-gold bg-[repeating-linear-gradient(135deg,var(--surface-warm)_0_12px,var(--placeholder-stripe)_12px_24px)] md:mx-0 md:max-w-92.75 md:shadow-raised">
        {/*
          TODO(video): Zameniti placeholder pravim showreel snimkom.
          Izvoz iz Premiere Pro: uspravno 9:16, 8-12s, bez tona, H.264 MP4
          (~2-3 MB, 1080x1920, ~3-4 Mbps) + WebM varijanta.
          Umetnuti kao <video autoPlay muted loop playsInline poster={poster}>
          sa <source> webm pa mp4. NE YouTube embed u hero sekciji.
          Poster slika obavezna (prvi kadar) — bez bljeska pri učitavanju.
          Ceo blok ispod (krug sa ikonicom + opis kadra) se tada briše, zajedno sa
          `videoPlaceholder` ključevima u home namespace-u.
        */}
        <div className="flex flex-col items-center gap-3 md:gap-3.5">
          <div className="flex size-16 items-center justify-center rounded-full border border-accent-gold bg-surface/92 shadow-card md:size-18.5">
            <Play
              aria-hidden="true"
              className="size-6 translate-x-px fill-primary text-primary md:size-7"
            />
          </div>
          <p className="text-center font-mono text-[0.6875rem] leading-relaxed text-muted-foreground md:text-xs">
            {t("format")}
            <span className="hidden md:block">{t("shot")}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
