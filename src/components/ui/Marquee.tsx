import type { CSSProperties, ReactNode } from "react";

/**
 * Infinite CSS marquee. Content is rendered twice; the copy is aria-hidden so screen
 * readers read it once. Pauses on hover; under reduced motion the track stops and the
 * copy is hidden (globals.css).
 */
export function Marquee({ children, duration = 40, reverse = false, className, style }: { children: ReactNode; duration?: number; reverse?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={{ overflow: "hidden", ...style }}>
      <div className="kn-track" data-rev={reverse} style={{ "--dur": `${duration}s` } as CSSProperties}>
        <div style={{ display: "flex", flexShrink: 0 }}>{children}</div>
        <div style={{ display: "flex", flexShrink: 0 }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
