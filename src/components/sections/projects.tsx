import * as React from "react";

import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";
import { TextReveal } from "@/components/motion/TextReveal";
import { ArrowUpRight } from "@/components/ui/arrow";
import { AndesVisual, MiliorsVisual, UtopiaVisual } from "@/components/visuals/project-visuals";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Layout = "left" | "right" | "wide";

/** Each project gets its own composition; none of them is a card. */
const COMPOSITION: Record<string, { layout: Layout; Visual: () => React.JSX.Element }> = {
  utopia: { layout: "left", Visual: UtopiaVisual },
  miliors: { layout: "right", Visual: MiliorsVisual },
  "andes-leasing": { layout: "wide", Visual: AndesVisual },
};

const domain = (href: string) => new URL(href).hostname.replace(/^www\./, "");

/** Hairline that opens each project; the section title already says they are live. */
function ProjectRule() {
  return <div aria-hidden="true" className="col-span-4 border-b border-rule md:col-span-12" />;
}

function VisualFrame({ project, className, aspect }: { project: Project; className?: string; aspect: string }) {
  const { Visual } = COMPOSITION[project.slug];
  const frame = (
    <>
      <ImageReveal className={cn("w-full", aspect)}>
        <div data-reveal-inner className="absolute inset-0">
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover/visual:scale-[1.035]">
            <Visual />
          </div>
        </div>
      </ImageReveal>
      {/* Registration marks that open out to frame the plate on hover or focus. */}
      <span
        aria-hidden="true"
        className="corner-marks opacity-50 [--cm-size:8px] group-hover/visual:opacity-100 group-hover/visual:[--cm-gap:12px] group-hover/visual:[--cm-size:20px] group-focus-visible/visual:opacity-100 group-focus-visible/visual:[--cm-gap:12px] group-focus-visible/visual:[--cm-size:20px]"
      />
    </>
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
        className={cn("group/visual relative block", className)}
      >
        {frame}
      </a>
    );
  }
  return (
    <div data-cursor="project" data-cursor-label="Caso en preparación" className={cn("group/visual relative", className)}>
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

function ProjectArticle({ project }: { project: Project }) {
  const { layout } = COMPOSITION[project.slug];
  const titleId = `${project.slug}-title`;
  const title = (
    <TextReveal as="h3" id={titleId} lines={[project.name]} className="display-tight text-[clamp(2rem,3.2vw,3.25rem)]" />
  );

  // Each article is sized to fit a single desktop viewport below the nav.
  if (layout === "wide") {
    return (
      <article aria-labelledby={titleId} className="py-[clamp(2.5rem,4.5vw,4rem)]">
        <div className="grid-page gap-y-8">
          <ProjectRule />
          <div className="col-span-4 md:col-span-12">
            <TextReveal
              as="h3"
              id={titleId}
              lines={[project.name]}
              className="display-tight text-[clamp(2rem,3.2vw,3.25rem)]"
            />
          </div>
          <VisualFrame project={project} aspect="aspect-[4/3] md:aspect-[21/9]" className="col-span-4 md:col-span-7" />
          <Details project={project} className="col-span-4 flex flex-col justify-end md:col-span-4 md:col-start-9" />
        </div>
      </article>
    );
  }

  if (layout === "right") {
    return (
      <article aria-labelledby={titleId} className="py-[clamp(2.5rem,4.5vw,4rem)]">
        <div className="grid-page gap-y-8">
          <ProjectRule />
          <div className="col-span-4 md:col-span-5">
            {title}
            <Details project={project} className="mt-8" />
          </div>
          <Parallax amount={10} desktopOnly className="col-span-4 md:col-span-6 md:col-start-7">
            <VisualFrame project={project} aspect="aspect-[4/3] md:aspect-[16/9]" />
          </Parallax>
        </div>
      </article>
    );
  }

  return (
    <article aria-labelledby={titleId} className="py-[clamp(2.5rem,4.5vw,4rem)]">
      <div className="grid-page gap-y-8">
        <ProjectRule />
        <VisualFrame project={project} aspect="aspect-[4/3] md:aspect-[16/9]" className="col-span-4 md:col-span-6" />
        <Parallax amount={14} desktopOnly className="col-span-4 flex flex-col justify-end md:col-span-5 md:col-start-8">
          {title}
          <Details project={project} className="mt-8" />
        </Parallax>
      </div>
    </article>
  );
}

export function Projects() {
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
            className="display-tight text-[clamp(2.25rem,3.8vw,3.75rem)]"
          />
        </div>
      </div>

      <div className="mt-[clamp(2rem,5vw,4rem)]">
        {projects.map((project) => (
          <ProjectArticle key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
