export const MOTION_DURATION = {
  fast: 150,
  normal: 220,
} as const;

export const MOTION_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
