import Link from "next/link";

import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Subsection } from "@/components/subsection";
import { TagList } from "@/components/tag-list";
import { LinkArrowLeftIcon } from "@/components/link-icons";
import { getArchitectureIndexRoute, type ArchitectureCaseStudy } from "@/lib/site";
import { textLinkWithIconClassName } from "@/lib/link-styles";

export function ArchitectureDetail({ caseStudy }: { caseStudy: ArchitectureCaseStudy }) {
  const { diagram } = caseStudy;

  return (
    <article className="space-y-10">
      <p className="text-sm">
        <Link href={getArchitectureIndexRoute()} className={textLinkWithIconClassName}>
          <LinkArrowLeftIcon />
          All architecture
        </Link>
      </p>

      <ArchitectureDiagram {...diagram} />

      <header className="space-y-4">
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {caseStudy.name}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {caseStudy.summary}
        </p>
      </header>

      <div className="space-y-10 border-t border-border/40 pt-10">
        <Subsection title="Problem">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {caseStudy.problem}
          </p>
        </Subsection>

        <Subsection title="Solution overview">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {caseStudy.solution}
          </p>
        </Subsection>

        <Subsection title="Design considerations">
          <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-muted-foreground">
            {caseStudy.designConsiderations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Subsection>

        <Subsection title="Lessons learned">
          <ul className="max-w-2xl space-y-3">
            {caseStudy.lessonsLearned.map((item) => (
              <li
                key={item}
                className="border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </Subsection>

        <Subsection title="Technologies">
          <TagList items={caseStudy.technologies} />
        </Subsection>
      </div>
    </article>
  );
}
