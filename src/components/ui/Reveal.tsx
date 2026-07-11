"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { reveal } from "@/lib/motion";

/** Scroll-in fade-up (translateY 24px), reduced-motion handled by MotionConfig. */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
