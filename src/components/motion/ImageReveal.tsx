"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";

type Edge = "bottom" | "top" | "left" | "right";

export interface ImageRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Edge the frame opens from. */
  from?: Edge;
  start?: string;
}

const CLOSED: Record<Edge, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Opens a frame with clip-path while its content settles from a slight
 * over-scale, like a print being unmasked. The child marked
 * `data-reveal-inner` is the layer that settles.
 */
export function ImageReveal({ from = "bottom", start = "top 85%", className, children, ...props }: ImageRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const frame = ref.current;
        if (!frame) return;
        const inner = frame.querySelector("[data-reveal-inner]");
        const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start, once: true } });
        tl.fromTo(
          frame,
          { clipPath: CLOSED[from] },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
        );
        if (inner) tl.from(inner, { scale: 1.16, duration: 1.8, ease: "expo.out" }, 0.1);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}

export default ImageReveal;
