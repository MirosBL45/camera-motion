import Image from "next/image";
import { useTranslations } from "next-intl";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

export function Logo() {
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  return (
    <Link
      href={ROUTES.home}
      aria-label={tNav("homeLink")}
      className="flex min-h-11 items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none lg:gap-3"
    >
      {/* TODO: pravi logo fajl (public/logo.svg je placeholder) */}
      <Image src="/logo.svg" alt="" width={42} height={42} className="size-9 lg:size-10.5" />
      <span className="font-heading text-[1.0625rem] font-medium text-foreground lg:text-[1.1875rem] lg:tracking-[-0.01em]">
        {tCommon("brandName")}
      </span>
    </Link>
  );
}
