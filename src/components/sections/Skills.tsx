import { skills } from "@/lib/content";
import { projects } from "@/lib/work";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";

// Evidence count per tool: how many projects in the archive use it. Tools with none are
// résumé skills from client/employer work, shown without a count.
const usage = new Map<string, number>();
for (const p of projects) for (const t of p.tech) usage.set(t, (usage.get(t) ?? 0) + 1);

export function Skills() {
  return (
    <section id="skills" className="kn-sec kn-wrap" aria-labelledby="skills-title" style={{ paddingTop: 0 }}>
      <SectionHead id="skills" label={skills.eyebrow} lines={skills.headline} sub="The number beside a tool is how many projects in the archive use it." />
      <div className="kn-stack">
        {skills.groups.map((g) => (
          <Reveal key={g.label} className="kn-stack-row">
            <h3>
              {g.label}
              <small>{String(g.items.length).padStart(2, "0")}</small>
            </h3>
            <div className="kn-stack-chips">
              {g.items.map((t) => {
                const n = usage.get(t) ?? 0;
                return (
                  <span key={t} className="kn-chip" title={n ? `Used in ${n} project${n > 1 ? "s" : ""} in the archive` : undefined}>
                    {t}
                    {n ? <sup className="kn-chip-n" aria-label={`, ${n} project${n > 1 ? "s" : ""}`}>{n}</sup> : null}
                  </span>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
