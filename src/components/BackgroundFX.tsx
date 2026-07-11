"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** Cursor-reactive dot-grid canvas (idle-driven rAF) + drifting lime glow + grain. */
export function BackgroundFX() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const finePtr = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    const gap = window.innerWidth > 1400 ? 46 : 38;
    const mouse = { x: -999, y: -999 };
    let W = 0;
    let H = 0;

    const colors = () => {
      const dark = document.documentElement.classList.contains("dark");
      return { base: dark ? "142,145,153" : "107,110,118", acc: dark ? "182,244,0" : "101,163,13" };
    };
    const resize = () => {
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onOut = () => {
      mouse.x = -999;
      mouse.y = -999;
    };
    if (finePtr && !reduce) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onOut);
    }

    const paint = () => {
      const c = colors();
      const sy = (window.scrollY * 0.04) % gap;
      ctx.clearRect(0, 0, W, H);
      for (let x = 0; x <= W + gap; x += gap) {
        for (let y = -gap; y <= H + gap; y += gap) {
          const yy = y + sy;
          const dx = x - mouse.x;
          const dy = yy - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const near = !reduce && finePtr && d < 130 ? 1 - d / 130 : 0;
          const r = 0.9 + near * 2.2;
          const a = 0.16 + near * 0.7;
          ctx.beginPath();
          ctx.arc(x, yy, r, 0, 6.2832);
          ctx.fillStyle = `rgba(${near > 0.35 ? c.acc : c.base},${a})`;
          ctx.fill();
        }
      }
    };
    paint();

    let raf = 0;
    let until = 0;
    const tick = () => {
      paint();
      if (performance.now() < until) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const kick = (ms: number) => {
      until = performance.now() + ms;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => kick(70);
    const onMoveKick = () => kick(200);
    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });
      if (finePtr) window.addEventListener("mousemove", onMoveKick, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMoveKick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-10%",
          right: "-5%",
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          maxHeight: 900,
          borderRadius: "50%",
          background: "radial-gradient(circle,var(--glow),transparent 62%)",
          filter: "blur(24px)",
          zIndex: 0,
          pointerEvents: "none",
          animation: reduce ? "none" : "kn-drift 26s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: "-20%",
          zIndex: 1,
          pointerEvents: "none",
          opacity: "var(--grain-op)",
          mixBlendMode: "overlay",
          backgroundImage: "url('/noise.png')",
          backgroundSize: "180px 180px",
          animation: reduce ? "none" : "kn-grain 8s steps(6) infinite",
        }}
      />
    </>
  );
}
