"use client";

import * as React from "react";

import { Logo } from "@/components/brand/logo";
import { gsap, useGSAP } from "@/lib/gsap";
import { releaseIntro } from "@/lib/intro";
import { lenisRef } from "@/lib/lenis";

/** Shortest time the loader stays up, so it reads as a beat rather than a flash. */
const MIN_MS = 750;
/** Longest wait for fonts before leaving anyway. */
const MAX_MS = 1800;

/**
 * First-visit loader. The head script marks it `skip` for returning visits in
 * the same session and for reduced motion, in which case CSS never paints it
 * and the intro is released immediately. It waits only for the web fonts the
 * hero needs, within MIN_MS–MAX_MS.
 */
export function Loader() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      if (document.documentElement.dataset.loader === "skip") {
        gsap.set(root, { display: "none" });
        releaseIntro();
        return;
      }

      // Hold the page still underneath; Lenis mounts after this effect runs.
      const html = document.documentElement;
      html.style.overflow = "hidden";
      requestAnimationFrame(() => lenisRef.current?.stop());
      const counter = root.querySelector<HTMLElement>("[data-counter]");
      const progress = { value: 0 };
      const started = performance.now();

      const fontsReady = Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise((resolve) => setTimeout(resolve, MAX_MS)),
      ]);

      // Count to 90 on a clock, then finish once the fonts are in.
      const count = gsap.to(progress, {
        value: 90,
        duration: MIN_MS / 1000,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counter) counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
          gsap.set("[data-progress]", { scaleX: progress.value / 100 });
        },
      });

      gsap.from("[data-loader-mark] > *", { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.08 });

      let cancelled = false;
      fontsReady.then(() => {
        if (cancelled) return;
        const wait = Math.max(0, MIN_MS - (performance.now() - started));
        gsap
          .timeline({ delay: wait / 1000 })
          .add(() => count.kill())
          .to(progress, {
            value: 100,
            duration: 0.35,
            ease: "power2.out",
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
              gsap.set("[data-progress]", { scaleX: progress.value / 100 });
            },
          })
          .add(() => {
            html.style.overflow = "";
            lenisRef.current?.start();
            releaseIntro();
          })
          .to(root, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.95, ease: "expo.inOut" })
          .set(root, { display: "none" });
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="loader fixed inset-0 z-[150] flex flex-col bg-paper text-ink"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="grid-page items-start pt-6">
        <p className="meta col-span-2 text-ink-2 md:col-span-6">EvoralTech — Estudio de ingeniería</p>
        <p className="meta col-span-2 text-right text-ink-2 md:col-span-6">Argentina · Remoto</p>
      </div>

      <div className="grid-page mt-auto items-end pb-8">
        <div className="col-span-3 flex items-end gap-4 md:col-span-8 md:gap-6">
          <span data-loader-mark className="block overflow-hidden">
            <Logo size={80} priority className="block size-12 md:size-20" />
          </span>
          <span data-loader-mark className="block overflow-hidden">
            <span className="display-tight block text-[clamp(2.75rem,8vw,7.5rem)]" style={{ letterSpacing: "-0.015em" }}>
              EvoralTech
            </span>
          </span>
        </div>
        <p
          data-counter
          className="col-span-1 text-right font-mono text-sm tabular-nums text-ink-2 md:col-span-4 md:text-base"
        >
          000
        </p>
      </div>

      <div className="h-px w-full bg-rule">
        <div data-progress className="h-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}

export default Loader;
