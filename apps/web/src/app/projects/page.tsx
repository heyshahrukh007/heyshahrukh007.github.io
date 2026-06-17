import { ProjectsList } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/site";

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        id="projects-heading"
        headingLevel={1}
        title={projects.title}
        description={projects.description}
      />
      <ProjectsList items={projects.items} showTopBorder={false} />
    </div>
  );
}
