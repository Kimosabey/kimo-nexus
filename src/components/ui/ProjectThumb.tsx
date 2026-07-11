import Image from "next/image";
import { Clapperboard, FlaskConical, GraduationCap, Landmark, LineChart, Lock, Shield, ShieldCheck, Truck } from "lucide-react";
import type { ComponentType } from "react";
import type { Project } from "@/lib/work";

// Distinct domain cover icons for projects with no shipped screenshot (vector, theme-aware).
const DOMAIN: Record<string, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  tabedaar: Truck,
  "canada-bizzsp": Clapperboard,
  "zeus-biotech": FlaskConical,
  "chit-fund-sys": Landmark,
  "graphical-captcha": ShieldCheck,
  "early-reviewer-predict": LineChart,
  "nexus-shield": Shield,
};

/**
 * Thumbnail for a project. Repo projects with a screenshot render the real image
 * (grayscale → color on hover). Projects without an image (proprietary/academic, or a
 * repo awaiting a screenshot) render a distinct, designed vector cover instead.
 */
export function ProjectThumb({ project: p, sizes = "(max-width:640px) 90vw, (max-width:1200px) 45vw, 300px", grayscale = true }: { project: Project; sizes?: string; grayscale?: boolean }) {
  if (p.action === "repo" && p.img) {
    return <Image src={p.img} alt={p.alt} fill sizes={sizes} className={grayscale ? "kn-thumb" : undefined} style={{ objectFit: "cover" }} />;
  }
  const Icon = DOMAIN[p.id] ?? (p.action === "prop" ? Lock : p.action === "acad" ? GraduationCap : Shield);
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface-2)",
        backgroundImage: "radial-gradient(color-mix(in srgb,var(--accent) 16%,transparent) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <span style={{ width: 60, height: 60, borderRadius: 18, background: "var(--accent-soft)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 1px color-mix(in srgb,var(--accent) 24%,transparent)" }}>
        <Icon size={30} strokeWidth={1.5} />
      </span>
    </div>
  );
}
