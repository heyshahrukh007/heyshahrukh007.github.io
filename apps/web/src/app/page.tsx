import About from "@/components/about";
import Hero from "@/components/hero";
import ProfessionalHighlights from "@/components/professional-highlights";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      <Hero />
      <ProfessionalHighlights />
      <About compact headingLevel={2} />
    </div>
  );
}
