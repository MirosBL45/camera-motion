export type ServiceDeliveryItemType = {
  id: string;
  text: string;
};

interface IServiceDeliveryProps {
  heading: string;
  intro?: string;
  items: ServiceDeliveryItemType[];
}

// Sekcija isporuke — dizajn je nema (artboard `1b`), pa prati obrasce dizajn sistema:
// naslov sekcije, uvodni pasus i lista sa zlatnom crticom kao markerom, kao u karticama paketa.
export function ServiceDelivery({ heading, intro, items }: IServiceDeliveryProps) {
  return (
    <section className="px-5 py-10 md:px-12 md:py-20">
      <h2>{heading}</h2>
      {intro ? (
        <p className="mt-3.5 leading-[1.65] text-muted-foreground md:mt-5 md:max-w-160 md:text-lg">
          {intro}
        </p>
      ) : null}

      <ul className="mt-5.5 flex flex-col gap-3 md:mt-8 md:max-w-175">
        {items.map(({ id, text }) => (
          <li key={id} className="flex gap-2.5 leading-[1.6] md:text-[1.0625rem]">
            <span aria-hidden="true" className="text-accent-gold">
              —
            </span>
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
