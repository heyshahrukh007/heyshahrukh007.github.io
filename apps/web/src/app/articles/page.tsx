import { ArticlesList } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { createPageMetadata } from "@/lib/seo";
import { articles } from "@/lib/site";

export const metadata = createPageMetadata({
  title: articles.title,
  description: articles.description,
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        id="articles-heading"
        headingLevel={1}
        title={articles.title}
        description={articles.description}
      />
      <ArticlesList items={articles.items} showTopBorder={false} />
    </div>
  );
}
