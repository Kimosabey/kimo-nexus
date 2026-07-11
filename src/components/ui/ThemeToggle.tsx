"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers";
import type { CSSProperties } from "react";

const btn: CSSProperties = {
  width: 44,
  height: 44,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
  border: "1px solid var(--hairline)",
  background: "var(--surface-2)",
  color: "var(--ink)",
  cursor: "pointer",
};

/** Theme toggle — animated clip-path wipe from the click point (View Transitions). */
export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={dark}
      onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
      style={btn}
    >
      {/* dark → show Sun (switch to light); default (pre-mount) is dark */}
      {mounted && !dark ? <Moon size={19} strokeWidth={1.8} /> : <Sun size={19} strokeWidth={1.8} />}
    </button>
  );
}
