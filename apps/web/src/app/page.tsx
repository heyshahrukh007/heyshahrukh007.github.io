import About from "@/components/about";
import FeaturedProjects from "@/components/featured-projects";
import Hero from "@/components/hero";
import ProfessionalHighlights from "@/components/professional-highlights";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ path: "/" });

export default function Home() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      <Hero />
      <ProfessionalHighlights />
      <FeaturedProjects />
      <About compact headingLevel={2} />
    </div>
  );
}
