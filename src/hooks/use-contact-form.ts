import { type FormEvent, startTransition, useActionState, useRef, useState } from "react";
import { useLocale } from "next-intl";

import { CONTACT_FIELD_ORDER, isContactField, parseContactForm } from "@/lib/contact-form";
import type {
  ContactFieldErrorsType,
  ContactFieldType,
  ContactServiceType,
  ContactSubmitStateType,
} from "@/types/contact.type";

import { submitContact } from "@/app/actions/contact";

export const contactFieldId = (field: ContactFieldType) => `contact-${field}`;

// Validacija na klijentu pre slanja, stanje slanja kroz `useActionState` i reset posle uspeha.
export function useContactForm(defaultService?: ContactServiceType) {
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrorsType>({});
  const [service, setService] = useState<ContactServiceType | "">(defaultService ?? "");
  const [consent, setConsent] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  // Forma se ne šalje kroz `action` prop, pa je React ne resetuje sam — posle greške podaci
  // ostaju, a posle uspeha se forma prazni ovde.
  const [state, formAction, isPending] = useActionState(
    async (prevState: ContactSubmitStateType, formData: FormData) => {
      const nextState = await submitContact(locale, prevState, formData).catch(
        // Mrežna greška ili pad servera — bez ovoga bi action bacio grešku i srušio stranicu
        (): ContactSubmitStateType => ({ success: false, error: "SEND_FAILED" })
      );

      if (nextState?.success) {
        formRef.current?.reset();
        setService(defaultService ?? "");
        setConsent(false);
        setDate(undefined);
      }

      return nextState;
    },
    null
  );

  const clearError = (field: unknown) => {
    if (!isContactField(field)) return;
    setFieldErrors((errors) => (errors[field] ? { ...errors, [field]: undefined } : errors));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;

    const formData = new FormData(event.currentTarget);
    const result = parseContactForm(formData);

    if (!result.success) {
      setFieldErrors(result.fieldErrors);
      const firstInvalid = CONTACT_FIELD_ORDER.find((field) => result.fieldErrors[field]);
      if (firstInvalid) document.getElementById(contactFieldId(firstInvalid))?.focus();
      return;
    }

    setFieldErrors({});
    startTransition(() => formAction(formData));
  };

  return {
    formRef,
    state,
    isPending,
    fieldErrors,
    service,
    consent,
    date,
    handleSubmit,
    clearError,
    selectService: (value: ContactServiceType) => {
      setService(value);
      clearError("service");
    },
    selectDate: (value?: Date) => {
      setDate(value);
      clearError("date");
    },
    toggleConsent: (checked: boolean) => {
      setConsent(checked);
      clearError("consent");
    },
  };
}
