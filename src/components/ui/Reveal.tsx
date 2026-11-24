"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { reveal, revealViewport } from "@/lib/motion";

/** Scroll-in fade-up (translateY 24px), reduced-motion handled by MotionConfig. `as="li"` inside lists. */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
  as = "div",
  play,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  as?: "div" | "li";
  /** When set, plays on this flag instead of on scroll-in (above-the-fold hero choreography). */
  play?: boolean;
}) {
  const Tag = as === "li" ? motion.li : motion.div;
  return (
    <Tag className={className} style={style} variants={reveal} initial="hidden" {...(play === undefined ? { whileInView: "show", viewport: revealViewport } : { animate: play ? "show" : "hidden" })} transition={{ delay }}>
      {children}
    </Tag>
  );
}
