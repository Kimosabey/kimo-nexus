import type { CSSProperties, ElementType, ReactNode } from "react";

/** Renders a string, wrapping any {accent:…} token in the accent color. */
export function accentize(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\{accent:([^}]*)\}/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <span key={`a${key++}`} style={{ color: "var(--accent)" }}>
        {m[1]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Plain-text version of a line (strips {accent:…} wrappers) — for aria-labels. */
export function plain(text: string): string {
  return text.replace(/\{accent:([^}]*)\}/g, "$1");
}

/** Multi-line heading (line breaks between entries) with {accent:…} tokens colored. */
export function AccentLines({
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
        <span key={i} aria-hidden="true">
          {i > 0 ? <br /> : null}
          {accentize(line)}
        </span>
      ))}
    </Tag>
  );
}
