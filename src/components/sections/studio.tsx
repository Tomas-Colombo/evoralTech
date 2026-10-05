import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { ArrowRight } from "@/components/ui/arrow";
import { SmartLink } from "@/components/ui/smart-link";
import { founders } from "@/data/founders";

/**
 * The home's "about": one claim, the one thing only this section says, and
 * the people behind it. Location and process already live in the hero and
 * the process section, so they are not repeated here.
 */
export function Studio() {
  return (
    <section
      id="estudio"
      aria-labelledby="estudio-title"
      className="relative bg-paper-2/70 py-[clamp(4rem,8vw,7rem)]"
    >
      <div className="grid-page gap-y-8">
        <p className="meta col-span-4 text-ink-2 md:col-span-2">Estudio</p>
        <ScrubText
          as="h2"
          id="estudio-title"
          text="No solo escribimos software. Construimos productos que llegan a producción y se sostienen ahí."
          emphasis={["productos"]}
          className="display-tight col-span-4 text-[clamp(2.25rem,4.8vw,5rem)] leading-[0.98] md:col-span-10"
        />
      </div>

      <div className="grid-page mt-[clamp(2.5rem,5vw,4rem)] gap-y-10">
        <Reveal
          as="p"
          className="col-span-4 max-w-md text-lg leading-snug text-ink-2 md:col-span-5 md:col-start-3"
        >
          Dirigimos cada proyecto de forma directa y dimensionamos el equipo según lo que el sistema exija: desde una
          plataforma de captación hasta una operación multi-tenant con datos productivos.
        </Reveal>

        <Reveal className="col-span-4 md:col-span-4 md:col-start-9">
          <ul>
            {founders.map((founder) => (
              <li key={founder.slug} className="flex flex-col gap-2 border-t border-rule py-4">
                <span className="font-display text-[1.5rem] leading-none tracking-[-0.02em]">{founder.name}</span>
                <span className="meta text-ink-2">{founder.role.split(" · ")[1]}</span>
              </li>
            ))}
          </ul>
          <SmartLink
            href="/nosotros"
            className="group mt-6 inline-flex items-center gap-3 text-[0.9375rem] font-medium"
          >
            <span className="bg-[linear-gradient(var(--ink),var(--ink))] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:0%_1px]">
              Conocé al equipo
            </span>
            <ArrowRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          </SmartLink>
        </Reveal>
      </div>
    </section>
  );
}

export default Studio;
