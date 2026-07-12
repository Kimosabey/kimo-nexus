import type { CSSProperties } from "react";

/**
 * Animated equalizer/waveform bars — the signature motif. Deterministic markup
 * (no client-only hooks → hydration-safe); the global prefers-reduced-motion CSS
 * neutralizes the animation for reduced-motion users.
 */
export function Waveform({ bars = 42, style }: { bars?: number; style?: CSSProperties }) {
  return (
    <div aria-hidden="true" style={{ display: "flex", alignItems: "flex-end", gap: 3, ...style }}>
      {Array.from({ length: bars }).map((_, i) => {
        // Rounded to fixed precision so the SSR string and the browser-normalized
        // inline style are byte-identical (avoids React 19 style hydration diffs).
        const delay = ((Math.sin(i * 0.6) * 0.5 + 0.5) * 1.1).toFixed(3);
        const dur = (1.1 + (i % 5) * 0.18).toFixed(2);
        // Only per-bar timing is inline (as custom props React serializes verbatim);
        // all visual style lives in the .kn-bar CSS class → hydration-stable.
        return <span key={i} className="kn-bar" style={{ "--kn-d": `${dur}s`, "--kn-dl": `${delay}s` } as CSSProperties} />;
      })}
    </div>
  );
}
