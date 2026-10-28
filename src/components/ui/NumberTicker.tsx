"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Counts up to `value` once when scrolled into view; respects reduced motion.
 * Renders the final value on the server and first paint (crawlers, link previews,
 * no-JS); only tickers that start off-screen reset to 0 and animate, so nothing flashes.
 */
export function NumberTicker({
  value,
  dec = 0,
  suffix = "",
  className,
  style,
}: {
  value: number;
  dec?: number;
  suffix?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const armed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    armed.current = true;
    const raf = requestAnimationFrame(() => setDisplay(0));
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  useEffect(() => {
    if (!inView || !armed.current) return;
    armed.current = false;
    let raf = 0;
    const dur = 1400;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className={className} style={style}>
      {display.toFixed(dec)}
      {suffix}
    </span>
  );
}
