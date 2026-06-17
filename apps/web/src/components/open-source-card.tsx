import { ExternalLink } from "@/components/external-link";
import { TagList } from "@/components/tag-list";
import type { OpenSourceItem } from "@/lib/site";
import { cn } from "@/lib/utils";

const kindLabels = {
  repository: "Repository",
  contribution: "Community contribution",
} as const;

type OpenSourceCardProps = {
  item: OpenSourceItem;
  className?: string;
};

export function OpenSourceCard({ item, className }: OpenSourceCardProps) {
  return (
    <article
      className={cn(
        "space-y-3 border-b border-border/40 pb-8 last:border-b-0 last:pb-0",
        className,
      )}
    >
      <p className="text-xs tracking-wide text-muted-foreground uppercase">
        {kindLabels[item.kind]}
      </p>

      <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
        <ExternalLink href={item.href} className="transition-colors hover:text-primary">
          {item.name} ↗
        </ExternalLink>
      </h3>

      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{item.description}</p>

      <TagList items={item.topics} />

      <p className="text-sm">
        <ExternalLink
          href={item.href}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          View on GitHub ↗
        </ExternalLink>
      </p>
    </article>
  );
}

type OpenSourceListProps = {
  items: readonly OpenSourceItem[];
  className?: string;
  showTopBorder?: boolean;
};

export function OpenSourceList({
  items,
  className,
  showTopBorder = true,
}: OpenSourceListProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul
      className={cn(
        "space-y-8",
        showTopBorder && "border-t border-border/40 pt-10",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item.name}>
          <OpenSourceCard item={item} />
        </li>
      ))}
    </ul>
  );
}
