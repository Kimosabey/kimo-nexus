import { Cpu, Layers, Network, Server } from "lucide-react";
import type { ComponentType } from "react";
import { services } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";

const ICONS: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = { cpu: Cpu, network: Network, layers: Layers, server: Server };

/** Editorial numbered index — big titles, the description sits beside, a signal wash on hover. */
export function Services() {
  return (
    <section id="services" className="kn-sec kn-wrap" aria-labelledby="services-title">
      <SectionHead id="services" label={services.eyebrow} lines={services.headline} />
      <ol className="kn-svc-list">
        {services.items.map((s, i) => {
          const Icon = ICONS[s.icon] ?? Layers;
          return (
            <Reveal key={s.title} as="li" className="kn-svc">
                <span className="kn-svc-no">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="kn-svc-title">
                  <span className="kn-svc-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  {s.title}
                </h3>
                <p className="kn-svc-desc">{s.desc}</p>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
