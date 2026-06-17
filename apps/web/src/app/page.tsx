import Hero from "@/components/hero";
import ProfessionalHighlights from "@/components/professional-highlights";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ProfessionalHighlights />
    </div>
  );
}
