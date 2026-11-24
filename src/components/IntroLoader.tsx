"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/content";
import { ease } from "@/lib/motion";

const DURATION = 1250; // ms the signal takes to "lock"
const W = 560;
const H = 90;

/** Oscilloscope trace: noisy at the start, settling into a clean sine as the signal locks. */
function tracePath(lock: number, t: number) {
  const pts: string[] = [];
  for (let x = 0; x <= W; x += 6) {
    const u = x / W;
    const clean = Math.sin(u * Math.PI * 6 + t * 0.006) * 22 * lock;
    const noise = (Math.sin(x * 1.7 + t * 0.05) * Math.sin(x * 0.37 - t * 0.02)) * 30 * (1 - lock);
    pts.push(`${x},${(H / 2 + clean + noise).toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

/**
 * "Tuning in" — first-visit intro. An ember trace locks from noise to a clean signal while a
 * counter runs 000→100 and the name rises; then the panel lifts off and hands over to the
 * hero reveal. ~1.6s total, once per session, click/key to skip, skipped under reduced motion.
 * The page renders underneath the whole time (nothing waits on it but the hero headline).
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("kn-intro") === "1";
    } catch {
      /* ignore */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      const id = requestAnimationFrame(() => {
        setShow(false);
        doneRef.current();
      });
      return () => cancelAnimationFrame(id);
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let raf = 0;
    let finished = false;
    const start = performance.now();
    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      try {
        sessionStorage.setItem("kn-intro", "1");
      } catch {
        /* ignore */
      }
      document.body.style.overflow = prevOverflow;
      setCount(100);
      setShow(false);
      doneRef.current();
    };
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      pathRef.current?.setAttribute("d", tracePath(eased, now));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(finish, 220);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const [first, last] = site.name.split(" ");

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro"
          className="kn-intro"
          aria-hidden="true"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: ease.out }}
        >
          <div className="kn-intro-inner">
            <div className="kn-intro-top">
              <span>Tuning in</span>
              <span className="kn-intro-count">{String(count).padStart(3, "0")}</span>
            </div>
            <svg className="kn-intro-scope" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
              <line x1="0" y1={H / 2} x2={W} y2={H / 2} stroke="var(--hairline)" strokeWidth="1" />
              <path ref={pathRef} d={tracePath(0, 0)} fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <p className="kn-intro-name">
              <motion.span style={{ display: "inline-block" }} initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, ease: ease.out, delay: 0.15 }}>
                {first} <span className="kn-serif">{last}</span>
              </motion.span>
            </p>
            <p className="kn-intro-skip">{site.role} · press any key</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
