import type Lenis from "lenis";

/**
 * The page's single Lenis instance, set by <SmoothScroll>. Null when the user
 * prefers reduced motion, in which case the browser scrolls natively.
 */
export const lenisRef: { current: Lenis | null } = { current: null };

/** Scrolls to an element, eased through Lenis when it is running. */
export function scrollToTarget(target: HTMLElement | number, immediate = false) {
  const lenis = lenisRef.current;
  if (lenis) {
    lenis.scrollTo(target, { duration: immediate ? 0 : 1.6, immediate, offset: 0 });
    return;
  }
  const top =
    typeof target === "number"
      ? target
      : target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "auto" });
}
