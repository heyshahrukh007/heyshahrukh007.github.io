import Link from "next/link";

import { TagList } from "@/components/tag-list";
import { getArticleRoute, type Article } from "@/lib/site";
import { cn } from "@/lib/utils";

function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}

type ArticleCardProps = {
  article: Article;
  className?: string;
};

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 border-b border-border/40 pb-8 last:border-b-0 last:pb-0 sm:flex-row sm:gap-8",
        className,
      )}
    >
      <div
        aria-hidden
        className="aspect-4/3 w-full shrink-0 overflow-hidden rounded-xl border border-border/50 bg-muted/15 sm:w-36"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <p className="text-xs text-muted-foreground">
          <time dateTime={article.publishedAt}>{article.publishedAtLabel}</time>
          <span aria-hidden> · </span>
          <span>{formatReadingTime(article.readingTimeMinutes)}</span>
        </p>

        <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          <Link
            href={getArticleRoute(article.slug)}
            className="transition-colors hover:text-primary"
          >
            {article.title}
          </Link>
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">{article.summary}</p>

        <TagList items={article.tags} />

        <p className="text-sm">
          <Link
            href={getArticleRoute(article.slug)}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Read article →
          </Link>
        </p>
      </div>
    </article>
  );
}

type ArticlesListProps = {
  items: readonly Article[];
  className?: string;
  showTopBorder?: boolean;
};

export function ArticlesList({ items, className, showTopBorder = true }: ArticlesListProps) {
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
      {items.map((article) => (
        <li key={article.slug} id={article.slug}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
}
