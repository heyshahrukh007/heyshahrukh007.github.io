import { CountUp } from "@/components/count-up";
import { Card, CardContent } from "@/components/ui/card";
import { professionalHighlights } from "@/lib/site";
import { cn } from "@/lib/utils";

const CARD_STAGGER_MS = 150;
const VALUE_DELAY_MS = 280;
const COUNT_DURATION_MS = 2000;

export default function ProfessionalHighlights() {
  return (
    <section aria-labelledby="professional-highlights-heading" className="mt-16">
      <h2 id="professional-highlights-heading" className="sr-only">
        Professional Highlights
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {professionalHighlights.map((highlight, index) => (
          <li
            key={highlight.label}
            className="animate-highlight-card-enter transform-gpu"
            style={{ animationDelay: `${index * CARD_STAGGER_MS}ms` }}
          >
            <Card
              size="sm"
              className={cn(
                "group/highlight h-full transform-gpu transition-[transform,box-shadow,ring-color] duration-500 ease-highlight",
                "hover:-translate-y-1.5 hover:shadow-lg hover:ring-primary/20",
              )}
            >
              <CardContent className="flex flex-col items-center gap-1.5 pt-4 text-center">
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  <CountUp
                    value={highlight.count}
                    suffix={"suffix" in highlight ? highlight.suffix : undefined}
                    delay={index * CARD_STAGGER_MS + VALUE_DELAY_MS}
                    duration={COUNT_DURATION_MS}
                    className="transition-transform duration-500 ease-highlight group-hover/highlight:scale-[1.04]"
                  />
                </p>
                <p
                  className="animate-highlight-label-enter text-xs leading-snug text-muted-foreground sm:text-sm"
                  style={{ animationDelay: `${index * CARD_STAGGER_MS + VALUE_DELAY_MS + 120}ms` }}
                >
                  {highlight.label}
                </p>
                {"description" in highlight && highlight.description ? (
                  <p
                    className="animate-highlight-label-enter text-xs leading-snug text-muted-foreground/80"
                    style={{ animationDelay: `${index * CARD_STAGGER_MS + VALUE_DELAY_MS + 180}ms` }}
                  >
                    {highlight.description}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
