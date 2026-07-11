"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { sections } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

/** Mobile burger + full-screen menu sheet (visible below 1024 via .kn-burger). */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(`#${id}`), 0);
  };
  return (
    <>
      <button
        type="button"
        className="kn-burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{ position: "fixed", top: 14, right: 14, zIndex: 70, width: 48, height: 48, alignItems: "center", justifyContent: "center", borderRadius: 14, border: "1px solid var(--hairline)", background: "var(--surface)", color: "var(--ink)", cursor: "pointer" }}
      >
        {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
      </button>
      {open ? (
        <nav aria-label="Sections" style={{ position: "fixed", inset: 0, zIndex: 65, background: "var(--canvas)", display: "flex", flexDirection: "column", padding: "88px 28px 32px", gap: 6 }}>
          {sections.map((s) => (
            <button key={s.id} type="button" onClick={() => go(s.id)} style={{ fontFamily: "var(--fd)", fontSize: 28, fontWeight: 600, color: "var(--ink)", padding: "10px 0", background: "transparent", border: 0, textAlign: "left", cursor: "pointer" }}>
              {s.label}
            </button>
          ))}
        </nav>
      ) : null}
    </>
  );
}
