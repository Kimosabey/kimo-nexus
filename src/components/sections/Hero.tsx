"use client";

import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { hero, site } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SplitText } from "../ui/SplitText";
import { Waveform } from "../ui/Waveform";
import { NumberTicker } from "../ui/NumberTicker";
import { useMagnetic } from "../ui/useMagnetic";

const ctaPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 10, height: 54, padding: "0 26px", borderRadius: 15, background: "var(--accent)", color: "var(--accent-ink)", fontWeight: 600, fontSize: 15, cursor: "pointer", border: 0, fontFamily: "inherit", transition: "transform .25s" };
const ctaGhost: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 10, height: 54, padding: "0 26px", borderRadius: 15, border: "1px solid var(--hairline)", color: "var(--ink)", fontWeight: 600, fontSize: 15, background: "var(--surface)", transition: "transform .25s" };

export function Hero({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  const mag = useMagnetic();
  return (
    <section id="hero" style={{ minHeight: "min(90dvh,780px)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "52px 0 40px", position: "relative" }}>
      <Reveal>
        <p style={{ fontFamily: "var(--fm)", fontSize: 12.5, textTransform: "uppercase", letterSpacing: ".28em", color: "var(--muted)", margin: "0 0 22px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 26, height: 1, background: "var(--accent)" }} />
          {hero.eyebrow}
        </p>
      </Reveal>
      <SplitText as="h2" lines={hero.lines} style={{ fontFamily: "var(--fd)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 0.94, margin: 0, fontSize: "clamp(2.7rem,8.4vw,6.6rem)" }} />
      <Reveal>
        <p style={{ maxWidth: "56ch", margin: "26px 0 0", fontSize: "clamp(15px,1.6vw,18px)", color: "var(--ink-2)", lineHeight: 1.65 }}>{hero.lead}</p>
      </Reveal>
      <Reveal style={{ marginTop: 30 }}>
        <Waveform bars={42} style={{ height: 34 }} />
      </Reveal>
      <Reveal style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 30 }}>
        <button type="button" onClick={() => onScrollTo("#work")} {...mag} style={ctaPrimary}>
          {hero.primaryCta.label} <ArrowRight size={17} strokeWidth={2} />
        </button>
        <a href={site.resume} download {...mag} style={ctaGhost}>
          Résumé <Download size={16} strokeWidth={1.8} />
        </a>
      </Reveal>
      <Reveal style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 44, paddingTop: 26, borderTop: "1px solid var(--hairline)" }}>
        {hero.stats.map((s) => (
          <div key={s.label}>
            <div style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "clamp(26px,3.4vw,38px)", color: "var(--accent)", letterSpacing: "-.02em" }}>
              <NumberTicker value={s.value} dec={s.dec} suffix={s.suffix} />
            </div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </Reveal>
      <button type="button" className="kn-badge" onClick={() => onScrollTo("#work")} aria-label="Scroll to my projects" style={{ position: "absolute", right: 0, bottom: 8, width: 104, height: 104, cursor: "pointer", background: "transparent", border: 0 }}>
        <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", animation: "kn-spin 16s linear infinite" }}>
          <defs>
            <path id="kncirc" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          <text style={{ fontFamily: "var(--fm)", fontSize: "9.4px", letterSpacing: ".24em", fill: "var(--muted)", textTransform: "uppercase" }}>
            <textPath href="#kncirc">MY PROJECTS · SCROLL DOWN · MY PROJECTS · </textPath>
          </text>
        </svg>
        <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
          <ArrowDown size={20} strokeWidth={2} />
        </span>
      </button>
    </section>
  );
}
