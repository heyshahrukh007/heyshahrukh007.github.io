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
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useProjectScroll({
    sectionRef: pinRef,
    stageRef,
    trackRef,
    enabled: items.length > 0,
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="project-section space-y-8 sm:space-y-10"
    >
      {/* Pin heading + stage together below the sticky header. */}
      <div className="project-bleed relative w-screen ml-[calc(50%-50vw)] px-6 sm:px-8">
        <div ref={pinRef} className="project-pin space-y-8 sm:space-y-10">
          <div className="mx-auto w-full max-w-3xl">
            <SectionHeading
              id="featured-projects-heading"
              headingLevel={2}
              title={home.featuredProjects.title}
              description={home.featuredProjects.description}
            />
          </div>

          <div
            ref={stageRef}
            data-project-stage
            className="project-stage relative"
            aria-label="Featured portfolio work"
          >
            <div ref={trackRef} data-project-track className="project-track gap-8">
              {items.map((project) => (
                <ProjectStoryCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </div>
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
