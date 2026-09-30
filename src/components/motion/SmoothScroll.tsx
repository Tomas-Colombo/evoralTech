"use client";

import * as React from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { lenisRef, scrollToTarget } from "@/lib/lenis";

/**
 * Inertial wheel scrolling driven by GSAP's ticker, so Lenis and ScrollTrigger
 * read the same frame. Touch keeps native scrolling. Disabled entirely when
 * the user prefers reduced motion.
 *
 * Also eases in-page anchor jumps, including `/#section` links clicked while
 * already on the home page.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const pathnameRef = React.useRef(pathname);

  React.useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  React.useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const handleAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!href) return;

      let hash: string | null = null;
      if (href.startsWith("#")) hash = href;
      else if (href.startsWith("/#") && pathnameRef.current === "/") hash = href.slice(1);
      if (!hash || hash === "#") return;

      const target = document.getElementById(hash.slice(1));
      if (!target) return;

      event.preventDefault();
      history.pushState(null, "", hash);
      scrollToTarget(target);
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", handleAnchorClick);

    // Web fonts change every measurement ScrollTrigger took on first paint.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // A route change lands at the top (or on its hash); Lenis must follow.
  React.useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.resize();
    const hash = window.location.hash;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    const frame = requestAnimationFrame(() => {
      if (target) scrollToTarget(target, true);
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

export default SmoothScroll;
