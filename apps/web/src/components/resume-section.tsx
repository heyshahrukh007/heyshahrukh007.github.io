import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { resume } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function ResumeSection() {
  return (
    <section aria-labelledby="resume-heading" className="space-y-6">
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
    </section>
  );
}
