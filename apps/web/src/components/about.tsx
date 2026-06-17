import { SectionHeading } from "@/components/section-heading";
import { Subsection } from "@/components/subsection";
import { TagList } from "@/components/tag-list";
import { about } from "@/lib/site";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="space-y-10">
      <SectionHeading id="about-heading" title={about.title} />

      <div className="max-w-2xl space-y-4">
        {about.summary.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="space-y-10 border-t border-border/40 pt-10">
        <Subsection title="Experience">
          <p className="max-w-2xl rounded-xl border border-border/50 bg-muted/15 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            {about.yearsOfExperience}
          </p>
        </Subsection>

        <Subsection title="Areas of expertise">
          <TagList items={about.expertise} />
        </Subsection>

        <Subsection title="Career highlights">
          <ul className="max-w-2xl space-y-4">
            {about.careerHighlights.map((highlight) => (
              <li
                key={highlight}
                className="border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </Subsection>

        <Subsection title="Strengths">
          <ul className="max-w-2xl space-y-3">
            {about.strengths.map((strength) => (
              <li key={strength} className="text-sm leading-relaxed text-muted-foreground">
                {strength}
              </li>
            ))}
          </ul>
        </Subsection>
      </div>
    </section>
  );
}
