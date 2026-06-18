"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";

import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ScrollRevealProps = ComponentPropsWithoutRef<"div"> & {
  delay?: number;
};

export function ScrollReveal({
  className,
  delay = 0,
  style,
  children,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (prefersReducedMotion()) {
      setIsRevealed(true);
      setShouldAnimate(false);
      return;
    }

    setShouldAnimate(true);
    setIsRevealed(false);

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

  const revealStyle: CSSProperties | undefined =
    isRevealed && shouldAnimate ? { animationDelay: `${delay}ms`, ...style } : style;

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        shouldAnimate && !isRevealed && "motion-scroll-reveal-pending",
        shouldAnimate && isRevealed && "motion-scroll-reveal",
        className,
      )}
      style={revealStyle}
    >
      {children}
    </div>
  );
}
