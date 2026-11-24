"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import { assistant } from "@/lib/content";

/**
 * Hero Ask bar. Types the real assistant suggestions out and erases them; the ↑ asks the
 * one on screen, the rest of the bar opens Ask empty. Lives in its own component so the
 * ~30 state updates/second of typing re-render only this bar, and it pauses entirely while
 * off screen or in a hidden tab. Reduced motion shows the first suggestion, static.
 */
export function AskBar({ onAsk }: { onAsk: (question?: string) => void }) {
  const list = assistant.suggestions;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [n, setN] = useState(list[0].length);
  const [phase, setPhase] = useState<"type" | "hold" | "erase">("hold");
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let onScreen = true;
    const update = () => setActive(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (reduce || !active) return;
    const full = list[i];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "hold") t = setTimeout(() => setPhase("erase"), 2600);
    else if (phase === "erase") t = n > 0 ? setTimeout(() => setN(n - 1), 18) : setTimeout(() => { setI((i + 1) % list.length); setPhase("type"); }, 220);
    else t = n < full.length ? setTimeout(() => setN(n + 1), 38) : setTimeout(() => setPhase("hold"), 0);
    return () => clearTimeout(t);
  }, [reduce, active, list, i, n, phase]);

  const full = reduce ? list[0] : list[i];
  const shown = reduce ? list[0] : full.slice(0, n);

  return (
    <div ref={ref} className="kn-ask" role="group" aria-label="Ask about my work">
      <button type="button" className="kn-ask-open" onClick={() => onAsk()} aria-label="Ask the portfolio assistant anything">
        <span className="kn-ask-spark" aria-hidden="true">
          <Sparkles size={18} strokeWidth={1.8} />
        </span>
        <span className="kn-ask-text" aria-hidden="true">
          <b>{shown}</b>
          <span className="kn-caret" />
        </span>
      </button>
      <button type="button" className="kn-askbar-go" onClick={() => onAsk(full)} aria-label={`Ask: ${full}`}>
        <ArrowUp size={18} strokeWidth={2.2} />
      </button>
    </div>
  );
}
