"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { navLinks, sections, site } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";
import { useTheme } from "@/app/providers";
import { ease } from "@/lib/motion";

const R = 20; // progress ring radius (44px mark)
const C = 2 * Math.PI * R;

/**
 * Floating "island" nav — replaces the sidebar card, icon rail, burger and top progress bar.
 * Monogram doubles as the scroll-progress ring and a back-to-top button.
 */
export function IslandNav({ onAsk }: { onAsk: () => void }) {
  const { theme, toggle, mounted } = useTheme();
  const reduce = useReducedMotion();
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Scroll progress → ring (direct DOM write; no re-render per scroll frame).
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      ringRef.current?.setAttribute("stroke-dashoffset", String(C * (1 - p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy across every section (the pill shows only for linked ones).
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobile sheet: lock page scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const burger = burgerRef.current;
    // Move focus into the sheet; give it back to the burger on close.
    requestAnimationFrame(() => document.querySelector<HTMLElement>("#kn-sheet .kn-sheet-link")?.focus());
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToId(`#${id}`), 0);
  };
  const dark = theme === "dark";
  const links = navLinks.map((id) => sections.find((s) => s.id === id)!);

  return (
    <>
      <nav className="kn-island" aria-label="Primary">
        <button type="button" className="kn-island-mark" onClick={() => go("hero")} aria-label="Back to top">
          <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
            <circle cx="22" cy="22" r={R} fill="none" stroke="var(--hairline)" strokeWidth="1.5" />
            <circle ref={ringRef} cx="22" cy="22" r={R} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} />
          </svg>
          <span aria-hidden="true">HA</span>
        </button>

        <div className="kn-island-links">
          {links.map((s) => {
            const on = active === s.id;
            return (
              <button key={s.id} type="button" className="kn-island-link" data-active={on} aria-current={on ? "true" : undefined} onClick={() => go(s.id)}>
                {on ? <motion.span layoutId="kn-island-pill" className="kn-island-pill" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }} /> : null}
                {s.label}
              </button>
            );
          })}
        </div>

        <button type="button" className="kn-island-ask" onClick={onAsk} aria-label="Ask the portfolio assistant (Command K)">
          <Sparkles size={15} strokeWidth={2} aria-hidden="true" />
          Ask
          <kbd aria-hidden="true">⌘K</kbd>
        </button>
        <a href={site.resume} download className="kn-island-icon" aria-label="Download résumé (PDF)" title="Résumé">
          <Download size={18} strokeWidth={1.8} />
        </a>
        <button
          type="button"
          className="kn-island-icon"
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={dark}
          onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
        >
          {mounted && !dark ? <Moon size={18} strokeWidth={1.8} /> : <Sun size={18} strokeWidth={1.8} />}
        </button>
        <button ref={burgerRef} type="button" className="kn-island-icon kn-island-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="kn-sheet" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="kn-sheet"
            className="kn-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: ease.out }}
          >
            <nav aria-label="Sections">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  type="button"
                  className="kn-sheet-link"
                  onClick={() => go(s.id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.04, duration: 0.5, ease: ease.out }}
                >
                  <small>{String(i).padStart(2, "0")}</small>
                  {s.label}
                </motion.button>
              ))}
            </nav>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
              <a href={site.resume} download className="kn-btn kn-btn--accent">
                Résumé <Download size={16} strokeWidth={1.8} />
              </a>
              <a href={`mailto:${site.email}`} className="kn-btn kn-btn--ghost">
                Email
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
