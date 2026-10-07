import { useTranslations } from "next-intl";

import { TeamMemberCard } from "@/components/sections/about/TeamMemberCard";

import { TEAM } from "@/data/team";

// Sekcija „Ekipa" (dizajn referenca, artboard `2b`): kartice se mapiraju iz `TEAM`, pa se
// dodavanje ili uklanjanje člana radi samo u `src/data/team.ts`.
export function TeamSection() {
  const t = useTranslations("about");

  return (
    <section className="border-y border-border bg-surface px-5 py-10 md:px-12 md:py-20">
      <h2>{t("teamHeading")}</h2>

      <ul className="mt-5.5 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {TEAM.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </ul>
    </section>
  );
}
