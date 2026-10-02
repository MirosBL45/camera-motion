import { describe, expect, it } from "vitest";

import { SERVICES } from "@/data/services";

import { CONTACT_LIMITS, CONTACT_SERVICE_VALUES, parseContactForm } from "./contact-form";

const VALID_FIELDS: Record<string, string> = {
  name: "  Ana Petrović ",
  email: " ana@example.com ",
  phone: "+381 60 123-4567",
  service: "vencanje",
  date: "2026-06-14",
  location: "Beograd",
  message: "Venčanje u junu, crkva i restoran.",
  consent: "on",
  website: "",
};

const toFormData = (overrides: Record<string, string | undefined> = {}) => {
  const formData = new FormData();
  const fields = { ...VALID_FIELDS, ...overrides };

  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) formData.set(key, value);
  }

  return formData;
};

describe("parseContactForm", () => {
  it("prihvata ispravnu formu i odseca razmake", () => {
    const result = parseContactForm(toFormData());

    expect(result).toEqual({
      success: true,
      data: {
        name: "Ana Petrović",
        email: "ana@example.com",
        phone: "+381 60 123-4567",
        service: "vencanje",
        date: "2026-06-14",
        location: "Beograd",
        message: "Venčanje u junu, crkva i restoran.",
        consent: true,
        website: "",
      },
    });
  });

  it("prihvata praznu opcionu polja, a prazan izbor usluge postaje undefined", () => {
    const result = parseContactForm(toFormData({ phone: "", service: "", date: "", location: "" }));

    expect(result.success).toBe(true);
    expect(result.success && result.data.service).toBeUndefined();
  });

  it("obavezna polja i saglasnost blokiraju slanje", () => {
    const result = parseContactForm(
      toFormData({ name: "   ", email: "", message: "", consent: undefined })
    );

    expect(result).toEqual({
      success: false,
      fieldErrors: { name: "required", email: "required", message: "required", consent: "consent" },
    });
  });

  it("vraća kod greške po tipu neispravnog unosa", () => {
    const result = parseContactForm(
      toFormData({ email: "ana@", phone: "abc", date: "2026-02-30" })
    );

    expect(result).toEqual({
      success: false,
      fieldErrors: { email: "email", phone: "phone", date: "date" },
    });
  });

  it("telefon traži bar 6 cifara, ne samo dozvoljene znakove", () => {
    for (const phone of ["((((((", "------", "+381 1"]) {
      expect(parseContactForm(toFormData({ phone }))).toEqual({
        success: false,
        fieldErrors: { phone: "phone" },
      });
    }

    for (const phone of ["060123", "+381 (60) 123-45-67", "011/123-456"]) {
      expect(parseContactForm(toFormData({ phone })).success).toBe(true);
    }
  });

  it("predugačak tekst vraća tooLong", () => {
    const result = parseContactForm(
      toFormData({ message: "a".repeat(CONTACT_LIMITS.message + 1) })
    );

    expect(result).toEqual({ success: false, fieldErrors: { message: "tooLong" } });
  });

  it("vrednost usluge van liste se odbija", () => {
    const result = parseContactForm(toFormData({ service: "svadba" }));

    expect(result).toEqual({ success: false, fieldErrors: { service: "required" } });
  });

  it("honeypot ne obara validaciju — o njemu odlučuje Server Action", () => {
    const result = parseContactForm(toFormData({ website: "https://spam.example" }));

    expect(result.success && result.data.website).toBe("https://spam.example");
  });
});

describe("CONTACT_SERVICE_VALUES", () => {
  it("sadrži `?usluga=` vrednost svake usluge i „drugo“", () => {
    const serviceParams = SERVICES.map((service) => service.contactParam);

    expect([...CONTACT_SERVICE_VALUES].sort()).toEqual([...serviceParams, "drugo"].sort());
  });
});
