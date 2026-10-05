export type ProjectStatus = "live" | "building" | "internal";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  year: string;
  status: ProjectStatus;
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
    tagline: "Gestión integral para tiendas de indumentaria",
    description:
      "Inventario por talle, ventas y reservas en un solo sistema, compartido por varias marcas con datos separados.",
    year: "2026",
    status: "live",
  },
  {
    slug: "miliors",
    name: "MiLiors",
    tagline: "Perfiles de talento con certificados verificables",
    description:
      "Reemplaza el CV por un perfil con certificados firmados digitalmente que cualquiera puede validar.",
    year: "2026",
    status: "live",
    href: "https://miliors.com",
  },
  {
    slug: "andes-leasing",
    name: "Andes Leasing",
    tagline: "Simulador de cuotas para leasing PyME",
    description:
      "Estima cuota y ahorro impositivo con el dólar del día y envía cada consulta lista por WhatsApp.",
    year: "2026",
    status: "live",
    href: "https://www.andesleasingmendoza.com",
  },
];
