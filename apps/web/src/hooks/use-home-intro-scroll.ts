"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import {
  applyStaticIntro,
  createPinnedIntroTimeline,
  createStackedIntroTimeline,
} from "@/lib/motion/home-intro-timeline";

/** Desktop pin: wide + tall enough + motion OK */
const PIN_QUERY =
  "(min-width: 1024px) and (min-height: 701px) and (prefers-reduced-motion: no-preference)";

/** Stacked: narrow OR short viewport, motion OK (mutually exclusive with PIN_QUERY) */
const STACK_QUERY =
  "(prefers-reduced-motion: no-preference) and ((max-width: 1023px) or (max-height: 700px))";

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
