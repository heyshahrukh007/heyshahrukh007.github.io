"use client";

import { CircleIcon, TriangleIcon } from "lucide-react";
import type { ReactNode } from "react";

import { PortraitImage } from "@/components/shared/portrait-image";
import { cn } from "@/lib/utils";

const portraitSizeClasses = {
  hero: "max-w-sm lg:max-w-lg xl:max-w-xl",
  about: "max-w-64 sm:max-w-72 md:max-w-80 lg:max-w-md xl:max-w-lg",
} as const;

type PortraitFrameProps = {
  src: string;
  alt: string;
  className?: string;
  size?: keyof typeof portraitSizeClasses;
  fetchPriority?: "high" | "low" | "auto";
  parallax?: boolean;
};

function PortraitShape({
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

export function PortraitFrame({
  src,
  alt,
  className,
  size = "hero",
  fetchPriority = "auto",
  parallax = false,
}: PortraitFrameProps) {
  return (
    <div className={cn("relative mx-auto w-full", portraitSizeClasses[size], className)}>
      <div
        {...(parallax ? { "data-parallax": "mid" } : {})}
        className={cn(
          parallax && "pointer-events-none absolute inset-0 z-20 will-change-transform",
        )}
      >
        <PortraitShape className="top-4 -left-1 animate-icon-float text-primary/80">
          <CircleIcon className="size-[18px] fill-current" />
        </PortraitShape>

        <PortraitShape className="top-10 right-0 animate-orb-float text-primary/70 [animation-delay:400ms]">
          <TriangleIcon className="size-[22px] fill-current" />
        </PortraitShape>

        <PortraitShape className="bottom-24 -left-2 animate-icon-float text-primary/60 [animation-delay:800ms]">
          <CircleIcon className="size-3.5 fill-current" />
        </PortraitShape>

        <PortraitShape className="right-2 bottom-12 animate-orb-float text-primary/50 [animation-delay:1.2s]">
          <TriangleIcon className="size-4 fill-current" />
        </PortraitShape>
      </div>

      <div
        className={cn(
          "relative aspect-portrait w-full",
          size === "hero" && "lg:max-h-(--site-hero-height)",
        )}
      >
        <div
          aria-hidden
          {...(parallax ? { "data-parallax": "far" } : {})}
          className={cn(
            "absolute top-[4%] left-0 flex w-full justify-center",
            parallax && "will-change-transform",
          )}
        >
          <div className="size-[92%] rounded-full bg-primary/30 blur-3xl" />
        </div>
        <div
          {...(parallax ? { "data-parallax": "mid" } : {})}
          className={cn("relative h-full w-full", parallax && "will-change-transform")}
        >
          <PortraitImage src={src} alt={alt} fetchPriority={fetchPriority} />
        </div>
      </div>
    </div>
  );
}
