"use client";

import { useTranslations } from "next-intl";

import { Checkbox } from "@/components/ui/checkbox";

import { ROUTES } from "@/constants/routes";
import { Link } from "@/i18n/navigation";

import { fieldErrorId } from "./ContactField";

interface IContactConsentProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}

// Saglasnost je obavezna; link na politiku se otvara u novom tabu da posetilac ne izgubi unos.
export function ContactConsent({ id, checked, onCheckedChange, error }: IContactConsentProps) {
  const t = useTranslations("contact.form");

  return (
    <div className="mt-5.5">
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          name="consent"
          checked={checked}
          onCheckedChange={(state) => onCheckedChange(state === true)}
          aria-required="true"
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={fieldErrorId(id)}
          className="mt-0.5 size-5 rounded-sm border-accent-gold bg-surface"
        />
        <label htmlFor={id} className="text-[0.9375rem] leading-[1.55] text-muted-foreground">
          {t.rich("consent", {
            link: (chunks) => (
              <Link
                href={ROUTES.privacy}
                target="_blank"
                className="rounded-sm text-primary underline underline-offset-4 transition-colors duration-150 hover:decoration-accent-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface focus-visible:outline-none"
              >
                {chunks}
              </Link>
            ),
          })}
        </label>
      </div>
      <p id={fieldErrorId(id)} className="mt-1.5 pl-8 text-sm text-destructive empty:hidden">
        {error}
      </p>
    </div>
  );
}
