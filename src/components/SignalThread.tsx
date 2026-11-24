"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useMedia } from "./ui/useMedia";

const NS = "http://www.w3.org/2000/svg";

/**
 * "The signal": one continuous line that draws itself as you scroll, from the hero to the
 * contact section. Between sections it sweeps across the page (behind the content); just
 * before each section index it turns into a short waveform — the voice-AI motif — and the
 * node at the index lights up when the signal reaches it.
 *
 * The path is rebuilt from the real positions of the `.kn-idx` markers whenever the page
 * resizes, and y always increases along it, so "how far has the signal travelled" is a
 * lookup from scroll position to arc length. Scroll handling writes straight to the DOM.
 * Desktop/tablet widths only; off under reduced motion.
 */
export function SignalThread() {
  const reduce = useReducedMotion();
  const wide = useMedia("(min-width: 900px)");
  const enabled = wide && !reduce;
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!enabled || !host) return;

    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("kn-signal");
    const track = document.createElementNS(NS, "path");
    track.classList.add("kn-signal-track");
    const line = document.createElementNS(NS, "path");
    line.classList.add("kn-signal-line");
    svg.append(track, line);
    host.append(svg);
    document.documentElement.classList.add("kn-signal-on");

    let samples: { y: number; len: number }[] = [];
    let total = 0;
    let nodes: { el: SVGCircleElement; len: number; marker: Element }[] = [];

    const build = () => {
      const markers = [...document.querySelectorAll("main .kn-idx")];
      const hero = document.querySelector(".kn-hero-foot");
      if (!markers.length || !hero) return;
      // Height from the content itself (main + footer), never from scrollHeight — the SVG
      // must not be able to influence the size it is measured from.
      const end = document.querySelector("footer") ?? document.querySelector("main");
      const docH = end ? Math.ceil(end.getBoundingClientRect().bottom + window.scrollY) : window.innerHeight;
      const W = document.documentElement.clientWidth;
      svg.setAttribute("width", String(W));
      svg.setAttribute("height", String(docH));
      svg.setAttribute("viewBox", `0 0 ${W} ${docH}`);

      const abs = (el: Element) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
      };
      const wrap = document.querySelector(".kn-wrap");
      const wr = wrap ? abs(wrap) : { x: 0, w: W };
      const right = Math.min(W - 24, wr.x + wr.w - 28);

      const h0 = abs(hero);
      let d = `M ${right} ${h0.y + h0.h + 12}`;
      let px = right;
      let py = h0.y + h0.h + 12;
      const pts: { x: number; y: number; marker: Element }[] = [];

      markers.forEach((m, i) => {
        const r = abs(m);
        const nx = r.x - 22; // node sits just left of "(0N)"
        const ny = r.y + r.h / 2;
        const waveTop = ny - 120;
        // sweep: alternate the side the line comes from, curving down to the wave start
        const midY = (py + waveTop) / 2;
        const swingX = i % 2 === 0 ? Math.max(nx + 40, right - 60) : nx;
        d += ` C ${px} ${midY}, ${swingX} ${midY}, ${nx} ${Math.max(py + 40, waveTop)}`;
        // waveform: 3 cycles, amplitude easing in then out, y strictly increasing
        const y0 = Math.max(py + 40, waveTop);
        const steps = 36;
        for (let k = 1; k <= steps; k++) {
          const t = k / steps;
          const amp = 11 * Math.sin(Math.PI * t);
          d += ` L ${(nx + amp * Math.sin(t * Math.PI * 6)).toFixed(1)} ${(y0 + (ny - y0) * t).toFixed(1)}`;
        }
        px = nx;
        py = ny;
        pts.push({ x: nx, y: ny, marker: m });
      });

      track.setAttribute("d", d);
      line.setAttribute("d", d);
      total = line.getTotalLength();
      line.style.strokeDasharray = `${total}`;

      // y → arc length lookup (path is monotonic in y)
      samples = [];
      const N = Math.max(200, Math.round(total / 12));
      for (let k = 0; k <= N; k++) {
        const len = (total * k) / N;
        samples.push({ y: line.getPointAtLength(len).y, len });
      }

      nodes.forEach((n) => n.el.remove());
      nodes = pts.map((p) => {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", String(p.x));
        c.setAttribute("cy", String(p.y));
        c.setAttribute("r", "4.5");
        c.classList.add("kn-signal-node");
        svg.append(c);
        let best = samples[0];
        for (const s of samples) if (Math.abs(s.y - p.y) < Math.abs(best.y - p.y)) best = s;
        return { el: c, len: best.len, marker: p.marker };
      });
      paint();
    };

    const paint = () => {
      if (!samples.length) return;
      const tipY = window.scrollY + window.innerHeight * 0.6;
      let lo = 0;
      let hi = samples.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (samples[mid].y < tipY) lo = mid + 1;
        else hi = mid;
      }
      const len = tipY <= samples[0].y ? 0 : samples[lo].len;
      line.style.strokeDashoffset = `${total - len}`;
      for (const n of nodes) {
        const on = len >= n.len - 1;
        n.el.classList.toggle("is-on", on);
        n.marker.classList.toggle("kn-idx-on", on);
      }
    };

    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; paint(); });
    };
    let t: ReturnType<typeof setTimeout>;
    const rebuild = () => {
      clearTimeout(t);
      t = setTimeout(build, 150);
    };
    // fonts and reveals shift layout after mount; build once things settle, then on resize
    const first = setTimeout(build, 600);
    const ro = new ResizeObserver(rebuild);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(first);
      clearTimeout(t);
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.querySelectorAll(".kn-idx-on").forEach((m) => m.classList.remove("kn-idx-on"));
      document.documentElement.classList.remove("kn-signal-on");
      svg.remove();
    };
  }, [enabled]);

  // Positioning is inline (not only in CSS) so the host can never join the document flow.
  return <div ref={hostRef} className="kn-signal-host" aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", overflow: "hidden" }} />;
}
