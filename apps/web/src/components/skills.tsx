import { SectionHeading } from "@/components/section-heading";
import { Subsection } from "@/components/subsection";
import { TagList } from "@/components/tag-list";
import { skills } from "@/lib/site";

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="space-y-10">
      <SectionHeading
        id="skills-heading"
        title={skills.title}
        description={skills.description}
      />

      <div className="space-y-8 border-t border-border/40 pt-10">
        {skills.categories.map((category) => (
          <Subsection key={category.name} title={category.name}>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>
            <TagList items={category.skills} />
          </Subsection>
        ))}
      </div>
    </section>
  );
}
