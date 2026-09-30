"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";

export type RevealLine = string | { text: string; className?: string };

export interface TextRevealProps {
  as?: React.ElementType;
  /** One entry per line; a line still wraps if the viewport is too narrow. */
  lines: RevealLine[];
  className?: string;
  lineClassName?: string;
  /**
   * `scroll` reveals on first entry; `intro` leaves the animation to the page
   * intro, which targets `[data-intro-words]`; `none` renders static text.
   */
  trigger?: "scroll" | "intro" | "none";
  delay?: number;
  stagger?: number;
  start?: string;
  id?: string;
}

/**
 * Splits text into masked words at render time, so the markup is final on the
 * server and nothing reflows once scripts load. Assistive tech reads the plain
 * sentence from `aria-label`.
 */
export function TextReveal({
  as: Tag = "h2",
  lines,
  className,
  lineClassName,
  trigger = "scroll",
  delay = 0,
  stagger = 0.06,
  start = "top 85%",
  id,
}: TextRevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const label = lines.map((line) => (typeof line === "string" ? line : line.text)).join(" ");

  useGSAP(
    () => {
      if (trigger !== "scroll") return;
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const words = ref.current?.querySelectorAll(".word-mask > span");
        if (!words?.length) return;
        gsap.from(words, {
          yPercent: 105,
          duration: 1.2,
          delay,
          stagger,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start, once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      id={id}
      aria-label={label}
      className={className}
      {...(trigger === "intro" ? { "data-intro-words": "" } : {})}
    >
      {lines.map((line, lineIndex) => {
        const text = typeof line === "string" ? line : line.text;
        const extra = typeof line === "string" ? undefined : line.className;
        const words = text.split(" ");
        return (
          <span key={lineIndex} aria-hidden="true" className={cn("block", lineClassName, extra)}>
            {words.map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                <span className="word-mask">
                  <span>{word}</span>
                </span>
                {wordIndex < words.length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

export default TextReveal;
