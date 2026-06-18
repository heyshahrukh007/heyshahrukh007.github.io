"use client";

import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LERP = 0.08;
const CONVERGENCE_THRESHOLD = 0.5;

function hasFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getViewportCenter() {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

export function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) {
      return;
    }

    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const element = spotlightRef.current;
    if (!element) {
      return;
    }

    const target = getViewportCenter();
    const current = { ...target };
    let rafId = 0;
    let hasMoved = false;

    const updateCssPosition = () => {
      element.style.setProperty("--spotlight-x", `${current.x}px`);
      element.style.setProperty("--spotlight-y", `${current.y}px`);
    };

    updateCssPosition();

    const tick = () => {
      const dx = target.x - current.x;
      const dy = target.y - current.y;

      if (Math.abs(dx) > CONVERGENCE_THRESHOLD || Math.abs(dy) > CONVERGENCE_THRESHOLD) {
        current.x += dx * LERP;
        current.y += dy * LERP;
        updateCssPosition();
        rafId = requestAnimationFrame(tick);
        return;
      }

      current.x = target.x;
      current.y = target.y;
      updateCssPosition();
      rafId = 0;
    };

    const startAnimation = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      if (!hasMoved) {
        hasMoved = true;
        setVisible(true);
      }

      startAnimation();
    };

    const handleResize = () => {
      if (!hasMoved) {
        target.x = window.innerWidth / 2;
        target.y = window.innerHeight / 2;
        current.x = target.x;
        current.y = target.y;
        updateCssPosition();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <div
      ref={spotlightRef}
      aria-hidden
      className={cn(
        "mouse-spotlight pointer-events-none fixed inset-0 z-0",
        !visible && "opacity-0",
      )}
    />
  );
}
