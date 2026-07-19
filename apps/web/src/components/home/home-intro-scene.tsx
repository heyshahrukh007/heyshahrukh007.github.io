"use client";

import Link from "next/link";
import { useRef } from "react";

import { HeroVisual } from "@/components/home/hero-visual";
import { ProjectStoryCard } from "@/components/home/project-story-card";
import { ProofStats } from "@/components/home/proof-stats";
import { ExternalLink } from "@/components/shared/external-link";
import { LinkArrowRightIcon } from "@/components/shared/link-icons";
import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { useHomeIntroScroll } from "@/hooks/use-home-intro-scroll";
import {
  getEnabledHeroCtas,
  getPortfolioIndexRoute,
  getStoryProjects,
  hero,
  home,
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

/**
 * Home story scene: hero → proof → projects with breakpoint-specific GSAP motion.
 */
export default function HomeIntroScene() {
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const projectStageRef = useRef<HTMLDivElement>(null);
  const projectTrackRef = useRef<HTMLDivElement>(null);

  const ctas = getEnabledHeroCtas(hero.ctas);
  const [primaryCta, ...secondaryCtas] = ctas;
  const projects = getStoryProjects();

  useHomeIntroScroll({
    pinRef,
    stageRef,
    heroRef,
    proofRef,
    projectsRef,
    projectStageRef,
    projectTrackRef,
  });

  return (
    <div className="home-intro-scene relative w-screen ml-[calc(50%-50vw)] px-6 sm:px-8">
      <div ref={pinRef} data-intro-pin className="home-intro-pin">
        {/* Inner stage owns overlap layout — never overwrite pin position:fixed */}
        <div
          ref={stageRef}
          data-intro-stage
          className="home-intro-stage relative mx-auto w-full space-y-10 sm:space-y-12 lg:space-y-14"
        >
          <section
            ref={heroRef}
            aria-labelledby="hero-heading"
            data-intro-hero
            className="origin-center mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 xl:gap-10"
          >
            <div
              data-intro-copy
              className="flex min-w-0 flex-col gap-6 text-center lg:gap-7 lg:text-left"
            >
              <div className="flex flex-col gap-6 lg:gap-7">
                <p className="text-sm font-medium text-muted-foreground sm:text-base">
                  {hero.greeting}
                </p>

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
              </div>

              {ctas.length > 0 ? (
                <div
                  data-intro-ctas
                  className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:items-start lg:justify-start"
                >
                  {primaryCta ? <HeroCtaButton cta={primaryCta} primary /> : null}
                  {secondaryCtas.map((cta) => (
                    <HeroCtaButton key={cta.label} cta={cta} />
                  ))}
                </div>
              ) : null}
            </div>

            <div data-intro-visual className="min-w-0">
              <HeroVisual className="lg:justify-self-end" />
            </div>
          </section>

          <div ref={proofRef} data-intro-proof className="mx-auto w-full max-w-5xl">
            <ProofStats />
          </div>

          {projects.length > 0 ? (
            <section
              ref={projectsRef}
              aria-labelledby="featured-projects-heading"
              data-intro-projects
              className="flex w-full flex-col justify-center gap-6 sm:gap-8"
            >
              <div className="mx-auto w-full max-w-3xl shrink-0">
                <SectionHeading
                  id="featured-projects-heading"
                  headingLevel={2}
                  title={home.featuredProjects.title}
                  description={home.featuredProjects.description}
                />
              </div>

              <div
                ref={projectStageRef}
                data-project-stage
                className="project-stage relative min-h-0 w-full flex-1"
                aria-label="Featured portfolio work"
              >
                <div
                  ref={projectTrackRef}
                  data-project-track
                  className="project-track gap-8"
                >
                  {projects.map((project) => (
                    <ProjectStoryCard key={project.slug} project={project} />
                  ))}
                </div>
              </div>

              <div className="flex shrink-0 justify-center">
                <Link
                  href={getPortfolioIndexRoute()}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "group rounded-xl px-6 text-sm font-semibold",
                  )}
                >
                  View portfolio
                  <LinkArrowRightIcon className="size-4" />
                </Link>
              </div>
            </section>
          ) : (
            <section
              ref={projectsRef}
              data-intro-projects
              className="hidden"
              aria-hidden
            >
              <div ref={projectStageRef} data-project-stage>
                <div ref={projectTrackRef} data-project-track />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
