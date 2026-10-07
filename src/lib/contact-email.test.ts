import { describe, expect, it } from "vitest";

import type { ContactFormDataType } from "@/types/contact.type";

import { buildContactEmail, escapeHtml } from "./contact-email";

const DATA: ContactFormDataType = {
  name: "Ana Petrović",
  email: "ana@example.com",
  phone: "+381 60 123 4567",
  service: "vencanje",
  date: "2027-06-14",
  location: "Beograd",
  message: "Hello!\nWe are getting married next June.",
  consent: true,
  website: "",
};

describe("escapeHtml", () => {
  it("menja sve HTML specijalne znakove", () => {
    expect(escapeHtml(`<a href="x">Tom & 'Jerry'</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/a&gt;"
    );
  });
});

describe("buildContactEmail", () => {
  it("pravi subject po šablonu sa srpskim nazivom usluge", () => {
    expect(buildContactEmail(DATA, "sr").subject).toBe(
      "[cameramotion.net] Upit — Venčanje — Ana Petrović"
    );
  });

  it("piše „Nije navedeno” kad usluga nije izabrana", () => {
    const { subject } = buildContactEmail({ ...DATA, service: undefined }, "sr");

    expect(subject).toBe("[cameramotion.net] Upit — Nije navedeno — Ana Petrović");
  });

  it("drži subject u jednom redu i kad ime ima nove redove", () => {
    const { subject } = buildContactEmail({ ...DATA, name: "Ana\r\nBcc: x@y.z" }, "sr");

    expect(subject).not.toMatch(/[\r\n]/);
  });

  it("kostur je na srpskom i na en sajtu, a poruka posetioca ostaje u originalu", () => {
    const { text } = buildContactEmail(DATA, "en");

    expect(text).toContain("Tip usluge: Venčanje");
    expect(text).toContain("Datum snimanja: 14.06.2027.");
    expect(text).toContain("Jezik sajta: EN");
    expect(text).toContain("Hello!\nWe are getting married next June.");
  });

  it("prazna opciona polja označava kao „Nije navedeno”", () => {
    const { text } = buildContactEmail({ ...DATA, phone: "", date: "", location: "" }, "sr");

    expect(text).toContain("Telefon: Nije navedeno");
    expect(text).toContain("Datum snimanja: Nije navedeno");
    expect(text).toContain("Lokacija: Nije navedeno");
  });

  it("escape-uje unos posetioca u HTML telu", () => {
    const { html } = buildContactEmail(
      { ...DATA, name: "<b>Ana</b>", message: "<script>alert(1)</script>" },
      "sr"
    );

    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<b>Ana</b>");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
  });
});
