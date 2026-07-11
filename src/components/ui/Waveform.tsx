"use client";

import { useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

/** Animated equalizer/waveform bars — the signature motif. Static under reduced motion. */
export function Waveform({ bars = 42, style }: { bars?: number; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" style={{ display: "flex", alignItems: "flex-end", gap: 3, ...style }}>
      {Array.from({ length: bars }).map((_, i) => {
        const delay = (Math.sin(i * 0.6) * 0.5 + 0.5) * 1.1;
        const dur = 1.1 + (i % 5) * 0.18;
        return (
          <span
            key={i}
            style={{
              flex: 1,
              minWidth: 2,
              maxWidth: 5,
              height: "100%",
              borderRadius: 3,
              background: "linear-gradient(var(--accent),color-mix(in srgb,var(--accent) 30%,transparent))",
              transformOrigin: "bottom",
              transform: "scaleY(.4)",
              animation: reduce ? "none" : `kn-eq ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
