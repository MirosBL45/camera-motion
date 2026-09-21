"use server";

import type { ActionResultType } from "@/types/action.type";

type PhoneNumberType = {
  display: string;
  href: string;
};

// Broj živi samo u env-u; nikad u HTML-u, JS bundle-u ni JSON-LD (poglavlje 12)
export async function getPhoneNumber(): Promise<ActionResultType<PhoneNumberType>> {
  const phone = process.env.CONTACT_PHONE?.trim();

  if (!phone) {
    return { success: false, error: "PHONE_UNAVAILABLE" };
  }

  return {
    success: true,
    data: { display: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}` },
  };
}
