import { InquiryPanel } from "@/components/inquiry-panel";
import { LocationMap } from "@/components/location-map";
import { Subsection } from "@/components/subsection";
import { SectionHeading } from "@/components/section-heading";
import { contact } from "@/lib/site";

type ContactSectionProps = {
  headingLevel?: 1 | 2;
};

export default function ContactSection({ headingLevel = 2 }: ContactSectionProps) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="space-y-10">
      <div className="max-w-2xl space-y-4">
        <SectionHeading
          id="contact-heading"
          headingLevel={headingLevel}
          title={contact.title}
          description={contact.summary}
        />
        <p className="text-base leading-relaxed text-muted-foreground">{contact.intro}</p>
      </div>

      <div className="space-y-10 border-t border-border/40 pt-10">
        <Subsection title="Send a message">
          <InquiryPanel />
        </Subsection>

        <Subsection title="Location">
          <LocationMap />
        </Subsection>
      </div>
    </section>
  );
}
