import Link from "next/link";

import { ContentThumbnail } from "@/components/portfolio/content-thumbnail";
import { ExternalLink } from "@/components/shared/external-link";
import { TagList } from "@/components/shared/tag-list";
import { LinkArrowRightIcon, LinkArrowUpRightIcon } from "@/components/shared/link-icons";
import { getProjectRoute, type Project } from "@/lib/site";
import { textLinkWithIconClassName } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

type ProjectStoryCardProps = {
  project: Project;
  className?: string;
};

/**
 * Presentational card for the home projects horizontal scroll track.
 * Animation is applied by the scroll hook via `[data-project-card]` — keep this JSX free of GSAP.
 */
export function ProjectStoryCard({ project, className }: ProjectStoryCardProps) {
  const links = "links" in project ? project.links : undefined;

  return (
    <article
      data-project-card
      className={cn(
        "project-story-card flex flex-col justify-center gap-6 rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-sm sm:gap-8 sm:p-8 lg:p-10",
        className,
      )}
    >
      <ContentThumbnail label={project.name} />

      <div className="grid gap-4 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="space-y-2 lg:col-span-5">
          <h3 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {project.name}
          </h3>
          <p className="text-sm text-primary/80">{project.role}</p>
        </div>

        <div className="space-y-4 lg:col-span-7">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {project.summary}
          </p>

          <TagList items={project.technologies} />

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href={getProjectRoute(project.slug)} className={textLinkWithIconClassName}>
              Read case study
              <LinkArrowRightIcon />
            </Link>
            {links && "live" in links ? (
              <ExternalLink href={links.live} className={textLinkWithIconClassName}>
                View project
                <LinkArrowUpRightIcon />
              </ExternalLink>
            ) : null}
            {links?.source ? (
              <ExternalLink href={links.source} className={textLinkWithIconClassName}>
                View source
                <LinkArrowUpRightIcon />
              </ExternalLink>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
