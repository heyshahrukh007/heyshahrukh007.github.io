import Link from "next/link";

import { ExternalLink } from "@/components/external-link";
import { buttonVariants } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import {
  getEnabledHeroCtas,
  hero,
  isExternalHeroCta,
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
    <section className="flex flex-1 flex-col justify-center gap-8">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{hero.subheadline}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {hero.headline}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {hero.summary}
        </p>
      </div>

      {ctas.length > 0 ? (
        <div className="flex flex-wrap items-center gap-3">
          {ctas.map((cta) => (
            <HeroCtaButton key={cta.label} cta={cta} />
          ))}
        </div>
      ) : null}

      <SocialLinks excludeHrefs={ctas.map((cta) => cta.href)} />
    </section>
  );
}
