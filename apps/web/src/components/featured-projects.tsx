import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { LinkArrowRightIcon } from "@/components/link-icons";
import { getFeaturedProjects, home } from "@/lib/site";
import { textLinkWithIconClassName } from "@/lib/link-styles";

export default function FeaturedProjects() {
  const items = getFeaturedProjects();

  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="featured-projects-heading" className="space-y-10">
      <SectionHeading
        id="featured-projects-heading"
        headingLevel={2}
        title={home.featuredProjects.title}
        description={home.featuredProjects.description}
      />

      <ul aria-label="Featured projects" className="space-y-10 sm:space-y-12">
        {items.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <p className="text-sm">
        <Link href="/projects" className={textLinkWithIconClassName}>
          View all projects
          <LinkArrowRightIcon />
        </Link>
      </p>
    </section>
  );
}
