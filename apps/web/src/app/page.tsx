import About from "@/components/about";
import Hero from "@/components/hero";
import ProfessionalHighlights from "@/components/professional-highlights";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <Hero />
      <ProfessionalHighlights />
      <About />
      <Skills />
    </div>
  );
}
