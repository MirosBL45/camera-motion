import { z } from "zod";

import type {
  ContactFieldErrorsType,
  ContactFieldErrorType,
  ContactFieldType,
  ContactParseResultType,
  ContactServiceType,
} from "@/types/contact.type";

// Jedna šema za klijent (feature 16) i Server Action `submitContact` (feature 17) —
// validacija na serveru mora biti identična klijentskoj (poglavlje 12).

/** Redosled opcija u padajućem meniju „Tip usluge". */
export const CONTACT_SERVICE_VALUES = [
  "vencanje",
  "nekretnine",
  "event",
  "promo",
  "fpv",
  "drugo",
] as const satisfies readonly ContactServiceType[];

/** Proverava `?usluga=` i izbor iz menija — nepoznata vrednost se ignoriše. */
export const isContactService = (value: unknown): value is ContactServiceType =>
  CONTACT_SERVICE_VALUES.some((service) => service === value);

/** Redosled polja u formi — fokus posle neuspešne validacije ide na prvo neispravno. */
export const CONTACT_FIELD_ORDER = [
  "name",
  "email",
  "phone",
  "service",
  "date",
  "location",
  "message",
  "consent",
] as const satisfies readonly ContactFieldType[];

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  phone: 30,
  location: 150,
  message: 5000,
} as const;

// Cifre, razmaci, crtice, kose crte i zagrade, uz opcioni `+` na početku; bar 6 cifara.
const PHONE_PATTERN = /^\+?[\d\s\-/()]+$/;
const PHONE_MIN_DIGITS = 6;

const isPhone = (value: string) =>
  PHONE_PATTERN.test(value) && value.replace(/\D/g, "").length >= PHONE_MIN_DIGITS;

const requiredText = (max: number) =>
  z.string().trim().min(1, { error: "required", abort: true }).max(max, { error: "tooLong" });

const optionalText = (max: number) => z.string().trim().max(max, { error: "tooLong" });

export const contactSchema = z.object({
  name: requiredText(CONTACT_LIMITS.name),
  email: requiredText(CONTACT_LIMITS.email).pipe(z.email({ error: "email" })),
  phone: optionalText(CONTACT_LIMITS.phone).refine((v) => v === "" || isPhone(v), {
    error: "phone",
  }),
  service: z.enum(CONTACT_SERVICE_VALUES).optional(),
  date: z
    .string()
    .trim()
    .refine((v) => v === "" || z.iso.date().safeParse(v).success, { error: "date" }),
  location: optionalText(CONTACT_LIMITS.location),
  message: requiredText(CONTACT_LIMITS.message),
  consent: z.literal(true, { error: "consent" }),
  website: z.string(),
});

const readText = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
};

/** Pretvara FormData u objekat za šemu; prazan izbor usluge postaje `undefined`. */
export function contactFormDataToInput(formData: FormData) {
  return {
    name: readText(formData, "name"),
    email: readText(formData, "email"),
    phone: readText(formData, "phone"),
    service: readText(formData, "service") || undefined,
    date: readText(formData, "date"),
    location: readText(formData, "location"),
    message: readText(formData, "message"),
    consent: formData.get("consent") === "on",
    website: readText(formData, "website"),
  };
}

const FIELD_ERRORS: readonly ContactFieldErrorType[] = [
  "required",
  "email",
  "phone",
  "date",
  "tooLong",
  "consent",
];

export const isContactField = (key: unknown): key is ContactFieldType =>
  CONTACT_FIELD_ORDER.some((name) => name === key);

const isFieldError = (code: string): code is ContactFieldErrorType =>
  FIELD_ERRORS.some((error) => error === code);

/** Validira formu; za svako polje vraća samo prvu grešku. */
export function parseContactForm(formData: FormData): ContactParseResultType {
  const result = contactSchema.safeParse(contactFormDataToInput(formData));

  if (result.success) {
    return { success: true, data: result.data };
  }

  const fieldErrors: ContactFieldErrorsType = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0];

    if (!isContactField(field) || fieldErrors[field]) continue;

    // Nepoznat kod (npr. vrednost usluge van liste, poslata mimo forme) → „obavezno polje"
    fieldErrors[field] = isFieldError(issue.message) ? issue.message : "required";
  }

  return { success: false, fieldErrors };
}
