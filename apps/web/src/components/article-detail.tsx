import Link from "next/link";

import { ArticleCard } from "@/components/article-card";
import { TagList } from "@/components/tag-list";
import {
  getArticlesIndexRoute,
  getRelatedArticles,
  type Article,
} from "@/lib/site";
import { textLinkClassName } from "@/lib/link-styles";

function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}

export function ArticleDetail({ article }: { article: Article }) {
  const related = getRelatedArticles(article);

  return (
    <article className="space-y-10">
      <p className="text-sm">
        <Link href={getArticlesIndexRoute()} className={textLinkClassName}>
          ← All articles
        </Link>
      </p>

      <header className="max-w-2xl space-y-4">
        <p className="text-xs text-muted-foreground">
          <time dateTime={article.publishedAt}>{article.publishedAtLabel}</time>
          <span aria-hidden> · </span>
          <span>{formatReadingTime(article.readingTimeMinutes)}</span>
        </p>
        <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          {article.title}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">{article.summary}</p>
        <TagList items={article.tags} />
      </header>

      <div className="max-w-2xl space-y-4 border-t border-border/40 pt-10">
        {article.content.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="related-articles-heading" className="space-y-6 border-t border-border/40 pt-10">
          <h2 id="related-articles-heading" className="text-lg font-semibold tracking-tight text-foreground">
            Related articles
          </h2>
          <ul className="space-y-8">
            {related.map((item) => (
              <li key={item.slug}>
                <ArticleCard article={item} className="border-b-0 pb-0" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
