"use server";

import { headers } from "next/headers";

import { Resend } from "resend";

import { buildContactEmail } from "@/lib/contact-email";
import { parseContactForm } from "@/lib/contact-form";
import { getClientIp, isContactAllowed, refundContactRateLimit } from "@/lib/contact-rate-limit";
import { type Locale, SUPPORTED_LOCALES } from "@/lib/types/i18n";
import type {
  ContactFormDataType,
  ContactSubmitErrorType,
  ContactSubmitStateType,
} from "@/types/contact.type";

// TODO: verifikovati cameramotion.net u Resend-u → "Camera Motion <upiti@cameramotion.net>".
// Do tada `onboarding@resend.dev` šalje samo na email vlasnika Resend naloga (= CONTACT_EMAIL).
const FROM_ADDRESS = "Camera Motion <onboarding@resend.dev>";

const SUCCESS: ContactSubmitStateType = { success: true, data: null };

const failure = (error: ContactSubmitErrorType): ContactSubmitStateType => ({
  success: false,
  error,
});

async function sendContactEmail(
  data: ContactFormDataType,
  locale: Locale
): Promise<ContactSubmitStateType> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_EMAIL?.trim();
  const email = buildContactEmail(data, locale);

  if (!apiKey || !to) {
    // Development bez naloga: upit se samo ispisuje u terminal (odluka vlasnika).
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Resend nije podešen — upit se ne šalje (development):\n", email.text);
      return SUCCESS;
    }

    console.error(
      "[contact] Resend nije podešen (RESEND_API_KEY / CONTACT_EMAIL) — upit nije poslat"
    );
    return failure("SEND_FAILED");
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: FROM_ADDRESS,
      to,
      replyTo: data.email,
      ...email,
    });

    if (error) {
      console.error("[contact] Resend je odbio slanje:", error);
      return failure("SEND_FAILED");
    }

    return SUCCESS;
  } catch (error) {
    console.error("[contact] Resend nedostupan:", error);
    return failure("SEND_FAILED");
  }
}

/**
 * Prima upit sa kontakt forme (poglavlje 12). `locale` šalje forma i služi samo kao
 * podatak u emailu (jezik sajta) — nepoznata vrednost pada na srpski.
 */
export async function submitContact(
  locale: unknown,
  _prevState: ContactSubmitStateType,
  formData: FormData
): Promise<ContactSubmitStateType> {
  // Action je javni endpoint — poziv mimo forme može da pošalje bilo šta umesto FormData
  if (!(formData instanceof FormData)) return failure("INVALID");

  // Honeypot popunjen → bot: tihi „uspeh", bez slanja i bez trošenja rate limita. Beleži se
  // u log, da se vidi ako polje ikad popuni pravi posetilac (npr. automatsko popunjavanje).
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    console.warn("[contact] Honeypot popunjen — upit odbačen bez slanja");
    return SUCCESS;
  }

  // Ista šema kao na klijentu — payload poslat mimo forme prolazi istu proveru
  const result = parseContactForm(formData);
  if (!result.success) return failure("INVALID");

  const ip = getClientIp(await headers());
  if (!(await isContactAllowed(ip))) return failure("RATE_LIMITED");

  const siteLocale = SUPPORTED_LOCALES.find((supported) => supported === locale) ?? "sr";
  const sent = await sendContactEmail(result.data, siteLocale);

  // Neuspelo slanje se ne računa u limit — posetilac ponovo pokušava bez kazne
  if (!sent?.success) await refundContactRateLimit(ip);

  return sent;
}
