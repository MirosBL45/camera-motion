import { cn } from "cn";
import type { LucideIcon } from "lucide-react";

export type ServiceFeatureType = {
  id: string;
  Icon: LucideIcon;
  title: string;
  description: string;
};

type ServiceFeaturesToneType = "surface" | "warm" | "background";

// Pozadina sekcije i kartica — kartica je uvek u kontrastu sa sekcijom.
const TONE_CLASSES: Record<ServiceFeaturesToneType, { section: string; card: string }> = {
  surface: { section: "border-y border-border bg-surface", card: "bg-background" },
  warm: { section: "bg-surface-warm", card: "bg-surface" },
  background: { section: "bg-background", card: "bg-surface" },
};

interface IServiceFeaturesProps {
  heading: string;
  intro?: string;
  items: ServiceFeatureType[];
  /**
   * `warm` je za drugu pojavu obrasca na istoj stranici (npr. „Dodatne opcije");
   * `background` za sekciju posle bele (npr. „Oprema" na O nama).
   */
  tone?: ServiceFeaturesToneType;
  /** Dodatni sadržaj ispod kartica (npr. napomena o regulativi na O nama). */
  children?: React.ReactNode;
}

// Blokovi „kako snimamo" / „šta dobijate" (dizajn referenca, artboardi `1b` i `2a`):
// grid stavki, svaka sa zlatnom ikonicom u krugu. Sadržaj stiže iz feature-a 09-13;
// isti obrazac nosi i „Opremu" na O nama.
export function ServiceFeatures({
  heading,
  intro,
  items,
  tone = "surface",
  children,
}: IServiceFeaturesProps) {
  const toneClasses = TONE_CLASSES[tone];

  return (
    <section className={cn("px-5 py-10 md:px-12 md:py-20", toneClasses.section)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2>{heading}</h2>
        {intro ? <p className="text-muted-foreground md:max-w-107.5 md:text-lg">{intro}</p> : null}
      </div>

      {/* Pun red tek od `lg` — na tabletu su i tri kolone preuske da tekst lepo stane. */}
      <ul
        className={cn(
          "mt-5.5 grid gap-4 md:mt-11 md:grid-cols-2 md:gap-6",
          items.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"
        )}
      >
        {items.map(({ id, Icon, title, description }) => (
          <li
            key={id}
            className={cn("rounded-xl border border-border p-5.5 shadow-card", toneClasses.card)}
          >
            <span
              aria-hidden="true"
              className="flex size-9.5 items-center justify-center rounded-full border border-accent-gold bg-surface"
            >
              <Icon className="size-4.5 text-accent-gold" strokeWidth={1.75} />
            </span>

            <h3 className="mt-4 text-[1.3125rem]">{title}</h3>
            <p className="mt-2 text-base leading-[1.55] text-muted-foreground">{description}</p>
          </li>
        ))}
      </ul>

      {children}
    </section>
  );
}
