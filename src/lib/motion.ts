// Shared motion tokens (HANDOFF §2) so every animation shares one rhythm.
// Consumers must respect prefers-reduced-motion (MotionConfig reducedMotion="user" at root
// + useReducedMotion() for imperative/pointer effects), and gate pointer effects on
// (hover:hover) and (pointer:fine).

import type { Variants, Transition } from "framer-motion";

export const duration = { fast: 0.15, base: 0.25, slow: 0.45 } as const;

// enter = ease-out-expo, exit = ease-in
export const ease = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  in: [0.4, 0, 1, 1] as [number, number, number, number],
};

export const spring: Transition = { type: "spring", stiffness: 120, damping: 18 };

// Shared Reveal: fade-up (translateY 24px). IO threshold .12, bottom rootMargin -8%.
export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
};

export const revealViewport = { once: true, amount: 0.12, margin: "0px 0px -8% 0px" } as const;

// SplitText per-line mask: inner line translateY 112% → 0, 85ms stagger, .85s dur.
export const lineMask: Variants = {
  hidden: { y: "112%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.85, ease: ease.out, delay: 0.06 + i * 0.095 },
  }),
};

// Pointer-effect magnitudes lifted from the prototype.
export const magnetic = { x: 0.28, y: 0.34, scale: 1.03 } as const;
export const tiltMaxDeg = 6;
