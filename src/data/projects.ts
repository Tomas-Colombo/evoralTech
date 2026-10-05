export type ProjectStatus = "live" | "building" | "internal";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
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
      "Inventario por talle, precios, ventas, reservas, consignaciones y reportes en un solo sistema. Varias marcas lo usan a la vez y cada una ve únicamente su propia información: la separación está garantizada desde el núcleo del sistema.",
    tags: ["Stock por talle", "Varias marcas", "Permisos por rol"],
    year: "2026",
    status: "live",
  },
  {
    slug: "miliors",
    name: "MiLiors",
    tagline: "Perfiles de talento con certificados verificables",
    description:
      "Plataforma de contratación que reemplaza el CV por un perfil verificable: evaluación de personalidad, potencial laboral y perfil técnico en un solo lugar. Cada certificado lleva una firma digital imposible de falsificar y cualquiera puede validarlo en público, sin llamados de referencia ni PDF editables.",
    tags: ["Adiós al CV", "Certificados infalsificables", "Validación pública"],
    year: "2026",
    status: "live",
    href: "https://miliors.com",
  },
  {
    slug: "andes-leasing",
    name: "Andes Leasing",
    tagline: "Simulador de cuotas para leasing PyME",
    description:
      "Sitio para captar clientes con un simulador que estima cuota y ahorro impositivo según tipo de bien, anticipo y moneda, con el dólar oficial del día. Cada consulta llega por WhatsApp con todos los datos ya cargados.",
    tags: ["Simulador de cuotas", "Dólar del día", "Consultas por WhatsApp"],
    year: "2026",
    status: "live",
    href: "https://www.andesleasingmendoza.com",
  },
];
