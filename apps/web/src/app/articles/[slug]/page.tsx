import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/article-detail";
import { ScrollReveal } from "@/components/scroll-reveal";
import { createPageMetadata } from "@/lib/seo";
import { articles, getArticleBySlug } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.items.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return createPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/articles/${slug}`,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <ScrollReveal>
      <ArticleDetail article={article} />
    </ScrollReveal>
  );
}
