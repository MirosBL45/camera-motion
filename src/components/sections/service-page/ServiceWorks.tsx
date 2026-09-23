import { cn } from "cn";

import { YouTubeLite } from "@/components/shared/YouTubeLite";

export type ServiceWorkType = {
  id: string;
  /** YouTube ID iz `services.ts`; dok je placeholder, prikazuje se opis kadra. */
  videoId: string;
  title: string;
  meta: string;
  placeholderLabel: string;
};

interface IServiceWorksProps {
  /** Meta sekcije za sidro iz uvodnog bloka („Vidite primere"). */
  id?: string;
  heading: string;
  items: ServiceWorkType[];
  /** `background` prati artboard `2a`; `surface` je za stranice sa dodatnim sekcijama (venčanja). */
  tone?: "surface" | "background";
}

// Sekcija radova (dizajn referenca, artboardi `1b` i `2a`): dva embeda u redu, svaki sa
// naslovom rada i meta redom ispod. Embedi su facade — `iframe` tek na klik.
export function ServiceWorks({ id, heading, items, tone = "surface" }: IServiceWorksProps) {
  return (
    // `scroll-mt-*` drži naslov ispod sticky header-a kad se dođe preko sidra.
    <section
      id={id}
      className={cn(
        "scroll-mt-20 px-5 py-10 md:scroll-mt-24 md:px-12 md:py-20",
        tone === "surface" && "border-y border-border bg-surface"
      )}
    >
      <h2>{heading}</h2>

      <ul className="mt-5.5 grid gap-6 md:mt-10 md:grid-cols-2">
        {items.map(({ id, videoId, title, meta, placeholderLabel }) => (
          <li key={id}>
            <YouTubeLite videoId={videoId} title={title} placeholderLabel={placeholderLabel} />
            <h3 className="mt-3.5 text-[1.1875rem]">{title}</h3>
            <p className="mt-1 text-base text-muted-foreground">{meta}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
