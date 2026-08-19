import type { LucideIcon } from "lucide-react";
import { Boxes, BrainCircuit, Radar } from "lucide-react";

export type ProjectStatus = "live" | "building" | "internal";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  year: string;
  status: ProjectStatus;
  icon: LucideIcon;
  /**
   * Public URL or case-study route. Leave it out until the page exists:
   * cards without an href render as non-interactive, so nothing 404s.
   */
  href?: string;
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  live: "En producción",
  building: "En construcción",
  internal: "Producto propio",
};

/**
 * PLACEHOLDER CONTENT — replace with real projects before launch.
 * Adding `href: "/proyectos/<slug>"` (or an external URL) is all it takes to
 * turn a card into a link; the card component handles the rest.
 */
export const projects: Project[] = [
  {
    slug: "plataforma-logistica",
    name: "Plataforma logística",
    tagline: "Trazabilidad de flota en tiempo real",
    description:
      "Rediseño de un monolito heredado hacia una arquitectura por dominios, con ingesta de eventos y tableros operativos que sostienen miles de envíos por día.",
    tags: ["Next.js", "Event sourcing", "PostgreSQL"],
    year: "2025",
    status: "live",
    icon: Radar,
  },
  {
    slug: "asistente-ai-native",
    name: "Asistente AI-native",
    tagline: "Copiloto de operaciones sobre datos propios",
    description:
      "Capa de recuperación y orquestación de agentes sobre la base de conocimiento del cliente, con evaluaciones automáticas y trazas de cada respuesta.",
    tags: ["Claude API", "RAG", "Observabilidad"],
    year: "2025",
    status: "building",
    icon: BrainCircuit,
  },
  {
    slug: "design-system",
    name: "Design system interno",
    tagline: "Una sola base para todos los productos",
    description:
      "Librería de componentes tipada y documentada, con tokens compartidos entre diseño y código, que unificó cuatro frontends que venían divergiendo.",
    tags: ["React", "Tailwind", "Atomic design"],
    year: "2024",
    status: "internal",
    icon: Boxes,
  },
];
