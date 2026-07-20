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
 * Compact density is toggled by the timeline (`data-project-card-compact`) on short/narrow viewports.
 */
export function ProjectStoryCard({ project, className }: ProjectStoryCardProps) {
  const links = "links" in project ? project.links : undefined;

  return (
    <article
      data-project-card
      className={cn(
        "project-story-card group/story-card flex flex-col justify-center gap-4 rounded-2xl border border-border/40 bg-card/40 p-4 backdrop-blur-sm",
        "sm:gap-5 sm:p-5 md:gap-6 md:p-6 lg:gap-8 lg:p-8",
        "data-project-card-compact:gap-3 data-project-card-compact:p-3.5",
        "data-project-card-compact:sm:gap-3.5 data-project-card-compact:sm:p-4",
        className,
      )}
    >
      <ContentThumbnail
        label={project.name}
        aspectClassName="aspect-video"
        className={cn(
          "max-h-36 w-full shrink-0 sm:max-h-44 lg:max-h-52",
          "group-data-project-card-compact/story-card:max-h-28",
          "group-data-project-card-compact/story-card:sm:max-h-32",
        )}
      />

      <div className="grid gap-3 md:grid-cols-12 md:items-start md:gap-5 lg:gap-8">
        <div className="space-y-1.5 md:col-span-5">
          <h3
            className={cn(
              "text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-3xl",
              "group-data-project-card-compact/story-card:text-lg",
              "group-data-project-card-compact/story-card:sm:text-xl",
            )}
          >
            {project.name}
          </h3>
          <p className="text-sm text-primary/80">{project.role}</p>
        </div>

        <div className="space-y-3 md:col-span-7 lg:space-y-4">
          <p
            className={cn(
              "text-sm leading-relaxed text-muted-foreground sm:text-base",
              "group-data-project-card-compact/story-card:line-clamp-3",
            )}
          >
            {project.summary}
          </p>

          <TagList items={project.technologies} />

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
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
