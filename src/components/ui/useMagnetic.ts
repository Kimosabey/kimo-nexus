"use client";

import { useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";

/**
 * Magnetic pull toward the cursor. Spread the returned handlers on any element
 * (give the element `transition: transform .25s` for a smooth release).
 * No-ops under reduced motion; touch devices simply never fire mousemove.
 */
export function useMagnetic(strengthX = 0.28, strengthY = 0.34, scale = 1.03) {
  const reduce = useReducedMotion();
  return {
    onMouseMove: (e: MouseEvent<HTMLElement>) => {
      if (reduce) return;
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${mx * strengthX}px, ${my * strengthY}px) scale(${scale})`;
    },
    onMouseLeave: (e: MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = "translate(0,0) scale(1)";
    },
  };
}
