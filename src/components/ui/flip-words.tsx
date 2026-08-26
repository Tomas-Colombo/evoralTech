"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface FlipWordsProps {
  words: string[];
  /** Milliseconds each word stays on screen. */
  duration?: number;
  className?: string;
}

/**
 * Cycles through `words`, rolling each one upward out of view as the next
 * rises into place — the same vertical motion as the navbar labels.
 *
 * An invisible copy of the longest word reserves the box, so the line never
 * reflows as the words change length.
 */
export function FlipWords({ words, duration = 3200, className }: FlipWordsProps) {
  const [index, setIndex] = React.useState(0);
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (words.length < 2) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, duration);

    return () => clearInterval(id);
  }, [words.length, duration]);

  const longest = React.useMemo(
    () => words.reduce((a, b) => (b.length > a.length ? b : a), ""),
    [words],
  );

  const current = words[index] ?? "";

  return (
    // `className` never lands here: bg-clip-text on an ancestor clips against
    // the text of its descendants, so the invisible sizer would paint through.
    <span className="relative inline-flex overflow-hidden align-bottom leading-[1.15]">
      {/* Announced once, instead of letter by letter */}
      <span className="sr-only">{current}</span>

      <span aria-hidden="true" className={cn("invisible whitespace-nowrap", className)}>
        {longest}
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          aria-hidden="true"
          initial={prefersReducedMotion ? { opacity: 0 } : { y: "110%" }}
          animate={prefersReducedMotion ? { opacity: 1 } : { y: "0%" }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: "-110%" }}
          transition={{
            duration: prefersReducedMotion ? 0.15 : 0.75,
            ease: [0.65, 0, 0.2, 1],
          }}
          className={cn(
            "absolute inset-0 flex items-center justify-start whitespace-nowrap",
            className,
          )}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default FlipWords;
