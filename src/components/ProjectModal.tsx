"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, BookOpen, Lock, X } from "lucide-react";
import type { Project } from "@/lib/work";
import { ProjectThumb } from "./ui/ProjectThumb";

const chip: React.CSSProperties = { fontFamily: "var(--fm)", fontSize: 11, color: "var(--ink-2)", border: "1px solid var(--hairline)", borderRadius: 999, padding: "3px 10px" };

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;
    prevFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus.current?.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;
  const p = project;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="kn-modal-title" data-lenis-prevent style={{ position: "fixed", inset: 0, zIndex: 120, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={onClose} aria-hidden="true" style={{ position: "absolute", inset: 0, background: "color-mix(in srgb,var(--canvas) 68%,transparent)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }} />
      <div data-hidescroll style={{ position: "relative", width: "min(560px,100%)", maxHeight: "88dvh", overflow: "auto", overscrollBehavior: "contain", border: "1px solid var(--hairline)", borderRadius: 22, background: "var(--surface)", boxShadow: "var(--shadow-card)" }}>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 14, right: 14, zIndex: 3, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12, border: "1px solid var(--hairline)", background: "color-mix(in srgb,var(--surface) 82%,transparent)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", color: "var(--ink)", cursor: "pointer" }}>
          <X size={18} strokeWidth={2} />
        </button>
        <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: "var(--surface-2)" }}>
          <ProjectThumb project={p} sizes="560px" grayscale={false} />
        </div>
        <div style={{ padding: 26 }}>
          <p style={{ fontFamily: "var(--fm)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--accent)", margin: "0 0 8px" }}>{p.category}</p>
          <h3 id="kn-modal-title" style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 26, letterSpacing: "-.02em", margin: "0 0 14px" }}>{p.title}</h3>
          <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65, margin: "0 0 18px" }}>{p.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 22 }}>
            {p.tech.map((t) => (
              <span key={t} style={chip}>{t}</span>
            ))}
          </div>
          {p.action === "repo" ? (
            <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 46, padding: "0 20px", borderRadius: 12, background: "var(--accent)", color: "var(--accent-ink)", fontWeight: 600, fontSize: 14 }}>
              View on GitHub <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          ) : p.action === "prop" ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "var(--muted)" }}>
              <Lock size={15} strokeWidth={1.8} /> Proprietary — source under NDA
            </span>
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600, color: "var(--muted)" }}>
              <BookOpen size={16} strokeWidth={1.7} /> Academic research project
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
