"use client";

import { useRef } from "react";
import { ArrowUpRight, BookOpen, Lock } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/work";
import { ProjectThumb } from "./ProjectThumb";

export function WorkCard({ project: p, onOpen, featured }: { project: Project; onOpen: (p: Project) => void; featured?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const sheenRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const finePtr = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !finePtr || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 6}deg)`;
    if (sheenRef.current) {
      sheenRef.current.style.setProperty("--mx", `${px * 100}%`);
      sheenRef.current.style.setProperty("--my", `${py * 100}%`);
    }
  }
  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }
  function open() {
    onOpen(p);
  }

  return (
    <article
      ref={ref}
      className={featured ? "kn-card kn-fcard" : "kn-card"}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a, button")) return;
        open();
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={featured ? { flex: "0 0 clamp(260px,72vw,320px)" } : undefined}
    >
      <div className="kn-thumb-wrap">
        {p.featured ? (
          <span style={{ position: "absolute", top: 10, left: 10, zIndex: 2, display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--fm)", fontSize: 10, textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 600, color: "var(--accent-ink)", background: "var(--accent)", borderRadius: 999, padding: "4px 9px" }}>Featured</span>
        ) : null}
        <ProjectThumb
          project={p}
          sizes={featured ? "(max-width: 640px) 72vw, 320px" : "(max-width: 640px) 92vw, (max-width: 1200px) 50vw, 640px"}
        />
        <span ref={sheenRef} className="kn-sheen" />
      </div>
      <div style={{ padding: 18 }}>
        <p style={{ fontFamily: "var(--fm)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--accent)", margin: "0 0 7px" }}>{p.category}</p>
        <h3 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 19, letterSpacing: "-.01em", margin: "0 0 9px" }}>{p.title}</h3>
        <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.55, margin: "0 0 14px" }}>{p.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {p.tech.map((t) => (
            <span key={t} style={{ fontFamily: "var(--fm)", fontSize: 11, color: "var(--ink-2)", border: "1px solid var(--hairline)", borderRadius: 999, padding: "3px 10px" }}>{t}</span>
          ))}
        </div>
        {p.action === "repo" ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>
            GitHub <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        ) : p.action === "prop" ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600, color: "var(--muted)" }}>
            <Lock size={14} strokeWidth={1.8} /> Proprietary
          </span>
        ) : (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 600, color: "var(--muted)" }}>
            <BookOpen size={15} strokeWidth={1.7} /> Academic
          </span>
        )}
      </div>
    </article>
  );
}
