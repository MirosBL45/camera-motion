import type { LucideIcon } from "lucide-react";

export type ServiceFeatureType = {
  id: string;
  Icon: LucideIcon;
  title: string;
  description: string;
};

interface IServiceFeaturesProps {
  heading: string;
  intro?: string;
  items: ServiceFeatureType[];
}

// Blokovi „kako snimamo" / „šta dobijate" (dizajn referenca, artboardi `1b` i `2a`):
// grid od četiri stavke, svaka sa zlatnom ikonicom u krugu. Sadržaj stiže iz feature-a 09-13.
export function ServiceFeatures({ heading, intro, items }: IServiceFeaturesProps) {
  return (
    <section className="border-y border-border bg-surface px-5 py-10 md:px-12 md:py-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2>{heading}</h2>
        {intro ? <p className="text-muted-foreground md:max-w-107.5 md:text-lg">{intro}</p> : null}
      </div>

      <ul className="mt-5.5 grid gap-4 md:mt-11 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {items.map(({ id, Icon, title, description }) => (
          <li key={id} className="rounded-xl border border-border bg-background p-5.5 shadow-card">
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
    </section>
  );
}
