"use client";

import Link from "next/link";
import { useRef } from "react";

import { ProjectStoryCard } from "@/components/home/project-story-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { LinkArrowRightIcon } from "@/components/shared/link-icons";
import { useProjectScroll } from "@/hooks/use-project-scroll";
import { getPortfolioIndexRoute, getStoryProjects, home } from "@/lib/site";
import { textLinkWithIconClassName } from "@/lib/link-styles";

export default function ProjectSection() {
  const items = getStoryProjects();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useProjectScroll({
    sectionRef,
    stageRef,
    enabled: items.length > 0,
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-projects-heading"
      className="project-section space-y-8 sm:space-y-10"
    >
      <SectionHeading
        id="featured-projects-heading"
        headingLevel={2}
        title={home.featuredProjects.title}
        description={home.featuredProjects.description}
      />

      <div
        ref={stageRef}
        data-project-stage
        className="project-stage relative"
        aria-label="Featured portfolio work"
      >
        {items.map((project) => (
          <ProjectStoryCard key={project.slug} project={project} />
        ))}
      </div>

      <p className="text-sm">
        <Link href={getPortfolioIndexRoute()} className={textLinkWithIconClassName}>
          View portfolio
          <LinkArrowRightIcon />
        </Link>
      </p>
    </section>
  );
}
