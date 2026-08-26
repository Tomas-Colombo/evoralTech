"use client";

import * as React from "react";
import Lenis from "lenis";

/**
 * Inertial page scrolling, plus eased jumps for in-page anchor links.
 *
 * Renders nothing. Disabled entirely when the user prefers reduced motion,
 * which hands scrolling back to the browser.
 */
export function SmoothScroll() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.4,
      // Exponential ease-out: quick to respond, long settle.
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", href);
      lenis.scrollTo(target, { duration: 1.8 });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
