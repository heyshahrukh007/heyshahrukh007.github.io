"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const MAX_TILT_DEG = 5;

function hasFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

type HeroTiltProps = {
  children: ReactNode;
  className?: string;
};

export function HeroTilt({ children, className }: HeroTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || prefersReducedMotion() || !hasFinePointer()) {
        return;
      }

      const rotateXTo = gsap.quickTo(element, "rotationX", {
        duration: 0.4,
        ease: "power2.out",
      });
      const rotateYTo = gsap.quickTo(element, "rotationY", {
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.set(element, {
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        force3D: true,
      });

      const onPointerMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * MAX_TILT_DEG * 2;
        const rotateX = (0.5 - y) * MAX_TILT_DEG * 2;
        rotateXTo(rotateX);
        rotateYTo(rotateY);
      };

      const onPointerLeave = () => {
        rotateXTo(0);
        rotateYTo(0);
      };

      element.addEventListener("pointermove", onPointerMove);
      element.addEventListener("pointerleave", onPointerLeave);

      return () => {
        element.removeEventListener("pointermove", onPointerMove);
        element.removeEventListener("pointerleave", onPointerLeave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
