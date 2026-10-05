export interface Service {
  slug: string;
  /** Display title, one entry per line of the editorial layout. */
  title: [string, string];
  description: string;
}

export const services: Service[] = [
  {
    slug: "construccion-de-productos",
    title: ["Construcción", "de productos"],
    description: "Del primer boceto al lanzamiento, con una base lista para crecer.",
  },
  {
    slug: "desarrollo-a-medida",
    title: ["Software", "a medida"],
    description: "Sistemas hechos a la medida de los procesos de cada organización.",
  },
  {
    slug: "inteligencia-artificial",
    title: ["Inteligencia", "artificial"],
    description: "IA aplicada a tus productos y procesos, donde resuelve algo concreto.",
  },
  {
    slug: "integraciones-y-automatizacion",
    title: ["Integraciones", "y automatización"],
    description: "Conectamos tus sistemas y automatizamos el trabajo manual.",
  },
];
