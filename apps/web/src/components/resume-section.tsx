import Link from "next/link";

import { Subsection } from "@/components/subsection";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { resume, site } from "@/lib/site";
import { textLinkClassName } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

export default function ResumeSection() {
  return (
    <section aria-labelledby="resume-heading" className="space-y-10">
      <div className="space-y-6">
        <SectionHeading
          id="resume-heading"
          headingLevel={1}
          title={resume.title}
          description={resume.summary}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={resume.file.href}
            download={resume.file.downloadName}
            className={cn(
              buttonVariants({ shape: "pill", size: "lg" }),
              "inline-flex w-full justify-center px-5 sm:w-auto",
            )}
          >
            Download resume
          </a>
          <a
            href={resume.file.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", shape: "pill", size: "lg" }),
              "inline-flex w-full justify-center px-5 sm:w-auto",
            )}
          >
            View resume ↗
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </div>
      </div>

      <header className="max-w-2xl space-y-3 border-t border-border/40 pt-10">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{site.name}</h2>
        <p className="text-sm text-primary/80">{site.role}</p>
        <p className="text-xs text-muted-foreground">
          {site.location}
          <span aria-hidden> · </span>
          Last updated {resume.lastUpdated}
        </p>
      </header>

      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{resume.overview}</p>

      <div className="space-y-10 border-t border-border/40 pt-10">
        <Subsection title="What's inside">
          <ul className="max-w-2xl space-y-3">
            {resume.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </Subsection>

        <p className="text-sm">
          <Link href="#experience" className={cn("text-sm", textLinkClassName)}>
            View experience on the site →
          </Link>
        </p>
      </div>
    </section>
  );
}
