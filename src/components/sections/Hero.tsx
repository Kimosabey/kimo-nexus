"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUp, Download, MapPin, Sparkles } from "lucide-react";
import { about, assistant, hero, site } from "@/lib/content";
import { ease } from "@/lib/motion";
import { Reveal } from "../ui/Reveal";
import { SplitText } from "../ui/SplitText";
import { Waveform } from "../ui/Waveform";
import { NumberTicker } from "../ui/NumberTicker";
import { useMagnetic } from "../ui/useMagnetic";
import { useLocalTime } from "../ui/useLocalTime";

/** Types each suggestion out, holds, erases, moves on. Static first suggestion under reduced motion. */
function useTypedSuggestions(list: readonly string[]) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(list[0]?.length ?? 0);
  const [phase, setPhase] = useState<"type" | "hold" | "erase">("hold");

  useEffect(() => {
    if (reduce) return;
    const full = list[i];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "hold") t = setTimeout(() => setPhase("erase"), 2600);
    else if (phase === "erase") {
      if (n > 0) t = setTimeout(() => setN(n - 1), 18);
      else t = setTimeout(() => { setI((i + 1) % list.length); setPhase("type"); }, 220);
    } else if (n < full.length) t = setTimeout(() => setN(n + 1), 38);
    else t = setTimeout(() => setPhase("hold"), 0);
    return () => clearTimeout(t);
  }, [reduce, list, i, n, phase]);

  return { full: list[i], shown: reduce ? list[0] : list[i].slice(0, n), index: reduce ? 0 : i };
}

export function Hero({ onScrollTo, onAsk, ready = true }: { onScrollTo: (id: string) => void; onAsk: (question?: string) => void; ready?: boolean }) {
  const mag = useMagnetic();
  const time = useLocalTime(site.timeZone);
  const typed = useTypedSuggestions(assistant.suggestions);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const cardClip = useTransform(scrollYProgress, [0, 1], ["inset(0% 0% 0% 0% round 28px)", "inset(6% 4% 10% 4% round 28px)"]);

  return (
    <section id="hero" ref={ref} className="kn-hero kn-wrap" aria-labelledby="kn-hero-title">
      <Reveal className="kn-hero-meta">
        <span>
          <span className="kn-avail-dot" aria-hidden="true" />
          <strong>{site.availability}</strong>
        </span>
        <span>
          <MapPin size={13} strokeWidth={1.8} aria-hidden="true" />
          {site.location}
        </span>
        <span suppressHydrationWarning>
          {site.city} <strong>{time ?? "--:--"}</strong> IST
        </span>
      </Reveal>

      <div className="kn-hero-grid">
        <div>
          <p className="kn-label" style={{ margin: "0 0 18px" }}>
            {site.name} — {hero.eyebrow}
          </p>
          <SplitText as="h1" id="kn-hero-title" lines={hero.lines} className="kn-h1" play={ready} />
          <Reveal>
            <p className="kn-hero-lead">{hero.lead}</p>
          </Reveal>

          {/* AI-native entry: the assistant is the hero's primary interaction. */}
          <Reveal>
            <div className="kn-ask" role="group" aria-label="Ask about my work">
              <button type="button" onClick={() => onAsk()} style={{ all: "unset", flex: 1, minWidth: 0, minHeight: 44, alignSelf: "stretch", display: "flex", alignItems: "center", gap: 12, cursor: "text", borderRadius: 999 }} aria-label="Ask the portfolio assistant anything">
                <span className="kn-ask-spark" aria-hidden="true">
                  <Sparkles size={18} strokeWidth={1.8} />
                </span>
                <span className="kn-ask-text" aria-hidden="true">
                  <b>{typed.shown}</b>
                  <span className="kn-caret" />
                </span>
              </button>
              <button type="button" className="kn-askbar-go" onClick={() => onAsk(typed.full)} aria-label={`Ask: ${typed.full}`}>
                <ArrowUp size={18} strokeWidth={2.2} />
              </button>
            </div>
          </Reveal>

          <Reveal className="kn-hero-ctas">
            <button type="button" className="kn-btn kn-btn--accent" onClick={() => onScrollTo("#work")} {...mag}>
              {hero.primaryCta.label} <ArrowRight size={17} strokeWidth={2} className="kn-arrow" />
            </button>
            <a href={site.resume} download className="kn-btn kn-btn--ghost" {...mag}>
              Résumé <Download size={16} strokeWidth={1.8} />
            </a>
          </Reveal>
        </div>

        <motion.figure
          className="kn-portrait-card"
          style={{ clipPath: cardClip, margin: 0 }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.1, ease: ease.out, delay: 0.2 }}
        >
          <motion.div style={{ position: "absolute", inset: "-6% 0", y: imgY }}>
            <Image src={site.photo} alt={`Portrait of ${site.name}`} fill priority sizes="(max-width:1024px) 92vw, 400px" className="kn-portrait" style={{ objectFit: "cover" }} />
          </motion.div>
          <div className="kn-duotone" />
          <div className="kn-portrait-fade" />
          <figcaption className="kn-float">
            <Waveform bars={14} style={{ height: 26, width: 56, flexShrink: 0 }} />
            <p>
              <small>Now</small>
              {about.note.split(".")[0]}.
            </p>
          </figcaption>
        </motion.figure>
      </div>

      <Reveal className="kn-hero-foot">
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
