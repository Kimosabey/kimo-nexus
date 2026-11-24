"use client";

import { ArrowUp } from "lucide-react";
import { footer, site } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";
import { useLocalTime } from "./ui/useLocalTime";

const YEAR = new Date().getFullYear();

/** Meta row + an outlined wordmark that bleeds off the bottom edge. */
export function Footer() {
  const time = useLocalTime(site.timeZone);
  return (
    <footer className="kn-footer">
      <div className="kn-wrap">
        <div className="kn-footer-row">
          <span>
            © {YEAR} {site.name} · {site.role}
          </span>
          <span className="kn-mono" suppressHydrationWarning>
            {site.city} {time ?? "--:--"} IST
          </span>
          <span>{footer.builtWith}</span>
          <button type="button" onClick={() => scrollToId("#hero")}>
            Back to top <ArrowUp size={13} strokeWidth={2} />
          </button>
        </div>
      </div>
      <span className="kn-wordmark" aria-hidden="true">
        Harshan
      </span>
    </footer>
  );
}
