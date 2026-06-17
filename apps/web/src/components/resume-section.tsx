import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { resume } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function ResumeSection() {
  return (
    <div className="space-y-10">
      <SectionHeading title={resume.title} description={resume.summary} />

      <article className="max-w-2xl space-y-6 rounded-xl border border-border/50 bg-muted/15 p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{resume.file.label}</p>
          <p className="text-xs text-muted-foreground">Last updated {resume.lastUpdated}</p>
        </div>

        <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          {resume.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <a
          href={resume.file.href}
          download={resume.file.downloadName}
          className={cn(
            buttonVariants({ shape: "pill", size: "lg" }),
            "inline-flex px-5",
          )}
        >
          Download resume
        </a>
      </article>
    </div>
  );
}
