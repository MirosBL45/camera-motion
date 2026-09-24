export type ProcessStepType = {
  id: string;
  title: string;
  description: string;
};

interface IProcessStepsProps {
  heading: string;
  intro?: string;
  steps: ProcessStepType[];
}

// Numerisani koraci saradnje (dizajn referenca, sekcija „Kako radimo" na O nama): naslov i
// pasus levo, koraci `01–04` desno sa zlatnim brojem i tankom linijom između. Koristi se gde
// je redosled bitan — promo stranica i O nama; tekstovi stižu kroz props.
export function ProcessSteps({ heading, intro, steps }: IProcessStepsProps) {
  return (
    <section className="bg-surface-warm px-5 py-10 md:px-12 md:py-20">
      {/* Dve kolone iz dizajna tek od `lg` — na tabletu bi tekstualna kolona bila preuska. */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-15">
        <div>
          <h2 className="md:leading-[1.12]">{heading}</h2>
          {intro ? (
            <p className="mt-3.5 leading-[1.6] text-foreground/86 md:mt-4.5 md:text-[1.1875rem] md:leading-[1.65]">
              {intro}
            </p>
          ) : null}
        </div>

        <ol className="mt-4 lg:mt-0">
          {steps.map(({ id, title, description }, index) => (
            <li
              key={id}
              className="flex gap-4 border-b border-border py-4.5 last:border-b-0 md:gap-5 md:py-5.5"
            >
              {/* Redni broj već čita `<ol>`; vizuelni „01" je samo ukras. */}
              <span
                aria-hidden="true"
                className="w-8.5 flex-none font-heading text-lg font-semibold text-accent-gold md:text-xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg md:text-xl">{title}</h3>
                <p className="text-base leading-[1.55] text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
