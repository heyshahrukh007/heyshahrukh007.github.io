import { ExternalLink } from "@/components/external-link";
import { TagList } from "@/components/tag-list";
import type { Project } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  const { links } = project;

  return (
    <article className={cn("space-y-4", className)}>
      <div
        aria-hidden
        className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted/15"
      />

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <h3 className="text-balance text-xl font-semibold tracking-tight text-foreground sm:flex-5 sm:text-2xl">
          {project.name}
        </h3>

        <div className="space-y-4 sm:flex-7">
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

          {links?.live || links?.source ? (
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {links.live ? (
                <ExternalLink
                  href={links.live}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  View project ↗
                </ExternalLink>
              ) : null}
              {links.source ? (
                <ExternalLink
                  href={links.source}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  View source ↗
                </ExternalLink>
              ) : null}
            </div>
          ) : null}
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
      className={cn(
        "space-y-16",
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
