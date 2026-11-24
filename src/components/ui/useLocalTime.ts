"use client";

import { useEffect, useState } from "react";

/**
 * Live "HH:MM" in a given IANA time zone, ticking each minute. Returns null on the server
 * and first client render so SSR and hydration agree; callers render a placeholder.
 */
export function useLocalTime(timeZone: string): string | null {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    // Align to the next minute boundary, then tick every minute.
    let iv: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      tick();
      iv = setInterval(tick, 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(t);
      if (iv) clearInterval(iv);
    };
  }, [timeZone]);
  return now;
}
