"use client";

import * as React from "react";

import { gsap, MEDIA, useGSAP } from "@/lib/gsap";

export interface ScrubTextProps {
  as?: React.ElementType;
  text: string;
  className?: string;
  /** Words (exact match, punctuation included) set in italic. */
  emphasis?: string[];
  id?: string;
}

/**
 * Text that inks in word by word as it passes through the viewport, tied to
 * scroll position rather than time. Fully inked without motion.
 */
export function ScrubText({ as: Tag = "p", text, className, emphasis = [], id }: ScrubTextProps) {
  const ref = React.useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        gsap.fromTo(
          ref.current?.querySelectorAll("[data-word]") ?? [],
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: ref.current, start: "top 78%", end: "bottom 52%", scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} aria-label={text}>
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <span data-word aria-hidden="true" className={emphasis.includes(word) ? "italic" : undefined}>
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}

export default ScrubText;
