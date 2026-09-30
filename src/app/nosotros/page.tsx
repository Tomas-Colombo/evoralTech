import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/PageTransition";
import { Founders } from "@/components/sections/founders";

const description =
  "Máximo y Tomás Colombo, fundadores de EvoralTech. Dirección técnica directa sobre cada sistema, a la escala que la operación exija.";

export const metadata: Metadata = {
  title: "Quiénes somos — EvoralTech",
  description,
  openGraph: {
    title: "Quiénes somos — EvoralTech",
    description,
    images: ["/evoraltech-logo.png"],
    locale: "es_AR",
    type: "profile",
  },
};

export default function NosotrosPage() {
  return (
    <PageTransition>
      <main>
        <Founders />
      </main>
    </PageTransition>
  );
}
