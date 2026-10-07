import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const limit = vi.hoisted(() => vi.fn());

vi.mock("@upstash/redis", () => ({
  Redis: vi.fn(),
}));

vi.mock("@upstash/ratelimit", () => {
  const Ratelimit = vi.fn(function (this: { limit: typeof limit }) {
    this.limit = limit;
  });
  return { Ratelimit: Object.assign(Ratelimit, { slidingWindow: vi.fn() }) };
});

import { getClientIp, isContactAllowed, refundContactRateLimit } from "./contact-rate-limit";

describe("getClientIp", () => {
  it("uzima prvu adresu iz x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" });

    expect(getClientIp(headers)).toBe("203.0.113.7");
  });

  it("pada na x-real-ip, pa na „unknown”", () => {
    expect(getClientIp(new Headers({ "x-real-ip": "198.51.100.2" }))).toBe("198.51.100.2");
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});

describe("isContactAllowed", () => {
  beforeEach(() => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://example.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "token");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    limit.mockReset();
  });

  it("pušta upit kad oba limita prolaze", async () => {
    limit.mockResolvedValue({ success: true });

    await expect(isContactAllowed("1.2.3.4")).resolves.toBe(true);
    expect(limit).toHaveBeenCalledTimes(2);
    expect(limit).toHaveBeenCalledWith("1.2.3.4");
  });

  it("odbija upit kad dnevni limit nije prošao", async () => {
    limit.mockResolvedValueOnce({ success: true }).mockResolvedValueOnce({ success: false });

    await expect(isContactAllowed("1.2.3.4")).resolves.toBe(false);
  });

  it("odbijen 10-minutnim limitom ne troši dnevni", async () => {
    limit.mockResolvedValue({ success: false });

    await expect(isContactAllowed("1.2.3.4")).resolves.toBe(false);
    expect(limit).toHaveBeenCalledTimes(1);
  });

  it("pušta upit i loguje grešku kad Upstash ne radi", async () => {
    limit.mockRejectedValue(new Error("Unauthorized"));

    await expect(isContactAllowed("1.2.3.4")).resolves.toBe(true);
    expect(console.error).toHaveBeenCalled();
  });

  it("loguje timeout, a upit pušta", async () => {
    limit.mockResolvedValue({ success: true, reason: "timeout" });

    await expect(isContactAllowed("1.2.3.4")).resolves.toBe(true);
    expect(console.error).toHaveBeenCalled();
  });

  it("bez env-a pušta upit; u produkciji loguje grešku", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");

    await expect(isContactAllowed("1.2.3.4")).resolves.toBe(true);
    expect(console.error).not.toHaveBeenCalled();

    vi.stubEnv("NODE_ENV", "production");
    await expect(isContactAllowed("1.2.3.4")).resolves.toBe(true);
    expect(console.error).toHaveBeenCalled();
    expect(limit).not.toHaveBeenCalled();
  });
});

describe("refundContactRateLimit", () => {
  beforeEach(() => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://example.upstash.io");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "token");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    limit.mockReset();
  });

  it("umanjuje oba brojača za jedan", async () => {
    limit.mockResolvedValue({ success: true });

    await refundContactRateLimit("1.2.3.4");

    expect(limit).toHaveBeenCalledTimes(2);
    expect(limit).toHaveBeenCalledWith("1.2.3.4", { rate: -1 });
  });

  it("ne baca grešku kad Upstash ne radi, nego je loguje", async () => {
    limit.mockRejectedValue(new Error("Unauthorized"));

    await expect(refundContactRateLimit("1.2.3.4")).resolves.toBeUndefined();
    expect(console.error).toHaveBeenCalled();
  });

  it("bez env-a ne radi ništa", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");

    await refundContactRateLimit("1.2.3.4");

    expect(limit).not.toHaveBeenCalled();
  });
});
