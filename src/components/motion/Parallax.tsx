"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total drift across the viewport pass, in percent of the element's height. */
  amount?: number;
  /** Apply only from the desktop breakpoint up. */
  desktopOnly?: boolean;
}

/** Scrubbed vertical drift, tied to the element's pass through the viewport. */
export function Parallax({ amount = 12, desktopOnly = false, className, children, ...props }: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(desktopOnly ? MEDIA.desktop : MEDIA.motion, () => {
        gsap.fromTo(
          ref.current,
          { yPercent: amount / 2 },
          {
            yPercent: -amount / 2,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)} {...props}>
      {children}
    </div>
  );
}

export default Parallax;
