import * as React from "react";

import { AiAssistant } from "@/components/sections/ai-assistant";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { ArrowUpRight } from "@/components/ui/arrow";
import { AndesVisual, MiliorsVisual, UtopiaVisual } from "@/components/visuals/project-visuals";
import { projects, projectStatusLabels, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Layout = "left" | "right" | "wide";

/** Each project gets its own composition; none of them is a card. */
const COMPOSITION: Record<string, { layout: Layout; Visual: () => React.JSX.Element }> = {
  utopia: { layout: "left", Visual: UtopiaVisual },
  miliors: { layout: "right", Visual: MiliorsVisual },
  "andes-leasing": { layout: "wide", Visual: AndesVisual },
};

const pad = (n: number) => String(n).padStart(2, "0");
const domain = (href: string) => new URL(href).hostname.replace(/^www\./, "");

function MetaRow({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <div className="meta col-span-4 flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4 text-ink-2 md:col-span-12">
      <span>
        {pad(index + 1)} / {pad(total)}
      </span>
      <span className="flex items-center gap-2">
        <span className={cn("size-1.5 rounded-full", project.status === "live" ? "bg-accent" : "bg-ink-2")} />
        {projectStatusLabels[project.status]} · {project.year}
      </span>
    </div>
  );
}

function VisualFrame({ project, className, aspect }: { project: Project; className?: string; aspect: string }) {
  const { Visual } = COMPOSITION[project.slug];
  const frame = (
    <ImageReveal className={cn("w-full", aspect)}>
      <div data-reveal-inner className="absolute inset-0">
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover/visual:scale-[1.035]">
          <Visual />
        </div>
      </div>
    </ImageReveal>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visitar ${project.name} (${domain(project.href)})`}
        data-cursor="project"
        data-cursor-label="Visitar sitio ↗"
        className={cn("group/visual block", className)}
      >
        {frame}
      </a>
    );
  }
  return (
    <div data-cursor="project" data-cursor-label="Caso en preparación" className={cn("group/visual", className)}>
      {frame}
    </div>
  );
}

function Tagline({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-display text-[clamp(1.4rem,1.9vw,1.75rem)] italic leading-[1.1] tracking-[-0.02em]">
      {children}
    </p>
  );
}

function Details({ project, className, tagline = true }: { project: Project; className?: string; tagline?: boolean }) {
  return (
    <div className={className}>
      {tagline && <Tagline>{project.tagline}</Tagline>}
      <p className="max-w-md text-[0.9875rem] leading-relaxed text-ink-2">{project.description}</p>
      <ul className="meta mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag} className="border border-rule px-2.5 py-1.5">
            {tag}
          </li>
        ))}
      </ul>
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium"
        >
          <span className="bg-[linear-gradient(var(--ink),var(--ink))] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:0%_1px]">
            Visitar {domain(project.href)}
          </span>
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ) : (
        <p className="meta mt-8 text-ink-2">Caso de estudio en preparación</p>
      )}
    </div>
  );
}

function ProjectArticle({ project, index, total }: { project: Project; index: number; total: number }) {
  const { layout } = COMPOSITION[project.slug];
  const titleId = `${project.slug}-title`;
  const title = (
    <TextReveal as="h3" id={titleId} lines={[project.name]} className="display-tight text-[clamp(3.5rem,8.6vw,9.25rem)]" />
  );

  if (layout === "wide") {
    return (
      <article aria-labelledby={titleId} className="py-[clamp(3.5rem,7vw,6rem)]">
        <div className="grid-page gap-y-8">
          <MetaRow project={project} index={index} total={total} />
          <div className="col-span-4 md:col-span-12">
            <TextReveal
              as="h3"
              id={titleId}
              lines={[project.name]}
              className="display-tight text-[clamp(3.5rem,12.4vw,13.5rem)]"
            />
          </div>
          <VisualFrame project={project} aspect="aspect-[4/3] md:aspect-[21/9]" className="col-span-4 md:col-span-12" />
          <Reveal className="col-span-4 md:col-span-4">
            <Tagline>{project.tagline}</Tagline>
          </Reveal>
          <Details project={project} tagline={false} className="col-span-4 md:col-span-6 md:col-start-7" />
        </div>
      </article>
    );
  }

  if (layout === "right") {
    return (
      <article aria-labelledby={titleId} className="py-[clamp(3.5rem,7vw,6rem)]">
        <div className="grid-page gap-y-10">
          <MetaRow project={project} index={index} total={total} />
          <div className="col-span-4 md:col-span-4">
            {title}
            <Details project={project} className="mt-8" />
          </div>
          <Parallax amount={10} desktopOnly className="col-span-4 md:col-span-8 md:mt-[10vw]">
            <VisualFrame project={project} aspect="aspect-[16/11]" />
          </Parallax>
        </div>
      </article>
    );
  }

  return (
    <article aria-labelledby={titleId} className="py-[clamp(3.5rem,7vw,6rem)]">
      <div className="grid-page gap-y-10">
        <MetaRow project={project} index={index} total={total} />
        <VisualFrame project={project} aspect="aspect-[4/3]" className="col-span-4 md:col-span-8" />
        <Parallax amount={14} desktopOnly className="col-span-4 flex flex-col justify-end md:col-span-4">
          {title}
          <Details project={project} className="mt-8" />
        </Parallax>
      </div>
    </article>
  );
}

export function Projects() {
  const total = projects.length;
  const years = projects.map((p) => Number(p.year));

  return (
    <section
      id="proyectos"
      tabIndex={-1}
      aria-labelledby="proyectos-title"
      className="rule-top relative scroll-mt-[var(--nav-h)] pt-[clamp(4rem,8vw,7rem)] outline-none"
    >
      <div className="grid-page gap-y-8">
        <p className="meta col-span-4 text-ink-2 md:col-span-3">Proyectos</p>
        <div className="col-span-4 md:col-span-9">
          <TextReveal
            id="proyectos-title"
            lines={["Lo que construimos,", { text: "lo seguimos operando.", className: "italic" }]}
            className="display-tight text-[clamp(2.7rem,6.2vw,6.75rem)]"
          />
          <div className="mt-8 flex flex-col gap-6 md:ml-[33%] md:flex-row md:items-end md:justify-between">
            <Reveal as="p" className="max-w-md text-lg leading-snug text-ink-2">
              Desarrollamos plataformas de alto rendimiento y garantizamos su disponibilidad, escalabilidad y
              mantenimiento diario.
            </Reveal>
            <p className="meta shrink-0 text-ink-2">
              {pad(total)} proyectos · {Math.min(...years)}—{Math.max(...years)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[clamp(2rem,5vw,4rem)]">
        {projects.map((project, index) =>
          project.slug === "asistente-ai-native" ? (
            <AiAssistant key={project.slug} index={index} total={total} />
          ) : (
            <ProjectArticle key={project.slug} project={project} index={index} total={total} />
          ),
        )}
      </div>
    </section>
  );
}

export default Projects;
