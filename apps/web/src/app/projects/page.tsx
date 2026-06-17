import { ProjectsList } from "@/components/project-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { createPageMetadata } from "@/lib/seo";
import { projects } from "@/lib/site";

export const metadata = createPageMetadata({
  title: projects.title,
  description: projects.description,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        id="projects-heading"
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
