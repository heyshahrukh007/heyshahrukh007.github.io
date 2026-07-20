import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  attachProjectCoverflow,
  createProjectScrollTimeline,
  getProjectScrollLength,
  layoutProjectTrack,
} from "@/lib/motion/project-timeline";

/**
 * Home story (Hero → Proof → Projects) timelines.
 *
 * Desktop: one pin; Beat 1 side-parks hero copy/visual (no fade) and crossfades
 * one Highlights metric at a time, then Beat 2 hands off to nested coverflow.
 * Stacked: reveal; projects pin/stack separately.
 */

export type HomeIntroElements = {
  pin: HTMLElement;
  stage: HTMLElement;
  hero: HTMLElement;
  proof: HTMLElement;
  projects: HTMLElement;
  projectStage: HTMLElement;
  projectTrack: HTMLElement;
};

export type HomeIntroHandle = {
  cleanup: () => void;
};

const HEADER_CLEARANCE_PX = 16;
/** Scroll distance (vh) per handoff beat. */
const HANDOFF_VH = 100;
const HANDOFF_UNITS = 1;
const TABLET_MAX = 1023;
const DESKTOP_SEGMENT_VH = 100;
const TABLET_SEGMENT_VH = 80;

/** Beat 1: park copy/visual toward outer edges without leaving the viewport. */
const PARK_SCALE = 0.85;
/** Tiny settle only — large translates clip against overflow:hidden. */
const PARK_X_VW = 1;
const PARK_EXIT_SCALE = 0.72;
const PARK_EXIT_X_VW = 6;
/** Center proof band for the metric stage. */
const PROOF_PIN_MAX_WIDTH = "36rem";
/** Keep Highlights aligned with hero copy, not vertically centered. */
const PROOF_PIN_TOP = "14%";

/** Beat 1 timeline units: park, then one discrete slot per Highlights metric. */
const PARK_UNITS = 0.3;
const CARD_UNITS = 0.55;
const HOLD_UNITS = 0.2;
const CARD_ENTER_RATIO = 0.5;

function getProofBeatUnits(itemCount: number) {
  return PARK_UNITS + Math.max(0, itemCount) * CARD_UNITS + HOLD_UNITS;
}

function cardEnterAt(index: number) {
  return PARK_UNITS + index * CARD_UNITS;
}

function getHeaderOffset() {
  const header = document.querySelector("header");
  if (!header) return 0;
  return Math.ceil(header.getBoundingClientRect().height);
}

function getPinTop() {
  return getHeaderOffset() + HEADER_CLEARANCE_PX;
}

/** Prefer visualViewport so mobile browser chrome / dvh-like sizing is respected. */
function getViewportHeight() {
  const vv = window.visualViewport?.height;
  if (typeof vv === "number" && vv > 0) return vv;
  return window.innerHeight;
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

function getViewportWidth() {
  const vv = window.visualViewport?.width;
  if (typeof vv === "number" && vv > 0) return Math.round(vv);
  return window.innerWidth;
}

function applyPinnedTop(pin: gsap.DOMTarget | null | undefined) {
  const el = resolvePinEl(pin);
  if (!el) return;
  // Pin lives under sticky header. Force true viewport width — otherwise the
  // pin inherits main's max-w-3xl and overflow:hidden clips the hero.
  gsap.set(el, {
    top: getPinTop(),
    zIndex: 45,
    left: 0,
    right: "auto",
    width: getViewportWidth(),
    maxWidth: "none",
    x: 0,
    xPercent: 0,
  });
}

function collectProofItems(proof: HTMLElement) {
  return gsap.utils.toArray<HTMLElement>("[data-proof-item]", proof);
}

function collectProjectCards(track: HTMLElement) {
  return gsap.utils.toArray<HTMLElement>("[data-project-card]", track);
}

function setHeroCtaInert(hero: HTMLElement, inert: boolean) {
  const ctas = hero.querySelector<HTMLElement>("[data-intro-ctas]");
  if (!ctas) return;
  ctas.toggleAttribute("inert", inert);
}

/** Disable tilt / pointer work on the hero visual while parked or cleared. */
function setHeroVisualInteractive(
  visual: HTMLElement | null | undefined,
  interactive: boolean,
) {
  if (!visual) return;
  gsap.set(visual, { pointerEvents: interactive ? "auto" : "none" });
}

/**
 * Pin-mode Highlights stage: one metric slot (absolute layers, crossfade — not a deck).
 * Stacked breakpoints keep normal document flow via clearProofSpotlight.
 */
function layoutProofStage(proof: HTMLElement, items: HTMLElement[]) {
  const list = proof.querySelector<HTMLElement>("[data-proof-list]");
  const stage = proof.querySelector<HTMLElement>("[data-proof-stage]");
  if (!list || !stage || items.length === 0) return;

  gsap.set(stage, {
    position: "relative",
    width: "100%",
    maxWidth: "28rem",
    marginLeft: "auto",
    marginRight: "auto",
  });

  gsap.set(list, {
    display: "block",
    position: "relative",
    width: "100%",
    margin: 0,
    gap: 0,
  });

  items.forEach((item, index) => {
    gsap.set(item, {
      position: "absolute",
      left: "50%",
      xPercent: -50,
      top: 0,
      width: "100%",
      margin: 0,
      zIndex: index + 1,
    });
  });

  let maxH = 140;
  items.forEach((item) => {
    maxH = Math.max(maxH, item.offsetHeight || 0);
  });
  gsap.set(stage, { height: maxH, minHeight: maxH });
  gsap.set(list, { height: maxH, minHeight: maxH });
}

function clearProofSpotlight(proof: HTMLElement, items: HTMLElement[]) {
  const list = proof.querySelector<HTMLElement>("[data-proof-list]");
  const stage = proof.querySelector<HTMLElement>("[data-proof-stage]");
  if (list) gsap.set(list, { clearProps: "all" });
  if (stage) gsap.set(stage, { clearProps: "all" });
  if (items.length > 0) gsap.set(items, { clearProps: "all" });
}

function syncProofProgress(proof: HTMLElement, activeIndex: number, active: boolean) {
  const dots = gsap.utils.toArray<HTMLElement>("[data-proof-dot]", proof);
  dots.forEach((dot, index) => {
    const on = active && index === activeIndex;
    gsap.set(dot, {
      backgroundColor: on
        ? "var(--primary)"
        : "color-mix(in oklch, var(--border) 85%, transparent)",
      scale: on ? 1.35 : 1,
    });
  });
}

function segmentVhForViewport() {
  return window.innerWidth <= TABLET_MAX ? TABLET_SEGMENT_VH : DESKTOP_SEGMENT_VH;
}

function getIntroParts(elements: HomeIntroElements) {
  const { pin, stage, hero, proof, projects, projectStage, projectTrack } =
    elements;
  const copy = hero.querySelector<HTMLElement>("[data-intro-copy]");
  const visual = hero.querySelector<HTMLElement>("[data-intro-visual]");
  const items = collectProofItems(proof);
  const cards = collectProjectCards(projectTrack);
  return {
    pin,
    stage,
    hero,
    proof,
    projects,
    projectStage,
    projectTrack,
    copy,
    visual,
    items,
    cards,
  };
}

/**
 * Layout lives on the inner stage only — never touch pin.position
 * (ScrollTrigger needs position:fixed while pinned).
 * Do not set autoAlpha/y here — refresh would reset mid-scrub animation state.
 *
 * Hero + proof stay max-w-5xl centered; projects stay full stage width for coverflow peeks.
 * Always clear layoutAfterPin collapse props so reverse re-entry can show panels again.
 */
function layoutPinnedStage(
  stage: HTMLElement,
  hero: HTMLElement,
  proof: HTMLElement,
  projects: HTMLElement,
) {
  const stageH = Math.max(420, Math.round(getViewportHeight() - getPinTop()));
  const stageW = getViewportWidth();
  // max-w-5xl = 64rem — keep in sync with Tailwind on the hero markup.
  const contentMax = "64rem";

  gsap.set(stage, {
    position: "relative",
    height: stageH,
    minHeight: stageH,
    maxHeight: stageH,
    width: stageW,
    maxWidth: stageW,
    overflow: "hidden",
    left: 0,
    x: 0,
    xPercent: 0,
  });

  // Undo layoutAfterPin collapse (height:0 / visibility:hidden) on reverse re-entry.
  const uncollapse = {
    height: "auto",
    overflow: "visible",
    visibility: "visible",
    pointerEvents: "auto",
  };

  // Keep the designed hero composition (centered max-w-5xl), not full-bleed stretch.
  gsap.set(hero, {
    ...uncollapse,
    position: "absolute",
    top: 0,
    left: "50%",
    xPercent: -50,
    width: "100%",
    maxWidth: contentMax,
    margin: 0,
    zIndex: 1,
  });
  gsap.set(proof, {
    ...uncollapse,
    position: "absolute",
    left: "50%",
    xPercent: -50,
    top: PROOF_PIN_TOP,
    yPercent: 0,
    width: "100%",
    maxWidth: PROOF_PIN_MAX_WIDTH,
    margin: 0,
    zIndex: 2,
  });
  gsap.set(projects, {
    ...uncollapse,
    position: "absolute",
    inset: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: "none",
    height: "100%",
    margin: 0,
    yPercent: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: window.innerWidth >= 640 ? 28 : 20,
    zIndex: 3,
  });
}

/** Size coverflow stage to fitted cards, capped by leftover panel space. */
function fitProjectStageInPanel(
  projects: HTMLElement,
  projectStage: HTMLElement,
) {
  const panelH = projects.clientHeight;
  if (panelH <= 0) return;

  let used = 0;
  for (const child of Array.from(projects.children)) {
    if (child === projectStage) continue;
    used += (child as HTMLElement).offsetHeight;
  }
  const gap = window.innerWidth >= 640 ? 28 : 20;
  const available = Math.max(160, panelH - used - gap * 2);
  const contentH = Math.max(
    160,
    projectStage.scrollHeight || projectStage.offsetHeight || 160,
  );
  const nextH = Math.min(available, contentH);

  gsap.set(projectStage, {
    height: nextH,
    minHeight: nextH,
    maxHeight: available,
    flexGrow: 0,
    flexShrink: 0,
  });
}

/** Compact flow after the pin scene — projects in document flow; hero+proof collapsed. */
function layoutAfterPin(
  stage: HTMLElement,
  hero: HTMLElement,
  proof: HTMLElement,
  projects: HTMLElement,
) {
  gsap.set(stage, {
    clearProps: "height,minHeight,maxHeight,overflow,width,maxWidth,left,x,xPercent",
  });

  const collapse = {
    position: "absolute" as const,
    width: "100%",
    height: 0,
    overflow: "hidden" as const,
    visibility: "hidden" as const,
    pointerEvents: "none" as const,
    autoAlpha: 0,
    margin: 0,
    zIndex: 0,
  };

  gsap.set(hero, collapse);
  gsap.set(proof, collapse);
  gsap.set(projects, {
    clearProps:
      "position,top,left,right,bottom,inset,x,xPercent,y,yPercent,zIndex,margin,maxWidth,height,minHeight,maxHeight,overflow,visibility,pointerEvents,display,flexDirection,justifyContent,gap",
    autoAlpha: 1,
    x: 0,
    xPercent: 0,
    y: 0,
    yPercent: 0,
    position: "relative",
  });
}

function clearIntroPinChrome(pin: HTMLElement) {
  gsap.set(pin, { clearProps: "zIndex,top,left,right,width,maxWidth,x,xPercent" });
}

/**
 * Desktop pinned Hero → Proof → Projects scrub timeline.
 * Beat 1 parks copy/visual aside and cascades proof cards (transform/opacity only).
 */
export function createPinnedIntroTimeline(
  elements: HomeIntroElements,
): HomeIntroHandle {
  const {
    pin,
    stage,
    hero,
    proof,
    projects,
    projectStage,
    projectTrack,
    copy,
    visual,
    items,
    cards,
  } = getIntroParts(elements);

  let cleanupCoverflow: (() => void) | null = null;

  setHeroCtaInert(hero, false);
  setHeroVisualInteractive(visual, true);
  layoutPinnedStage(stage, hero, proof, projects);
  layoutProofStage(proof, items);

  gsap.set(hero, { autoAlpha: 1 });
  gsap.set(proof, { autoAlpha: 0, y: 28, force3D: true });
  gsap.set(projects, { autoAlpha: 0, y: 100 });

  if (items.length > 0) {
    gsap.set(items, { y: 28, autoAlpha: 0, force3D: true });
  }

  syncProofProgress(proof, 0, false);

  if (copy) {
    gsap.set(copy, { x: 0, scale: 1, force3D: true, transformOrigin: "0% 50%" });
  }
  if (visual) {
    gsap.set(visual, {
      x: 0,
      scale: 1,
      force3D: true,
      transformOrigin: "100% 50%",
    });
  }

  if (cards.length > 0) {
    layoutProjectTrack(projectStage, projectTrack, cards);
    fitProjectStageInPanel(projects, projectStage);
  }

  const coverflowUnits = Math.max(1, cards.length - 1);
  const beat1Units = getProofBeatUnits(items.length);
  const beat2Units = HANDOFF_UNITS;
  const beat2 = beat1Units;
  const totalUnits = beat1Units + beat2Units + coverflowUnits;

  const scrollLength = () => {
    const unitPx = getViewportHeight() * (HANDOFF_VH / 100);
    const coverflow = getProjectScrollLength(
      Math.max(1, cards.length),
      segmentVhForViewport(),
    );
    return unitPx * (beat1Units + beat2Units) + coverflow;
  };

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: pin,
      start: () => `top ${getPinTop()}px`,
      end: () => `+=${scrollLength()}`,
      pin: true,
      pinSpacing: true,
      pinReparent: true,
      scrub: 0.65,
      ...(cards.length > 1
        ? {
            // Snap only across coverflow steps (ignore handoff region).
            snap: {
              snapTo: (value: number) => {
                const coverStart = (beat1Units + beat2Units) / totalUnits;
                if (value < coverStart) return value;
                const local = (value - coverStart) / (1 - coverStart);
                const steps = Math.max(1, cards.length - 1);
                const snapped = Math.round(local * steps) / steps;
                return coverStart + snapped * (1 - coverStart);
              },
              duration: { min: 0.1, max: 0.35 },
              delay: 0.05,
            },
          }
        : {}),
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: (self) => {
        layoutPinnedStage(stage, hero, proof, projects);
        layoutProofStage(proof, items);
        if (cards.length > 0) {
          layoutProjectTrack(projectStage, projectTrack, cards);
          fitProjectStageInPanel(projects, projectStage);
        }
        applyPinnedTop(self.pin);
        timeline.progress(self.progress);
      },
      onEnterBack: (self) => {
        layoutPinnedStage(stage, hero, proof, projects);
        layoutProofStage(proof, items);
        if (cards.length > 0) {
          layoutProjectTrack(projectStage, projectTrack, cards);
          fitProjectStageInPanel(projects, projectStage);
        }
        applyPinnedTop(self.pin);
        // Re-apply scrubbed opacity/transforms after undoing layoutAfterPin collapse.
        timeline.progress(self.progress);
      },
      onLeave: () => {
        layoutAfterPin(stage, hero, proof, projects);
        clearProofSpotlight(proof, items);
        clearIntroPinChrome(pin);
      },
      onLeaveBack: () => {
        clearIntroPinChrome(pin);
      },
      onRefresh: (self) => {
        if (self.progress >= 1 && !self.isActive) {
          layoutAfterPin(stage, hero, proof, projects);
          clearProofSpotlight(proof, items);
          clearIntroPinChrome(pin);
        } else {
          layoutPinnedStage(stage, hero, proof, projects);
          layoutProofStage(proof, items);
          if (cards.length > 0) {
            layoutProjectTrack(projectStage, projectTrack, cards);
            fitProjectStageInPanel(projects, projectStage);
          }
          if (self.isActive) {
            applyPinnedTop(self.pin);
            // Re-apply scrub state after layout (keeps hero hidden in projects beat).
            timeline.progress(self.progress);
          }
        }
      },
      onUpdate: () => {
        const t = timeline.time();
        const proofIn = t >= PARK_UNITS * 0.4 && t < beat2 + 0.35;
        const projectsFocused = t >= beat2 + 0.4;
        const atHeroRest = t < PARK_UNITS * 0.35;

        setHeroCtaInert(hero, proofIn || projectsFocused);
        setHeroVisualInteractive(visual, atHeroRest);

        if (items.length === 0 || t < PARK_UNITS) {
          syncProofProgress(proof, 0, false);
          return;
        }

        const activeIndex = Math.min(
          items.length - 1,
          Math.max(0, Math.floor((t - PARK_UNITS) / CARD_UNITS)),
        );
        syncProofProgress(proof, activeIndex, t < beat2);
      },
    },
  });

  const heroSides = [copy, visual].filter(Boolean) as HTMLElement[];

  // —— Beat 1: park hero sides toward outer edges (stay on-screen), one metric ——
  // Scale from the outer edge so content compresses into the side gutter
  // instead of translating past the stage's overflow:hidden clip.
  if (copy) {
    timeline.fromTo(
      copy,
      { x: 0, scale: 1 },
      {
        x: () => `${-PARK_X_VW}vw`,
        scale: PARK_SCALE,
        duration: PARK_UNITS,
        force3D: true,
        transformOrigin: "0% 50%",
      },
      0,
    );
  }

  if (visual) {
    timeline.fromTo(
      visual,
      { x: 0, scale: 1 },
      {
        x: () => `${PARK_X_VW}vw`,
        scale: PARK_SCALE,
        duration: PARK_UNITS,
        force3D: true,
        transformOrigin: "100% 50%",
      },
      0,
    );
  }

  timeline.fromTo(
    proof,
    { y: 20, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: PARK_UNITS * 0.85, force3D: true },
    PARK_UNITS * 0.15,
  );

  const cardEnterDur = CARD_UNITS * CARD_ENTER_RATIO;

  items.forEach((item, index) => {
    const at = cardEnterAt(index);

    // Hard crossfade — previous fully clears before the next reads.
    if (index > 0) {
      timeline.to(
        items[index - 1],
        {
          y: -16,
          autoAlpha: 0,
          duration: cardEnterDur * 0.55,
          force3D: true,
        },
        at,
      );
    }

    timeline.fromTo(
      item,
      { y: 20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: cardEnterDur * 0.7,
        force3D: true,
      },
      index > 0 ? at + cardEnterDur * 0.25 : at,
    );
  });

  timeline.to({}, { duration: HOLD_UNITS }, beat1Units - HOLD_UNITS);

  // —— Beat 2: hide hero fully + Proof → Projects ——
  timeline.to(
    hero,
    {
      autoAlpha: 0,
      duration: 0.45,
      force3D: true,
    },
    beat2,
  );

  if (copy) {
    timeline.to(
      copy,
      {
        x: () => `${-PARK_EXIT_X_VW}vw`,
        scale: PARK_EXIT_SCALE,
        duration: 0.45,
        force3D: true,
      },
      beat2,
    );
  }

  if (visual) {
    timeline.to(
      visual,
      {
        x: () => `${PARK_EXIT_X_VW}vw`,
        scale: PARK_EXIT_SCALE,
        duration: 0.45,
        force3D: true,
      },
      beat2,
    );
  }

  timeline.to(
    proof,
    {
      y: -80,
      scale: 0.92,
      autoAlpha: 0,
      duration: 0.55,
      force3D: true,
      transformOrigin: "50% 40%",
    },
    beat2,
  );

  if (items.length > 0) {
    timeline.to(
      items,
      {
        y: -24,
        autoAlpha: 0,
        duration: 0.35,
        force3D: true,
      },
      beat2,
    );
  }

  timeline.fromTo(
    projects,
    { y: 120, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.5, force3D: true },
    beat2 + 0.18,
  );

  timeline.to({}, { duration: 0.15 }, beat2 + beat2Units - 0.15);

  // —— Beat 3: horizontal coverflow ——
  if (cards.length > 0) {
    cleanupCoverflow = attachProjectCoverflow(
      timeline,
      projectStage,
      projectTrack,
      cards,
      beat2 + beat2Units,
      coverflowUnits,
    );
  } else {
    timeline.to({}, { duration: coverflowUnits }, beat2 + beat2Units);
  }

  const onViewportResize = () => {
    ScrollTrigger.refresh();
  };
  window.visualViewport?.addEventListener("resize", onViewportResize);

  return {
    cleanup: () => {
      window.visualViewport?.removeEventListener("resize", onViewportResize);
      cleanupCoverflow?.();
      cleanupCoverflow = null;
      setHeroCtaInert(hero, false);
      setHeroVisualInteractive(visual, true);
      timeline.scrollTrigger?.kill();
      timeline.kill();
      clearProofSpotlight(proof, items);
      syncProofProgress(proof, 0, false);
      gsap.set(
        [stage, hero, proof, projects, ...heroSides, ...items],
        { clearProps: "all" },
      );
    },
  };
}

/**
 * Tablet / mobile / short viewport: no pin for intro; projects pin or stack.
 */
export function createStackedIntroTimeline(
  elements: HomeIntroElements,
): HomeIntroHandle {
  const { hero, proof, items, stage, projects, projectStage, projectTrack, cards } =
    getIntroParts(elements);
  const tweens: gsap.core.Tween[] = [];
  let projectCleanup: (() => void) | null = null;

  gsap.set([stage, hero, proof, projects, ...items], { clearProps: "all" });
  setHeroCtaInert(hero, false);

  const shellTween = gsap.to(hero, {
    autoAlpha: 0.85,
    ease: "none",
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
  tweens.push(shellTween);

  items.forEach((item, index) => {
    const tween = gsap.from(item, {
      autoAlpha: 0,
      y: 28,
      duration: 0.7,
      ease: "power3.out",
      delay: index * 0.06,
      scrollTrigger: {
        trigger: item,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
    tweens.push(tween);
  });

  if (cards.length > 0) {
    const pinProjects = window.matchMedia("(min-width: 768px)").matches;

    if (pinProjects) {
      const handle = createProjectScrollTimeline({
        section: projects,
        stage: projectStage,
        track: projectTrack,
        cards,
        segmentVh: segmentVhForViewport(),
        scrub: 0.65,
      });
      projectCleanup = () => handle?.cleanup();
    } else {
      projectStage.dataset.projectStage = "stacked";
      gsap.set([projectTrack, ...cards], { clearProps: "all" });
      cards.forEach((card, index) => {
        card.removeAttribute("aria-hidden");
        card.removeAttribute("inert");
        const tween = gsap.from(card, {
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
        tweens.push(tween);
      });
    }
  }

  return {
    cleanup: () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
      projectCleanup?.();
      delete projectStage.dataset.projectStage;
      setHeroCtaInert(hero, false);
      gsap.set([stage, hero, proof, projects, ...items], { clearProps: "all" });
    },
  };
}

/**
 * Reduced motion: final visible state.
 */
export function applyStaticIntro(elements: HomeIntroElements): HomeIntroHandle {
  const { pin, stage, hero, proof, projects, projectStage, projectTrack } =
    elements;
  const items = collectProofItems(proof);
  const cards = collectProjectCards(projectTrack);

  gsap.set([pin, stage, hero, proof, projects, ...items], { clearProps: "all" });
  gsap.set([projectTrack, ...cards], { clearProps: "all" });
  cards.forEach((card) => {
    card.removeAttribute("aria-hidden");
    card.removeAttribute("inert");
  });
  setHeroCtaInert(hero, false);

  return {
    cleanup: () => {
      setHeroCtaInert(hero, false);
    },
  };
}
