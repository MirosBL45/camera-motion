import Image from "next/image";

import { cn } from "cn";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { MediaPlaceholderVariantType } from "@/types/media.type";

interface IBlogCoverProps {
  /** `cover` iz frontmattera — putanja u `public/`. */
  cover?: string;
  placeholderLabel: string;
  placeholderVariant?: MediaPlaceholderVariantType;
  /** Mora odgovarati širini kolone u kojoj stoji (grid, istaknuta kartica, članak). */
  sizes: string;
  className?: string;
}

// Naslovna fotografija članka. Kontejner diktira veličinu, a odnos stranica slike nije
// poznat unapred — zato `fill` + `object-cover`. Dok `cover` ne postoji, ide placeholder.
export function BlogCover({
  cover,
  placeholderLabel,
  placeholderVariant = "warm",
  sizes,
  className,
}: IBlogCoverProps) {
  if (!cover) {
    // TODO: prava slika — upisati `cover` u frontmatter članka.
    return (
      <MediaPlaceholder
        label={placeholderLabel}
        variant={placeholderVariant}
        className={className}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Dekorativna: naslov članka stoji odmah uz sliku. */}
      <Image src={cover} alt="" fill sizes={sizes} className="object-cover" />
    </div>
  );
}
