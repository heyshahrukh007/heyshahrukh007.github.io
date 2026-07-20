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
const STAGE_PAD_Y = 12;
/** Explicit gap — CSS `gap` on `.project-track` is often missing from Turbopack's CSS chunk. */
const TRACK_GAP_PX = 28;
/** Focused card width as a fraction of the stage (neighbors must clearly peek). */
const ACTIVE_WIDTH_RATIO = 0.5;
const ACTIVE_WIDTH_RATIO_COMPACT = 0.62;
/** Cap so ultra-wide viewports do not make the focused card enormous. */
const ACTIVE_MAX_WIDTH = 680;
const ACTIVE_MAX_WIDTH_COMPACT = 520;
const ACTIVE_MIN_WIDTH = 240;
const SIDE_SCALE = 0.82;
const SIDE_OPACITY = 0.55;
/** Never scale cards below this when fitting short viewports. */
const MIN_FIT_SCALE = 0.58;

function getViewportHeight() {
  const vv = window.visualViewport?.height;
  if (typeof vv === "number" && vv > 0) return vv;
  return window.innerHeight;
}

function isCompactViewport() {
  return window.innerWidth < 1100 || getViewportHeight() < 820;
}

function getCardWidth(stage: HTMLElement) {
  const compact = isCompactViewport();
  const ratio = compact ? ACTIVE_WIDTH_RATIO_COMPACT : ACTIVE_WIDTH_RATIO;
  const maxW = compact ? ACTIVE_MAX_WIDTH_COMPACT : ACTIVE_MAX_WIDTH;
  return Math.max(
    ACTIVE_MIN_WIDTH,
    Math.min(maxW, Math.round(stage.clientWidth * ratio)),
  );
}

function getAvailableStageHeight(stage: HTMLElement) {
  const parent = stage.parentElement;
  if (!parent || parent.clientHeight <= 0) {
    return Math.max(200, getViewportHeight() * 0.55);
  }

  let used = 0;
  for (const child of Array.from(parent.children)) {
    if (child === stage) continue;
    used += (child as HTMLElement).offsetHeight;
  }
  const gap = window.innerWidth >= 640 ? 32 : 24;
  const gaps = Math.max(0, parent.children.length - 1);
  return Math.max(160, parent.clientHeight - used - gap * Math.min(2, gaps));
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
    maxHeight: "none",
    transformOrigin: "50% 50%",
    force3D: true,
  });
}

function readFitScale(stage: HTMLElement) {
  const raw = Number(stage.dataset.fitScale ?? "1");
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
}

function applyStageSize(
  stage: HTMLElement,
  fitScale: number,
  contentCardHeight: number,
) {
  const available = getAvailableStageHeight(stage);
  const fittedContentH = Math.max(
    120,
    Math.ceil(contentCardHeight * fitScale) + STAGE_PAD_Y * 2,
  );
  // Size to cards (keeps CTA close). Cap by available so short viewports still fit.
  const targetH = Math.min(available, fittedContentH);

  gsap.set(stage, {
    overflow: "hidden",
    boxSizing: "border-box",
    paddingTop: STAGE_PAD_Y,
    paddingBottom: STAGE_PAD_Y,
    height: targetH,
    minHeight: targetH,
    maxHeight: available,
    flexGrow: 0,
    flexShrink: 0,
  });

  stage.dataset.fitScale = String(fitScale);
}

function setCardAccessibility(card: HTMLElement, active: boolean) {
  card.setAttribute("aria-hidden", active ? "false" : "true");
  card.toggleAttribute("inert", !active);
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
  gsap.set(el, { top: getPinTop(), zIndex: 45 });
}

/** Track `x` that centers `card` in the stage (ignores current track transform). */
export function getTrackXToCenter(stage: HTMLElement, card: HTMLElement) {
  const stageCenter = stage.clientWidth / 2;
  const cardCenter = card.offsetLeft + card.offsetWidth / 2;
  return stageCenter - cardCenter;
}

export function getProjectScrollLength(cardCount: number, segmentVh: number) {
  const vh =
    typeof window.visualViewport?.height === "number" &&
    window.visualViewport.height > 0
      ? window.visualViewport.height
      : window.innerHeight;
  return Math.max(0, cardCount - 1) * vh * (segmentVh / 100);
}

export function createFloat(card: HTMLElement) {
  const stage = card.closest<HTMLElement>(".project-stage");
  const fitScale = stage ? readFitScale(stage) : 1;
  // Skip float when cards are already scaled down to fit — avoids clipping.
  if (fitScale < 0.92) {
    gsap.set(card, { y: 0 });
    return gsap.to(card, { duration: 0.01 });
  }

  return gsap.to(card, {
    y: FLOAT_Y,
    duration: FLOAT_DURATION,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

export function nearestCardIndex(stage: HTMLElement, cards: HTMLElement[]) {
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
 * but the focused project reads clearly. Multiplies in viewport fitScale so
 * short devices keep the full card visible inside the stage.
 */
export function updateCardFocus(stage: HTMLElement, cards: HTMLElement[]) {
  const track = cards[0]?.parentElement;
  const trackX = track ? Number(gsap.getProperty(track, "x")) || 0 : 0;
  const stageCenter = stage.clientWidth / 2;
  const step = Math.max(1, getCardWidth(stage) + TRACK_GAP_PX);
  const fitScale = readFitScale(stage);

  cards.forEach((card) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2 + trackX;
    const t = Math.min(1, Math.abs(cardCenter - stageCenter) / step);
    gsap.set(card, {
      scale: fitScale * gsap.utils.interpolate(1, SIDE_SCALE, t),
      autoAlpha: gsap.utils.interpolate(1, SIDE_OPACITY, t),
      transformOrigin: "50% 50%",
    });
  });
}

export function layoutProjectTrack(
  stage: HTMLElement,
  track: HTMLElement,
  cards: HTMLElement[],
) {
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

  // Provisional stage height = available max so width math is stable.
  const available = getAvailableStageHeight(stage);
  gsap.set(stage, {
    overflow: "hidden",
    boxSizing: "border-box",
    height: available,
    minHeight: available,
    maxHeight: available,
  });

  const cardWidth = getCardWidth(stage);
  cards.forEach((card) => {
    applyCardSize(card, cardWidth);
    card.toggleAttribute("data-project-card-compact", isCompactViewport());
  });

  const maxCardHeight = Math.max(...cards.map((card) => card.offsetHeight), 1);
  const innerBudget = Math.max(120, available - STAGE_PAD_Y * 2);
  const fitScale =
    maxCardHeight > innerBudget
      ? Math.max(MIN_FIT_SCALE, innerBudget / maxCardHeight)
      : 1;

  applyStageSize(stage, fitScale, maxCardHeight);

  const first = cards[0];
  if (first) {
    gsap.set(track, { x: getTrackXToCenter(stage, first) });
  }

  updateCardFocus(stage, cards);

  return cardWidth;
}

/**
 * Attach horizontal coverflow scrub to an existing master timeline (no own pin).
 * Used by the home intro story after Proof → Projects handoff.
 */
export function attachProjectCoverflow(
  timeline: gsap.core.Timeline,
  stage: HTMLElement,
  track: HTMLElement,
  cards: HTMLElement[],
  position: string | number = ">",
  duration = 1,
): () => void {
  if (cards.length === 0) {
    return () => undefined;
  }

  layoutProjectTrack(stage, track, cards);
  cards.forEach((card, index) => {
    setCardAccessibility(card, index === 0);
  });

  if (cards.length === 1) {
    const floatTween = createFloat(cards[0]!);
    return () => {
      floatTween.kill();
      gsap.set(cards[0]!, { clearProps: "all" });
      gsap.set([stage, track], { clearProps: "all" });
    };
  }

  let activeIndex = 0;
  let floatTween: gsap.core.Tween | null = createFloat(cards[0]!);

  const setActiveIndex = (next: number) => {
    if (next === activeIndex) return;
    floatTween?.kill();
    floatTween = null;
    gsap.set(cards[activeIndex]!, { y: 0 });
    activeIndex = next;
    cards.forEach((card, index) => {
      setCardAccessibility(card, index === activeIndex);
    });
    floatTween = createFloat(cards[activeIndex]!);
  };

  const onCoverflowUpdate = () => {
    updateCardFocus(stage, cards);
    setActiveIndex(nearestCardIndex(stage, cards));
  };

  timeline.fromTo(
    track,
    { x: () => getTrackXToCenter(stage, cards[0]!) },
    {
      x: () => getTrackXToCenter(stage, cards[cards.length - 1]!),
      ease: "none",
      duration,
      onUpdate: onCoverflowUpdate,
    },
    position,
  );

  return () => {
    floatTween?.kill();
    floatTween = null;
    cards.forEach((card) => {
      gsap.set(card, { clearProps: "all" });
      card.removeAttribute("aria-hidden");
      card.removeAttribute("inert");
    });
    gsap.set(track, { clearProps: "all" });
    gsap.set(stage, { clearProps: "all" });
  };
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

  layoutProjectTrack(stage, track, cards);

  const count = cards.length;
  const timeline = gsap.timeline({
    defaults: { ease: "none", force3D: true },
    scrollTrigger: {
      trigger: section,
      // Pin clearly below the sticky header (height + clearance).
      start: () => `top ${getPinTop()}px`,
      end: () => `+=${getProjectScrollLength(count, segmentVh)}`,
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
        layoutProjectTrack(stage, track, cards);
        if (self.isActive) {
          applyPinnedTop(self.pin);
        }
      },
    },
  });

  const cleanupCoverflow = attachProjectCoverflow(
    timeline,
    stage,
    track,
    cards,
    0,
    1,
  );

  requestAnimationFrame(() => {
    layoutProjectTrack(stage, track, cards);
    timeline.scrollTrigger?.refresh();
  });

  return {
    timeline,
    cleanup: () => {
      cleanupCoverflow();
      timeline.scrollTrigger?.kill();
      timeline.kill();
    },
  };
}
