import type { LucideIcon } from "lucide-react";
import { BadgeCheck, BrainCircuit, Calculator, Shirt } from "lucide-react";

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
    slug: "utopia",
    name: "Utopía",
    tagline: "ERP multi-tenant para retail de indumentaria",
    description:
      "Inventario por talle, precios, ventas, reservas, consignaciones y reportes en un solo sistema. El aislamiento entre tenants está garantizado a nivel base de datos con Row Level Security de Postgres, no por filtros de aplicación.",
    tags: ["Postgres RLS", "Multi-tenant", "Control de accesos"],
    year: "2026",
    status: "live",
    icon: Shirt,
  },
  {
    slug: "miliors",
    name: "MiLiors",
    tagline: "Perfiles de talento con certificados verificables",
    description:
      "Plataforma de contratación que reemplaza el CV por un perfil verificable: evaluación de personalidad, potencial laboral y perfil técnico en un solo lugar. Cada certificado lleva firma criptográfica y cualquiera puede validarlo en público, sin llamados de referencia ni PDF editables.",
    tags: ["Next.js", "Firma criptográfica", "Verificación pública"],
    year: "2026",
    status: "live",
    icon: BadgeCheck,
    href: "https://miliors.com",
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
    slug: "andes-leasing",
    name: "Andes Leasing",
    tagline: "Simulador de cuotas para leasing PyME",
    description:
      "Landing de captación con un simulador que estima cuota y ahorro impositivo según tipo de bien, anticipo y moneda, tomando la cotización del dólar BNA publicada por el BCRA. Cada consulta cierra en WhatsApp con el contexto ya cargado.",
    tags: ["React", "Vite", "Simulador financiero"],
    year: "2026",
    status: "live",
    icon: Calculator,
    href: "https://www.andesleasingmendoza.com",
  },
];
