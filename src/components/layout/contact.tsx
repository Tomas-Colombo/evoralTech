"use client";

import * as React from "react";

import { LOGO_PATHS } from "@/components/brand/logo-paths";
import { Magnetic } from "@/components/motion/MagneticButton";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/arrow";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/data/site";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";

const MAIL = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Nuevo proyecto")}`;

/**
 * Closing call to action, shared by every page. The logo's check is drawn as
 * a construction outline while the section scrolls in, then filled — the
 * idea becoming the shipped thing.
 */
export function Contact() {
  const ref = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const outline = ref.current?.querySelector<SVGPathElement>("[data-check-outline]");
        const fill = ref.current?.querySelector("[data-check-fill]");
        if (!outline || !fill) return;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "center 45%", scrub: 0.8 },
        });
        // Outline first, then the solid form rises into it from the base.
        tl.fromTo(outline, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 1 }).fromTo(
          fill,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "power1.inOut", duration: 0.6 },
          0.55,
        );
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="contacto"
      tabIndex={-1}
      aria-labelledby="contacto-title"
      className="rule-top relative z-[1] scroll-mt-[var(--nav-h)] overflow-hidden pb-[clamp(4rem,8vw,7rem)] pt-[clamp(4.5rem,11vw,10rem)] outline-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[var(--margin)] top-5 aspect-[830/790] w-[5.5rem] md:top-[clamp(6rem,10vw,10rem)] md:w-[33vw]"
      >
        <svg data-check-fill viewBox="280 300 830 790" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="contact-check-front" x1="1" y1="0" x2="0.1" y2="1">
              <stop offset="0" stopColor="#d2b08a" />
              <stop offset="0.5" stopColor="#ad8559" />
              <stop offset="1" stopColor="#956c44" />
            </linearGradient>
            <linearGradient id="contact-check-back" x1="0.8" y1="0" x2="0.2" y2="1">
              <stop offset="0" stopColor="#8a6440" />
              <stop offset="1" stopColor="#664829" />
            </linearGradient>
          </defs>
          <path d={LOGO_PATHS.ribbon} fill="url(#contact-check-front)" />
          <path d={LOGO_PATHS.ribbonBack} fill="url(#contact-check-back)" />
        </svg>
        <svg viewBox="280 300 830 790" className="absolute inset-0 h-full w-full overflow-visible">
          <path
            data-check-outline
            d={LOGO_PATHS.ribbon}
            fill="none"
            stroke="var(--accent-deep)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray="1"
          />
        </svg>
      </div>

      <div className="grid-page relative">
        <p className="meta col-span-4 mb-6 text-ink-2 md:col-span-12">Contacto</p>
        <p className="col-span-4 font-display text-[clamp(1.6rem,2.8vw,2.6rem)] italic leading-none tracking-[-0.02em] text-ink-2 md:col-span-12">
          ¿Tenés una idea?
        </p>
        <TextReveal
          as="h2"
          id="contacto-title"
          lines={["Construyamos", "el sistema que", "la sostiene."]}
          className="display-tight col-span-4 mt-3 text-[clamp(3.1rem,8.6vw,9.75rem)] md:col-span-9"
        />
      </div>

      <div className="grid-page relative mt-[clamp(3rem,7vw,6rem)] gap-y-12 md:items-end">
        <Reveal className="col-span-4 md:col-span-5">
          <p className="max-w-md text-lg leading-snug text-ink-2">
            Contanos el problema y te respondemos con un diagnóstico técnico.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <ButtonLink href={MAIL} size="lg">
                Empezar un proyecto
              </ButtonLink>
            </Magnetic>
            <ButtonLink href={siteConfig.whatsapp} size="lg" variant="ink" external>
              WhatsApp
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="col-span-4 md:col-span-6 md:col-start-7" delay={0.1}>
          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-flex items-baseline gap-3 font-display text-[clamp(1.7rem,3.4vw,3.2rem)] leading-none tracking-[-0.02em]"
          >
            <span className="bg-[linear-gradient(var(--ink),var(--ink))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:100%_1px]">
              {siteConfig.email}
            </span>
            <ArrowUpRight className="size-[0.6em] transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <ul className="meta mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-rule pt-5 text-ink-2">
            {siteConfig.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
                >
                  {social.label}
                  <ArrowUpRight className="size-3" />
                </a>
              </li>
            ))}
            <li>
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;
