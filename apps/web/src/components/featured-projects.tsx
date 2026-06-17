import Link from "next/link";

import { ProjectsList } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getFeaturedProjects, projects } from "@/lib/site";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects(projects.items);
  const hasMore = featured.length < projects.items.length;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="space-y-10">
      <SectionHeading
        id="projects-heading"
        title={projects.title}
        description={projects.description}
      />

      <ProjectsList items={featured} />

      {hasMore ? (
        <p className="text-sm">
          <Link
            href="/projects"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            View all projects →
          </Link>
        </p>
      ) : null}
    </section>
  );
}
