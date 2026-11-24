import { Fragment, type CSSProperties, type ReactNode } from "react";

/**
 * Infinite CSS marquee. `repeat` tiles short content so one copy is wider than the viewport
 * (otherwise the loop shows a gap); the track then holds two such copies and slides -50%.
 * Only the very first tile is exposed to assistive tech; every repeat is aria-hidden, and
 * under reduced motion the repeats are hidden and the track stops (globals.css).
 */
export function Marquee({ children, duration = 40, reverse = false, repeat = 1, className, style }: { children: ReactNode; duration?: number; reverse?: boolean; repeat?: number; className?: string; style?: CSSProperties }) {
  const tiles = (hideFirst: boolean) =>
    Array.from({ length: repeat }, (_, i) =>
      i === 0 && !hideFirst ? (
        <Fragment key={i}>{children}</Fragment>
      ) : (
        <div key={i} aria-hidden="true" style={{ display: "flex", flexShrink: 0 }}>
          {children}
        </div>
      ),
    );
  return (
    <div className={className} style={{ overflow: "hidden", ...style }}>
      <div className="kn-track" data-rev={reverse} style={{ "--dur": `${duration}s` } as CSSProperties}>
        <div style={{ display: "flex", flexShrink: 0 }}>{tiles(false)}</div>
        <div style={{ display: "flex", flexShrink: 0 }} aria-hidden="true">
          {tiles(true)}
        </div>
      </div>
    </div>
  );
}
