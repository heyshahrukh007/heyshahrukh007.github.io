import { SectionHeading } from "@/components/shared/section-heading";
import { professionalHighlights } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProofStatsProps = {
  className?: string;
};

/**
 * Highlights proof for the home intro.
 * Desktop pin: one metric at a time in a shared stage (timeline-driven).
 * Stacked breakpoints: quiet vertical list — no card chrome.
 */
export function ProofStats({ className }: ProofStatsProps) {
  return (
    <section
      data-intro-proof
      aria-labelledby="professional-highlights-heading"
      className={cn("space-y-6 sm:space-y-8", className)}
    >
      <SectionHeading
        id="professional-highlights-heading"
        title="Highlights"
        description="A snapshot of experience, delivery, and the domains I work in."
        align="center"
      />

      <div
        data-proof-stage
        className="relative mx-auto w-full max-w-md"
      >
        <ul
          data-proof-list
          className="flex flex-col gap-8 md:gap-10"
        >
          {professionalHighlights.map((highlight) => {
            const suffix = "suffix" in highlight ? (highlight.suffix ?? "") : "";
            const value = `${highlight.count}${suffix}`;

            return (
              <li
                key={highlight.label}
                data-proof-item
                className="text-center"
              >
                <p className="text-5xl font-semibold tracking-tight text-foreground tabular-nums sm:text-6xl">
                  <span data-proof-value aria-label={value}>
                    {value}
                  </span>
                </p>
                <p className="mt-3 text-base font-medium text-foreground/90 sm:text-lg">
                  {highlight.label}
                </p>
                {"description" in highlight && highlight.description ? (
                  <p className="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {highlight.description}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div
        data-proof-progress
        className="hidden items-center justify-center gap-2 lg:flex"
        aria-hidden
      >
        {professionalHighlights.map((highlight) => (
          <span
            key={highlight.label}
            data-proof-dot
            className="size-1.5 rounded-full bg-border transition-[background-color,transform] duration-200"
          />
        ))}
      </div>
    </section>
  );
}
