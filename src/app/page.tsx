import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Projects />
    </main>
  );
}
