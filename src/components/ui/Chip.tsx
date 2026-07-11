import type { CSSProperties, ReactNode } from "react";

/** Mono pill for tech tags / skills. */
export function Chip({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: "var(--fm)",
        fontSize: 12,
        color: "var(--ink-2)",
        border: "1px solid var(--hairline)",
        borderRadius: 999,
        padding: "5px 12px",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
