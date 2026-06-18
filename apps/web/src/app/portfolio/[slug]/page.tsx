import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/portfolio/project-detail";
import { createPageMetadata } from "@/lib/seo";
import { getProjectBySlug, projects } from "@/lib/site";

type PortfolioItemPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.items.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PortfolioItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Portfolio item not found" };
  }

  return createPageMetadata({
    title: project.name,
    description: project.summary,
    path: `/portfolio/${slug}`,
  });
}

export default async function PortfolioItemPage({ params }: PortfolioItemPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
