"use client";

import { socials } from "@/lib/content";
import { useMagnetic } from "./ui/useMagnetic";
import { GithubIcon, LinkedinIcon, XIcon } from "./ui/brand";

const ICONS = { GitHub: GithubIcon, LinkedIn: LinkedinIcon, X: XIcon } as const;

/** Magnetic social icon row. `size` is the circle diameter. */
export function Socials({ size = 44 }: { size?: number }) {
  const mag = useMagnetic();
  return (
    <div style={{ display: "flex", gap: size >= 52 ? 10 : 10 }}>
      {socials.map((s) => {
        const Icon = ICONS[s.label as keyof typeof ICONS];
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            {...mag}
            style={{
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "1px solid var(--hairline)",
              color: "var(--ink)",
              transition: "transform .25s, border-color .25s, color .25s",
            }}
          >
            <Icon size={size >= 52 ? 20 : 18} />
          </a>
        );
      })}
    </div>
  );
}
