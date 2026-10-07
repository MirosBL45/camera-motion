"use client";

import { useTranslations } from "next-intl";

import { cn } from "cn";
import { CircleAlert, CircleCheck } from "lucide-react";

import type { ContactSubmitErrorType, ContactSubmitStateType } from "@/types/contact.type";

interface IContactFormStatusProps {
  state: ContactSubmitStateType;
}

const RATE_LIMITED: ContactSubmitErrorType = "RATE_LIMITED";

// Live region je uvek u DOM-u da bi čitač ekrana pročitao poruku kad se pojavi.
// Greška i rate-limit dolaze iz Server Action-a u feature-u 17.
export function ContactFormStatus({ state }: IContactFormStatusProps) {
  const t = useTranslations("contact.form.status");

  const message = !state
    ? null
    : state.success
      ? t("success")
      : state.error === RATE_LIMITED
        ? t("rateLimited")
        : t("error");

  const Icon = state?.success ? CircleCheck : CircleAlert;

  return (
    <div role="status" aria-live="polite">
      {message ? (
        <p
          className={cn(
            "mt-5 flex items-start gap-2.5 rounded-lg border px-4 py-3 text-base",
            state?.success
              ? "border-primary/25 bg-primary/5 text-primary"
              : "border-destructive/30 bg-destructive/5 text-destructive"
          )}
        >
          <Icon aria-hidden="true" className="mt-1 size-4.5 shrink-0" />
          {message}
        </p>
      ) : null}
    </div>
  );
}
