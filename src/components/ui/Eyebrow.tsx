import type { CSSProperties, ReactNode } from "react";

/** Mono section label. `dot` = section eyebrow; `line` = hero eyebrow. */
export function Eyebrow({
  children,
  variant = "dot",
  style,
}: {
  children: ReactNode;
  variant?: "dot" | "line";
  style?: CSSProperties;
}) {
  const line = variant === "line";
  return (
    <p
      style={{
        fontFamily: "var(--fm)",
        fontSize: line ? 12.5 : 12,
        textTransform: "uppercase",
        letterSpacing: line ? ".28em" : ".24em",
        color: "var(--muted)",
        margin: 0,
        display: "flex",
        alignItems: "center",
        gap: line ? 10 : 9,
        ...style,
      }}
    >
      {line ? (
        <span style={{ width: 26, height: 1, background: "var(--accent)" }} />
      ) : (
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />
      )}
      {children}
    </p>
  );
}
