"use client";

import { useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects, featuredProjects, filters, type Project } from "@/lib/work";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { AccentLines } from "../ui/accent";
import { WorkCard } from "../ui/WorkCard";

const sec: React.CSSProperties = { padding: "clamp(64px,10vw,120px) 0", borderTop: "1px solid var(--hairline)" };
const navBtn: React.CSSProperties = { width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, border: "1px solid var(--hairline)", background: "var(--surface)", color: "var(--ink)", cursor: "pointer" };
const filterBtn: React.CSSProperties = { flex: "0 0 auto", height: 40, padding: "0 16px", borderRadius: 999, border: "1px solid var(--hairline)", background: "var(--surface)", color: "var(--muted)", fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", transition: ".25s", fontFamily: "inherit" };

// Filter state lives in Portfolio so the assistant can drive it too.
export function Work({ onOpenProject, filter, onFilterChange }: { onOpenProject: (p: Project) => void; filter: string; onFilterChange: (f: string) => void }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const filtered = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.group === filter)), [filter]);

  function scrollByCard(dir: number) {
    const strip = stripRef.current;
    if (!strip) return;
    const first = strip.querySelector<HTMLElement>(".kn-fcard");
    const w = first ? first.getBoundingClientRect().width + 16 : 300;
    strip.scrollBy({ left: dir * w, behavior: "smooth" });
  }

  return (
    <section id="work" style={sec}>
      <Reveal>
        <Eyebrow style={{ marginBottom: 20 }}>Selected work</Eyebrow>
      </Reveal>
      <Reveal>
        <AccentLines lines={["Things I've {accent:shipped}."]} style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "clamp(1.8rem,3.4vw,2.7rem)", letterSpacing: "-.02em", margin: "0 0 24px", lineHeight: 1.1 }} />
      </Reveal>

      <Reveal>
        <div style={{ margin: "0 0 34px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "var(--fm)", fontSize: 12, textTransform: "uppercase", letterSpacing: ".16em", color: "var(--muted)", margin: 0 }}>Featured</h3>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" aria-label="Previous featured projects" onClick={() => scrollByCard(-1)} style={navBtn}><ChevronLeft size={17} strokeWidth={2} /></button>
              <button type="button" aria-label="Next featured projects" onClick={() => scrollByCard(1)} style={navBtn}><ChevronRight size={17} strokeWidth={2} /></button>
            </div>
          </div>
          <div ref={stripRef} data-hidescroll style={{ display: "flex", gap: 16, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 4 }}>
            {featuredProjects.map((p) => (
              <WorkCard key={p.id} project={p} onOpen={onOpenProject} featured />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div data-hidescroll style={{ display: "flex", gap: 9, overflowX: "auto", paddingBottom: 6, marginBottom: 30 }}>
          {filters.map((f) => (
            <button key={f} type="button" className="kn-filter" data-active={filter === f} onClick={() => onFilterChange(f)} style={filterBtn}>{f}</button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <p style={{ fontFamily: "var(--fm)", fontSize: 12, color: "var(--muted)", margin: "0 0 18px" }}>
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </p>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18 }}>
        {filtered.map((p) => (
          <WorkCard key={p.id} project={p} onOpen={onOpenProject} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 24 }}>No projects in this category.</p>
      ) : null}
    </section>
  );
}
