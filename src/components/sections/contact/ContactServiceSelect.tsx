"use client";

import { useTranslations } from "next-intl";

import { cn } from "cn";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT_SERVICE_VALUES, isContactService } from "@/lib/contact-form";
import type { ContactServiceType } from "@/types/contact.type";

import { FIELD_CONTROL_CLASSES, fieldErrorId } from "./ContactField";

interface IContactServiceSelectProps {
  id: string;
  /** Prazan string = ništa nije izabrano (prikazuje se placeholder). */
  value: ContactServiceType | "";
  onValueChange: (value: ContactServiceType) => void;
  invalid: boolean;
}

// Radix Select uz `name` renderuje skriveni native select, pa vrednost ulazi u FormData.
export function ContactServiceSelect({
  id,
  value,
  onValueChange,
  invalid,
}: IContactServiceSelectProps) {
  const t = useTranslations("contact.form");

  return (
    <Select
      name="service"
      value={value}
      onValueChange={(next) => {
        if (isContactService(next)) onValueChange(next);
      }}
    >
      <SelectTrigger
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={fieldErrorId(id)}
        className={cn(FIELD_CONTROL_CLASSES, "pr-3.5 data-[size=default]:h-13")}
      >
        <SelectValue placeholder={t("fields.service.placeholder")} />
      </SelectTrigger>
      <SelectContent>
        {CONTACT_SERVICE_VALUES.map((service) => (
          <SelectItem key={service} value={service} className="min-h-11 text-base">
            {t(`services.${service}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
