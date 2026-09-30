export interface Service {
  slug: string;
  /** Display title, one entry per line of the editorial layout. */
  title: [string, string];
  description: string;
  /** Short capability tags, set as technical metadata. */
  meta: string[];
}

export const services: Service[] = [
  {
    slug: "construccion-de-productos",
    title: ["Construcción", "de productos"],
    description:
      "Transformamos ideas y necesidades de negocio en productos de software funcionales, escalables y fáciles de evolucionar.",
    meta: ["De la idea al MVP", "Arquitectura escalable", "Evolución continua"],
  },
  {
    slug: "desarrollo-a-medida",
    title: ["Software", "a medida"],
    description:
      "Diseñamos y construimos soluciones adaptadas a los procesos y desafíos de cada organización.",
    meta: ["Procesos propios", "Sistemas internos", "Multi-tenant"],
  },
  {
    slug: "inteligencia-artificial",
    title: ["Inteligencia", "artificial"],
    description:
      "Incorporamos IA de forma práctica, integrada en productos, procesos y operaciones para abrir oportunidades reales.",
    meta: ["LLMs", "RAG", "Agentes", "Evaluaciones"],
  },
  {
    slug: "integraciones-y-automatizacion",
    title: ["Integraciones", "y automatización"],
    description:
      "Conectamos sistemas y automatizamos procesos para reducir tareas manuales y mejorar la eficiencia del negocio.",
    meta: ["APIs", "Flujos automáticos", "Sincronización de datos"],
  },
];
