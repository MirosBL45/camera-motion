import Image from "next/image";

interface IMdxFigureProps {
  /** Putanja slike u `public/` (npr. `/blog/crkva-jutro.jpg`). */
  src: string;
  alt: string;
  caption: string;
  /** Stvarne dimenzije fajla u pikselima — daju tačan odnos stranica bez pomeranja teksta. */
  width: number;
  height: number;
}

// Slika sa potpisom u tekstu članka (poglavlje 13). Primer upotrebe je u README-u.
export function MdxFigure({ src, alt, caption, width, height }: IMdxFigureProps) {
  return (
    <figure className="not-prose my-8 md:my-10">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 680px"
        className="h-auto w-full rounded-xl border border-border"
      />
      <figcaption className="mt-2.5 text-[0.9375rem] leading-normal text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
