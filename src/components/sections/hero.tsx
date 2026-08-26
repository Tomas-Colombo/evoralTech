"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Cpu, Layers, ShieldCheck, Terminal } from "lucide-react";

import { FlipWords } from "@/components/ui/flip-words";
import { MiniNavbar } from "@/components/ui/mini-navbar";
import { ParticleField } from "@/components/ui/particle-field";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12 + 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const capabilities = [
  { icon: Layers, label: "Arquitectura de producto" },
  { icon: Cpu, label: "Sistemas AI-native" },
  { icon: Terminal, label: "Ingeniería de plataforma" },
  { icon: ShieldCheck, label: "Confiabilidad en producción" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      <ParticleField className="z-0" />

      {/* Circuit grid, echoing the traces in the brand mark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] opacity-[0.12] [background-image:linear-gradient(to_right,var(--gold-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--gold-500)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />

      {/* Ambient gold glow */}
      <div
        aria-hidden="true"
        className="animate-evoral-drift absolute left-1/2 top-1/2 z-[1] h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,var(--glow)_0%,transparent_65%)] blur-3xl"
      />

      {/* Bottom fade into the next section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <Image
            src="/evoraltech-logo.png"
            alt="EvoralTech"
            width={256}
            height={256}
            priority
            className="mb-8 h-24 w-24 drop-shadow-[0_0_34px_var(--glow)] sm:h-32 sm:w-32"
          />
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/[0.07] px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-300 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-300" />
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gold-100">
            Engineering Studio
          </span>
        </motion.div>

        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-display mb-6 bg-gradient-to-b from-gold-50 via-gold-200 to-gold-500 bg-clip-text text-5xl font-bold tracking-[-0.03em] text-transparent sm:text-7xl md:text-8xl"
        >
          EvoralTech
        </motion.h1>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-10 flex max-w-3xl flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-lg text-muted sm:text-xl"
        >
          <span>Convertimos ideas en</span>
          <FlipWords
            words={["PRODUCTOS", "SISTEMAS", "SOFTWARE", "IMPACTO"]}
            className="font-display bg-gradient-to-b from-gold-50 via-gold-300 to-gold-600 bg-clip-text text-xl font-bold tracking-[0.01em] text-transparent sm:text-2xl"
          />
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md sm:max-w-none sm:w-auto"
        >
          <MiniNavbar
            className="w-full sm:w-auto"
            actions={[
              {
                label: "Ver nuestros proyectos",
                href: "#proyectos",
                variant: "secondary",
              },
              {
                label: "Empezar un proyecto",
                href: "#contacto",
                variant: "primary",
              },
            ]}
          />
        </motion.div>

        <motion.ul
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {capabilities.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 text-sm text-muted"
            >
              <Icon className="h-4 w-4 text-gold-400" aria-hidden="true" />
              {label}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default Hero;
