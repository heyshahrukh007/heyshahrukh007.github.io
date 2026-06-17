import { CountUp } from "@/components/count-up";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { professionalHighlights } from "@/lib/site";
import { cn } from "@/lib/utils";

const CARD_STAGGER_MS = 50;
const VALUE_DELAY_MS = 100;
const COUNT_DURATION_MS = 1000;

export default function ProfessionalHighlights() {
  return (
    <section aria-labelledby="professional-highlights-heading" className="space-y-8">
      <SectionHeading
        id="professional-highlights-heading"
        title="Highlights"
        description="A snapshot of experience, delivery, and the domains I work in."
      />

      <ul className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4 sm:gap-4">
        {professionalHighlights.map((highlight, index) => (
          <li key={highlight.label} className="h-full">
            <ScrollReveal delay={index * CARD_STAGGER_MS} className="h-full">
              <Card
                size="sm"
                className={cn(
                  "h-full border border-border/50 bg-muted/15 ring-0",
                  "motion-interactive hover:border-border hover:bg-muted/20",
                )}
              >
                <CardContent className="flex flex-col items-start gap-1.5 pt-4 text-left">
                  <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    <CountUp
                      value={highlight.count}
                      suffix={"suffix" in highlight ? highlight.suffix : undefined}
                      delay={index * CARD_STAGGER_MS + VALUE_DELAY_MS}
                      duration={COUNT_DURATION_MS}
                    />
                  </p>
                  <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
                    {highlight.label}
                  </p>
                  {"description" in highlight && highlight.description ? (
                    <p className="text-xs leading-snug text-muted-foreground/80">
                      {highlight.description}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </ScrollReveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
