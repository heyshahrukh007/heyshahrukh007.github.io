import About from "@/components/about";
import Experience from "@/components/experience";
import FeaturedArchitecture from "@/components/featured-architecture";
import FeaturedArticles from "@/components/featured-articles";
import FeaturedProjects from "@/components/featured-projects";
import Hero from "@/components/hero";
import OpenSourceSection from "@/components/open-source-section";
import ProfessionalHighlights from "@/components/professional-highlights";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      <Hero />
      <ProfessionalHighlights />
      <About />
      <Experience />
      <FeaturedProjects />
      <FeaturedArchitecture />
      <Skills />
      <FeaturedArticles />
      <OpenSourceSection />
    </div>
  );
}
