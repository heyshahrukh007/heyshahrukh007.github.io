import { gsap } from "@/lib/gsap";

/**
 * Pinned horizontal projects timeline (coverflow).
 *
 * Vertical scroll scrubs the track so each project centers in turn. The focused
 * card stays full size / opaque; neighbors stay visible but smaller and faded.
 *
 * Note: `overflow-x: hidden` + `overflow-y: visible` collapses to clipping on both
 * axes (CSS), so the stage uses a single `overflow: hidden` with vertical padding
 * tall enough that float / card content is not cropped.
 */

export type ProjectTimelineConfig = {
  section: HTMLElement;
  stage: HTMLElement;
  track: HTMLElement;
  cards: HTMLElement[];
  /** Viewport-height percent floor per project step (desktop ~100, tablet ~80). */
  segmentVh?: number;
  markers?: boolean;
  scrub?: boolean | number;
};

export type ProjectTimelineHandle = {
  timeline: gsap.core.Timeline;
  cleanup: () => void;
};

const FLOAT_Y = -6;
const FLOAT_DURATION = 2.4;
/** Room above/below cards so float + shadows are not clipped by overflow:hidden. */
const STAGE_PAD_Y = 16;
/** Explicit gap — CSS `gap` on `.project-track` is often missing from Turbopack's CSS chunk. */
const TRACK_GAP_PX = 28;
/** Focused card width as a fraction of the stage (neighbors must clearly peek). */
const ACTIVE_WIDTH_RATIO = 0.5;
/** Cap so ultra-wide viewports do not make the focused card enormous. */
const ACTIVE_MAX_WIDTH = 680;
const SIDE_SCALE = 0.82;
const SIDE_OPACITY = 0.55;

function setCardAccessibility(card: HTMLElement, active: boolean) {
  card.setAttribute("aria-hidden", active ? "false" : "true");
  card.toggleAttribute("inert", !active);
}

function getCardWidth(stage: HTMLElement) {
  return Math.max(
    260,
    Math.min(ACTIVE_MAX_WIDTH, Math.round(stage.clientWidth * ACTIVE_WIDTH_RATIO)),
  );
}

function applyCardSize(card: HTMLElement, width: number) {
  gsap.set(card, {
    position: "relative",
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: width,
    width,
    minWidth: width,
    maxWidth: width,
    boxSizing: "border-box",
    height: "auto",
    transformOrigin: "50% 50%",
    force3D: true,
  });
}

function applyStageSize(stage: HTMLElement, cards: HTMLElement[]) {
  const maxCardHeight = Math.max(...cards.map((card) => card.offsetHeight), 320);
  // One overflow value only — mixed x/y visible+hidden forces both axes to clip.
  gsap.set(stage, {
    overflow: "hidden",
    boxSizing: "border-box",
    paddingTop: STAGE_PAD_Y,
    paddingBottom: STAGE_PAD_Y,
    height: maxCardHeight + STAGE_PAD_Y * 2,
    minHeight: maxCardHeight + STAGE_PAD_Y * 2,
  });
}

/** Extra space so pinned content sits clearly below the sticky header chrome. */
const HEADER_CLEARANCE_PX = 16;

function getHeaderOffset() {
  const header = document.querySelector("header");
  if (!header) return 0;
  return Math.ceil(header.getBoundingClientRect().height);
}

function getPinTop() {
  return getHeaderOffset() + HEADER_CLEARANCE_PX;
}

function resolvePinEl(pin: gsap.DOMTarget | null | undefined): HTMLElement | null {
  if (!pin) return null;
  if (pin instanceof HTMLElement) return pin;
  if (typeof pin === "string") return document.querySelector(pin);
  if (Array.isArray(pin)) {
    const first = pin[0];
    return first instanceof HTMLElement ? first : null;
  }
  return null;
}

function applyPinnedTop(pin: gsap.DOMTarget | null | undefined) {
  const el = resolvePinEl(pin);
  if (!el) return;
  // Keep pin under the sticky header (header is z-50).
  gsap.set(el, { top: getPinTop(), zIndex: 40 });
}

/** Track `x` that centers `card` in the stage (ignores current track transform). */
function getTrackXToCenter(stage: HTMLElement, card: HTMLElement) {
  const stageCenter = stage.clientWidth / 2;
  const cardCenter = card.offsetLeft + card.offsetWidth / 2;
  return stageCenter - cardCenter;
}

function getScrollLength(cardCount: number, segmentVh: number) {
  return Math.max(0, cardCount - 1) * window.innerHeight * (segmentVh / 100);
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

function nearestCardIndex(stage: HTMLElement, cards: HTMLElement[]) {
  const stageRect = stage.getBoundingClientRect();
  const stageCenter = stageRect.left + stageRect.width / 2;
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(center - stageCenter);
    if (dist < bestDist) {
      bestDist = dist;
      best = index;
    }
  });

  return best;
}

/**
 * Scale / fade cards by distance from stage center so neighbors stay visible
 * but the focused project reads clearly.
 */
function updateCardFocus(stage: HTMLElement, cards: HTMLElement[]) {
  const stageRect = stage.getBoundingClientRect();
  const stageCenter = stageRect.left + stageRect.width / 2;
  const step = Math.max(1, getCardWidth(stage) + TRACK_GAP_PX);

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    const t = Math.min(1, Math.abs(cardCenter - stageCenter) / step);
    gsap.set(card, {
      scale: gsap.utils.interpolate(1, SIDE_SCALE, t),
      autoAlpha: gsap.utils.interpolate(1, SIDE_OPACITY, t),
      transformOrigin: "50% 50%",
    });
  });
}

function layoutTrack(stage: HTMLElement, track: HTMLElement, cards: HTMLElement[]) {
  gsap.set(track, {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    gap: `${TRACK_GAP_PX}px`,
    columnGap: `${TRACK_GAP_PX}px`,
    width: "max-content",
    force3D: true,
  });

  const cardWidth = getCardWidth(stage);
  cards.forEach((card) => {
    applyCardSize(card, cardWidth);
  });
  applyStageSize(stage, cards);

  const first = cards[0];
  if (first) {
    gsap.set(track, { x: getTrackXToCenter(stage, first) });
  }

  updateCardFocus(stage, cards);

  return cardWidth;
}

/**
 * Builds the scrubbed pin + horizontal coverflow timeline.
 * Caller owns matchMedia / useGSAP lifecycle.
 */
export function createProjectScrollTimeline({
  section,
  stage,
  track,
  cards,
  segmentVh = 100,
  markers = false,
  scrub = 0.65,
}: ProjectTimelineConfig): ProjectTimelineHandle | null {
  if (cards.length === 0) {
    return null;
  }

  layoutTrack(stage, track, cards);
  cards.forEach((card, index) => {
    setCardAccessibility(card, index === 0);
  });

  if (cards.length === 1) {
    const floatTween = createFloat(cards[0]!);
    return {
      timeline: gsap.timeline(),
      cleanup: () => {
        floatTween.kill();
        gsap.set(cards[0]!, { clearProps: "all" });
        gsap.set([stage, track, ...cards], { clearProps: "all" });
      },
    };
  }

  const count = cards.length;
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
    defaults: { ease: "none", force3D: true },
    scrollTrigger: {
      trigger: section,
      // Pin clearly below the sticky header (height + clearance).
      start: () => `top ${getPinTop()}px`,
      end: () => `+=${getScrollLength(count, segmentVh)}`,
      pin: true,
      pinSpacing: true,
      pinReparent: true,
      scrub,
      ...(count > 1 ? { snap: 1 / (count - 1) } : {}),
      anticipatePin: 1,
      invalidateOnRefresh: true,
      markers,
      onEnter: (self) => {
        applyPinnedTop(self.pin);
      },
      onEnterBack: (self) => {
        applyPinnedTop(self.pin);
      },
      onRefresh: (self) => {
        layoutTrack(stage, track, cards);
        if (self.isActive) {
          applyPinnedTop(self.pin);
        }
      },
      onUpdate: () => {
        updateCardFocus(stage, cards);
        setActiveIndex(nearestCardIndex(stage, cards));
      },
    },
  });

  timeline.fromTo(
    track,
    {
      x: () => getTrackXToCenter(stage, cards[0]!),
    },
    {
      x: () => getTrackXToCenter(stage, cards[count - 1]!),
      ease: "none",
      duration: 1,
    },
  );

  requestAnimationFrame(() => {
    layoutTrack(stage, track, cards);
    timeline.scrollTrigger?.refresh();
  });

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
      gsap.set(track, { clearProps: "all" });
      gsap.set(stage, { clearProps: "all" });
    },
  };
}
