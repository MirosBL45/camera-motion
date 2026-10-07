import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Poglavlje 12: sliding window 3 zahteva / 10 min + 10 / dan, oba po IP adresi.
const CONTACT_LIMITS = [
  { prefix: "contact:10m", limiter: Ratelimit.slidingWindow(3, "10 m") },
  { prefix: "contact:1d", limiter: Ratelimit.slidingWindow(10, "1 d") },
] as const;

/** IP posetioca; na Vercel-u je prva adresa u `x-forwarded-for` prava adresa klijenta. */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}

function createLimiters(): Ratelimit[] | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  return CONTACT_LIMITS.map(({ prefix, limiter }) => new Ratelimit({ redis, limiter, prefix }));
}

/**
 * `true` ako upit sme da prođe. Kad Upstash nije podešen ili ne radi, upit prolazi bez
 * ograničenja i greška ide u server log — kvar rate limita ne sme da izgubi klijenta
 * (odluka vlasnika).
 */
export async function isContactAllowed(ip: string): Promise<boolean> {
  const limiters = createLimiters();

  if (!limiters) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[contact] Rate limit nije podešen (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN) — upit ide bez ograničenja"
      );
    }
    return true;
  }

  try {
    // Redom, ne paralelno: odbijen zahtev ne troši limit, pa pokušaji odbijeni 10-minutnim
    // limitom ne smeju da pune dnevni.
    for (const limiter of limiters) {
      const { success, reason } = await limiter.limit(ip);

      // Upstash posle isteka vremena sam pušta zahtev (`success: true`) — beleži se kao kvar.
      if (reason === "timeout") {
        console.error("[contact] Rate limit nedostupan (timeout) — upit ide bez ograničenja");
      }

      if (!success) return false;
    }

    return true;
  } catch (error) {
    console.error("[contact] Rate limit nedostupan — upit ide bez ograničenja:", error);
    return true;
  }
}

/**
 * Vraća pokušaj potrošen u `isContactAllowed` kad slanje ne uspe — kvar Resend-a ne sme
 * da posetioca dovede do „Previše pokušaja" iako mu ništa nije stiglo (odluka vlasnika).
 */
export async function refundContactRateLimit(ip: string): Promise<void> {
  const limiters = createLimiters();

  if (!limiters) return;

  try {
    // Negativan `rate` umanjuje brojač bez provere limita
    await Promise.all(limiters.map((limiter) => limiter.limit(ip, { rate: -1 })));
  } catch (error) {
    console.error("[contact] Vraćanje pokušaja u rate limit nije uspelo:", error);
  }
}
