"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, Download, MapPin } from "lucide-react";
import { about, hero, site } from "@/lib/content";
import { AskBar } from "../ui/AskBar";
import { ease } from "@/lib/motion";
import { Reveal } from "../ui/Reveal";
import { SplitText } from "../ui/SplitText";
import { Waveform } from "../ui/Waveform";
import { NumberTicker } from "../ui/NumberTicker";
import { useMagnetic } from "../ui/useMagnetic";
import { useLocalTime } from "../ui/useLocalTime";

export function Hero({ onScrollTo, onAsk, ready = true }: { onScrollTo: (id: string) => void; onAsk: (question?: string) => void; ready?: boolean }) {
  const mag = useMagnetic();
  const time = useLocalTime(site.timeZone);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const cardClip = useTransform(scrollYProgress, [0, 1], ["inset(0% 0% 0% 0% round 28px)", "inset(6% 4% 10% 4% round 28px)"]);

  return (
    <section id="hero" ref={ref} className="kn-hero kn-wrap" aria-labelledby="kn-hero-title">
      {/* Identity first (recruiter persona): name + role read before the headline. */}
      <Reveal className="kn-hero-meta" play={ready}>
        <p className="kn-hero-id" style={{ alignItems: "center" }}>
          {/* Phones: the face shows up in the first glance, beside the name. */}
          <span className="kn-hero-avatar" aria-hidden="true">
            <Image src={site.photo} alt="" width={40} height={40} sizes="40px" priority />
          </span>
          <strong>{site.name}</strong>
          <span>{hero.eyebrow}</span>
        </p>
        <span className="kn-hero-facts">
          <span>
            <span className="kn-avail-dot" aria-hidden="true" />
            <strong>{site.availability}</strong>
          </span>
          <span>
            <MapPin size={13} strokeWidth={1.8} aria-hidden="true" />
            {site.location}
          </span>
          <span suppressHydrationWarning>
            <strong>{time ?? "--:--"}</strong> IST · local time
          </span>
        </span>
      </Reveal>

      <div className="kn-hero-grid">
        <div>
          <SplitText as="h1" id="kn-hero-title" lines={hero.lines} className="kn-h1" play={ready} />
          <Reveal play={ready} delay={0.35}>
            <p className="kn-hero-lead">{hero.lead}</p>
          </Reveal>

          {/* AI-native entry: the assistant is the hero's primary interaction. */}
          <Reveal play={ready} delay={0.45}>
            <AskBar onAsk={onAsk} />
          </Reveal>

          <Reveal className="kn-hero-ctas" play={ready} delay={0.55}>
            <button type="button" className="kn-btn kn-btn--accent" onClick={() => onScrollTo("#work")} {...mag}>
              {hero.primaryCta.label} <ArrowRight size={17} strokeWidth={2} className="kn-arrow" />
            </button>
            <a href={site.resume} download className="kn-btn kn-btn--ghost" {...mag}>
              Résumé <Download size={16} strokeWidth={1.8} />
            </a>
          </Reveal>
        </div>

        {/* The "Now" tag lives outside the clipped photo so it never covers the face:
            it hangs off the card's corner on tablet/desktop and sits under it on phones. */}
        <div className="kn-portrait-wrap">
          <motion.div
            className="kn-portrait-card"
            style={{ clipPath: cardClip }}
            initial={{ scale: 1.04 }}
            animate={ready ? { scale: 1 } : undefined}
            transition={{ duration: 1.1, ease: ease.out, delay: 0.2 }}
          >
            <motion.div style={{ position: "absolute", inset: "-6% 0", y: imgY }}>
              <Image src={site.photo} alt={`Portrait of ${site.name}`} fill priority sizes="(max-width:719px) 92vw, (max-width:1023px) 40vw, 400px" className="kn-portrait" style={{ objectFit: "cover", objectPosition: "50% 28%" }} />
            </motion.div>
            <div className="kn-duotone" />
            <div className="kn-portrait-fade" />
          </motion.div>
          <Reveal className="kn-now" play={ready} delay={0.8}>
            <Waveform bars={12} style={{ height: 24, width: 46, flexShrink: 0 }} />
            <p>
              <small>
                <span className="kn-avail-dot" aria-hidden="true" /> Now
              </small>
              {about.note.split(".")[0].replace(/^Currently /, "").replace(/^./, (c) => c.toUpperCase())}
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal className="kn-hero-foot" play={ready} delay={0.65}>
        {hero.stats.map((s) => (
          <div key={s.label}>
            <div className="kn-stat-n">
              <NumberTicker value={s.value} dec={s.dec} />
              {s.suffix ? <span className="kn-accent">{s.suffix}</span> : null}
            </div>
            <div className="kn-stat-l">{s.label}</div>
          </div>
        ))}
        <button type="button" className="kn-scrollcue" onClick={() => onScrollTo("#about")} aria-label="Scroll to About">
          <i aria-hidden="true" />
          Scroll <ArrowDownRight size={14} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </Reveal>
    </section>
  );
}
