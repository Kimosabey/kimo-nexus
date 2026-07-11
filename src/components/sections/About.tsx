import Image from "next/image";
import { about, site } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { AccentLines } from "../ui/accent";
import { NumberTicker } from "../ui/NumberTicker";

const sec: React.CSSProperties = { padding: "clamp(64px,10vw,120px) 0", borderTop: "1px solid var(--hairline)" };

export function About() {
  return (
    <section id="about" style={sec}>
      <Reveal>
        <Eyebrow style={{ marginBottom: 20 }}>{about.eyebrow}</Eyebrow>
      </Reveal>
      <div className="kn-about-grid">
        <Reveal style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid var(--hairline)", aspectRatio: "4/5", maxWidth: 340, background: "var(--surface-2)" }}>
          <Image src={site.photo} alt={site.name} fill sizes="(max-width:760px) 90vw, 300px" className="kn-portrait" style={{ objectFit: "cover" }} />
          <div className="kn-duotone" />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, color-mix(in srgb,var(--canvas) 55%, transparent), transparent 32%)" }} />
        </Reveal>
        <div>
          <Reveal>
            <AccentLines lines={about.headline} style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "clamp(1.9rem,3.6vw,2.9rem)", lineHeight: 1.08, letterSpacing: "-.02em", margin: "0 0 24px" }} />
          </Reveal>
          {about.paragraphs.map((p, i) => (
            <Reveal key={i}>
              <p style={{ color: "var(--ink-2)", fontSize: 16, margin: "0 0 16px", maxWidth: "62ch" }}>{p}</p>
            </Reveal>
          ))}
          <Reveal>
            <p style={{ color: "var(--muted)", fontSize: 15, margin: "0 0 30px", maxWidth: "62ch" }}>{about.note}</p>
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 14 }}>
            {about.stats.map((s) => (
              <div key={s.label} style={{ border: "1px solid var(--hairline)", borderRadius: 16, padding: 18, background: "var(--surface)" }}>
                <div style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: 30, color: "var(--accent)", letterSpacing: "-.02em" }}>
                  <NumberTicker value={s.value} dec={s.dec} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
