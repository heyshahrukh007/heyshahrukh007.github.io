import { ProjectsList } from "@/components/portfolio/project-card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { createPageMetadata } from "@/lib/seo";
import { projects } from "@/lib/site";

export const metadata = createPageMetadata({
  title: projects.title,
  description: projects.description,
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        id="portfolio-heading"
        headingLevel={1}
        title={projects.title}
        description={projects.description}
      />
      <ScrollReveal>
        <ProjectsList items={projects.items} showTopBorder={false} />
      </ScrollReveal>
    </div>
  );
}
