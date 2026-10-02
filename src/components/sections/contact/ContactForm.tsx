"use client";

import { useTranslations } from "next-intl";

import { cn } from "cn";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFieldId, useContactForm } from "@/hooks/use-contact-form";
import { CONTACT_LIMITS } from "@/lib/contact-form";
import type { ContactFieldType, ContactServiceType } from "@/types/contact.type";

import { ContactConsent } from "./ContactConsent";
import { ContactDatePicker } from "./ContactDatePicker";
import { ContactField, FIELD_CONTROL_CLASSES, fieldErrorId } from "./ContactField";
import { ContactFormStatus } from "./ContactFormStatus";
import { ContactServiceSelect } from "./ContactServiceSelect";

interface IContactFormProps {
  /** Pre-selekcija iz `?usluga=` (poglavlje 7.3). */
  defaultService?: ContactServiceType;
}

// Forma za upit po dizajnu (artboard `1c`): polja u dve kolone, poruka preko cele širine,
// saglasnost i dugme. Validacija i slanje u `useContactForm`.
export function ContactForm({ defaultService }: IContactFormProps) {
  const t = useTranslations("contact.form");
  const {
    formRef,
    state,
    isPending,
    fieldErrors,
    service: selectedService,
    consent,
    date: selectedDate,
    handleSubmit,
    clearError,
    selectService,
    selectDate,
    toggleConsent,
  } = useContactForm(defaultService);

  const fieldProps = (field: Exclude<ContactFieldType, "consent">) => {
    const code = fieldErrors[field];
    const id = contactFieldId(field);

    return {
      field: { id, label: t(`fields.${field}.label`), error: code && t(`errors.${code}`) },
      control: {
        id,
        name: field,
        "aria-invalid": Boolean(code) || undefined,
        "aria-describedby": fieldErrorId(id),
      },
    };
  };

  const hasFieldErrors = Object.values(fieldErrors).some(Boolean);

  const name = fieldProps("name");
  const email = fieldProps("email");
  const phone = fieldProps("phone");
  const service = fieldProps("service");
  const date = fieldProps("date");
  const location = fieldProps("location");
  const message = fieldProps("message");

  return (
    <form
      ref={formRef}
      noValidate
      aria-label={t("label")}
      onSubmit={handleSubmit}
      onChange={(event) => {
        const target = event.target;
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
          clearError(target.name);
        }
      }}
      className="rounded-xl border border-border bg-surface p-5 shadow-card md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <ContactField {...name.field} required>
          <Input
            {...name.control}
            autoComplete="name"
            aria-required="true"
            maxLength={CONTACT_LIMITS.name}
            placeholder={t("fields.name.placeholder")}
            className={FIELD_CONTROL_CLASSES}
          />
        </ContactField>
        <ContactField {...email.field} required>
          <Input
            {...email.control}
            type="email"
            autoComplete="email"
            aria-required="true"
            maxLength={CONTACT_LIMITS.email}
            placeholder={t("fields.email.placeholder")}
            className={FIELD_CONTROL_CLASSES}
          />
        </ContactField>
        <ContactField {...phone.field}>
          <Input
            {...phone.control}
            type="tel"
            autoComplete="tel"
            maxLength={CONTACT_LIMITS.phone}
            placeholder={t("fields.phone.placeholder")}
            className={FIELD_CONTROL_CLASSES}
          />
        </ContactField>
        <ContactField {...service.field}>
          <ContactServiceSelect
            id={service.control.id}
            value={selectedService}
            onValueChange={selectService}
            invalid={Boolean(service.field.error)}
          />
        </ContactField>
        <ContactField {...date.field}>
          <ContactDatePicker
            id={date.control.id}
            value={selectedDate}
            onChange={selectDate}
            invalid={Boolean(date.field.error)}
          />
        </ContactField>
        <ContactField {...location.field}>
          <Input
            {...location.control}
            maxLength={CONTACT_LIMITS.location}
            placeholder={t("fields.location.placeholder")}
            className={FIELD_CONTROL_CLASSES}
          />
        </ContactField>
      </div>

      <ContactField {...message.field} required className="mt-5">
        <Textarea
          {...message.control}
          aria-required="true"
          maxLength={CONTACT_LIMITS.message}
          placeholder={t("fields.message.placeholder")}
          className={cn(FIELD_CONTROL_CLASSES, "h-auto min-h-30 py-3")}
        />
      </ContactField>

      {/* Honeypot (feature 17): ljudi ga ne vide i ne dobijaju fokus; popunjen = bot. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="contact-website">{t("fields.honeypot.label")}</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <ContactConsent
        id={contactFieldId("consent")}
        checked={consent}
        onCheckedChange={toggleConsent}
        error={fieldErrors.consent && t(`errors.${fieldErrors.consent}`)}
      />

      <Button
        type="submit"
        aria-disabled={isPending}
        className="mt-7 h-auto w-full px-7.5 py-3.75 font-heading text-[1.0625rem] aria-disabled:cursor-wait sm:w-auto"
      >
        {isPending ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
        {isPending ? t("submitting") : t("submit")}
      </Button>

      {/* Dok forma ima greške, poruka prethodnog slanja se ne prikazuje */}
      <ContactFormStatus state={hasFieldErrors ? null : state} />
    </form>
  );
}
