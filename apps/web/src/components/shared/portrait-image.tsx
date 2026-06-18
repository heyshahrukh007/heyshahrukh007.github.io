"use client";

import { useEffect, useState } from "react";

import { getInitials } from "@/lib/initials";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const portraitImageMaskClass = "hero-portrait-image-mask";

type PortraitImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fetchPriority?: "high" | "low" | "auto";
};

export function PortraitImage({
  src,
  alt,
  className,
  imageClassName,
  fetchPriority = "auto",
}: PortraitImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        aria-label={alt}
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center text-5xl font-semibold tracking-tight text-foreground/80 sm:text-6xl",
          portraitImageMaskClass,
          className,
        )}
      >
        {getInitials(site.name)}
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 z-10", portraitImageMaskClass, className)}>
      <img
        key={src}
        src={src}
        alt={alt}
        decoding="async"
        fetchPriority={fetchPriority}
        className={cn(
          "h-full w-full origin-bottom scale-[1.06] object-contain object-bottom",
          imageClassName,
        )}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
