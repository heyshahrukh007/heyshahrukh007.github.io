import About from "@/components/about/about";
import HomeIntroScene from "@/components/home/home-intro-scene";
import { HomeSectionParallax } from "@/components/home/home-section-parallax";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ path: "/" });

export default function Home() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
      <HomeIntroScene />
      <HomeSectionParallax>
        <ScrollReveal delay={100}>
          <About compact headingLevel={2} />
        </ScrollReveal>
      </HomeSectionParallax>
    </div>
  );
}
