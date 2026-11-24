"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { skills } from "@/lib/content";
import { Marquee } from "../ui/Marquee";

/** Full-bleed stack ticker between the hero and About. */
export function Ticker() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="kn-ticker" role="region" aria-label="Technologies I work with" data-paused={paused} style={{ position: "relative" }}>
      <button type="button" className="kn-marquee-ctl" aria-pressed={paused} aria-label={paused ? "Play technology ticker" : "Pause technology ticker"} onClick={() => setPaused((p) => !p)} style={{ position: "absolute", right: "var(--gutter)", top: "50%", transform: "translateY(-50%)", zIndex: 2, background: "var(--canvas)", width: 36, padding: 0, justifyContent: "center" }}>
        {paused ? <Play size={13} strokeWidth={2} /> : <Pause size={13} strokeWidth={2} />}
      </button>
      <Marquee duration={48} className="kn-ticker-mask">
        {skills.marquee.map((t) => (
          <span key={t} className="kn-ticker-item">
            {t}
            <i aria-hidden="true">✦</i>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
