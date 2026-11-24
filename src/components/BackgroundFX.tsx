/**
 * CSS-only atmosphere: a masked hairline grid + drifting signal glow behind the hero, and
 * a fixed film grain. Replaces the rAF dot-grid canvas, which repainted on every scroll
 * frame (perf persona, docs/design/REVAMP_2027.md). Drift is neutralised under reduced motion.
 */
export function BackgroundFX() {
  return (
    <>
      <div aria-hidden="true" style={{ position: "absolute", inset: "0 0 auto 0", height: "120vh", overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div className="kn-bg-grid" />
        <div className="kn-bg-glow" />
      </div>
      <div aria-hidden="true" className="kn-grain" />
    </>
  );
}
