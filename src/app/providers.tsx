"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  /** Toggle theme; pass the click origin to animate the clip-path wipe from there. */
  toggle: (origin?: { x: number; y: number }) => void;
  mounted: boolean;
};

// View Transitions API (not in every TS DOM lib version).
type ViewTransition = { ready: Promise<void> };
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <Providers>");
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // The inline boot script in <head> already set the class before paint (no FOUC);
  // reflect whatever it decided into React state.
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setMounted(true);
  }, []);

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("kn-theme", next);
      } catch {
        /* ignore */
      }
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const doc = document as ViewTransitionDocument;
      if (!reduce && origin && typeof doc.startViewTransition === "function") {
        const root = document.documentElement;
        root.style.setProperty("--wx", `${origin.x}px`);
        root.style.setProperty("--wy", `${origin.y}px`);
        doc.startViewTransition!(() => applyTheme(next));
      } else {
        applyTheme(next);
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}
