import Image from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "cn";

import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import type { TeamMemberType } from "@/types/team.type";

// Portret 150×180 iz dizajna (artboard `2b`) — ista mera za placeholder i pravu sliku.
const PORTRAIT_CLASSES = "h-45 w-37.5 rounded-xl border border-border";

interface ITeamMemberCardProps {
  member: TeamMemberType;
}

// Kartica člana ekipe: portret gore, tekst ispod na svim širinama (odluka vlasnika — dizajn
// ima portret levo od teksta). Uloga nije zlatna kao u dizajnu jer zlatna na svetlom nema
// AA kontrast; zlato ostaje samo u crtici ispred.
export function TeamMemberCard({ member: { id, name, image } }: ITeamMemberCardProps) {
  const t = useTranslations("about");
  const role = t(`team.${id}.role`);

  return (
    <li className="rounded-xl border border-border bg-background p-6 md:p-8">
      {image ? (
        <Image
          src={image}
          alt={t("teamPortraitAlt", { name, role })}
          width={150}
          height={180}
          placeholder="blur"
          className={cn(PORTRAIT_CLASSES, "object-cover")}
        />
      ) : (
        <MediaPlaceholder label={t("teamPortraitPlaceholder")} className={PORTRAIT_CLASSES} />
      )}

      <h3 className="mt-5 text-2xl">{name}</h3>
      <p className="mt-1 flex items-center gap-2 font-heading font-medium text-foreground">
        <span aria-hidden="true" className="h-px w-4 bg-accent-gold" />
        {role}
      </p>
      <p className="mt-3 text-base leading-[1.6] text-muted-foreground">{t(`team.${id}.bio`)}</p>
    </li>
  );
}
