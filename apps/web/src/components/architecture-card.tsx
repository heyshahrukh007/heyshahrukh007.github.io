import Link from "next/link";

import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { getArchitectureRoute, type ArchitectureCaseStudy } from "@/lib/site";
import { cn } from "@/lib/utils";

type ArchitectureCardProps = {
  caseStudy: ArchitectureCaseStudy;
  className?: string;
};

export function ArchitectureCard({ caseStudy, className }: ArchitectureCardProps) {
  return (
    <article className={cn("space-y-4", className)}>
      <ArchitectureDiagram {...caseStudy.diagram} />

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <h3 className="text-balance text-xl font-semibold tracking-tight text-foreground sm:flex-5 sm:text-2xl">
          {caseStudy.name}
        </h3>

        <div className="space-y-4 sm:flex-7">
          <p className="text-sm leading-relaxed text-muted-foreground">{caseStudy.summary}</p>

          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">Problem: </span>
            {caseStudy.problem}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href={getArchitectureRoute(caseStudy.slug)}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Read case study →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

type ArchitectureListProps = {
  items: readonly ArchitectureCaseStudy[];
  className?: string;
  showTopBorder?: boolean;
};

export function ArchitectureList({
  items,
  className,
  showTopBorder = true,
}: ArchitectureListProps) {
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
      {items.map((caseStudy) => (
        <li key={caseStudy.slug} id={caseStudy.slug}>
          <ArchitectureCard caseStudy={caseStudy} />
        </li>
      ))}
    </ul>
  );
}
