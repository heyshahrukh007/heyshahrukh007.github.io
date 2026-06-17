import type { ReactNode } from "react";

import { SectionHeading } from "@/components/section-heading";
import { about } from "@/lib/site";

function AboutSubsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      {children}
    </div>
  );
}

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
        <AboutSubsection title="Experience">
          <p className="max-w-2xl rounded-xl border border-border/50 bg-muted/15 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            {about.yearsOfExperience}
          </p>
        </AboutSubsection>

        <AboutSubsection title="Areas of expertise">
          <ul className="flex flex-wrap gap-2">
            {about.expertise.map((area) => (
              <li key={area}>
                <span className="inline-flex rounded-full border border-border/60 bg-muted/20 px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground">
                  {area}
                </span>
              </li>
            ))}
          </ul>
        </AboutSubsection>

        <AboutSubsection title="Career highlights">
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
        </AboutSubsection>

        <AboutSubsection title="Strengths">
          <ul className="max-w-2xl space-y-3">
            {about.strengths.map((strength) => (
              <li key={strength} className="text-sm leading-relaxed text-muted-foreground">
                {strength}
              </li>
            ))}
          </ul>
        </AboutSubsection>
      </div>
    </section>
  );
}
