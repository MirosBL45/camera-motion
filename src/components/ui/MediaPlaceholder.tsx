import { cn } from "cn";

import type { MediaPlaceholderVariantType } from "@/types/media.type";

// Dijagonalne pruge + monospace opis željenog kadra — obrazac iz dizajn reference (NOTES 5).
// Monospace nije font sajta; koristi se isključivo unutar placeholdera.
const VARIANT_CLASSES: Record<MediaPlaceholderVariantType, string> = {
  warm: "bg-[repeating-linear-gradient(135deg,var(--surface-warm)_0_12px,var(--placeholder-stripe)_12px_24px)]",
  gold: "bg-[repeating-linear-gradient(135deg,var(--placeholder-base-gold)_0_12px,var(--accent-gold-soft)_12px_24px)]",
  light:
    "bg-[repeating-linear-gradient(135deg,var(--surface)_0_12px,var(--placeholder-stripe-light)_12px_24px)]",
};

interface IMediaPlaceholderProps {
  /** Opis željenog kadra iz i18n poruka — briše se kad stigne prava slika. */
  label: string;
  variant?: MediaPlaceholderVariantType;
  className?: string;
}

export function MediaPlaceholder({ label, variant = "warm", className }: IMediaPlaceholderProps) {
  return (
    // TODO: prava slika — do tada placeholder sa opisom kadra iz `label`.
    // Opis kadra je napomena za snimanje, ne sadržaj stranice, pa se ne čita čitačima ekrana
    // (inače bi ulazio u ime linka na kartici usluge); prava slika kasnije dobija `alt`.
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center px-4 text-center font-mono text-[0.6875rem] leading-relaxed text-muted-foreground md:text-xs",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {label}
    </div>
  );
}
