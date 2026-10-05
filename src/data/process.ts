export interface ProcessStep {
  slug: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    slug: "descubrir",
    title: "Descubrir",
    description: "Entendemos la operación real y definimos el alcance.",
  },
  {
    slug: "arquitectura",
    title: "Arquitectura",
    description: "Modelamos los datos y diseñamos el sistema para escalar.",
  },
  {
    slug: "construccion",
    title: "Construcción",
    description: "Construimos el producto e integramos lo que el negocio ya usa.",
  },
  {
    slug: "produccion",
    title: "Producción",
    description: "Lo publicamos, lo mantenemos y respondemos por él.",
  },
];
