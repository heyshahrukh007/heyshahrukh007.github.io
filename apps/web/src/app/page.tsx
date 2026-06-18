import About from "@/components/about/about";
import FeaturedProjects from "@/components/home/featured-projects";
import Hero from "@/components/home/hero";
import ProfessionalHighlights from "@/components/home/professional-highlights";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ path: "/" });

export default function Home() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      <div className="relative left-1/2 w-screen max-w-5xl -translate-x-1/2 px-6">
        <Hero />
      </div>
      <ProfessionalHighlights />
      <ScrollReveal delay={50}>
        <FeaturedProjects />
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <About compact headingLevel={2} />
      </ScrollReveal>
    </div>
  );
}
