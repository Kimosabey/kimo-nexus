"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/** Counts up to `value` once when scrolled into view; respects reduced motion. */
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
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const dur = reduce ? 0 : 1400;
    const start = performance.now();
    const tick = (t: number) => {
      const p = dur ? Math.min(1, (t - start) / dur) : 1;
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className} style={style}>
      {display.toFixed(dec)}
      {suffix}
    </span>
  );
}
