export interface Founder {
  slug: string;
  name: string;
  /** Shown under the name, above the bio. */
  role: string;
  /** Rendered inside the generated avatar when there is no photo. */
  initials: string;
  bio: string;
  /** Short focus areas, rendered as chips. */
  focus: string[];
  /**
   * Portrait in /public. Leave it out and the card falls back to the initials
   * mark, so a missing photo still looks intentional.
   */
  photo?: string;
}

/**
 * Adding `photo: "/founders/<file>.jpg"` swaps the initials mark for a
 * portrait, which is the only field still missing here.
 */
export const founders: Founder[] = [
  {
    slug: "maximo-colombo",
    name: "Máximo Colombo",
    role: "Cofundador · Desarrollo y soluciones",
    initials: "MC",
    bio: "Desarrollador senior. Diseña la solución de cada proyecto y toma las decisiones técnicas que definen cómo escala el sistema cuando la operación crece.",
    focus: ["Diseño de soluciones", "Escalabilidad", "Decisiones técnicas"],
  },
  {
    slug: "tomas-colombo",
    name: "Tomás Colombo",
    role: "Cofundador · Ingeniería y clientes",
    initials: "TC",
    bio: "Ingeniero en sistemas. Modela los datos y la escalabilidad de cada plataforma, y conduce la relación con el cliente: entender la operación real, definir el alcance y responder por lo entregado en producción.",
    focus: ["Modelado de datos", "Escalabilidad", "Relación con clientes"],
  },
];
