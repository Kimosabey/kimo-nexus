"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { sections } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

/** Mobile burger + full-screen menu sheet (visible below 1024 via .kn-burger). */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Lock the page while the drawer is open: body overflow stops native scroll,
  // and data-lenis-prevent on the overlay stops Lenis from scrolling the page
  // behind it. Without this the drawer's scroll bleeds into the content below.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
        style={{ position: "fixed", top: "calc(14px + env(safe-area-inset-top, 0px))", right: "calc(14px + env(safe-area-inset-right, 0px))", zIndex: 70, width: 48, height: 48, alignItems: "center", justifyContent: "center", borderRadius: 14, border: "1px solid var(--hairline)", background: "var(--surface)", color: "var(--ink)", cursor: "pointer", boxShadow: "var(--shadow-card)" }}
      >
        {open ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
      </button>
      {open ? (
        <nav
          aria-label="Sections"
          data-lenis-prevent
          style={{ position: "fixed", inset: 0, zIndex: 65, background: "var(--canvas)", display: "flex", flexDirection: "column", padding: "max(88px, calc(72px + env(safe-area-inset-top, 0px))) 28px calc(32px + env(safe-area-inset-bottom, 0px))", gap: 4, overflowY: "auto", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch" }}
        >
          {sections.map((s) => (
            <button key={s.id} type="button" onClick={() => go(s.id)} style={{ fontFamily: "var(--fd)", fontSize: 28, fontWeight: 600, color: "var(--ink)", padding: "12px 0", minHeight: 52, background: "transparent", border: 0, textAlign: "left", cursor: "pointer" }}>
              {s.label}
            </button>
          ))}
        </nav>
      ) : null}
    </>
  );
}
