"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Waveform } from "./ui/Waveform";

/** Orchestrated intro (monogram + waveform + progress). Session-guarded; reduced-motion skips. */
export function IntroLoader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [hide, setHide] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("kn-intro") === "1";
    } catch {
      /* ignore */
    }
    if (reduce || seen) {
      const skip = requestAnimationFrame(() => setShow(false));
      return () => cancelAnimationFrame(skip);
    }
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => {
      if (barRef.current) barRef.current.style.width = "100%";
    });
    let t2: ReturnType<typeof setTimeout>;
    const t1 = setTimeout(() => {
      setHide(true);
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("kn-intro", "1");
      } catch {
        /* ignore */
      }
      t2 = setTimeout(() => setShow(false), 560);
    }, 1500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "var(--canvas)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        opacity: hide ? 0 : 1,
        transform: hide ? "translateY(-3%)" : "none",
        transition: "opacity .5s ease, transform .6s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span
          style={{
            width: 50,
            height: 50,
            borderRadius: 15,
            background: "var(--accent)",
            color: "var(--accent-ink)",
            fontFamily: "var(--fd)",
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "-.03em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          HA
        </span>
        <span style={{ fontFamily: "var(--fd)", fontWeight: 600, fontSize: 23, letterSpacing: "-.01em", color: "var(--ink)" }}>
          Harshan<span style={{ color: "var(--accent)" }}>.</span>
        </span>
      </div>
      <Waveform bars={34} style={{ height: 28, width: "min(220px,58vw)" }} />
      <div style={{ width: "min(200px,56vw)", height: 2, background: "var(--hairline)", borderRadius: 2, overflow: "hidden" }}>
        <div ref={barRef} style={{ height: "100%", width: 0, background: "var(--accent)", transition: "width 1.15s cubic-bezier(.22,1,.36,1)" }} />
      </div>
    </div>
  );
}
