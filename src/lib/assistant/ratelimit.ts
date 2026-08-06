// Abuse control for a public AI endpoint, sized for a free tier.
//
// This is module-scope state, so it's per-serverless-instance and resets on cold
// start — deliberately. The endpoint only ever calls $0 models, so the worst case
// an attacker can buy is a day of degraded answers, never a bill. That makes an
// in-process limiter the right amount of machinery; Redis would be protecting
// money that cannot be spent.

/** OpenRouter free tier: 50 requests/day with no credit held, 20 requests/min. */
const PROVIDER_DAILY_CAP = Number(process.env.OPENROUTER_DAILY_CAP ?? 50);
/** Leave headroom so the quota is never fully drained by this one endpoint. */
const DAILY_BUDGET = Math.max(1, Math.floor(PROVIDER_DAILY_CAP * 0.8));

const IP_BURST = 5; // questions a single visitor may fire back-to-back
const IP_REFILL_MS = 20_000; // then one more every 20s

type Bucket = { tokens: number; last: number };
const buckets = new Map<string, Bucket>();
let day = "";
let spentToday = 0;

/** UTC day key. Passed the clock explicitly so callers stay testable. */
const dayKey = (now: number) => new Date(now).toISOString().slice(0, 10);

function rollDay(now: number) {
  const k = dayKey(now);
  if (k !== day) {
    day = k;
    spentToday = 0;
  }
}

/** Keeps the map from growing without bound on a long-lived warm instance. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [ip, b] of buckets) {
    if (now - b.last > 10 * 60_000) buckets.delete(ip);
  }
}

export type Verdict =
  | { ok: true; remaining: number }
  /** Slow down, same visitor. */
  | { ok: false; reason: "throttled"; retryAfterSec: number }
  /** Day's free-tier budget spent — caller should serve local mode. */
  | { ok: false; reason: "budget"; remaining: 0 };

/**
 * Reserves one provider request. Call once per LLM-bound request, and release it
 * with `refund()` if the provider never actually ran.
 */
export function take(ip: string, now = Date.now()): Verdict {
  rollDay(now);
  sweep(now);

  const b = buckets.get(ip) ?? { tokens: IP_BURST, last: now };
  const refilled = Math.min(IP_BURST, b.tokens + Math.floor((now - b.last) / IP_REFILL_MS));

  if (refilled < 1) {
    const waitMs = IP_REFILL_MS - ((now - b.last) % IP_REFILL_MS);
    return { ok: false, reason: "throttled", retryAfterSec: Math.max(1, Math.ceil(waitMs / 1000)) };
  }

  if (spentToday >= DAILY_BUDGET) return { ok: false, reason: "budget", remaining: 0 };

  buckets.set(ip, { tokens: refilled - 1, last: now });
  spentToday += 1;
  return { ok: true, remaining: Math.max(0, DAILY_BUDGET - spentToday) };
}

/** Hand back a reservation the provider never consumed (connection refused, no key). */
export function refund(now = Date.now()) {
  rollDay(now);
  spentToday = Math.max(0, spentToday - 1);
}

export function remainingToday(now = Date.now()): number {
  rollDay(now);
  return Math.max(0, DAILY_BUDGET - spentToday);
}

/** Best-effort client IP behind Vercel's proxy. Only ever used as a rate-limit key. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}
