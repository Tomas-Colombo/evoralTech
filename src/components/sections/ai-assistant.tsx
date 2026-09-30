"use client";

import * as React from "react";

import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { projects, projectStatusLabels } from "@/data/projects";
import { gsap, MEDIA, ScrollTrigger, useGSAP } from "@/lib/gsap";

const project = projects.find((p) => p.slug === "asistente-ai-native")!;

/** One request through the system, step by step — what the project does. */
const TRACE = [
  { step: "consulta", detail: "recibida" },
  { step: "recuperación", detail: "base de conocimiento del cliente" },
  { step: "orquestación", detail: "agente seleccionado" },
  { step: "acción", detail: "ejecutada sobre datos propios" },
  { step: "evaluación", detail: "automática" },
  { step: "traza", detail: "registrada" },
];

/** Node layout for the signal diagram, in a 600×420 drawing. */
const NODES: [number, number][] = [
  [60, 210], [170, 110], [170, 310], [290, 60], [290, 210], [290, 360], [420, 130], [420, 290], [540, 210],
];
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7], [6, 8], [7, 8], [3, 4], [4, 5],
];
/** The lit route: consulta → recuperación → agente → acción. */
const SIGNAL = [0, 1, 4, 7, 8];

/**
 * The AI-native assistant gets its own moment: a dark plate where a signal
 * crosses a node system while the trace of one request prints alongside.
 */
export function AiAssistant({ index, total }: { index: number; total: number }) {
  const ref = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const q = gsap.utils.selector(ref);
        const tl = gsap.timeline({ scrollTrigger: { trigger: q("[data-diagram]")[0], start: "top 75%", once: true } });
        tl.fromTo(q("[data-edge]"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.04, ease: "power2.inOut" })
          .fromTo(q("[data-node]"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(2)" }, 0.2)
          .fromTo(q("[data-signal]"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 0.9)
          .fromTo(q("[data-trace]"), { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.18, ease: "power2.out" }, 0.9);

        // Once drawn, a pulse keeps travelling the lit route — only while on screen.
        const pulse = gsap.to(q("[data-pulse]"), { strokeDashoffset: "-=100", duration: 2.6, ease: "none", repeat: -1, paused: true });
        tl.add(() => {
          pulse.play();
        });
        ScrollTrigger.create({
          trigger: ref.current,
          onToggle: (self) => {
            if (tl.progress() === 1) pulse.paused(!self.isActive);
          },
        });
      });
    },
    { scope: ref },
  );

  const route = SIGNAL.map((i) => NODES[i].join(",")).join(" ");

  return (
    <article
      ref={ref}
      data-nav="dark"
      aria-labelledby={`${project.slug}-title`}
      className="guides-dark relative overflow-hidden bg-brown py-[clamp(5rem,10vw,9rem)] text-paper"
    >
      <div aria-hidden="true" className="grain-dark pointer-events-none absolute inset-0" />

      <div className="grid-page relative gap-y-6">
        <div className="meta col-span-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 text-paper/60 md:col-span-12">
          <span>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} — {project.name}
          </span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            {projectStatusLabels[project.status]} · {project.year}
          </span>
        </div>

        <TextReveal
          as="h3"
          id={`${project.slug}-title`}
          lines={["La IA no debería", "solo responder.", { text: "Debería hacer.", className: "italic text-accent-light" }]}
          className="display-tight col-span-4 mt-10 text-[clamp(3rem,7.4vw,8rem)] md:col-span-10"
        />
      </div>

      <div className="grid-page relative mt-[clamp(3rem,7vw,6rem)] items-start gap-y-12">
        <div data-diagram className="col-span-4 border border-white/15 md:col-span-7">
          <div className="meta flex justify-between border-b border-white/15 px-4 py-3 text-paper/50">
            <span>Orquestación</span>
            <span>1 solicitud</span>
          </div>
          <svg viewBox="0 0 600 420" className="block w-full" aria-hidden="true">
            {EDGES.map(([a, b]) => (
              <line
                key={`${a}-${b}`}
                data-edge
                x1={NODES[a][0]}
                y1={NODES[a][1]}
                x2={NODES[b][0]}
                y2={NODES[b][1]}
                stroke="var(--paper)"
                strokeOpacity="0.22"
                strokeWidth="1"
                pathLength={1}
              />
            ))}
            <polyline data-signal points={route} fill="none" stroke="var(--accent)" strokeWidth="2" pathLength={1} />
            <polyline
              data-pulse
              points={route}
              fill="none"
              stroke="#e8d3b8"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray="3 97"
            />
            {NODES.map(([x, y], i) => (
              <circle
                key={i}
                data-node
                cx={x}
                cy={y}
                r={SIGNAL.includes(i) ? 8 : 5}
                fill={SIGNAL.includes(i) ? "var(--accent)" : "var(--brown)"}
                stroke="var(--paper)"
                strokeOpacity={SIGNAL.includes(i) ? 0 : 0.5}
                strokeWidth="1.25"
              />
            ))}
          </svg>
        </div>

        <div className="col-span-4 md:col-span-5">
          <ol className="font-mono text-[0.8125rem] leading-relaxed">
            {TRACE.map((line, i) => (
              <li key={line.step} data-trace className="flex gap-4 border-b border-white/10 py-3">
                <span className="w-6 text-paper/35">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-accent">›</span>
                <span className="w-28 shrink-0 text-paper">{line.step}</span>
                <span className="text-paper/65">{line.detail}</span>
              </li>
            ))}
          </ol>

          <Reveal className="mt-10">
            <p className="font-display text-[1.6rem] italic leading-tight tracking-[-0.02em]">{project.tagline}</p>
            <p className="mt-4 max-w-md text-[0.9875rem] leading-relaxed text-paper/70">{project.description}</p>
            <ul className="meta mt-6 flex flex-wrap gap-2 text-paper/80">
              {project.tags.map((tag) => (
                <li key={tag} className="border border-white/20 px-2.5 py-1.5">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="meta mt-8 text-paper/60">Caso de estudio en preparación</p>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

export default AiAssistant;
