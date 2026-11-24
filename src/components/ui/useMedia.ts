"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query. The server snapshot is always `false`, so pointer- and
 * viewport-dependent effects (pinning, cursor, previews) start off and switch on after
 * hydration without a mismatch.
 */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
