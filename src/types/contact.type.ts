import type { ActionResultType } from "@/types/action.type";
import type { ServiceContactParamType } from "@/types/services.type";

// Tip usluge u formi: usluge sa sajta + „Drugo" (poglavlje 7.3) — vrednosti se ne prevode.
export type ContactServiceType = ServiceContactParamType | "drugo";

export type ContactFieldType =
  "name" | "email" | "phone" | "service" | "date" | "location" | "message" | "consent";

/** Kodovi validacionih grešaka — UI ih mapira na `contact.form.errors.*`. */
export type ContactFieldErrorType = "required" | "email" | "phone" | "date" | "tooLong" | "consent";

export type ContactFieldErrorsType = Partial<Record<ContactFieldType, ContactFieldErrorType>>;

export type ContactFormDataType = {
  name: string;
  email: string;
  phone: string;
  service?: ContactServiceType;
  date: string;
  location: string;
  message: string;
  consent: true;
  /** Honeypot — popunjeno znači bot (feature 17 vraća tihi „uspeh" bez slanja). */
  website: string;
};

export type ContactParseResultType =
  | { success: true; data: ContactFormDataType }
  | { success: false; fieldErrors: ContactFieldErrorsType };

/** Greške slanja koje UI razlikuje; `RATE_LIMITED` ima posebnu poruku. */
export type ContactSubmitErrorType = "INVALID" | "RATE_LIMITED" | "SEND_FAILED";

/** Stanje `useActionState`; `null` dok forma nije poslata. */
export type ContactSubmitStateType = ActionResultType<null> | null;
