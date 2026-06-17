import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/lib/site";

type ExperienceEntryProps = {
  organization: string;
  role: string;
  duration: string;
  responsibilities: readonly string[];
  achievements: readonly string[];
};

function ExperienceEntry({
  organization,
  role,
  duration,
  responsibilities,
  achievements,
}: ExperienceEntryProps) {
  return (
    <article className="space-y-3">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <h3 className="font-medium text-foreground">{organization}</h3>
        <p className="shrink-0 text-xs text-muted-foreground">{duration}</p>
      </div>

      <p className="text-sm text-primary/80">{role}</p>

      {responsibilities.length > 0 ? (
        <ul className="max-w-2xl space-y-2 text-sm leading-relaxed text-muted-foreground">
          {responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {achievements.length > 0 ? (
        <ul className="max-w-2xl space-y-3">
          {achievements.map((item) => (
            <li
              key={item}
              className="border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="space-y-10">
      <SectionHeading
        id="experience-heading"
        title={experience.title}
        description={experience.description}
      />

      <ol className="space-y-8 border-t border-border/40 pt-10">
        {experience.entries.map((entry) => (
          <li key={`${entry.organization}-${entry.duration}`}>
            <ExperienceEntry {...entry} />
          </li>
        ))}
      </ol>
    </section>
  );
}
