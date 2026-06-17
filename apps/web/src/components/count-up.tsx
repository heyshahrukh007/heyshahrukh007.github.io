"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type CountUpProps = {
  value: number;
  suffix?: string;
  delay?: number;
  duration?: number;
  className?: string;
};

function easeOutExpo(progress: number) {
  return progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
}

export function CountUp({
  value,
  suffix = "",
  delay = 0,
  duration = 2000,
  className,
}: CountUpProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasStartedRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const setDisplay = (count: number) => {
      element.textContent = `${count}${suffix}`;
    };

    const startAnimation = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(value);
        return;
      }

      const startAt = performance.now() + delay;
      let lastCount = -1;

      const frame = (now: number) => {
        const elapsed = now - startAt;
        if (elapsed < 0) {
          frameRef.current = requestAnimationFrame(frame);
          return;
        }

        const progress = Math.min(elapsed / duration, 1);
        const nextCount = Math.round(easeOutExpo(progress) * value);

        if (nextCount !== lastCount) {
          setDisplay(nextCount);
          lastCount = nextCount;
        }

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(frame);
        } else {
          setDisplay(value);
        }
      };

      frameRef.current = requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, suffix, delay, duration]);

  return (
    <span ref={elementRef} className={cn("inline-block tabular-nums", className)}>
      0{suffix}
    </span>
  );
}
