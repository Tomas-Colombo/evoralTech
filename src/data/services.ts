import type { LucideIcon } from "lucide-react";
import { Blocks, BrainCircuit, Code2, Workflow } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    slug: "construccion-de-productos",
    title: "Construcción de productos",
    description:
      "Transformamos ideas y necesidades de negocio en productos de software funcionales, escalables y fáciles de evolucionar.",
    icon: Blocks,
  },
  {
    slug: "desarrollo-a-medida",
    title: "Desarrollo a medida",
    description:
      "Diseñamos y construimos soluciones adaptadas a los procesos y desafíos de cada organización.",
    icon: Code2,
  },
  {
    slug: "inteligencia-artificial",
    title: "Inteligencia artificial",
    description:
      "Incorporamos IA de forma práctica, integrada en productos, procesos y operaciones para abrir oportunidades reales.",
    icon: BrainCircuit,
  },
  {
    slug: "integraciones-y-automatizacion",
    title: "Integraciones y automatización",
    description:
      "Conectamos sistemas y automatizamos procesos para reducir tareas manuales y mejorar la eficiencia del negocio.",
    icon: Workflow,
  },
];
