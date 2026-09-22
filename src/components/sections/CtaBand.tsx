import { Button } from "@/components/ui/button";
import type { AppRoute } from "@/types/routes.type";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

interface ICtaBandProps {
  heading: string;
  subheading: string;
  buttonLabel: string;
  href?: Exclude<AppRoute, "/blog/[slug]">;
  /** Query parametri se ne prevode — stabilni ključevi na oba jezika (poglavlje 7.3). */
  query?: Record<string, string>;
}

// Zeleni band sa dna svakog artboarda — tekstovi stižu kroz props da bi se sekcija
// koristila i na ostalim stranicama (dizajn referenca NOTES 6).
export function CtaBand({
  heading,
  subheading,
  buttonLabel,
  href = ROUTES.contact,
  query,
}: ICtaBandProps) {
  return (
    <section className="bg-primary px-5 py-10 md:px-12 md:py-21">
      <div className="flex flex-col gap-5.5 md:flex-row md:items-center md:justify-between md:gap-12">
        <div>
          <h2 className="text-[1.75rem] text-primary-foreground md:max-w-160 md:text-[2.5rem] md:leading-[1.14]">
            {heading}
          </h2>
          <p className="mt-3 text-accent-gold-soft md:mt-4 md:text-[1.1875rem]">{subheading}</p>
        </div>

        <Button
          asChild
          variant="onPrimary"
          className="h-auto w-full justify-center px-6.5 py-4 font-heading text-[1.0625rem] font-semibold md:w-auto md:shrink-0 md:px-7.5 md:py-4.25 md:text-lg"
        >
          <Link href={{ pathname: href, query }}>{buttonLabel}</Link>
        </Button>
      </div>
    </section>
  );
}
