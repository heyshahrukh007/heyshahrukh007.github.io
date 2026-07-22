"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import {
  applyStaticIntro,
  createPinnedIntroTimeline,
  createStackedIntroTimeline,
} from "@/lib/motion/home-intro-timeline";

/**
 * Pin story (side-park): CSS width ≥1024 only — DPI-agnostic.
 * No height gate: scaled 1080p laptops often sit at ~550–650 CSS px tall.
 * Use range syntax so there is no 1px gap vs STACK at the boundary.
 */
const PIN_QUERY =
  "(width >= 1024px) and (prefers-reduced-motion: no-preference)";

/** Stacked: CSS width <1024 (phone/tablet). Mutually exclusive with PIN_QUERY. */
const STACK_QUERY =
  "(width < 1024px) and (prefers-reduced-motion: no-preference)";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

type UseHomeIntroScrollOptions = {
  pinRef: RefObject<HTMLElement | null>;
  stageRef: RefObject<HTMLElement | null>;
  heroRef: RefObject<HTMLElement | null>;
  proofRef: RefObject<HTMLElement | null>;
  projectsRef: RefObject<HTMLElement | null>;
  projectStageRef: RefObject<HTMLElement | null>;
  projectTrackRef: RefObject<HTMLElement | null>;
};

/**
 * Orchestrates Hero → Proof → Projects story motion across breakpoints.
 */
export function useHomeIntroScroll({
  pinRef,
  stageRef,
  heroRef,
  proofRef,
  projectsRef,
  projectStageRef,
  projectTrackRef,
}: UseHomeIntroScrollOptions) {
  useGSAP(
    () => {
      const pin = pinRef.current;
      const stage = stageRef.current;
      const hero = heroRef.current;
      const proof = proofRef.current;
      const projects = projectsRef.current;
      const projectStage = projectStageRef.current;
      const projectTrack = projectTrackRef.current;
      if (
        !pin ||
        !stage ||
        !hero ||
        !proof ||
        !projects ||
        !projectStage ||
        !projectTrack
      ) {
        return;
      }

      const elements = {
        pin,
        stage,
        hero,
        proof,
        projects,
        projectStage,
        projectTrack,
      };
      const mm = gsap.matchMedia();

      mm.add(PIN_QUERY, () => {
        const handle = createPinnedIntroTimeline(elements);
        return () => {
          handle.cleanup();
        };
      });

      mm.add(STACK_QUERY, () => {
        const handle = createStackedIntroTimeline(elements);
        return () => {
          handle.cleanup();
        };
      });

      mm.add(REDUCED_QUERY, () => {
        const handle = applyStaticIntro(elements);
        return () => {
          handle.cleanup();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: pinRef, dependencies: [] },
  );
}
