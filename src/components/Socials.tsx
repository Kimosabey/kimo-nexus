"use client";

import { socials } from "@/lib/content";
import { useMagnetic } from "./ui/useMagnetic";
import { GithubIcon, LinkedinIcon, XIcon } from "./ui/brand";

const ICONS = { GitHub: GithubIcon, LinkedIn: LinkedinIcon, X: XIcon } as const;

/** Magnetic social icon row. `size` is the circle diameter. */
export function Socials({ size = 44 }: { size?: number }) {
  const mag = useMagnetic();
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {socials.map((s) => {
        const Icon = ICONS[s.label as keyof typeof ICONS];
        return (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="kn-social" {...mag} style={{ width: size, height: size }}>
            <Icon size={size >= 52 ? 20 : 18} />
          </a>
        );
      })}
    </div>
  );
}
