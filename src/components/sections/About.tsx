"use client";

import Image from "next/image";
import { ArrowDown, GraduationCap, Radio } from "lucide-react";
import { about, experience, site, skills } from "@/lib/content";
import { projects } from "@/lib/work";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";
import { NumberTicker } from "../ui/NumberTicker";
import { Waveform } from "../ui/Waveform";
import { useLocalTime } from "../ui/useLocalTime";

const current = experience.items.find((e) => e.current);
const masters = experience.items.find((e) => e.role.startsWith("MCA"));

// The hero already shows years / apps / mentored; the bento counts what the site itself holds.
const bentoStats = [
  { value: projects.filter((p) => p.action === "repo").length, label: "Open-source repos" },
  { value: projects.length, label: "Projects in the archive" },
  { value: new Set(skills.groups.flatMap((g) => g.items)).size, label: "Tools in the stack" },
];

/** About as a bento: statement · portrait · now · stats · local time · résumé · education. */
export function About() {
  const time = useLocalTime(site.timeZone);
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="about" className="kn-sec kn-wrap" aria-labelledby="about-title">
      <SectionHead id="about" label={about.eyebrow} lines={about.headline} />

      <div className="kn-bento">
        <Reveal className="kn-tile kn-tile--statement">
          <p className="kn-big">{lead.split(". ")[0]}.</p>
          <p>{lead.split(". ").slice(1).join(". ")}</p>
          {rest.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>

        <Reveal className="kn-tile kn-tile--photo">
          <Image src={site.photo} alt="" fill sizes="(max-width:720px) 92vw, (max-width:1100px) 46vw, 330px" className="kn-portrait" style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
          <div className="kn-duotone" />
          <div className="kn-portrait-fade" />
          <span className="kn-label" style={{ position: "absolute", left: 22, bottom: 20, color: "var(--ink)" }}>
            {site.name}
          </span>
        </Reveal>

        <Reveal className="kn-tile kn-tile--now">
          <div className="kn-tile-label">
            <Radio size={15} strokeWidth={1.8} style={{ color: "var(--accent)" }} aria-hidden="true" />
            <span className="kn-label">Now</span>
          </div>
          <h3 style={{ fontSize: "clamp(22px,2vw,28px)", lineHeight: 1.12 }}>{current?.role}</h3>
          <p style={{ color: "var(--accent)", fontSize: 14, margin: "6px 0 18px" }}>{current?.org}</p>
          <p style={{ color: "var(--ink-2)", fontSize: 14.5, margin: 0 }}>{current?.desc}</p>
          <Waveform bars={28} style={{ height: 40, marginTop: 24 }} />
        </Reveal>

        {bentoStats.map((s) => (
          <Reveal key={s.label} className="kn-tile kn-tile--stat">
            <div className="kn-stat-n">
              <NumberTicker value={s.value} />
            </div>
            <div className="kn-stat-l">{s.label}</div>
          </Reveal>
        ))}

        <Reveal className="kn-tile kn-tile--clock">
          <div className="kn-tile-label">
            <span className="kn-avail-dot" aria-hidden="true" />
            <span className="kn-label">Local time · {site.city}</span>
          </div>
          <div className="kn-clock" suppressHydrationWarning>
            {time ?? "--:--"}
          </div>
          <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "10px 0 0" }}>{site.location}</p>
        </Reveal>

        <Reveal className="kn-tile kn-tile--edu">
          <div className="kn-tile-label">
            <GraduationCap size={16} strokeWidth={1.8} style={{ color: "var(--accent)" }} aria-hidden="true" />
            <span className="kn-label">Education</span>
          </div>
          <h3 style={{ fontSize: 22 }}>{masters?.role}</h3>
          <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "6px 0 0" }}>
            {masters?.org} · {masters?.period}
          </p>
        </Reveal>

        <Reveal className="kn-tile kn-tile--cv" style={{ padding: 0 }}>
          <a href={site.resume} download data-cursor="Download" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 22, height: "100%", padding: "clamp(22px,2.4vw,32px)", color: "inherit" }}>
            <span className="kn-label">PDF · Résumé</span>
            <span style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
              <h3>Download résumé</h3>
              <ArrowDown size={30} strokeWidth={1.6} aria-hidden="true" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
