import { skills } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";

export function Skills() {
  return (
    <section id="skills" className="kn-sec kn-wrap" aria-labelledby="skills-title" style={{ paddingTop: 0 }}>
      <SectionHead id="skills" label={skills.eyebrow} lines={skills.headline} />
      <div className="kn-stack">
        {skills.groups.map((g) => (
          <Reveal key={g.label} className="kn-stack-row">
            <h3>{g.label}</h3>
            <div className="kn-stack-chips">
              {g.items.map((t) => (
                <span key={t} className="kn-chip">{t}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
