import { afterEach, describe, expect, it, vi } from "vitest";

import { getPhoneNumber } from "./phone";

describe("getPhoneNumber", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("vraća prikaz i tel: href bez razmaka i crtica", async () => {
    vi.stubEnv("CONTACT_PHONE", "+381 60 123-4567");

    await expect(getPhoneNumber()).resolves.toEqual({
      success: true,
      data: { display: "+381 60 123-4567", href: "tel:+381601234567" },
    });
  });

  it("odseca razmake oko broja", async () => {
    vi.stubEnv("CONTACT_PHONE", "  +381 60 123 4567  ");

    const result = await getPhoneNumber();

    expect(result.success && result.data.display).toBe("+381 60 123 4567");
  });

  it("vraća grešku kada env nije postavljen ili je prazan", async () => {
    vi.stubEnv("CONTACT_PHONE", "");
    await expect(getPhoneNumber()).resolves.toEqual({
      success: false,
      error: "PHONE_UNAVAILABLE",
    });

    vi.stubEnv("CONTACT_PHONE", "   ");
    await expect(getPhoneNumber()).resolves.toEqual({
      success: false,
      error: "PHONE_UNAVAILABLE",
    });
  });
});
