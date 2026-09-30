"use client";

import * as React from "react";

import { gsap, MEDIA, useGSAP } from "@/lib/gsap";

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  /** Seconds before the element starts moving once it enters. */
  delay?: number;
  /** Starting offset in pixels. */
  y?: number;
  /** Stagger direct children instead of moving the wrapper as one block. */
  stagger?: number;
  /** ScrollTrigger start position. */
  start?: string;
}

/**
 * Fade-up on first entry. The resting state is the visible one; the hidden
 * state only exists while motion is allowed.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  y = 28,
  stagger,
  start = "top 88%",
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const el = ref.current;
        if (!el) return;
        const targets = stagger ? Array.from(el.children) : el;
        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration: 1.1,
          delay,
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  );
}

export default Reveal;
