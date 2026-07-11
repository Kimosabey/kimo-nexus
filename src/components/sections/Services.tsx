import { Cpu, Layers, Network, Server } from "lucide-react";
import type { ComponentType } from "react";
import { services } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { Eyebrow } from "../ui/Eyebrow";
import { AccentLines } from "../ui/accent";

const sec: React.CSSProperties = { padding: "clamp(64px,10vw,120px) 0", borderTop: "1px solid var(--hairline)" };
const ICONS: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = { cpu: Cpu, network: Network, layers: Layers, server: Server };

export function Services() {
  return (
    <section id="services" style={sec}>
      <Reveal>
        <Eyebrow style={{ marginBottom: 20 }}>{services.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal>
        <AccentLines lines={services.headline} style={{ fontFamily: "var(--fd)", fontWeight: 700, fontSize: "clamp(1.8rem,3.4vw,2.7rem)", letterSpacing: "-.02em", margin: "0 0 36px", lineHeight: 1.1 }} />
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16 }}>
        {services.items.map((s) => {
          const Icon = ICONS[s.icon] ?? Layers;
          return (
            <Reveal key={s.title} className="kn-svc" style={{ border: "1px solid var(--hairline)", borderRadius: 18, padding: 24, background: "var(--surface)" }}>
              <span style={{ display: "flex", width: 46, height: 46, alignItems: "center", justifyContent: "center", borderRadius: 13, background: "var(--accent-soft)", color: "var(--accent)", marginBottom: 18 }}>
                <Icon size={22} strokeWidth={1.7} />
              </span>
              <h3 style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 18, margin: "0 0 8px" }}>{s.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
