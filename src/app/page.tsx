import { PageTransition } from "@/components/motion/PageTransition";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Studio } from "@/components/sections/studio";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <Services />
        <Studio />
        <Projects />
        <Process />
      </main>
    </PageTransition>
  );
}
