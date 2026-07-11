"use client";

import { useEffect, useState } from "react";
import { Briefcase, Code2, GitBranch, Home, Layers, Mail, MessagesSquare, User } from "lucide-react";
import type { ComponentType } from "react";
import { sections } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

const ICON: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  hero: Home,
  about: User,
  services: Layers,
  skills: Code2,
  work: Briefcase,
  experience: GitBranch,
  testimonials: MessagesSquare,
  contact: Mail,
};

/** Right-edge vertical nav rail with scroll-spy (desktop only via .kn-rail). */
export function Rail() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <aside
      className="kn-rail"
      aria-label="Section navigation"
      style={{ position: "fixed", top: "50%", right: 18, transform: "translateY(-50%)", zIndex: 50, flexDirection: "column", gap: 6, padding: "10px 8px", border: "1px solid var(--hairline)", borderRadius: 999, background: "color-mix(in srgb, var(--surface) 78%, transparent)", backdropFilter: "blur(10px)" }}
    >
      {sections.map((s) => {
        const Icon = ICON[s.id] ?? Home;
        const on = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            className="kn-rail-btn"
            data-active={on}
            aria-label={s.label}
            aria-current={on ? "true" : undefined}
            title={s.label}
            onClick={() => scrollToId(`#${s.id}`)}
            style={{ position: "relative", width: 42, height: 42, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "1px solid transparent", background: "transparent", color: "var(--muted)", cursor: "pointer", transition: ".25s" }}
          >
            <Icon size={18} strokeWidth={1.8} />
            <span className="kn-rail-lbl" aria-hidden="true">{s.label}</span>
          </button>
        );
      })}
    </aside>
  );
}
