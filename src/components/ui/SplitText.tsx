"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { lineMask, revealViewport } from "@/lib/motion";
import { accentize, plain } from "./accent";

const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div } as const;

/**
 * Heading that reveals per-line out of a clipping mask; {accent:…} tokens styled.
 * `trigger="mount"` plays on load (hero); `"view"` plays when scrolled into view (sections).
 * The trigger lives on the heading itself and propagates to the lines: the lines start
 * clipped by their mask, so observing them directly would never report them visible.
 */
export function SplitText({
  lines,
  as = "h2",
  className,
  style,
  trigger = "mount",
  play = true,
  id,
}: {
  lines: readonly string[];
  as?: keyof typeof TAGS;
  className?: string;
  style?: CSSProperties;
  trigger?: "mount" | "view";
  /** Mount trigger only: hold the reveal until true (the hero waits for the intro). */
  play?: boolean;
  id?: string;
}) {
  const Tag = TAGS[as];
  const anim = trigger === "mount" ? { animate: play ? "show" : "hidden" } : { whileInView: "show", viewport: revealViewport };
  return (
    <Tag id={id} className={className} style={style} aria-label={lines.map(plain).join(" ")} initial="hidden" {...anim}>
      {lines.map((line, i) => (
        <span key={i} className="kn-mline" aria-hidden="true">
          <motion.span className="kn-min" custom={i} variants={lineMask}>
            {accentize(line)}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
