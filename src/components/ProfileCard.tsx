"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Download, Mail, MapPin, Search } from "lucide-react";
import { site } from "@/lib/content";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Socials } from "./Socials";
import { useMagnetic } from "./ui/useMagnetic";

const iconBtn: React.CSSProperties = {
  width: 44,
  height: 44,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
  border: "1px solid var(--hairline)",
  background: "var(--surface-2)",
  color: "var(--ink)",
  cursor: "pointer",
};

export function ProfileCard({ onOpenPalette, onScrollTo }: { onOpenPalette: () => void; onScrollTo: (id: string) => void }) {
  const mag = useMagnetic();
  const [copyLabel, setCopyLabel] = useState<string>(site.email);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopyLabel("Copied to clipboard");
      setTimeout(() => setCopyLabel(site.email), 1600);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <aside className="kn-profile" data-hidescroll>
      <div style={{ border: "1px solid var(--hairline)", borderRadius: 24, background: "var(--surface)", boxShadow: "var(--shadow-card)", padding: 22, display: "flex", flexDirection: "column", gap: 18 }}>
        {/* logo + actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 34, height: 34, borderRadius: 11, background: "var(--accent)", color: "var(--accent-ink)", fontFamily: "var(--fd)", fontWeight: 700, fontSize: 13, letterSpacing: "-.03em", display: "flex", alignItems: "center", justifyContent: "center" }}>HA</span>
            <span style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 15, letterSpacing: "-.01em" }}>
              Harshan<span style={{ color: "var(--accent)" }}>.</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" aria-label="Search — Command K" onClick={onOpenPalette} style={iconBtn}>
              <Search size={18} strokeWidth={1.8} />
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* portrait */}
        <div className="kn-avatar" style={{ borderRadius: 18, overflow: "hidden", background: "var(--surface-2)" }}>
          <Image src={site.photo} alt={`Portrait of ${site.name}`} fill sizes="(max-width:1024px) 90vw, 300px" className="kn-portrait" style={{ objectFit: "cover" }} priority />
          <div className="kn-duotone" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, color-mix(in srgb,var(--surface) 70%, transparent), transparent 42%)" }} />
          <span style={{ position: "absolute", left: 12, bottom: 12, display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--fm)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--ink)", background: "color-mix(in srgb,var(--surface) 82%,transparent)", border: "1px solid var(--hairline)", borderRadius: 999, padding: "5px 11px" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 0 3px var(--accent-soft)" }} />
            Available for select work
          </span>
        </div>

        {/* name */}
        <div>
          <h1 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 23, lineHeight: 1.15, letterSpacing: "-.02em", margin: 0 }}>{site.name}</h1>
          <p style={{ margin: "6px 0 0", color: "var(--muted)", fontSize: 13.5, fontWeight: 500 }}>{site.role}</p>
        </div>

        {/* contact */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)", padding: "14px 0" }}>
          <button type="button" onClick={copyEmail} style={{ display: "flex", alignItems: "center", gap: 11, background: "transparent", border: 0, padding: "8px 0", color: "var(--ink-2)", cursor: "pointer", textAlign: "left", fontSize: 13.5, fontFamily: "inherit" }}>
            <span style={{ color: "var(--accent)", flexShrink: 0, display: "flex" }}><Mail size={17} strokeWidth={1.8} /></span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: copyLabel === site.email ? "var(--ink-2)" : "var(--accent)" }}>{copyLabel}</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 0", color: "var(--ink-2)", fontSize: 13.5 }}>
            <span style={{ color: "var(--accent)", flexShrink: 0, display: "flex" }}><MapPin size={17} strokeWidth={1.8} /></span>
            <span>{site.location}</span>
          </div>
        </div>

        <Socials />

        {/* CTAs */}
        <button type="button" onClick={() => onScrollTo("#contact")} {...mag} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, height: 50, borderRadius: 14, background: "var(--accent)", color: "var(--accent-ink)", fontWeight: 600, fontSize: 14.5, cursor: "pointer", border: 0, fontFamily: "inherit", transition: "transform .25s" }}>
          Get in touch <ArrowRight size={17} strokeWidth={2} />
        </button>
        <a href={site.resume} download style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, height: 48, borderRadius: 14, border: "1px solid var(--hairline)", color: "var(--ink)", fontWeight: 600, fontSize: 14, background: "transparent" }}>
          Résumé <Download size={16} strokeWidth={1.8} />
        </a>
      </div>
    </aside>
  );
}
