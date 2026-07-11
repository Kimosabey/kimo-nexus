import { testimonials } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { AccentLines } from "../ui/accent";

const sec: React.CSSProperties = { padding: "clamp(64px,10vw,120px) 0", borderTop: "1px solid var(--hairline)" };

export function Testimonials() {
  return (
    <section id="testimonials" style={sec}>
      <Reveal>
        <Eyebrow style={{ marginBottom: 20 }}>{testimonials.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal>
        <AccentLines lines={testimonials.headline} style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "clamp(1.8rem,3.4vw,2.7rem)", letterSpacing: "-.02em", margin: "0 0 36px", lineHeight: 1.1 }} />
      </Reveal>
      <div className="kn-testi">
        {testimonials.items.map((t) => (
          <Reveal key={t.name} style={{ breakInside: "avoid", marginBottom: 18 }}>
            <figure style={{ margin: 0, border: "1px solid var(--hairline)", borderRadius: 18, background: "var(--surface)", padding: 24 }}>
              <span style={{ fontFamily: "var(--fd)", fontSize: 40, lineHeight: 0.6, color: "var(--accent)", display: "block", height: 22 }}>&ldquo;</span>
              <blockquote style={{ margin: "0 0 18px", color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6 }}>{t.quote}</blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid var(--hairline)", paddingTop: 16 }}>
                <span style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--accent-soft)", color: "var(--accent)", fontFamily: "var(--fd)", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{t.name[0]}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>{t.name}</span>
                  <span style={{ display: "block", fontSize: 11.5, color: "var(--muted)", fontFamily: "var(--fm)" }}>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
