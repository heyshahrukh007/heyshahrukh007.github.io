"use client";

import { CircleIcon, TriangleIcon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { getInitials } from "@/lib/initials";
import { hero, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeroPortraitProps = {
  className?: string;
};

function HeroShape({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute z-20 motion-interactive", className)}
    >
      {children}
    </div>
  );
}

export function HeroPortrait({ className }: HeroPortraitProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [hero.photo.src]);

  return (
    <div className={cn("relative mx-auto w-full max-w-sm lg:max-w-lg xl:max-w-xl", className)}>
      <HeroShape className="top-4 -left-1 animate-icon-float text-primary/80">
        <CircleIcon className="size-[18px] fill-current" />
      </HeroShape>

      <HeroShape className="top-10 right-0 animate-orb-float text-primary/70 [animation-delay:400ms]">
        <TriangleIcon className="size-[22px] fill-current" />
      </HeroShape>

      <HeroShape className="bottom-24 -left-2 animate-icon-float text-primary/60 [animation-delay:800ms]">
        <CircleIcon className="size-3.5 fill-current" />
      </HeroShape>

      <HeroShape className="right-2 bottom-12 animate-orb-float text-primary/50 [animation-delay:1.2s]">
        <TriangleIcon className="size-4 fill-current" />
      </HeroShape>

      <div className="relative aspect-4/5 w-full">
        <div
          aria-hidden
          className="absolute top-[6%] left-1/2 size-[82%] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute top-[8%] left-1/2 size-[76%] -translate-x-1/2 rounded-full bg-background ring-1 ring-border dark:bg-card"
        />

        <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-card shadow-lg ring-1 ring-border dark:shadow-md dark:ring-border/50">
          {hasError ? (
            <div
              aria-label={hero.photo.alt}
              className="flex h-full items-center justify-center text-5xl font-semibold tracking-tight text-foreground/80 sm:text-6xl"
            >
              {getInitials(site.name)}
            </div>
          ) : (
            <img
              key={hero.photo.src}
              src={hero.photo.src}
              alt={hero.photo.alt}
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full origin-bottom scale-[1.06] object-contain object-bottom"
              onError={() => setHasError(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
