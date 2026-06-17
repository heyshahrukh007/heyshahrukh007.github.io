import Link from "next/link";

import { ProfileAvatar } from "@/components/profile-avatar";
import { SectionHeading } from "@/components/section-heading";
import { Subsection } from "@/components/subsection";
import { TagList } from "@/components/tag-list";
import { about } from "@/lib/site";
import { textLinkClassName } from "@/lib/link-styles";

type AboutProps = {
  compact?: boolean;
  headingLevel?: 1 | 2;
};

export default function About({ compact = false, headingLevel = 2 }: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-heading" className="space-y-10">
      <SectionHeading id="about-heading" title={about.title} headingLevel={headingLevel} />

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        {!compact ? <ProfileAvatar size="lg" className="mx-auto sm:mx-0" /> : null}

        <div className="max-w-2xl space-y-4">
          {about.summary.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {compact ? (
        <p className="text-sm">
          <Link href="/about" className={textLinkClassName}>
            Read more about me →
          </Link>
        </p>
      ) : (
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
      )}
    </section>
  );
}
