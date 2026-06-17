import Link from "next/link";

import { ArticlesList } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { articles, getArticlesIndexRoute, getFeaturedArticles } from "@/lib/site";

export default function FeaturedArticles() {
  const featured = getFeaturedArticles(articles.items);
  const hasMore = featured.length < articles.items.length;

  return (
    <section id="articles" aria-labelledby="articles-heading" className="space-y-10">
      <SectionHeading
        id="articles-heading"
        title={articles.title}
        description={articles.description}
      />

      <ArticlesList items={featured} />

      {hasMore ? (
        <p className="text-sm">
          <Link
            href={getArticlesIndexRoute()}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            View all articles →
          </Link>
        </p>
      ) : null}
    </section>
  );
}
