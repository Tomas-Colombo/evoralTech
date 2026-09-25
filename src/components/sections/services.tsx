"use client";

import { motion, type Variants } from "framer-motion";

import { services } from "@/data/services";

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

export function Services() {
  return (
    <section
      id="servicios"
      className="relative scroll-mt-24 overflow-hidden border-t border-gold-500/10 bg-background py-28 sm:py-32"
    >
      {/* Circuit grid, fading in from the top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,var(--gold-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--gold-500)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-64 w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,var(--glow)_0%,transparent_70%)] opacity-40 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.header
          custom={0}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-400">
            Qué hacemos
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-5xl">
            Ingeniería de software de punta a punta
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Diseñamos, construimos y operamos los sistemas que sostienen un
            negocio. La inteligencia artificial no va por separado: la
            integramos donde resuelve un problema concreto.
          </p>
        </motion.header>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(({ slug, title, description, icon: Icon }, index) => (
            <motion.li
              key={slug}
              custom={index + 1}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="group relative flex flex-col rounded-2xl border border-gold-500/15 bg-surface p-7 transition-colors duration-300 hover:border-gold-300/40"
            >
              {/* Bloom that wakes up under the pointer */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-0 h-24 rounded-full bg-[radial-gradient(ellipse,var(--glow)_0%,transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/[0.07] text-gold-300 transition-colors duration-300 group-hover:border-gold-300/50 group-hover:text-gold-100">
                <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
              </span>

              <h3 className="relative mt-6 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-muted">
                {description}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Services;
