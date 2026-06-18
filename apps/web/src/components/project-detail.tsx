import Link from "next/link";

import { ContentThumbnail } from "@/components/content-thumbnail";
import { ExternalLink } from "@/components/external-link";
import { Subsection } from "@/components/subsection";
import { TagList } from "@/components/tag-list";
import { LinkArrowLeftIcon, LinkArrowUpRightIcon } from "@/components/link-icons";
import type { Project } from "@/lib/site";
import { textLinkWithIconClassName } from "@/lib/link-styles";

export function ProjectDetail({ project }: { project: Project }) {
  const links = "links" in project ? project.links : undefined;

  return (
    <article className="space-y-10">
      <p className="text-sm">
        <Link href="/projects" className={textLinkWithIconClassName}>
          <LinkArrowLeftIcon />
          All projects
        </Link>
      </p>

      <ContentThumbnail label={project.name} className="max-h-48 sm:max-h-none" />

      <header className="space-y-4">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {project.name}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <p className="text-sm text-primary/80">{project.role}</p>
      </header>

      <div className="space-y-10 border-t border-border/40 pt-10">
        <Subsection title="Objectives">
          <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-muted-foreground">
            {project.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </Subsection>

        <Subsection title="Contributions">
          <ul className="max-w-2xl space-y-3">
            {project.contributions.map((contribution) => (
              <li
                key={contribution}
                className="border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground"
              >
                {contribution}
              </li>
            ))}
          </ul>
        </Subsection>

        <Subsection title="Technologies">
          <TagList items={project.technologies} />
        </Subsection>

        {links ? (
          <Subsection title="Links">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {"live" in links ? (
                <ExternalLink href={links.live} className={textLinkWithIconClassName}>
                  View project
                  <LinkArrowUpRightIcon />
                </ExternalLink>
              ) : null}
              {links.source ? (
                <ExternalLink href={links.source} className={textLinkWithIconClassName}>
                  View source
                  <LinkArrowUpRightIcon />
                </ExternalLink>
              ) : null}
            </div>
          </Subsection>
        ) : null}
      </div>
    </article>
  );
}
