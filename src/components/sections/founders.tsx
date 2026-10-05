import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ArrowLeft } from "@/components/ui/arrow";
import { SmartLink } from "@/components/ui/smart-link";
import { founders } from "@/data/founders";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Studio page. No portraits exist, so none are invented: the founders are
 * set in type, each name split across two lines, alternating sides.
 */
export function Founders() {
  return (
    <>
      <section aria-labelledby="nosotros-title" className="relative pb-[clamp(3rem,6vw,5rem)] pt-[calc(var(--nav-h)+clamp(2.5rem,5vw,4.5rem))]">
        <div className="grid-page gap-y-8">
          <div className="col-span-4 md:col-span-12">
            <SmartLink
              href="/"
              className="meta group inline-flex items-center gap-2 text-ink-2 transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
              Volver al inicio
            </SmartLink>
          </div>

          <p className="meta col-span-4 flex items-center gap-3 self-start text-ink-2 md:col-span-3 md:pt-4">
            <span aria-hidden="true" className="size-1.5 bg-accent" />
            Estudio — Quiénes somos
          </p>

          <div className="col-span-4 md:col-span-9">
            <TextReveal
              as="h1"
              id="nosotros-title"
              lines={["Sistemas que escalan,", "con responsabilidad", { text: "directa.", className: "italic" }]}
              className="display-tight text-[clamp(2.75rem,5.2vw,5rem)]"
            />
            <Reveal as="p" className="mt-8 max-w-xl text-lg leading-snug text-ink-2 md:ml-[33%]">
              {siteConfig.name} es un estudio de ingeniería fundado por Máximo y Tomás Colombo. Dirigimos cada
              proyecto de forma directa, con el equipo justo para lo que el sistema exige.
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-label="Fundadores" className="relative">
        {founders.map((founder, index) => {
          const [first, ...rest] = founder.name.split(" ");
          const mirrored = index % 2 === 1;
          const [label, role] = founder.role.split(" · ");
          return (
            <article
              key={founder.slug}
              aria-labelledby={`${founder.slug}-name`}
              className="group rule-top relative py-[clamp(2.5rem,4.5vw,4rem)]"
            >
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-1000 ease-out-expo group-hover:scale-x-100"
              />
              <div className="grid-page items-end gap-y-8">
                <h2
                  id={`${founder.slug}-name`}
                  className={cn(
                    "col-span-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-[330] leading-[0.86] tracking-[-0.045em] transition-[font-weight] duration-700 ease-out-expo group-hover:font-[480] md:col-span-7",
                    mirrored && "md:order-2 md:col-start-6 md:text-right",
                  )}
                >
                  <span className="block">{first}</span>
                  <span className="block italic">{rest.join(" ")}</span>
                </h2>

                <Reveal className={cn("col-span-4 md:col-span-4", mirrored ? "md:order-1 md:col-start-1" : "md:col-start-9")}>
                  <p className="meta flex items-center gap-3 text-ink-2">
                    <span className="text-ink">{label}</span>
                    <span aria-hidden="true" className="h-px w-5 bg-rule" />
                    {role}
                  </p>
                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-2">{founder.bio}</p>
                  <ul className="meta mt-6 flex flex-wrap gap-2">
                    {founder.focus.map((item) => (
                      <li key={item} className="border border-rule px-2.5 py-1.5">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </article>
          );
        })}
      </section>

      <section aria-label="Principio" className="rule-top relative bg-paper-2/70 py-[clamp(3.5rem,7vw,6rem)]">
        <div className="grid-page">
          <p className="meta col-span-4 mb-8 text-ink-2 md:col-span-3 md:mb-0">Principio</p>
          <blockquote className="col-span-4 border-l-2 border-accent pl-6 md:col-span-8 md:pl-10">
            <TextReveal
              as="p"
              lines={["La arquitectura la define", "quien después responde", { text: "por ella en producción.", className: "italic" }]}
              className="font-display text-[clamp(1.75rem,3vw,3rem)] font-[350] leading-[1] tracking-[-0.03em]"
            />
          </blockquote>
        </div>
      </section>
    </>
  );
}

export default Founders;
