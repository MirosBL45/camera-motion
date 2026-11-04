import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";

import { formatLongDate, fromIsoDate } from "@/lib/date";

interface ILegalPageProps {
  title: string;
  lead: string;
  /** Datum poslednje izmene, `YYYY-MM-DD` iz `LEGAL_LAST_UPDATED`. */
  lastUpdated: string;
  children: ReactNode;
}

// Dizajn nema ekran pravnih stranica — mirna tipografska stranica po obrascu blog članka:
// centrirana kolona, `prose` tekst iz palete, širina ~70ch (odluka vlasnika, 04.11.2026.).
export function LegalPage({ title, lead, lastUpdated, children }: ILegalPageProps) {
  const locale = useLocale();
  const t = useTranslations("legal");

  return (
    <article className="mx-auto box-content max-w-[70ch] px-5 pt-6 pb-12 md:px-12 md:pt-16 md:pb-21">
      <header>
        <h1 className="md:text-[3.25rem]">{title}</h1>
        <p className="mt-3 text-[0.9375rem] text-muted-foreground md:mt-4">
          {t.rich("lastUpdated", {
            date: formatLongDate(fromIsoDate(lastUpdated), locale),
            time: (chunks) => <time dateTime={lastUpdated}>{chunks}</time>,
          })}
        </p>
        <p className="mt-5 leading-[1.6] text-muted-foreground md:mt-6 md:text-xl">{lead}</p>
      </header>

      <div className="prose mt-8 max-w-none text-pretty prose-brand md:mt-10 md:prose-lg">
        {children}
      </div>
    </article>
  );
}
