import { ArchitectureList } from "@/components/architecture-card";
import { SectionHeading } from "@/components/section-heading";
import { architecture } from "@/lib/site";

export default function ArchitecturePage() {
  return (
    <div className="space-y-10">
      <SectionHeading title={architecture.title} description={architecture.description} />
      <ArchitectureList items={architecture.items} showTopBorder={false} />
    </div>
  );
}
