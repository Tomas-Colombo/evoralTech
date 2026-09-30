"use client";

import * as React from "react";

import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ServicePlate } from "@/components/visuals/service-plates";
import { services } from "@/data/services";
import { gsap, MEDIA, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Services as an editorial index. On desktop a sticky plate beside the list
 * redraws itself for whichever service is at the reading line, or hovered.
 */
export function Services() {
  const ref = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState(0);

  // Scroll decides the active row; hover can override it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-service]", ref.current);
        rows.forEach((row, index) => {
          ScrollTrigger.create({
            trigger: row,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => self.isActive && setActive(index),
          });
        });
      });
    },
    { scope: ref },
  );

  // Redraw the plate that just became active.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const plate = ref.current?.querySelector(`[data-plate="${active}"]`);
        if (!plate) return;
        const tl = gsap.timeline();
        tl.fromTo(
          plate.querySelectorAll("[data-draw]"),
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.9, stagger: 0.03, ease: "power2.inOut" },
        )
          .fromTo(plate.querySelectorAll("[data-draw-node]"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" }, 0.3)
          .fromTo(
            plate.querySelectorAll("[data-accent-draw]"),
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" },
            0.5,
          )
          .fromTo(plate.querySelectorAll("[data-accent]"), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.08 }, 0.7);

        const pulses = plate.querySelectorAll("[data-pulse]");
        if (pulses.length) {
          const pulse = gsap.to(pulses, { strokeDashoffset: "-=100", duration: 2.4, ease: "none", repeat: -1 });
          ScrollTrigger.create({ trigger: ref.current, onToggle: (self) => pulse.paused(!self.isActive) });
        }
      });
    },
    { scope: ref, dependencies: [active], revertOnUpdate: true },
  );

  const current = services[active];

  return (
    <section
      ref={ref}
      id="servicios"
      tabIndex={-1}
      aria-labelledby="servicios-title"
      className="rule-top relative scroll-mt-[var(--nav-h)] pb-[clamp(5rem,10vw,9rem)] pt-[clamp(4rem,8vw,7rem)] outline-none"
    >
      <div className="grid-page gap-y-8">
        <p className="meta col-span-4 text-ink-2 md:col-span-3">Servicios</p>
        <div className="col-span-4 md:col-span-9">
          <TextReveal
            id="servicios-title"
            lines={["Ingeniería de software", { text: "de punta a punta.", className: "italic" }]}
            className="display-tight text-[clamp(2.7rem,6.2vw,6.75rem)]"
          />
          <Reveal as="p" className="mt-8 max-w-xl text-lg leading-snug text-ink-2 md:ml-[33%]">
            Diseñamos, construimos y operamos los sistemas que sostienen un negocio. La inteligencia artificial no
            va por separado: la integramos donde resuelve un problema concreto.
          </Reveal>
        </div>
      </div>

      <div className="grid-page mt-[clamp(3.5rem,8vw,7rem)] items-start">
        <div className="sticky top-[calc(var(--nav-h)+1.5rem)] hidden lg:col-span-5 lg:block">
          <figure className="relative border border-rule bg-paper-2/80">
            <figcaption className="meta flex justify-between border-b border-rule px-4 py-3 text-ink-2">
              <span>Lámina {String(active + 1).padStart(2, "0")}</span>
              <span className="text-ink">{current.title.join(" ")}</span>
            </figcaption>
            <div className="relative aspect-square">
              {services.map((service, index) => (
                <div
                  key={service.slug}
                  data-plate={index}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: index === active ? 1 : 0 }}
                >
                  <ServicePlate index={index} />
                </div>
              ))}
            </div>
            <div className="meta flex justify-between border-t border-rule px-4 py-3 text-ink-2">
              <span>{current.meta.join(" · ")}</span>
              <span>
                {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
            </div>
          </figure>
        </div>

        <ol className="col-span-4 md:col-span-12 lg:col-span-7">
          {services.map((service, index) => (
            <li
              key={service.slug}
              data-service
              data-active={index === active}
              onPointerEnter={() => setActive(index)}
              className="group relative grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-rule py-9 last:border-b md:grid-cols-[4rem_1.3fr_1fr] md:gap-x-6 lg:py-12"
            >
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100 lg:group-data-[active=true]:scale-x-100"
              />
              <span className="meta pt-[0.9em] text-ink-2 transition-colors lg:group-data-[active=true]:text-accent-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(2.25rem,3.9vw,4rem)] font-[350] leading-[0.95] tracking-[-0.03em] transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                <span className="block">{service.title[0]}</span>
                <span className="block italic text-ink-2 transition-colors duration-500 group-hover:text-ink lg:group-data-[active=true]:text-ink">
                  {service.title[1]}
                </span>
              </h3>
              <div className="col-start-2 mt-5 md:col-start-3 md:mt-3">
                <p className="max-w-sm text-[0.9875rem] leading-relaxed text-ink-2">{service.description}</p>
                <ul className="meta mt-5 flex flex-wrap gap-x-3 gap-y-1.5 text-ink">
                  {service.meta.map((tag) => (
                    <li key={tag} className="flex items-center gap-3">
                      <span aria-hidden="true" className="size-1 bg-accent" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Services;
