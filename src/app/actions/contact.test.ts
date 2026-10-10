import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { send, isContactAllowed, refundContactRateLimit } = vi.hoisted(() => ({
  send: vi.fn(),
  isContactAllowed: vi.fn(),
  refundContactRateLimit: vi.fn(),
}));

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }),
}));

vi.mock("resend", () => ({
  Resend: vi.fn(function (this: { emails: { send: typeof send } }) {
    this.emails = { send };
  }),
}));

vi.mock("@/lib/contact-rate-limit", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/contact-rate-limit")>()),
  isContactAllowed,
  refundContactRateLimit,
}));

import { submitContact } from "./contact";

const VALID_FIELDS = {
  name: "Ana Petrović",
  email: "ana@example.com",
  phone: "",
  service: "nekretnine",
  date: "",
  location: "",
  message: "Treba nam snimak stana.",
  consent: "on",
  website: "",
};

const formData = (overrides: Partial<typeof VALID_FIELDS> = {}) => {
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...VALID_FIELDS, ...overrides })) {
    data.set(key, value);
  }
  return data;
};

const submit = (data: FormData, locale: unknown = "sr") => submitContact(locale, null, data);

describe("submitContact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_EMAIL", "vlasnik@gmail.com");
    isContactAllowed.mockResolvedValue(true);
    send.mockResolvedValue({ data: { id: "email-id" }, error: null });
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    send.mockReset();
    isContactAllowed.mockReset();
    refundContactRateLimit.mockReset();
  });

  it("šalje upit na CONTACT_EMAIL sa Reply-To klijenta", async () => {
    await expect(submit(formData())).resolves.toEqual({ success: true, data: null });

    expect(isContactAllowed).toHaveBeenCalledWith("203.0.113.7");
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "Camera Motion <onboarding@resend.dev>",
        to: "vlasnik@gmail.com",
        replyTo: "ana@example.com",
        subject: "[cameramotion.net] Upit — Nekretnine — Ana Petrović",
        html: expect.any(String),
        text: expect.stringContaining("Treba nam snimak stana."),
      })
    );
    expect(refundContactRateLimit).not.toHaveBeenCalled();
  });

  it("odbija nevalidan payload poslat mimo forme", async () => {
    await expect(submit(formData({ email: "nije-email", consent: "" }))).resolves.toEqual({
      success: false,
      error: "INVALID",
    });
    await expect(submit(formData({ service: "nepoznato" }))).resolves.toEqual({
      success: false,
      error: "INVALID",
    });
    await expect(submit("nije FormData" as unknown as FormData)).resolves.toEqual({
      success: false,
      error: "INVALID",
    });
    expect(send).not.toHaveBeenCalled();
  });

  it("popunjen honeypot vraća tihi uspeh bez slanja i bez rate limita", async () => {
    await expect(submit(formData({ website: "https://spam.example" }))).resolves.toEqual({
      success: true,
      data: null,
    });
    expect(send).not.toHaveBeenCalled();
    expect(isContactAllowed).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledOnce();
  });

  it("vraća RATE_LIMITED kad je limit prekoračen", async () => {
    isContactAllowed.mockResolvedValue(false);

    await expect(submit(formData())).resolves.toEqual({ success: false, error: "RATE_LIMITED" });
    expect(send).not.toHaveBeenCalled();
    expect(refundContactRateLimit).not.toHaveBeenCalled();
  });

  it("ne guta grešku Resend-a kao uspeh", async () => {
    send.mockResolvedValue({ data: null, error: { name: "validation_error", message: "x" } });
    await expect(submit(formData())).resolves.toEqual({ success: false, error: "SEND_FAILED" });

    send.mockRejectedValue(new Error("network"));
    await expect(submit(formData())).resolves.toEqual({ success: false, error: "SEND_FAILED" });

    expect(console.error).toHaveBeenCalledTimes(2);
  });

  it("neuspelo slanje vraća pokušaj u rate limit", async () => {
    send.mockResolvedValue({ data: null, error: { name: "application_error", message: "x" } });

    await submit(formData());

    expect(refundContactRateLimit).toHaveBeenCalledExactlyOnceWith("203.0.113.7");
  });

  it("bez Resend env-a: u developmentu ispisuje upit, u produkciji vraća grešku", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    await expect(submit(formData())).resolves.toEqual({ success: true, data: null });
    expect(console.info).toHaveBeenCalled();

    vi.stubEnv("NODE_ENV", "production");
    await expect(submit(formData())).resolves.toEqual({ success: false, error: "SEND_FAILED" });
    expect(console.error).toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it("nepoznat jezik sajta pada na srpski", async () => {
    await submit(formData(), "de");

    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({ text: expect.stringContaining("Jezik sajta: SR") })
    );
  });
});
