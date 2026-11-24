"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { testimonials } from "@/lib/content";
import { SectionHead } from "../ui/SectionHead";
import { Marquee } from "../ui/Marquee";

type T = (typeof testimonials.items)[number];

function Quote({ t }: { t: T }) {
  return (
    <figure className="kn-quote">
      <blockquote>{t.quote}</blockquote>
      <figcaption>
        <span className="kn-quote-av" aria-hidden="true">{t.name[0]}</span>
        <span style={{ minWidth: 0 }}>
          <span className="kn-quote-name">{t.name}</span>
          <span className="kn-quote-role">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Two counter-scrolling rows with different quotes in each (no quote appears twice on
 * screen). Each row tiles its three quotes twice so a copy is wider than any viewport.
 */
export function Testimonials() {
  const [paused, setPaused] = useState(false);
  const items = testimonials.items;
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];
  return (
    <section id="testimonials" className="kn-sec" aria-labelledby="testimonials-title">
      <div className="kn-wrap">
        <SectionHead
          id="testimonials"
          label={testimonials.eyebrow}
          lines={testimonials.headline}
          aside={
            <button type="button" className="kn-marquee-ctl" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
              {paused ? <Play size={13} strokeWidth={2} /> : <Pause size={13} strokeWidth={2} />}
              {paused ? "Play" : "Pause"}
            </button>
          }
        />
      </div>
      <div className="kn-peers kn-marquee-host" data-paused={paused}>
        {rows.map((row, r) => (
          <Marquee key={r} duration={r ? 62 : 54} reverse={r === 1} repeat={2}>
            {row.map((t) => (
              <Quote key={t.name} t={t} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
