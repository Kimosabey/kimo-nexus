"use client";

import { useEffect, useRef } from "react";

/** Slim top scroll-progress bar (single instance; native scrollbar is hidden). */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 60, background: "transparent" }}>
      <div ref={barRef} style={{ height: "100%", width: "100%", transform: "scaleX(0)", transformOrigin: "0 50%", background: "var(--accent)" }} />
    </div>
  );
}
