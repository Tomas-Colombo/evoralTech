export interface Service {
  slug: string;
  /** Display title, one entry per line of the editorial layout. */
  title: [string, string];
  description: string;
  /** Short capability tags in plain language — no tech stack, the audience is the client. */
  meta: string[];
}

export const services: Service[] = [
  {
    slug: "construccion-de-productos",
    title: ["Construcción", "de productos"],
    description:
      "Transformamos ideas y necesidades de negocio en productos de software funcionales, escalables y fáciles de evolucionar.",
    meta: ["De la idea al lanzamiento", "Preparado para crecer", "Evolución continua"],
  },
  {
    slug: "desarrollo-a-medida",
    title: ["Software", "a medida"],
    description:
      "Diseñamos y construimos soluciones adaptadas a los procesos y desafíos de cada organización.",
    meta: ["Procesos propios", "Sistemas internos", "Varias sedes y marcas"],
  },
  {
    slug: "inteligencia-artificial",
    title: ["Inteligencia", "artificial"],
    description:
      "Incorporamos IA de forma práctica, integrada en productos, procesos y operaciones para abrir oportunidades reales.",
    meta: ["Asistentes con tus datos", "Atención automatizada", "Resultados medibles"],
  },
  {
    slug: "integraciones-y-automatizacion",
    title: ["Integraciones", "y automatización"],
    description:
      "Conectamos sistemas y automatizamos procesos para reducir tareas manuales y mejorar la eficiencia del negocio.",
    meta: ["Sistemas conectados", "Flujos automáticos", "Datos siempre al día"],
  },
];
