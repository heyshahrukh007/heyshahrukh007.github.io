"use client";

import type { RefObject } from "react";

import { useGSAP, gsap } from "@/lib/gsap";
import { createProjectScrollTimeline } from "@/lib/motion/project-timeline";

const PIN_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const STACK_FADE_QUERY = "(max-width: 767px) and (prefers-reduced-motion: no-preference)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const DESKTOP_SEGMENT_VH = 100;
const TABLET_SEGMENT_VH = 80;
const TABLET_MAX = 1023;

type UseProjectScrollOptions = {
  /** Element that ScrollTrigger pins (stage wrapper — not the section heading). */
  sectionRef: RefObject<HTMLElement | null>;
  stageRef: RefObject<HTMLElement | null>;
  trackRef: RefObject<HTMLElement | null>;
  enabled?: boolean;
};

function collectCards(track: HTMLElement) {
  return gsap.utils.toArray<HTMLElement>("[data-project-card]", track);
}

function segmentVhForViewport() {
  return window.innerWidth <= TABLET_MAX ? TABLET_SEGMENT_VH : DESKTOP_SEGMENT_VH;
}

/**
 * Orchestrates pinned horizontal project storytelling (desktop/tablet) and
 * stacked fade-up (mobile). Reduced motion clears transforms and skips pin/scrub.
 */
export function useProjectScroll({
  sectionRef,
  stageRef,
  trackRef,
  enabled = true,
}: UseProjectScrollOptions) {
  useGSAP(
    () => {
      if (!enabled) {
        return;
      }

      const section = sectionRef.current;
      const stage = stageRef.current;
      const track = trackRef.current;
      if (!section || !stage || !track) {
        return;
      }

      const cards = collectCards(track);
      if (cards.length === 0) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(PIN_QUERY, () => {
        stage.dataset.projectStage = "pinned";

        const handle = createProjectScrollTimeline({
          section,
          stage,
          track,
          cards,
          segmentVh: segmentVhForViewport(),
          scrub: 0.65,
        });

        return () => {
          handle?.cleanup();
          delete stage.dataset.projectStage;
        };
      });

      mm.add(STACK_FADE_QUERY, () => {
        stage.dataset.projectStage = "stacked";
        gsap.set([track, ...cards], { clearProps: "all" });

        cards.forEach((card, index) => {
          card.removeAttribute("aria-hidden");
          card.removeAttribute("inert");

          gsap.from(card, {
            autoAlpha: 0,
            y: 28,
            duration: 0.7,
            ease: "power3.out",
            delay: index * 0.06,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          });
        });

        return () => {
          delete stage.dataset.projectStage;
        };
      });

      mm.add(REDUCED_QUERY, () => {
        stage.dataset.projectStage = "reduced";
        gsap.set([track, ...cards], { clearProps: "all" });
        cards.forEach((card) => {
          card.removeAttribute("aria-hidden");
          card.removeAttribute("inert");
        });

        return () => {
          delete stage.dataset.projectStage;
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [enabled] },
  );
}
