import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { projectStatusLabels, type Project } from "@/data/projects";

const statusStyles: Record<Project["status"], string> = {
  live: "border-gold-300/40 bg-gold-300/10 text-gold-100",
  building: "border-gold-500/25 bg-gold-500/[0.07] text-gold-200/80",
  internal: "border-white/10 bg-white/[0.04] text-muted",
};

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

/**
 * Presentational project card.
 *
 * Renders as an anchor once the project has an `href`, and as a plain article
 * until then — so an unfinished case study is never a dead link.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const { name, tagline, description, tags, year, status, icon: Icon, href } = project;
  const isLinked = Boolean(href);
  const isExternal = href?.startsWith("http") ?? false;
  const Root = isLinked ? "a" : "article";

  return (
    <Root
      {...(isLinked ? { href } : {})}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-gold-500/15 bg-surface transition-colors duration-300",
        isLinked
          ? "hover:border-gold-300/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
          : "cursor-default",
        className,
      )}
    >
      {/* Generated cover: circuit grid plus a gold bloom, so a missing screenshot still looks intentional */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-gold-500/10 bg-black">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,var(--gold-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--gold-500)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow)_0%,transparent_70%)] blur-2xl transition-opacity duration-500 group-hover:opacity-90 md:opacity-70"
        />
        <Icon
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-gold-300 drop-shadow-[0_0_18px_var(--glow)] transition-transform duration-500 group-hover:scale-110"
          strokeWidth={1.25}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-3">
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em]",
              statusStyles[status],
            )}
          >
            {projectStatusLabels[status]}
          </span>
          <span className="font-mono text-xs text-muted">{year}</span>
        </div>

        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        <p className="mt-1 text-sm text-gold-200/70">{tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-1.5 border-t border-white/[0.06] pt-4 text-sm font-medium">
          {isLinked ? (
            <span className="flex items-center gap-1.5 text-gold-200 transition-colors group-hover:text-gold-100">
              Ver proyecto
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          ) : (
            <span className="text-muted/70">Caso de estudio en preparación</span>
          )}
        </div>
      </div>
    </Root>
  );
}

export default ProjectCard;
