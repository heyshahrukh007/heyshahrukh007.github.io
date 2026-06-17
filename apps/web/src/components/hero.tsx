import Link from "next/link";

import { ExternalLink } from "@/components/external-link";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import {
  getEnabledHeroCtas,
  hero,
  isExternalHeroCta,
  site,
  type EnabledHeroCta,
} from "@/lib/site";
import { cn } from "@/lib/utils";

function HeroCtaButton({ cta }: { cta: EnabledHeroCta }) {
  const className = cn(
    buttonVariants({
      variant: cta.variant ?? "default",
      shape: "pill",
      size: "lg",
    }),
    "px-5",
  );

  if (isExternalHeroCta(cta)) {
    return (
      <ExternalLink href={cta.href} className={className}>
        {cta.label}
      </ExternalLink>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export default function Hero() {
  const ctas = getEnabledHeroCtas(hero.ctas);

  return (
    <section aria-labelledby="hero-heading" className="mx-auto flex w-full max-w-xl flex-col items-center gap-8 text-center">
      <div className="space-y-4">
        <h1
          id="hero-heading"
          className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        >
          {hero.headline}
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">{hero.subheadline}</p>
        <p className="text-sm text-muted-foreground/80">{site.location}</p>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {hero.summary}
        </p>
      </div>

      {ctas.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {ctas.map((cta) => (
            <HeroCtaButton key={cta.label} cta={cta} />
          ))}
        </div>
      ) : null}

      <SocialLinks className="justify-center" excludeHrefs={ctas.map((cta) => cta.href)} />
    </section>
  );
}
