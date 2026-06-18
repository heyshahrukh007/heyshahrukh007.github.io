import Link from "next/link";

import { ExternalLink } from "@/components/shared/external-link";
import { HeroVisual } from "@/components/home/hero-visual";
import { LinkArrowRightIcon } from "@/components/shared/link-icons";
import { buttonVariants } from "@/components/ui/button";
import {
  getEnabledHeroCtas,
  hero,
  isExternalHeroCta,
  type EnabledHeroCta,
} from "@/lib/site";
import { cn } from "@/lib/utils";

function HeroCtaButton({
  cta,
  primary = false,
}: {
  cta: EnabledHeroCta;
  primary?: boolean;
}) {
  const className = cn(
    buttonVariants({
      variant: cta.variant ?? "default",
      shape: primary ? "default" : "pill",
      size: "lg",
    }),
    primary ? "group rounded-xl px-6 text-sm font-semibold" : "px-5",
  );

  const content = (
    <>
      {cta.label}
      {primary ? <LinkArrowRightIcon className="size-4" /> : null}
    </>
  );

  if (isExternalHeroCta(cta)) {
    return (
      <ExternalLink href={cta.href} className={className}>
        {content}
      </ExternalLink>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {content}
    </Link>
  );
}

export default function Hero() {
  const ctas = getEnabledHeroCtas(hero.ctas);
  const [primaryCta, ...secondaryCtas] = ctas;

  return (
    <section
      aria-labelledby="hero-heading"
      className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16"
    >
      <div className="flex min-w-0 flex-col gap-6 text-center lg:gap-7 lg:text-left">
        <p className="text-sm font-medium text-muted-foreground sm:text-base">{hero.greeting}</p>

        <div className="space-y-4">
          <h1
            id="hero-heading"
            className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
          >
            {hero.title.lead}{" "}
            {hero.title.highlights.map((highlight) => (
              <span key={highlight} className="text-primary">
                {highlight}{" "}
              </span>
            ))}
            {hero.title.tail}
          </h1>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            {hero.summary}
          </p>
        </div>

        {ctas.length > 0 ? (
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:items-start lg:justify-start">
            {primaryCta ? <HeroCtaButton cta={primaryCta} primary /> : null}
            {secondaryCtas.map((cta) => (
              <HeroCtaButton key={cta.label} cta={cta} />
            ))}
          </div>
        ) : null}
      </div>

      <HeroVisual className="lg:justify-self-end" />
    </section>
  );
}
