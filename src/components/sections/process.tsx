"use client";

import * as React from "react";

import { LOGO_PATHS } from "@/components/brand/logo-paths";
import { TextReveal } from "@/components/motion/TextReveal";
import { processSteps } from "@/data/process";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";

/**
 * Idea → sistema → producto → producción, read along one accent line that
 * draws with scroll and ends in the mark's check. Horizontal from tablet up,
 * vertical on phones.
 */
export function Process() {
  const ref = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", ref.current);

      const mark = (progress: number) => {
        steps.forEach((step, i) => {
          step.dataset.reached = String(progress >= i / (steps.length - 1) - 0.02);
        });
      };

      mm.add(MEDIA.motion, () => {
        const horizontal = window.matchMedia("(min-width: 768px)").matches;
        const rail = ref.current?.querySelector<HTMLElement>("[data-rail]");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current?.querySelector("[data-track]"),
            start: horizontal ? "top 70%" : "top 65%",
            end: horizontal ? "bottom 45%" : "bottom 60%",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => mark(self.progress),
          },
        });
        tl.fromTo(
          "[data-line]",
          horizontal ? { scaleX: 0 } : { scaleY: 0 },
          { ...(horizontal ? { scaleX: 1 } : { scaleY: 1 }), ease: "none", duration: 1 },
        )
          // A carriage rides the tip of the line and hands over to the check.
          .fromTo(
            "[data-head]",
            { x: 0, y: 0 },
            { ...(horizontal ? { x: () => rail?.offsetWidth ?? 0 } : { y: () => rail?.offsetHeight ?? 0 }), ease: "none", duration: 1 },
            0,
          )
          .to("[data-head]", { autoAlpha: 0, duration: 0.08, ease: "none" }, 0.92)
          .fromTo("[data-check]", { opacity: 0, scale: 0.6, transformOrigin: "0% 100%" }, { opacity: 1, scale: 1, duration: 0.15, ease: "back.out(2)" }, 0.9);
      });

      mm.add(MEDIA.reduced, () => mark(1));
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="proceso"
      aria-labelledby="proceso-title"
      className="rule-top relative pb-[clamp(5rem,10vw,9rem)] pt-[clamp(4rem,8vw,7rem)]"
    >
      <div className="grid-page gap-y-8">
        <p className="meta col-span-4 text-ink-2 md:col-span-3">Proceso</p>
        <div className="col-span-4 md:col-span-9">
          <TextReveal
            id="proceso-title"
            lines={["De la idea", { text: "a producción.", className: "italic" }]}
            className="display-tight text-[clamp(2.25rem,3.8vw,3.75rem)]"
          />
        </div>
      </div>

      <div data-track className="grid-page relative mt-[clamp(3rem,5vw,4.5rem)]">
        <ol className="relative col-span-4 grid gap-y-12 pl-10 md:col-span-12 md:grid-cols-4 md:gap-x-[var(--gutter)] md:pl-0 md:pt-14">
          {/* Track: base rule plus the accent progress, vertical on phones. */}
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-rule md:bottom-auto md:left-0 md:right-[3rem] md:top-[5px] md:h-px md:w-auto" />
          <span
            data-line
            aria-hidden="true"
            className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-accent md:bottom-auto md:left-0 md:right-[3rem] md:top-[5px] md:h-[2px] md:w-auto md:origin-left"
          />
          <span
            data-rail
            aria-hidden="true"
            className="absolute bottom-2 left-[5px] top-2 w-px motion-reduce:hidden md:bottom-auto md:left-0 md:right-[3rem] md:top-[5px] md:h-px md:w-auto"
          >
            <span data-head className="absolute left-0 top-0 size-[9px] -translate-x-1/2 -translate-y-1/2 bg-accent-deep md:top-px" />
          </span>
          <svg
            data-check
            aria-hidden="true"
            viewBox="280 300 830 790"
            className="absolute -bottom-8 left-[-6px] w-6 md:-top-[1.9rem] md:bottom-auto md:left-auto md:right-0 md:w-10"
          >
            <path d={LOGO_PATHS.ribbon} fill="var(--accent)" />
            <path d={LOGO_PATHS.ribbonBack} fill="var(--accent-deep)" />
          </svg>

          {processSteps.map((step, index) => (
            <li key={step.slug} data-step data-reached="false" className="group relative">
              <span
                aria-hidden="true"
                className="absolute -left-10 top-[0.3rem] size-[11px] border border-ink bg-paper transition-colors duration-500 group-data-[reached=true]:border-accent group-data-[reached=true]:bg-accent md:-top-14 md:left-0"
              />
              <p className="meta text-ink-2">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 font-display text-[clamp(1.5rem,2vw,2.125rem)] font-[350] leading-none tracking-[-0.03em]">
                {step.title}
              </h3>
              <p className="mt-4 max-w-xs text-[0.9875rem] leading-relaxed text-ink-2">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Process;
