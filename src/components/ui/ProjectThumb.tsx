import Image from "next/image";
import { GraduationCap, Lock, Shield } from "lucide-react";
import type { Project } from "@/lib/work";

/**
 * Thumbnail for a project. Repo projects render the real image (grayscale → color on hover);
 * proprietary/academic projects have no shipped image, so render a themed SVG-style placeholder.
 */
export function ProjectThumb({ project: p, sizes = "(max-width:640px) 90vw, (max-width:1200px) 45vw, 300px", grayscale = true }: { project: Project; sizes?: string; grayscale?: boolean }) {
  if (p.action === "repo" && p.img) {
    return <Image src={p.img} alt={p.alt} fill sizes={sizes} className={grayscale ? "kn-thumb" : undefined} style={{ objectFit: "cover" }} />;
  }
  const Icon = p.action === "prop" ? Lock : p.action === "acad" ? GraduationCap : Shield;
  const label = p.action === "prop" ? "Proprietary" : p.action === "acad" ? "Academic" : "Security";
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: "var(--surface-2)",
        backgroundImage: "radial-gradient(color-mix(in srgb,var(--accent) 16%,transparent) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <span style={{ width: 54, height: 54, borderRadius: 16, background: "var(--accent-soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={26} strokeWidth={1.6} />
      </span>
      <span style={{ fontFamily: "var(--fm)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--muted)" }}>{label}</span>
    </div>
  );
}
