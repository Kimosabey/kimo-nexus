import { skills } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { Chip } from "../ui/Chip";

const sec: React.CSSProperties = { padding: "clamp(64px,10vw,120px) 0", borderTop: "1px solid var(--hairline)" };

export function Skills() {
  const loop = [...skills.marquee, ...skills.marquee];
  return (
    <section id="skills" style={sec}>
      <Reveal>
        <Eyebrow style={{ marginBottom: 20 }}>{skills.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal>
        <h2 style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "clamp(1.8rem,3.4vw,2.7rem)", letterSpacing: "-.02em", margin: "0 0 32px", lineHeight: 1.1 }}>{skills.headline}</h2>
      </Reveal>
      <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "22px 40px" }}>
        {skills.groups.map((g) => (
          <div key={g.label}>
            <h4 style={{ fontFamily: "var(--fm)", fontSize: 11.5, textTransform: "uppercase", letterSpacing: ".16em", color: "var(--accent)", margin: "0 0 12px" }}>{g.label}</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {g.items.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
      <Reveal className="kn-marquee-wrap" style={{ marginTop: 38, borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)", padding: "20px 0", overflow: "hidden", position: "relative" }}>
        <div className="kn-marquee" style={{ display: "flex", gap: 44, width: "max-content", whiteSpace: "nowrap", animation: "kn-marquee 32s linear infinite" }}>
          {loop.map((t, i) => (
            <span key={i} style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 17, color: "var(--muted)" }}>{t}</span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
