import { gsap } from "@/lib/gsap";

/**
 * Pinned projects storytelling timeline.
 *
 * Why one master scrubbed timeline:
 * ScrollTrigger scrub maps scroll progress ↔ timeline progress in both directions,
 * so forward/reverse transitions stay in sync without manual reverse handlers.
 *
 * Why cards are absolutely stacked:
 * Only transforms/autoAlpha/filter animate. Absolute stacking avoids layout
 * thrashing and height jumps as projects change.
 *
 * Segment math: (n - 1) segments, not n.
 * Project 0 starts visible; each scroll segment advances to the next project.
 * With 3 projects there are 2 transitions (0→1, 1→2).
 *
 * Why float is a separate non-scrubbed tween:
 * Scrub would reverse the float with scroll and feel mechanical. A gentle
 * yoyo loop on the active card only reads as living presence.
 */

export type ProjectTimelineConfig = {
  section: HTMLElement;
  stage: HTMLElement;
  cards: HTMLElement[];
  /** Viewport-height percent per project transition (desktop ~100, tablet ~80). */
  segmentVh?: number;
  markers?: boolean;
  scrub?: boolean | number;
};

export type ProjectTimelineHandle = {
  timeline: gsap.core.Timeline;
  cleanup: () => void;
};

const EASE = "power3.out";
const SEGMENT_DURATION = 1;
const FLOAT_Y = -8;
const FLOAT_DURATION = 2.4;

const ACTIVE = {
  xPercent: 0,
  autoAlpha: 1,
  scale: 1,
  rotation: 0,
  filter: "blur(0px)",
  pointerEvents: "auto",
} as const;

const INCOMING_FROM = {
  xPercent: -120,
  autoAlpha: 0,
  scale: 0.9,
  rotation: -3,
  filter: "blur(8px)",
  pointerEvents: "none",
} as const;

const OUTGOING_TO = {
  xPercent: 12,
  autoAlpha: 0,
  scale: 0.95,
  rotation: 0,
  filter: "blur(4px)",
  pointerEvents: "none",
} as const;

function setCardAccessibility(card: HTMLElement, active: boolean) {
  card.setAttribute("aria-hidden", active ? "false" : "true");
  card.toggleAttribute("inert", !active);
}

function applyInitialStates(cards: HTMLElement[], stage: HTMLElement) {
  const zBase = cards.length;

  // Force stage + absolute stacking via inline styles. Custom CSS media rules for
  // `.project-stage` may be missing from the Turbopack dev stylesheet; inline wins.
  gsap.set(stage, {
    position: "relative",
    minHeight: Math.min(window.innerHeight * 0.9, 720),
    display: "block",
  });

  cards.forEach((card, index) => {
    const isFirst = index === 0;
    gsap.set(card, {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: "100%",
      height: "fit-content",
      marginTop: "auto",
      marginBottom: "auto",
      ...(isFirst ? ACTIVE : INCOMING_FROM),
      zIndex: isFirst ? zBase : zBase - index,
      y: 0,
      force3D: true,
    });
    setCardAccessibility(card, isFirst);
  });
}

function createFloat(card: HTMLElement) {
  return gsap.to(card, {
    y: FLOAT_Y,
    duration: FLOAT_DURATION,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

/**
 * Builds the scrubbed pin timeline. Caller owns matchMedia / useGSAP lifecycle;
 * call `cleanup` or rely on `mm.revert()` after creating inside a matchMedia block.
 */
export function createProjectScrollTimeline({
  section,
  stage,
  cards,
  segmentVh = 100,
  markers = false,
  scrub = 0.6,
}: ProjectTimelineConfig): ProjectTimelineHandle | null {
  if (cards.length === 0) {
    return null;
  }

  applyInitialStates(cards, stage);

  // Single project: no pin/scrub — just float the visible card.
  if (cards.length === 1) {
    const floatTween = createFloat(cards[0]!);
    return {
      timeline: gsap.timeline(),
      cleanup: () => {
        floatTween.kill();
        gsap.set(cards[0]!, { y: 0 });
      },
    };
  }

  const count = cards.length;
  const zBase = count;
  let activeIndex = 0;
  let floatTween: gsap.core.Tween | null = createFloat(cards[0]!);

  const setActiveIndex = (next: number) => {
    if (next === activeIndex) {
      return;
    }

    floatTween?.kill();
    floatTween = null;
    gsap.set(cards[activeIndex]!, { y: 0 });

    activeIndex = next;

    cards.forEach((card, index) => {
      setCardAccessibility(card, index === activeIndex);
    });

    floatTween = createFloat(cards[activeIndex]!);
  };

  const timeline = gsap.timeline({
    defaults: { ease: EASE, force3D: true },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      // Functional end + invalidateOnRefresh keeps pin distance correct on resize.
      // Spacer must grow by this distance; otherwise About scrolls under the pin.
      end: () => `+=${(count - 1) * window.innerHeight * (segmentVh / 100)}`,
      pin: true,
      pinSpacing: true,
      // Reparent while pinned so position:fixed isn't trapped by ancestor transforms
      // (e.g. .motion-page-enter). Without this, the section scrolls away (secTop << 0)
      // even though ScrollTrigger reports isActive.
      pinReparent: true,
      scrub,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers,
      onUpdate: (self) => {
        const index = Math.round(self.progress * (count - 1));
        setActiveIndex(Math.min(count - 1, Math.max(0, index)));
      },
    },
  });

  // Recalculate pin-spacer after layout so it includes the full scrub distance.
  requestAnimationFrame(() => {
    timeline.scrollTrigger?.refresh();
  });

  for (let i = 0; i < count - 1; i += 1) {
    const outgoing = cards[i]!;
    const incoming = cards[i + 1]!;
    const at = i * SEGMENT_DURATION;

    // Outgoing: drifts right, softens, drops behind.
    timeline.to(
      outgoing,
      {
        ...OUTGOING_TO,
        zIndex: 1,
        duration: SEGMENT_DURATION,
      },
      at,
    );

    // Incoming: enters from the left and settles center (overlaps outgoing).
    timeline.fromTo(
      incoming,
      { ...INCOMING_FROM, zIndex: zBase, y: 0 },
      {
        ...ACTIVE,
        zIndex: zBase,
        duration: SEGMENT_DURATION,
      },
      at,
    );
  }

  return {
    timeline,
    cleanup: () => {
      floatTween?.kill();
      floatTween = null;
      timeline.scrollTrigger?.kill();
      timeline.kill();
      cards.forEach((card) => {
        gsap.set(card, { clearProps: "all" });
        card.removeAttribute("aria-hidden");
        card.removeAttribute("inert");
      });
      gsap.set(stage, { clearProps: "position,minHeight,display" });
    },
  };
}
