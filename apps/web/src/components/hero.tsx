import Link from "next/link";

import { ExternalLink } from "@/components/external-link";
import { ProfileAvatar } from "@/components/profile-avatar";
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
    <section aria-labelledby="hero-heading" className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
      <ProfileAvatar size="lg" className="mx-auto sm:mx-0" />

      <div className="flex min-w-0 flex-1 flex-col gap-8 text-center sm:text-left">
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
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            {ctas.map((cta) => (
              <HeroCtaButton key={cta.label} cta={cta} />
            ))}
          </div>
        ) : null}

        <SocialLinks
          className="justify-center sm:justify-start"
          excludeHrefs={ctas.map((cta) => cta.href)}
        />
      </div>
    </section>
  );
}
