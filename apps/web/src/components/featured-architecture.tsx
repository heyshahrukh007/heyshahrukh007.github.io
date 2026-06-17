import Link from "next/link";

import { ArchitectureList } from "@/components/architecture-card";
import { SectionHeading } from "@/components/section-heading";
import { architecture, getArchitectureIndexRoute, getFeaturedArchitecture } from "@/lib/site";
import { textLinkClassName } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

export default function FeaturedArchitecture() {
  const featured = getFeaturedArchitecture(architecture.items);
  const hasMore = featured.length < architecture.items.length;

  return (
    <section id="architecture" aria-labelledby="architecture-heading" className="space-y-10">
      <SectionHeading
        id="architecture-heading"
        title={architecture.title}
        description={architecture.description}
      />

      <ArchitectureList items={featured} />

      {hasMore ? (
        <p className="text-sm">
          <Link href={getArchitectureIndexRoute()} className={cn("text-sm", textLinkClassName)}>
            View all architecture →
          </Link>
        </p>
      ) : null}
    </section>
  );
}
