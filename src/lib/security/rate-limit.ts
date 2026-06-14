import "server-only";
import { headers } from "next/headers";

/**
 * Lightweight in-memory fixed-window rate limiter.
 *
 * Suitable for a single-instance deployment / dev. For multi-instance
 * production, swap the Map for Redis/Upstash behind the same interface.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

// Opportunistic cleanup so the Map can't grow unbounded.
function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key);
  }
}

export type RateResult = { allowed: boolean; remaining: number; retryAfter: number };

export function rateLimit(key: string, max: number, windowSeconds: number): RateResult {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfter: 0 };
  }

  if (existing.count >= max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { allowed: true, remaining: max - existing.count, retryAfter: 0 };
}

/** Best-effort client IP from proxy headers (never trusted for auth, only keys). */
export async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}
