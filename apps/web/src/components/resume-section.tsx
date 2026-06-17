import Link from "next/link";

import { Subsection } from "@/components/subsection";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { resume, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function ResumeSection() {
  return (
    <div className="space-y-10">
      <SectionHeading title={resume.title} description={resume.summary} />

      <header className="max-w-2xl space-y-3 border-t border-border/40 pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{site.name}</h2>
        <p className="text-sm text-primary/80">{site.role}</p>
        <p className="text-xs text-muted-foreground">
          {site.location}
          <span aria-hidden> · </span>
          Last updated {resume.lastUpdated}
        </p>
      </header>

      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
        {resume.overview}
      </p>

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

        <div className="flex flex-wrap items-center gap-3">
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
          <a
            href={resume.file.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", shape: "pill", size: "lg" }),
              "inline-flex px-5",
            )}
          >
            View resume ↗
          </a>
        </div>

        <p className="text-sm">
          <Link
            href="/#experience"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            View experience on the site →
          </Link>
        </p>
      </div>
    </div>
  );
}
