import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <Projects />
    </main>
  );
}
