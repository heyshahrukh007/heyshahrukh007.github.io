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
      className={cn("space-y-5 sm:space-y-6", className)}
    >
      <SectionHeading
        id="professional-highlights-heading"
        title="Highlights"
        description="A snapshot of experience, delivery, and the domains I work in."
        align="center"
      />

      <ul
        data-proof-list
        className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4 sm:gap-4"
      >
        {professionalHighlights.map((highlight) => (
          <li key={highlight.label} className="h-full" data-proof-item>
            <div
              className={cn(
                "flex h-full flex-col items-start gap-2 rounded-xl border border-border/40 bg-muted/10 px-5 py-5 text-left",
                "sm:px-6 sm:py-6",
              )}
            >
              <p className="text-3xl font-semibold tracking-tight text-foreground tabular-nums sm:text-4xl">
                <span
                  data-proof-value
                  data-count={highlight.count}
                  data-suffix={"suffix" in highlight ? (highlight.suffix ?? "") : ""}
                  aria-label={`${highlight.count}${"suffix" in highlight ? (highlight.suffix ?? "") : ""}`}
                >
                  {`0${"suffix" in highlight ? (highlight.suffix ?? "") : ""}`}
                </span>
              </p>
              <p className="text-sm leading-snug text-muted-foreground">
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
