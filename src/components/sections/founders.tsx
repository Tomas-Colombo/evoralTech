"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { FounderCard } from "@/components/ui/founder-card";
import { founders } from "@/data/founders";
import { siteConfig } from "@/data/site";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export function Founders() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-background py-28 sm:py-36"
    >
      {/* Circuit grid and ambient bloom, matching the home page */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(to_right,var(--gold-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--gold-500)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_5%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="animate-evoral-drift absolute left-1/2 top-0 h-[50vh] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow)_0%,transparent_65%)] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Volver al inicio
          </Link>
        </motion.div>

        <motion.header
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-12 max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400">
            Quiénes somos
          </span>
          <h1 className="font-display mt-4 text-4xl font-bold tracking-[-0.02em] text-foreground sm:text-6xl">
            Sistemas que escalan, con responsabilidad directa
          </h1>
          <p className="mt-6 text-balance text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.name} es un estudio de ingeniería fundado por Máximo y
            Tomás Colombo. Dirigimos cada proyecto de forma directa y
            dimensionamos el equipo según lo que el sistema exija: desde una
            plataforma de captación hasta una operación multi-tenant con datos
            productivos. La arquitectura la define quien después responde por
            ella en producción.
          </p>
        </motion.header>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.slug}
              custom={index + 2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <FounderCard founder={founder} className="h-full" />
            </motion.div>
          ))}
        </div>

        <motion.div
          custom={founders.length + 2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-20 flex flex-col items-start gap-6 rounded-2xl border border-gold-500/15 bg-surface p-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground">
              ¿Trabajamos juntos?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Contanos el problema y te respondemos con un diagnóstico técnico.
            </p>
          </div>

          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-br from-gold-200 to-gold-500 px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:from-gold-100 hover:to-gold-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
          >
            Escribinos
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Founders;
