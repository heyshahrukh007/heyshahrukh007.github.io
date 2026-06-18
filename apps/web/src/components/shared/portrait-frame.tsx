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
}: PortraitFrameProps) {
  return (
    <div className={cn("relative mx-auto w-full", portraitSizeClasses[size], className)}>
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

      <div
        className={cn(
          "relative aspect-4/5 w-full",
          size === "hero" && "lg:max-h-(--site-hero-height)",
        )}
      >
        <div
          aria-hidden
          className="absolute top-[4%] left-1/2 size-[92%] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl"
        />
        <PortraitImage src={src} alt={alt} fetchPriority={fetchPriority} />
      </div>
    </div>
  );
}
