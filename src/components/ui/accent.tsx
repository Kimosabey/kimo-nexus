import type { ReactNode } from "react";

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
