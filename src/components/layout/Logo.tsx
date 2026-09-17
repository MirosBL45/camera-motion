import Image from "next/image";
import { useTranslations } from "next-intl";

import { cn } from "cn";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

interface ILogoProps {
  variant?: "header" | "footer";
}

// Veličine po dizajnu: header 42px / 19px, footer 40px / 18px (mobilni 36px / 17px za oba)
const VARIANT_CLASSES = {
  header: {
    link: "focus-visible:ring-offset-background",
    image: "size-9 lg:size-10.5",
    text: "text-[1.0625rem] lg:text-[1.1875rem] lg:tracking-[-0.01em]",
  },
  footer: {
    link: "focus-visible:ring-offset-surface-warm",
    image: "size-9 lg:size-10",
    text: "text-[1.0625rem] lg:text-lg",
  },
} as const;

export function Logo({ variant = "header" }: ILogoProps) {
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const classes = VARIANT_CLASSES[variant];

  return (
    <Link
      href={ROUTES.home}
      aria-label={tNav("homeLink")}
      className={cn(
        "flex min-h-11 w-fit items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none lg:gap-3",
        classes.link
      )}
    >
      {/* TODO: pravi logo fajl (public/logo.svg je placeholder) */}
      <Image src="/logo.svg" alt="" width={42} height={42} className={classes.image} />
      <span className={cn("font-heading font-medium text-foreground", classes.text)}>
        {tCommon("brandName")}
      </span>
    </Link>
  );
}
