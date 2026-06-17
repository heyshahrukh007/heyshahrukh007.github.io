import { ExternalLink } from "@/components/external-link";
import { OpenSourceList } from "@/components/open-source-card";
import { SectionHeading } from "@/components/section-heading";
import { openSource } from "@/lib/site";
import { textLinkClassName } from "@/lib/link-styles";

export default function OpenSourceSection() {
  return (
    <section id="open-source" aria-labelledby="open-source-heading" className="space-y-10">
      <SectionHeading
        id="open-source-heading"
        title={openSource.title}
        description={openSource.description}
      />

      <div className="max-w-2xl space-y-3 rounded-xl border border-border/50 bg-muted/15 px-4 py-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{openSource.profile.summary}</p>
        <p className="text-sm">
          <ExternalLink href={openSource.profile.href} className={textLinkClassName}>
            View GitHub profile ↗
          </ExternalLink>
        </p>
      </div>

      <OpenSourceList items={openSource.items} />
    </section>
  );
}
