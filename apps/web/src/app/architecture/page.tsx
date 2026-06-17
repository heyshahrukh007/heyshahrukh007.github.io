import { ArchitectureList } from "@/components/architecture-card";
import { SectionHeading } from "@/components/section-heading";
import { createPageMetadata } from "@/lib/seo";
import { architecture } from "@/lib/site";

export const metadata = createPageMetadata({
  title: architecture.title,
  description: architecture.description,
  path: "/architecture",
});

export default function ArchitecturePage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        id="architecture-heading"
        headingLevel={1}
        title={architecture.title}
        description={architecture.description}
      />
      <ArchitectureList items={architecture.items} showTopBorder={false} />
    </div>
  );
}
