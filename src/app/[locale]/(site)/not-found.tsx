import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

const TEXT_LINK_CLASSES =
  "inline-flex min-h-11 items-center rounded-sm text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none";

// Dizajn nema ekran za 404 — mirno centrirano zaglavlje, dugme ka početnoj i dva korisna
// linka (odluka vlasnika, 05.11.2026.). Next.js sam dodaje `noindex` za odgovor 404.
export default function NotFound() {
  const t = useTranslations("notFound");
  const tNav = useTranslations("nav");

  return (
    <section className="mx-auto flex max-w-155 flex-col items-center px-5 py-16 text-center md:px-12 md:py-28">
      <h1 className="md:text-[3.25rem]">{t("title")}</h1>
      <p className="mt-4 leading-[1.6] text-muted-foreground md:text-xl">{t("lead")}</p>

      <Button
        asChild
        className="mt-8 h-auto w-full justify-center px-6.5 py-4 font-heading text-[1.0625rem] sm:w-auto md:py-3.75"
      >
        <Link href={ROUTES.home}>{t("backHome")}</Link>
      </Button>

      <nav aria-label={t("linksLabel")} className="mt-4">
        <ul className="flex items-center gap-x-3 text-muted-foreground">
          <li>
            <Link href={ROUTES.services} className={TEXT_LINK_CLASSES}>
              {tNav("links.services")}
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li>
            <Link href={ROUTES.contact} className={TEXT_LINK_CLASSES}>
              {tNav("links.contact")}
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
