import type Lenis from "lenis";

let lenis: Lenis | null = null;

/** SmoothScroll registers its instance here (null under reduced motion / on unmount). */
export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Scroll to a section by id (e.g. "#work"). Goes through Lenis when it runs so a click mid-momentum still lands; honours reduced motion. */
export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const el = document.querySelector<HTMLElement>(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -16, duration: 1.1, force: true });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 16, behavior: reduce ? "auto" : "smooth" });
}
