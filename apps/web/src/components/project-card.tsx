import Link from "next/link";

import { ContentThumbnail } from "@/components/content-thumbnail";
import { ExternalLink } from "@/components/external-link";
import { TagList } from "@/components/tag-list";
import { getProjectRoute, type Project } from "@/lib/site";
import { textLinkClassName } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const links = "links" in project ? project.links : undefined;

  return (
    <article className={cn("space-y-4", className)}>
      <ContentThumbnail label={project.name} className="max-h-48 sm:max-h-none" />

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
        <h3 className="text-balance text-xl font-semibold tracking-tight text-foreground lg:col-span-5 lg:text-2xl">
          {project.name}
        </h3>

        <div className="space-y-4 lg:col-span-7">
          <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

          <p className="text-sm text-primary/80">{project.role}</p>

          {project.objectives.length > 0 ? (
            <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              {project.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          ) : null}

          <TagList items={project.technologies} />

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href={getProjectRoute(project.slug)} className={textLinkClassName}>
              Read case study →
            </Link>
            {links && "live" in links ? (
              <ExternalLink href={links.live} className={textLinkClassName}>
                View project ↗
              </ExternalLink>
            ) : null}
            {links?.source ? (
              <ExternalLink href={links.source} className={textLinkClassName}>
                View source ↗
              </ExternalLink>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

type ProjectsListProps = {
  items: readonly Project[];
  className?: string;
  showTopBorder?: boolean;
};

export function ProjectsList({ items, className, showTopBorder = true }: ProjectsListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul
      aria-label="Projects"
      className={cn(
        "space-y-10 sm:space-y-12",
        showTopBorder && "border-t border-border/40 pt-10",
        className,
      )}
    >
      {items.map((project) => (
        <li key={project.slug} id={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
