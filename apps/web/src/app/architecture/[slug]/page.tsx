import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchitectureDetail } from "@/components/architecture-detail";
import { architecture, getArchitectureBySlug } from "@/lib/site";

type ArchitecturePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return architecture.items.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: ArchitecturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getArchitectureBySlug(slug);

  if (!caseStudy) {
    return { title: "Architecture not found" };
  }

  return {
    title: caseStudy.name,
    description: caseStudy.summary,
  };
}

export default async function ArchitectureCaseStudyPage({ params }: ArchitecturePageProps) {
  const { slug } = await params;
  const caseStudy = getArchitectureBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return <ArchitectureDetail caseStudy={caseStudy} />;
}
