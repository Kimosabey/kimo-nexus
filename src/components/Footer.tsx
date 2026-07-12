"use client";

import { ArrowUp } from "lucide-react";
import { footer, site } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

const YEAR = new Date().getFullYear();

export function Footer() {
  const year = YEAR;
  return (
    <footer style={{ borderTop: "1px solid var(--hairline)", padding: "30px 0 10px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
      <div style={{ fontSize: 13, color: "var(--muted)" }}>
        {site.name} · Full-Stack Software Engineer · © {year}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ fontSize: 12.5, color: "var(--muted)" }}>{footer.builtWith}</span>
        <button type="button" onClick={() => scrollToId("#hero")} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--ink)", background: "transparent", border: "1px solid var(--hairline)", borderRadius: 999, padding: "7px 14px", cursor: "pointer" }}>
          Back to top <ArrowUp size={13} strokeWidth={2} />
        </button>
      </div>
    </footer>
  );
}
