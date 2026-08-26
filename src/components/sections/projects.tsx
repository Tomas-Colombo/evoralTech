"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { ProjectCarousel } from "@/components/ui/project-carousel";
import { projects } from "@/data/projects";

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const still: Variants = { hidden: { opacity: 1 }, visible: { opacity: 1 } };

export function Projects() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? still : reveal;

  return (
    <section
      id="proyectos"
      className="relative scroll-mt-24 overflow-hidden border-t border-gold-500/10 bg-background py-24 sm:py-32"
    >
      {/* Ambient bloom, dimmer than the hero so the cards stay the focus */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,var(--glow)_0%,transparent_70%)] opacity-40 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.header
          custom={0}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400">
            Proyectos
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl">
            Sistemas que seguimos sosteniendo
          </h2>
          <p className="mt-5 text-balance text-base leading-relaxed text-muted sm:text-lg">
            No entregamos y desaparecemos. Cada proyecto acá abajo sigue
            corriendo, y en varios seguimos adentro.
          </p>
        </motion.header>

        <motion.div
          custom={1}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16"
        >
          <ProjectCarousel projects={projects} />
        </motion.div>

      </div>
    </section>
  );
}

export default Projects;
