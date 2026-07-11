/** Smooth-scroll to a section by id (e.g. "#work"); honors reduced motion. Client-only. */
export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const el = document.querySelector(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const y = window.scrollY + (el as HTMLElement).getBoundingClientRect().top - 16;
  window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
}
