"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import { cn } from "cn";

import { getPhoneNumber } from "@/app/actions/phone";

interface IPhoneRevealProps {
  className?: string;
}

type PhoneStateType =
  | { status: "hidden" }
  | { status: "revealed"; display: string; href: string }
  | { status: "unavailable" };

// Deli se između footera i kontakt stranice — broj ulazi u DOM tek posle klika (poglavlje 12)
export function PhoneReveal({ className }: IPhoneRevealProps) {
  const t = useTranslations("common.phone");
  const [state, setState] = useState<PhoneStateType>({ status: "hidden" });
  const [isPending, startTransition] = useTransition();
  const linkRef = useRef<HTMLAnchorElement>(null);

  // Dugme nestaje posle klika — fokus prelazi na broj da tastatura ne izgubi mesto
  useEffect(() => {
    if (state.status === "revealed") linkRef.current?.focus();
  }, [state.status]);

  const handleReveal = () => {
    if (isPending) return;

    startTransition(async () => {
      try {
        const result = await getPhoneNumber();

        setState(
          result.success
            ? { status: "revealed", display: result.data.display, href: result.data.href }
            : { status: "unavailable" }
        );
      } catch {
        // Mrežna greška ne sme da obori stranicu preko error boundary-ja
        setState({ status: "unavailable" });
      }
    });
  };

  if (state.status === "revealed") {
    return (
      <a ref={linkRef} href={state.href} className={className}>
        {state.display}
      </a>
    );
  }

  return (
    <span className="flex flex-col items-start">
      <button
        type="button"
        onClick={handleReveal}
        aria-disabled={isPending}
        className={cn("cursor-pointer text-left aria-disabled:cursor-wait", className)}
      >
        {isPending ? t("loading") : t("reveal")}
      </button>
      <span role="status" className="text-sm">
        {state.status === "unavailable" && t("unavailable")}
      </span>
    </span>
  );
}
