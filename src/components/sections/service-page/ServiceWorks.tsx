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
  heading: string;
  items: ServiceWorkType[];
}

// Sekcija radova (dizajn referenca, artboardi `1b` i `2a`): dva embeda u redu, svaki sa
// naslovom rada i meta redom ispod. Embedi su facade — `iframe` tek na klik.
export function ServiceWorks({ heading, items }: IServiceWorksProps) {
  return (
    <section className="border-y border-border bg-surface px-5 py-10 md:px-12 md:py-20">
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
