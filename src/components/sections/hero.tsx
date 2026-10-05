"use client";

import * as React from "react";

import { EXPLODE, Sculpture, toPercent, type PieceKey } from "@/components/brand/sculpture";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/button-link";
import { gsap, MEDIA, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { onIntro } from "@/lib/intro";

const PIECES: PieceKey[] = ["a", "b", "c"];

/** Where each piece flies in from on load, in drawing units. */
const ASSEMBLE: Record<PieceKey, [number, number]> = {
  a: [260, -300],
  b: [150, -170],
  c: [-120, 140],
};

/**
 * The thesis: the EvoralTech mark as a physical object. It assembles on load;
 * as the hero scrolls away the pieces drift apart along the mark's slant,
 * riding the scroll instead of holding it.
 */
export function Hero() {
  const ref = React.useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const root = ref.current;
      if (!root || !contextSafe) return;
      const q = gsap.utils.selector(root);

      const playIntro = contextSafe(() => {
        if (prefersReducedMotion()) return;
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(
          q("[data-intro-words] .word-mask > span"),
          { yPercent: 105 },
          { yPercent: 0, duration: 1.4, stagger: 0.07 },
          0.05,
        )
          .fromTo(q("[data-intro]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.5)
          // Once the parts have landed, the drawing board settles in under them.
          .fromTo(q("[data-intro-frame]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 1.1)
          .fromTo(q("[data-intro-frame] .corner-marks"), { "--cm-size": "0px" }, { "--cm-size": "16px", duration: 1.2 }, 1.2);

        PIECES.forEach((piece, index) => {
          const [x, y] = ASSEMBLE[piece];
          const from = { ...toPercent(x, y), autoAlpha: 0 };
          const to = { xPercent: 0, yPercent: 0, autoAlpha: 1 };
          tl.fromTo(q(`[data-piece="${piece}"]`), from, { ...to, duration: 1.9 }, 0.1 + index * 0.12).fromTo(
            q(`[data-shadow="${piece}"]`),
            from,
            { ...to, duration: 2.2 },
            0.2 + index * 0.12,
          );
        });
      });
      const unsubscribe = onIntro(playIntro);

      /** Slides each piece along the mark's slant axis; shadows drift as it lifts. */
      const explode = (tl: gsap.core.Timeline, amount: number) => {
        PIECES.forEach((piece) => {
          const { x, y, lift } = EXPLODE[piece];
          const parts = q(`[data-piece-wrap="${piece}"], [data-callout-wrap="${piece}"]`);
          tl.to(parts, { ...toPercent(x * amount, y * amount), ease: "none", duration: 1 }, 0).to(
            q(`[data-shadow-wrap="${piece}"]`),
            { ...toPercent((x + lift[0]) * amount, (y + lift[1]) * amount), opacity: 0.55, ease: "none", duration: 1 },
            0,
          );
        });
      };

      const mm = gsap.matchMedia();

      mm.add(MEDIA.desktop, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 },
        });
        explode(tl, 1);
        tl.to(q("[data-hero-text]"), { y: -48, ease: "none", duration: 1 }, 0)
          // As the parts separate, the mark turns into an annotated assembly
          // drawing: the axis they slide along, then one callout per part.
          .fromTo(
            q("[data-axis]"),
            { autoAlpha: 0, scale: 0.2, transformOrigin: "48.8% 49.3%" },
            { autoAlpha: 1, scale: 1, ease: "none", duration: 0.3 },
            0,
          )
          .fromTo(q("[data-callout] circle"), { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", duration: 0.06, stagger: 0.05 }, 0.06)
          .fromTo(q("[data-callout] path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 0.18, stagger: 0.05 }, 0.08)
          .fromTo(q("[data-callout-label]"), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, ease: "none", duration: 0.12, stagger: 0.05 }, 0.22);
      });

      mm.add(MEDIA.mobile, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        explode(tl, 0.7);
      });

      return () => unsubscribe();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative h-svh min-h-[40rem] overflow-hidden lg:min-h-[44rem]"
    >
      <div
        className="absolute bottom-[4.25rem] right-[-8vw] w-[min(82vw,calc((100svh-34rem)*1.064))] sm:right-[var(--margin)] md:w-[min(56vw,calc((100svh-32rem)*1.064))] lg:bottom-auto lg:top-1/2 lg:w-[min(36vw,calc((100svh-var(--nav-h)-9.5rem)*0.87))] lg:-translate-y-1/2"
      >
        <div data-intro-frame aria-hidden="true" className="absolute inset-0 hidden sm:block">
          <div className="dot-field absolute inset-[4%]" />
          <span className="corner-marks transition-none [--cm-color:var(--accent)] [--cm-gap:0px] [--cm-size:16px]" />
        </div>
        <Sculpture annotated className="w-full" />
      </div>

      <div className="grid-page relative h-full pb-24 pt-[calc(var(--nav-h)+2.5rem)] lg:items-center lg:pb-16 lg:pt-[var(--nav-h)]">
        <div data-hero-text className="col-span-4 md:col-span-9 lg:col-span-7">
          <p data-intro className="meta flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-2 sm:gap-x-3">
            <span aria-hidden="true" className="size-1.5 bg-accent" />
            Estudio de ingeniería
            <span aria-hidden="true" className="h-px w-3 bg-rule sm:w-6" />
            Argentina
            <span aria-hidden="true" className="h-px w-3 bg-rule sm:w-6" />
            Remoto
          </p>

          <TextReveal
            as="h1"
            id="hero-title"
            trigger="intro"
            lines={["Convertimos", "ideas en", { text: "productos.", className: "italic" }]}
            className="display-tight mt-5 text-[clamp(3rem,13vw,4.25rem)] sm:text-[clamp(3.75rem,9vw,5.5rem)] lg:mt-7 lg:text-[clamp(3.75rem,6vw,6rem)]"
          />

          <p data-intro className="mt-6 max-w-[26rem] text-[1.0625rem] leading-snug text-ink-2 lg:mt-9 lg:text-lg">
            Diseñamos la arquitectura, construimos el sistema y lo llevamos a producción.
          </p>

          <div data-intro className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 lg:mt-9">
            <ButtonLink href="#contacto">Empezar un proyecto</ButtonLink>
            <a
              href="#proyectos"
              className="group text-[0.9375rem] font-medium bg-[linear-gradient(var(--ink),var(--ink))] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo hover:bg-[length:0%_1px]"
            >
              Ver proyectos
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Hero;
