import { SectionHeading } from "@/components/shared/section-heading";
import { professionalHighlights } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProofStatsProps = {
  className?: string;
};

/**
 * Presentational proof strip for the home intro scene.
 * Numbers are filled by the intro scroll timeline via `[data-proof-value]`.
 */
export function ProofStats({ className }: ProofStatsProps) {
  return (
    <section
      data-intro-proof
      aria-labelledby="professional-highlights-heading"
      className={cn("space-y-8 sm:space-y-10", className)}
    >
      <SectionHeading
        id="professional-highlights-heading"
        title="Highlights"
        description="A snapshot of experience, delivery, and the domains I work in."
      />

      <ul
        data-proof-list
        className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4 sm:gap-4"
      >
        {professionalHighlights.map((highlight) => (
          <li key={highlight.label} className="h-full" data-proof-item>
            <div
              className={cn(
                "flex h-full flex-col items-start gap-1.5 rounded-xl border border-border/40 bg-muted/10 px-4 py-4 text-left",
                "sm:px-5 sm:py-5",
              )}
            >
              <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums sm:text-3xl">
                <span
                  data-proof-value
                  data-count={highlight.count}
                  data-suffix={"suffix" in highlight ? (highlight.suffix ?? "") : ""}
                  aria-label={`${highlight.count}${"suffix" in highlight ? (highlight.suffix ?? "") : ""}`}
                >
                  {`0${"suffix" in highlight ? (highlight.suffix ?? "") : ""}`}
                </span>
              </p>
              <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
                {highlight.label}
              </p>
              {"description" in highlight && highlight.description ? (
                <p className="text-xs leading-snug text-muted-foreground/80">
                  {highlight.description}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
