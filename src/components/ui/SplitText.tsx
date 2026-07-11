"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ElementType } from "react";
import { lineMask } from "@/lib/motion";
import { accentize, plain } from "./accent";

/** Heading that reveals per-line out of a clipping mask; {accent:…} tokens colored. */
export function SplitText({
  lines,
  as: Tag = "h2",
  className,
  style,
}: {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Tag className={className} style={style} aria-label={lines.map(plain).join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="kn-mline" aria-hidden="true">
          <motion.span
            className="kn-min"
            style={{ display: "block" }}
            custom={i}
            variants={lineMask}
            initial="hidden"
            animate="show"
          >
            {accentize(line)}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
