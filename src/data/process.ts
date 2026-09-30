export interface ProcessStep {
  slug: string;
  title: string;
  /** What the step turns the work into, read left to right. */
  stage: string;
  description: string;
  deliverable: string;
}

export const processSteps: ProcessStep[] = [
  {
    slug: "descubrir",
    title: "Descubrir",
    stage: "Idea",
    description:
      "Entendemos la operación real y el problema detrás del pedido. Definimos el alcance y respondemos con un diagnóstico técnico.",
    deliverable: "Diagnóstico · alcance",
  },
  {
    slug: "arquitectura",
    title: "Arquitectura",
    stage: "Sistema",
    description:
      "Modelamos los datos y diseñamos la arquitectura pensando en cómo va a escalar cuando la operación crezca.",
    deliverable: "Modelo de datos · arquitectura",
  },
  {
    slug: "construccion",
    title: "Construcción",
    stage: "Producto",
    description:
      "Construimos el sistema e integramos lo que el negocio ya usa, con decisiones técnicas tomadas por quien lo diseñó.",
    deliverable: "Producto funcionando",
  },
  {
    slug: "produccion",
    title: "Producción",
    stage: "Producción",
    description:
      "Lo llevamos a producción y respondemos por él: disponibilidad, escalabilidad y mantenimiento diario.",
    deliverable: "Deploy · soporte activo",
  },
];
