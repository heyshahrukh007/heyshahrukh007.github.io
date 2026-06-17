"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ScrollRevealProps = ComponentPropsWithoutRef<"div"> & {
  delay?: number;
};

export function ScrollReveal({ className, delay = 0, children, ...props }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    setReduceMotion(reduced);

    if (reduced) {
      setIsRevealed(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        !isRevealed && !reduceMotion && "motion-scroll-reveal-pending",
        isRevealed && !reduceMotion && "motion-scroll-reveal",
        className,
      )}
      style={isRevealed && !reduceMotion ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
