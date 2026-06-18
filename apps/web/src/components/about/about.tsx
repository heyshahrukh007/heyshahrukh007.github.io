import Link from "next/link";

import { AboutPortrait } from "@/components/about/about-portrait";
import { SectionHeading } from "@/components/shared/section-heading";
import { Subsection } from "@/components/shared/subsection";
import { TagList } from "@/components/shared/tag-list";
import { LinkArrowRightIcon } from "@/components/shared/link-icons";
import { about } from "@/lib/site";
import { textLinkWithIconClassName } from "@/lib/link-styles";

type AboutProps = {
  compact?: boolean;
  headingLevel?: 1 | 2;
};

export default function About({ compact = false, headingLevel = 2 }: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-heading" className="space-y-10">
      <SectionHeading id="about-heading" title={about.title} headingLevel={headingLevel} />

      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16">
        <div className="max-w-2xl space-y-4">
          {about.summary.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {!compact ? (
          <AboutPortrait className="mx-auto w-full shrink-0 lg:justify-self-end" />
        ) : null}
      </div>

      {compact ? (
        <p className="text-sm">
          <Link href="/about" className={textLinkWithIconClassName}>
            Read more about me
            <LinkArrowRightIcon />
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
