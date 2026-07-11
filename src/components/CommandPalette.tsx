"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { sections } from "@/lib/content";
import { projects, type Project } from "@/lib/work";
import { scrollToId } from "@/lib/scroll";

type Item = { type: "Section"; label: string; target: string } | { type: "Project"; label: string; category: string; project: Project };

export function CommandPalette({ open, onClose, onOpenProject }: { open: boolean; onClose: () => void; onOpenProject: (p: Project) => void }) {
  const [q, setQ] = useState("");
  const [hi, setHi] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const all: Item[] = useMemo(
    () => [
      ...sections.map((s) => ({ type: "Section" as const, label: s.label, target: `#${s.id}` })),
      ...projects.map((p) => ({ type: "Project" as const, label: p.title, category: p.category, project: p })),
    ],
    [],
  );
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return all;
    return all.filter((i) => i.label.toLowerCase().includes(t) || (i.type === "Project" && i.category.toLowerCase().includes(t)));
  }, [q, all]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      setQ("");
      setHi(0);
      inputRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [open]);
  useEffect(() => {
    const row = listRef.current?.querySelectorAll<HTMLElement>(".kn-pal-row")[hi];
    row?.scrollIntoView({ block: "nearest" });
  }, [hi]);

  if (!open) return null;

  const select = (i: number) => {
    const it = filtered[i];
    if (!it) return;
    onClose();
    if (it.type === "Section") scrollToId(it.target);
    else onOpenProject(it.project);
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((h) => Math.min(filtered.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(hi);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Command palette" style={{ position: "fixed", inset: 0, zIndex: 150, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "12vh 20px 20px" }}>
      <div onClick={onClose} aria-hidden="true" style={{ position: "absolute", inset: 0, background: "color-mix(in srgb,var(--canvas) 66%,transparent)", backdropFilter: "blur(6px)" }} />
      <div style={{ position: "relative", width: "min(560px,100%)", border: "1px solid var(--hairline)", borderRadius: 18, background: "var(--surface)", boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ color: "var(--muted)", display: "flex" }}><Search size={18} strokeWidth={1.8} /></span>
          <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setHi(0); }} onKeyDown={onKey} type="text" role="combobox" aria-expanded aria-controls="kn-pal-list" aria-autocomplete="list" placeholder="Jump to a section or project…" style={{ flex: 1, border: 0, background: "transparent", color: "var(--ink)", fontSize: 15, fontFamily: "inherit", outline: "none" }} />
          <span style={{ fontFamily: "var(--fm)", fontSize: 10.5, color: "var(--muted)", border: "1px solid var(--hairline)", borderRadius: 6, padding: "3px 7px" }}>ESC</span>
        </div>
        <div id="kn-pal-list" ref={listRef} role="listbox" aria-label="Results" data-hidescroll style={{ maxHeight: "52vh", overflow: "auto", padding: 8 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 16, color: "var(--muted)", fontSize: 14 }}>No matches</div>
          ) : (
            filtered.map((it, i) => (
              <button key={`${it.type}-${it.label}`} type="button" role="option" aria-selected={i === hi} className="kn-pal-row" onClick={() => select(i)} onMouseMove={() => setHi(i)} style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "11px 12px", borderRadius: 10, border: 0, cursor: "pointer", textAlign: "left", background: i === hi ? "var(--accent-soft)" : "transparent", color: "var(--ink)", fontFamily: "inherit" }}>
                <span style={{ fontSize: 14 }}>{it.label}</span>
                <span style={{ fontFamily: "var(--fm)", fontSize: 10.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em" }}>{it.type}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
