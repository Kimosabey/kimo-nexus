"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Download } from "lucide-react";
import { experience, sectionIndex, site } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SplitText } from "../ui/SplitText";

/** Sticky title on the left; the timeline line fills with scroll on the right. */
export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 70%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="experience" className="kn-sec kn-wrap" aria-labelledby="experience-title">
      <div className="kn-exp-grid">
        <div className="kn-exp-side">
          <Reveal className="kn-head-meta" style={{ marginBottom: 22 }}>
            <span className="kn-idx">({sectionIndex("experience")})</span>
            <span className="kn-label">{experience.eyebrow}</span>
          </Reveal>
          <SplitText lines={experience.headline} trigger="view" className="kn-h2" id="experience-title" />
          <Reveal>
            <a href={site.resume} download className="kn-btn kn-btn--accent" style={{ marginTop: 32 }}>
              Download full résumé <Download size={16} strokeWidth={1.8} />
            </a>
          </Reveal>
        </div>

        <div ref={lineRef} className="kn-timeline">
          <div className="kn-timeline-line" aria-hidden="true">
            <motion.div className="kn-timeline-fill" style={{ scaleY: fill }} />
          </div>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {experience.items.map((e) => (
              <Reveal key={`${e.org}-${e.period}`} as="li" className="kn-job">
                  <span className="kn-job-dot" aria-hidden="true" />
                  <div className="kn-job-top">
                    <h3>
                      {e.role}
                      {e.current ? (
                        <span className="kn-job-now">
                          <span className="kn-avail-dot" aria-hidden="true" /> Now
                        </span>
                      ) : null}
                    </h3>
                    <span className="kn-mono" style={{ fontSize: 12.5, color: "var(--muted)" }}>{e.period}</span>
                  </div>
                  <p className="kn-job-org">{e.org}</p>
                  <p className="kn-job-desc">{e.desc}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
