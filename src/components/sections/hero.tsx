"use client";

import * as React from "react";

import { EXPLODE, Sculpture, toPercent, type PieceKey } from "@/components/brand/sculpture";
import { LocalTime } from "@/components/layout/local-time";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/button-link";
import { services } from "@/data/services";
import { gsap, MEDIA, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { onIntro } from "@/lib/intro";

const PIECES: PieceKey[] = ["a", "b", "c"];

/** Where each piece flies in from on load, in drawing units. */
const ASSEMBLE: Record<PieceKey, [number, number]> = {
  a: [260, -300],
  b: [150, -170],
  c: [-120, 140],
};

/** Parts list for the exploded view; letters match the callout balloons. */
const PARTS = [
  { key: "A", name: "Arquitectura", note: "Modelo de datos" },
  { key: "B", name: "Sistema", note: "Código e integraciones" },
  { key: "C", name: "Producción", note: "Deploy y soporte" },
];

/**
 * The thesis: the EvoralTech mark as a physical object. It assembles on load;
 * on desktop the hero pins while the mark separates into an annotated
 * exploded view whose three parts are the studio's own process.
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
        ).fromTo(q("[data-intro]"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.5);

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
          tl.to(q(`[data-piece-wrap="${piece}"]`), { ...toPercent(x * amount, y * amount), ease: "none", duration: 1 }, 0).to(
            q(`[data-shadow-wrap="${piece}"]`),
            { ...toPercent((x + lift[0]) * amount, (y + lift[1]) * amount), opacity: 0.55, ease: "none", duration: 1 },
            0,
          );
        });
      };

      const mm = gsap.matchMedia();

      mm.add(MEDIA.desktop, () => {
        gsap.set(q("[data-annotations]"), { opacity: 1 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top top", end: "+=95%", pin: true, scrub: 0.8, anticipatePin: 1 },
        });
        explode(tl, 1);
        tl.fromTo(q("[data-axis]"), { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 0.25)
          .fromTo(
            q("[data-leader]"),
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.3, stagger: 0.08, ease: "none" },
            0.45,
          )
          .fromTo(
            q("[data-balloon], [data-dot]"),
            { opacity: 0, scale: 0.5, transformOrigin: "50% 50%" },
            { opacity: 1, scale: 1, duration: 0.2, stagger: 0.08, ease: "back.out(2)" },
            0.6,
          )
          .to(q("[data-bar-services]"), { opacity: 0, y: -10, duration: 0.15, ease: "power2.in" }, 0.45)
          .fromTo(q("[data-parts-item]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2, stagger: 0.07, ease: "power2.out" }, 0.58)
          .to(q("[data-hero-text]"), { y: -48, ease: "none", duration: 1 }, 0);
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
        className="absolute bottom-[4.25rem] right-[-8vw] w-[min(82vw,calc((100svh-34rem)*1.064))] sm:right-[var(--margin)] md:w-[min(56vw,calc((100svh-32rem)*1.064))] lg:bottom-[5rem] lg:w-[min(44vw,calc((100svh-var(--nav-h)-9.5rem)*1.064))]"
      >
        <Sculpture annotations className="w-full" />
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
            className="display-tight mt-5 text-[clamp(3.7rem,16.5vw,6rem)] sm:text-[clamp(4.5rem,12vw,8rem)] lg:mt-7 lg:text-[clamp(5rem,9.4vw,10.5rem)]"
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

      <div data-intro className="absolute inset-x-0 bottom-0">
        <div className="grid-page">
          <div className="col-span-4 flex items-center justify-between gap-6 border-t border-rule py-4 md:col-span-12">
            <div className="relative hidden lg:block">
              <ul data-bar-services className="meta hidden items-center gap-x-5 text-ink-2 xl:flex">
                {services.map((service, index) => (
                  <li key={service.slug} className="flex items-center gap-5">
                    {index > 0 && <span aria-hidden="true" className="h-px w-4 bg-rule" />}
                    <a href="#servicios" className="transition-colors hover:text-ink">
                      {service.title.join(" ")}
                    </a>
                  </li>
                ))}
              </ul>
              {/* Parts list of the exploded view; takes the services' place while pinned. */}
              <ol data-parts aria-hidden="true" className="meta absolute inset-y-0 left-0 flex items-center gap-x-8 whitespace-nowrap text-ink-2">
                {PARTS.map((part) => (
                  <li key={part.key} data-parts-item className="flex items-center gap-2.5">
                    <span className="flex size-[1.15rem] items-center justify-center rounded-full border border-ink text-[0.5625rem] text-ink">
                      {part.key}
                    </span>
                    <span className="text-ink">{part.name}</span>
                    <span className="hidden xl:inline">{part.note}</span>
                  </li>
                ))}
              </ol>
            </div>
            <span className="meta text-ink-2 lg:hidden">Desplazá para ver más</span>
            <LocalTime className="meta shrink-0 whitespace-nowrap text-ink-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
