import { Download } from "lucide-react";
import { experience, site } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";

const sec: React.CSSProperties = { padding: "clamp(64px,10vw,120px) 0", borderTop: "1px solid var(--hairline)" };

export function Experience() {
  return (
    <section id="experience" style={sec}>
      <Reveal>
        <Eyebrow style={{ marginBottom: 20 }}>{experience.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal>
        <h2 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "clamp(1.8rem,3.4vw,2.7rem)", letterSpacing: "-.02em", margin: "0 0 40px", lineHeight: 1.1 }}>{experience.headline}</h2>
      </Reveal>
      <div style={{ position: "relative", paddingLeft: 26 }}>
        <div style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: "var(--hairline)" }} />
        {experience.items.map((e, i) => (
          <Reveal key={i} className="kn-exp" style={{ position: "relative", marginBottom: i < experience.items.length - 1 ? 26 : 0, border: "1px solid var(--hairline)", borderRadius: 18, background: "var(--surface)", padding: "22px 24px" }}>
            <span style={{ position: "absolute", left: -26, top: 26, width: 11, height: 11, borderRadius: "50%", background: e.current ? "var(--accent)" : "var(--muted)", boxShadow: e.current ? "0 0 0 4px var(--accent-soft)" : "none" }} />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
              <h3 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 18, margin: 0 }}>{e.role}</h3>
              <span style={{ fontFamily: "var(--fm)", fontSize: 12, color: "var(--muted)" }}>{e.period}</span>
            </div>
            <p style={{ color: e.current ? "var(--accent)" : "var(--muted)", fontSize: 13.5, fontWeight: 500, margin: "4px 0 12px" }}>{e.org}</p>
            <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>{e.desc}</p>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <a href={site.resume} download style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 14, height: 50, padding: "0 24px", borderRadius: 14, background: "var(--accent)", color: "var(--accent-ink)", fontWeight: 600, fontSize: 14.5 }}>
          Download full résumé <Download size={16} strokeWidth={1.8} />
        </a>
      </Reveal>
    </section>
  );
}
