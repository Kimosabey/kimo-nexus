"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { FINE_POINTER, useMedia } from "./ui/useMedia";

/**
 * Context cursor: a dot that tracks exactly + a ring that trails on a spring. Over any
 * element with `data-cursor="Label"` the ring grows into a labelled disc; over links and
 * buttons it widens. Fine pointers only, never under reduced motion, and the system cursor
 * is never hidden — keyboard and assistive-tech users are unaffected.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const enabled = useMedia(FINE_POINTER) && !reduce;
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 36, mass: 0.5 });
  const last = useRef<Element | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      if (t === last.current) return;
      last.current = t;
      const labelled = t?.closest?.("[data-cursor]");
      setLabel(labelled ? labelled.getAttribute("data-cursor") : null);
      setHover(!labelled && !!t?.closest?.("a, button, [role='button'], input, textarea"));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <div className="kn-cursor" aria-hidden="true" data-label={label ?? undefined} data-hover={hover} style={{ opacity: visible ? 1 : 0, transition: "opacity .2s" }}>
      <motion.div className="kn-cursor-ring" style={{ x: rx, y: ry }}>
        <span className="kn-cursor-text">{label}</span>
      </motion.div>
      <motion.div className="kn-cursor-dot" style={{ x, y }} />
    </div>
  );
}
