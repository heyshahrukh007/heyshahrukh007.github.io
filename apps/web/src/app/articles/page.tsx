import { ArticlesList } from "@/components/article-card";
import { SectionHeading } from "@/components/section-heading";
import { articles } from "@/lib/site";

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
