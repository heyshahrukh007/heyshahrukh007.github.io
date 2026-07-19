"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const LAYER_Y = {
  far: 24,
  mid: 48,
  near: 72,
  copy: 16,
} as const;

type HeroParallaxProps = {
  children: ReactNode;
  className?: string;
};

export function HeroParallax({ children, className }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const shell = container.querySelector<HTMLElement>("[data-parallax-shell]");
        const trigger = shell ?? container;

        const scrubLayer = (selector: string, y: number) => {
          const elements = gsap.utils.toArray<HTMLElement>(selector, container);
          elements.forEach((el) => {
            gsap.to(el, {
              y,
              ease: "none",
              scrollTrigger: {
                trigger,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        };

        scrubLayer('[data-parallax="far"]', LAYER_Y.far);
        scrubLayer('[data-parallax="mid"]', LAYER_Y.mid);
        scrubLayer('[data-parallax="near"]', LAYER_Y.near);
        scrubLayer('[data-parallax="copy"]', LAYER_Y.copy);

        if (shell) {
          gsap.to(shell, {
            opacity: 0.55,
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
              trigger: shell,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
