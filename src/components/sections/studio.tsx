import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { ArrowRight } from "@/components/ui/arrow";
import { SmartLink } from "@/components/ui/smart-link";

const TAGS = ["Argentina", "Remoto", "Ingeniería", "Arquitectura", "IA", "Producción"];

/** Same letters as the hero's exploded view: the mark's three parts. */
const PRINCIPLES = [
  {
    key: "A",
    title: "Diseñamos la arquitectura.",
    body: "Modelamos los datos y definimos los límites del sistema antes de escribir código. La arquitectura la define quien después responde por ella.",
  },
  {
    key: "B",
    title: "Construimos el sistema.",
    body: "Software funcional, escalable y fácil de evolucionar, integrado con lo que el negocio ya usa.",
  },
  {
    key: "C",
    title: "Lo llevamos a producción.",
    body: "Deploy, disponibilidad y mantenimiento diario. Respondemos por lo que entregamos.",
  },
];

export function Studio() {
  return (
    <section
      id="estudio"
      aria-labelledby="estudio-title"
      className="relative bg-paper-2/70 pb-[clamp(5rem,10vw,9rem)] pt-[clamp(5rem,11vw,10rem)]"
    >
      <div className="grid-page gap-y-10">
        <p className="meta col-span-4 text-ink-2 md:col-span-2">Estudio</p>
        <ScrubText
          as="h2"
          id="estudio-title"
          text="No solo escribimos software. Construimos productos que llegan a producción y se sostienen ahí."
          emphasis={["productos"]}
          className="display-tight col-span-4 text-[clamp(2.5rem,5.8vw,6.25rem)] leading-[0.98] md:col-span-10"
        />
      </div>

      <div className="grid-page mt-[clamp(3rem,6vw,5rem)] gap-y-8">
        <Reveal className="col-span-4 md:col-span-5 md:col-start-3">
          <p className="text-lg leading-snug text-ink-2">
            EvoralTech es un estudio de ingeniería argentino que trabaja en remoto. Dirigimos cada proyecto de forma
            directa y dimensionamos el equipo según lo que el sistema exija: desde una plataforma de captación hasta
            una operación multi-tenant con datos productivos.
          </p>
          <SmartLink
            href="/nosotros"
            className="group mt-8 inline-flex items-center gap-3 text-[0.9375rem] font-medium"
          >
            <span className="bg-[linear-gradient(var(--ink),var(--ink))] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:0%_1px]">
              Conocé al equipo
            </span>
            <ArrowRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          </SmartLink>
        </Reveal>

        <Reveal as="ul" stagger={0.05} className="meta col-span-4 flex flex-wrap content-start gap-x-4 gap-y-2 text-ink-2 md:col-span-4 md:col-start-9">
          {TAGS.map((tag) => (
            <li key={tag} className="border border-rule px-2.5 py-1.5">
              {tag}
            </li>
          ))}
        </Reveal>
      </div>

      <Reveal as="ol" stagger={0.1} className="grid-page mt-[clamp(4rem,8vw,7rem)] gap-y-10">
        {PRINCIPLES.map((item) => (
          <li key={item.key} className="col-span-4 border-t border-ink pt-5">
            <span className="meta flex size-6 items-center justify-center rounded-full border border-ink">{item.key}</span>
            <h3 className="mt-6 font-display text-[clamp(1.7rem,2.4vw,2.35rem)] leading-[1.02] tracking-[-0.02em]">
              {item.title}
            </h3>
            <p className="mt-4 max-w-sm text-[0.9875rem] leading-relaxed text-ink-2">{item.body}</p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}

export default Studio;
