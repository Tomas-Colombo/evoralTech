"use client";

import * as React from "react";

import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { playPlate, ServicePlate } from "@/components/visuals/service-plates";
import { services } from "@/data/services";
import { gsap, MEDIA, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

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

  // Replay the active plate's story. Plates only exist on desktop, and the
  // loop that follows the story only runs while the plates are on screen.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.desktop, () => {
        const svg = ref.current?.querySelector<SVGSVGElement>(`[data-plate="${active}"] svg`);
        const track = ref.current?.querySelector("[data-plates]");
        if (!svg || !track) return;
        const { timeline, restore } = playPlate(active, svg);
        const visible = ScrollTrigger.create({
          trigger: track,
          start: "top 85%",
          end: "bottom top",
          onToggle: (self) => timeline.paused(!self.isActive),
        });
        timeline.paused(!visible.isActive);
        return restore;
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
      className="rule-top relative scroll-mt-[var(--nav-h)] pb-[clamp(3.5rem,6vw,5.5rem)] pt-[clamp(3.5rem,6vw,5.5rem)] outline-none"
    >
      <div className="grid-page gap-y-8">
        <p className="meta col-span-4 text-ink-2 md:col-span-3">Servicios</p>
        <div className="col-span-4 md:col-span-9">
          <TextReveal
            id="servicios-title"
            lines={["Ingeniería de software", { text: "de punta a punta.", className: "italic" }]}
            className="display-tight text-[clamp(2.25rem,3.8vw,3.75rem)]"
          />
          <Reveal as="p" className="mt-6 max-w-xl text-lg leading-snug text-ink-2 md:ml-[33%]">
            Diseñamos, construimos y operamos los sistemas que sostienen un negocio.
          </Reveal>
        </div>
      </div>

      <div data-plates className="grid-page mt-[clamp(2.5rem,4.5vw,4rem)] items-start">
        <div className="sticky top-[calc(var(--nav-h)+1.5rem)] hidden lg:col-span-4 lg:block">
          <figure className="relative max-w-[26rem] border border-rule bg-paper-2/80">
            <figcaption className="meta flex justify-between border-b border-rule px-4 py-3 text-ink-2">
              <span>
                {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
              <span className="text-ink">{current.title.join(" ")}</span>
            </figcaption>
            <div className="relative aspect-square">
              {services.map((service, index) => (
                <div
                  key={service.slug}
                  data-plate={index}
                  // Only the incoming plate fades; the outgoing one hides at once so their text never overlaps.
                  className={cn("absolute inset-0", index === active ? "transition-opacity duration-300" : "transition-none")}
                  style={{ opacity: index === active ? 1 : 0 }}
                >
                  <ServicePlate index={index} />
                </div>
              ))}
            </div>
          </figure>
        </div>

        <ol className="col-span-4 md:col-span-12 lg:col-span-8">
          {services.map((service, index) => (
            <li
              key={service.slug}
              data-service
              data-active={index === active}
              onPointerEnter={() => setActive(index)}
              className="group relative grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-rule py-7 last:border-b md:grid-cols-[3rem_1fr_1.15fr] md:gap-x-6 lg:py-10"
            >
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100 lg:group-data-[active=true]:scale-x-100"
              />
              <span className="meta pt-[0.9em] text-ink-2 transition-colors lg:group-data-[active=true]:text-accent-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(1.5rem,2vw,2.125rem)] font-[350] leading-[0.95] tracking-[-0.03em] transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                <span className="block">{service.title[0]}</span>
                <span className="block italic text-ink-2 transition-colors duration-500 group-hover:text-ink lg:group-data-[active=true]:text-ink">
                  {service.title[1]}
                </span>
              </h3>
              <div className="col-start-2 mt-5 md:col-start-3 md:mt-1">
                <p className="max-w-md text-[0.9875rem] leading-relaxed text-ink-2">{service.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Services;
