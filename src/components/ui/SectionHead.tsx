import type { ReactNode } from "react";
import { sectionIndex } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

/** "(02) About ——————" index row + line-masked title + optional sub and right-hand slot. */
export function SectionHead({ id, label, lines, sub, aside }: { id: string; label: string; lines: readonly string[]; sub?: ReactNode; aside?: ReactNode }) {
  return (
    <header className="kn-head">
      <Reveal className="kn-head-meta">
        <span className="kn-idx">({sectionIndex(id)})</span>
        <span className="kn-label">{label}</span>
      </Reveal>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px 40px" }}>
        <SplitText lines={lines} trigger="view" className="kn-h2" id={`${id}-title`} />
        {aside}
      </div>
      {sub ? <Reveal><p className="kn-sub">{sub}</p></Reveal> : null}
    </header>
  );
}
