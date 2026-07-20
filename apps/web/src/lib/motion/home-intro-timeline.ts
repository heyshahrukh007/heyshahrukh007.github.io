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
 * Desktop: one pin; Beat 1 side-parks hero copy/visual (no fade) and spotlights
 * one Highlights card at a time, then Beat 2 hands off to nested coverflow.
 * Stacked: reveal + count once; projects pin/stack separately.
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
const COUNT_DURATION = 1.1;
const HANDOFF_UNITS = 1;
const TABLET_MAX = 1023;
const DESKTOP_SEGMENT_VH = 100;
const TABLET_SEGMENT_VH = 80;

/** Beat 1: park copy/visual aside — move/scale only, never fade. */
const PARK_X_PERCENT = 18;
const PARK_X_VW = 5;
const PARK_SCALE = 0.92;
const PARK_EXIT_X_PERCENT = 42;
const PARK_EXIT_X_VW = 14;
const PARK_EXIT_SCALE = 0.86;
/** Center spotlight band (heading + one card). */
const PROOF_PIN_MAX_WIDTH = "28rem";
const PROOF_CARD_MAX_WIDTH = "22rem";
/** Keep Highlights aligned with hero copy, not vertically centered. */
const PROOF_PIN_TOP = "12%";

/** Beat 1 timeline units: park, then one discrete slot per Highlights card. */
const PARK_UNITS = 0.3;
const CARD_UNITS = 0.55;
const HOLD_UNITS = 0.2;
const CARD_ENTER_RATIO = 0.42;
const CARD_EXIT_RATIO = 0.38;
const CARD_COUNT_RATIO = 0.5;

function getProofBeatUnits(itemCount: number) {
  return PARK_UNITS + Math.max(0, itemCount) * CARD_UNITS + HOLD_UNITS;
}

function cardEnterAt(index: number) {
  return PARK_UNITS + index * CARD_UNITS;
}

function cardCountAt(index: number) {
  return cardEnterAt(index) + CARD_UNITS * CARD_COUNT_RATIO;
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

function applyPinnedTop(pin: gsap.DOMTarget | null | undefined) {
  const el = resolvePinEl(pin);
  if (!el) return;
  gsap.set(el, { top: getPinTop(), zIndex: 45 });
}

function collectValueNodes(root: HTMLElement) {
  return gsap.utils.toArray<HTMLElement>("[data-proof-value]", root);
}

function collectProofItems(proof: HTMLElement) {
  return gsap.utils.toArray<HTMLElement>("[data-proof-item]", proof);
}

function collectProjectCards(track: HTMLElement) {
  return gsap.utils.toArray<HTMLElement>("[data-project-card]", track);
}

function setValueDisplay(el: HTMLElement, count: number) {
  const suffix = el.dataset.suffix ?? "";
  el.textContent = `${count}${suffix}`;
}

function readTargetCount(el: HTMLElement) {
  return Number(el.dataset.count ?? "0") || 0;
}

function setFinalCounts(proof: HTMLElement) {
  collectValueNodes(proof).forEach((el) => {
    setValueDisplay(el, readTargetCount(el));
  });
}

function setZeroCounts(proof: HTMLElement) {
  collectValueNodes(proof).forEach((el) => {
    setValueDisplay(el, 0);
  });
}

function animateValueNode(el: HTMLElement) {
  const target = readTargetCount(el);
  const proxy = { val: 0 };
  setValueDisplay(el, 0);
  const tween = gsap.to(proxy, {
    val: target,
    duration: COUNT_DURATION,
    ease: "power2.out",
    onUpdate: () => {
      setValueDisplay(el, Math.round(proxy.val));
    },
    onComplete: () => {
      setValueDisplay(el, target);
    },
  });
  return () => {
    tween.kill();
  };
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
 * Stack Highlights cards in one centered slot so only one can read at a time.
 * Grid markup stays for stacked breakpoints; pin mode overrides with absolute.
 */
function layoutProofSpotlight(proof: HTMLElement, items: HTMLElement[]) {
  const list = proof.querySelector<HTMLElement>("[data-proof-list]");
  if (!list || items.length === 0) return;

  gsap.set(list, {
    display: "block",
    position: "relative",
    width: "100%",
    maxWidth: PROOF_CARD_MAX_WIDTH,
    marginLeft: "auto",
    marginRight: "auto",
    height: "auto",
    minHeight: 160,
  });

  items.forEach((item) => {
    gsap.set(item, {
      position: "absolute",
      left: "50%",
      xPercent: -50,
      top: 0,
      width: "100%",
      maxWidth: PROOF_CARD_MAX_WIDTH,
      margin: 0,
      height: "auto",
    });
  });

  let maxH = 160;
  items.forEach((item) => {
    maxH = Math.max(maxH, item.offsetHeight || 0);
  });
  gsap.set(list, { height: maxH, minHeight: maxH });
}

function clearProofSpotlight(proof: HTMLElement, items: HTMLElement[]) {
  const list = proof.querySelector<HTMLElement>("[data-proof-list]");
  if (list) {
    gsap.set(list, { clearProps: "all" });
  }
  if (items.length > 0) {
    gsap.set(items, { clearProps: "all" });
  }
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
  // max-w-5xl = 64rem — keep in sync with Tailwind on the scene markup.
  const contentMax = "64rem";

  gsap.set(stage, {
    position: "relative",
    height: stageH,
    minHeight: stageH,
    maxHeight: stageH,
    overflow: "hidden",
  });

  // Undo layoutAfterPin collapse (height:0 / visibility:hidden) on reverse re-entry.
  const uncollapse = {
    height: "auto",
    overflow: "visible",
    visibility: "visible",
    pointerEvents: "auto",
  };

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
    // Keep heading + cards + CTA as one cluster (not pinned to top/bottom).
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
    clearProps: "height,minHeight,maxHeight,overflow",
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
  gsap.set(pin, { clearProps: "zIndex,top" });
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

  const countCleanups: Array<(() => void) | null> = items.map(() => null);
  const counted = items.map(() => false);
  let cleanupCoverflow: (() => void) | null = null;

  const resetAllCounts = () => {
    countCleanups.forEach((fn, i) => {
      fn?.();
      countCleanups[i] = null;
      counted[i] = false;
    });
    setZeroCounts(proof);
  };

  setZeroCounts(proof);
  setHeroCtaInert(hero, false);
  setHeroVisualInteractive(visual, true);
  layoutPinnedStage(stage, hero, proof, projects);
  layoutProofSpotlight(proof, items);

  gsap.set(hero, { autoAlpha: 1 });
  gsap.set(proof, { autoAlpha: 0, y: 28, force3D: true });
  gsap.set(projects, { autoAlpha: 0, y: 100 });

  if (items.length > 0) {
    gsap.set(items, { y: 48, autoAlpha: 0, force3D: true });
  }

  if (copy) {
    gsap.set(copy, { xPercent: 0, x: 0, scale: 1, force3D: true });
  }
  if (visual) {
    gsap.set(visual, { xPercent: 0, x: 0, scale: 1, force3D: true });
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
        layoutProofSpotlight(proof, items);
        if (cards.length > 0) {
          layoutProjectTrack(projectStage, projectTrack, cards);
          fitProjectStageInPanel(projects, projectStage);
        }
        applyPinnedTop(self.pin);
        timeline.progress(self.progress);
      },
      onEnterBack: (self) => {
        layoutPinnedStage(stage, hero, proof, projects);
        layoutProofSpotlight(proof, items);
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
          layoutProofSpotlight(proof, items);
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

        if (t < PARK_UNITS) {
          if (counted.some(Boolean)) {
            resetAllCounts();
          }
          return;
        }

        for (let i = 0; i < items.length; i++) {
          const threshold = cardCountAt(i);

          if (t < threshold) {
            if (counted[i]) {
              countCleanups[i]?.();
              countCleanups[i] = null;
              counted[i] = false;
              const value = items[i].querySelector<HTMLElement>("[data-proof-value]");
              if (value) setValueDisplay(value, 0);
            }
            continue;
          }

          // Stop starting new counts once proof is exiting toward projects.
          if (t >= beat2 + 0.25) break;
          if (counted[i]) continue;

          counted[i] = true;
          const value = items[i].querySelector<HTMLElement>("[data-proof-value]");
          if (!value) continue;
          countCleanups[i]?.();
          countCleanups[i] = animateValueNode(value);
        }
      },
    },
  });

  const heroSides = [copy, visual].filter(Boolean) as HTMLElement[];

  // —— Beat 1: park hero sides (no fade), swap one Highlights card at center ——
  if (copy) {
    timeline.fromTo(
      copy,
      { xPercent: 0, x: 0, scale: 1 },
      {
        xPercent: -PARK_X_PERCENT,
        x: () => `${-PARK_X_VW}vw`,
        scale: PARK_SCALE,
        duration: PARK_UNITS,
        force3D: true,
        transformOrigin: "50% 50%",
      },
      0,
    );
  }

  if (visual) {
    timeline.fromTo(
      visual,
      { xPercent: 0, x: 0, scale: 1 },
      {
        xPercent: PARK_X_PERCENT,
        x: () => `${PARK_X_VW}vw`,
        scale: PARK_SCALE,
        duration: PARK_UNITS,
        force3D: true,
        transformOrigin: "50% 50%",
      },
      0,
    );
  }

  timeline.fromTo(
    proof,
    { y: 28, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: PARK_UNITS * 0.85, force3D: true },
    PARK_UNITS * 0.15,
  );

  const cardEnterDur = CARD_UNITS * CARD_ENTER_RATIO;
  const cardExitDur = CARD_UNITS * CARD_EXIT_RATIO;

  items.forEach((item, index) => {
    const at = cardEnterAt(index);

    timeline.fromTo(
      item,
      { y: 48, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: cardEnterDur,
        force3D: true,
      },
      at,
    );

    // Previous card leaves as the next one arrives — always one in the spotlight.
    if (index > 0) {
      timeline.to(
        items[index - 1],
        {
          y: -40,
          autoAlpha: 0,
          duration: cardExitDur,
          force3D: true,
        },
        at,
      );
    }
  });

  timeline.to({}, { duration: HOLD_UNITS }, beat1Units - HOLD_UNITS);

  // —— Beat 2: hide hero fully + Proof → Projects ——
  // Highlights park keeps copy/visual opaque; projects must clear the stage.
  // Use .to() so reverse scrub restores parked sides, then Beat 1 fromTo restores rest.
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
        xPercent: -PARK_EXIT_X_PERCENT,
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
        xPercent: PARK_EXIT_X_PERCENT,
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
      resetAllCounts();
      cleanupCoverflow?.();
      cleanupCoverflow = null;
      setHeroCtaInert(hero, false);
      setHeroVisualInteractive(visual, true);
      timeline.scrollTrigger?.kill();
      timeline.kill();
      clearProofSpotlight(proof, items);
      gsap.set(
        [stage, hero, proof, projects, ...heroSides, ...items],
        { clearProps: "all" },
      );
      setFinalCounts(proof);
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
  const countCleanups: Array<() => void> = [];
  const tweens: gsap.core.Tween[] = [];
  let projectCleanup: (() => void) | null = null;

  gsap.set([stage, hero, proof, projects, ...items], { clearProps: "all" });
  setZeroCounts(proof);
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
    const value = item.querySelector<HTMLElement>("[data-proof-value]");
    let counted = false;

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
        onEnter: () => {
          if (counted || !value) return;
          counted = true;
          countCleanups.push(animateValueNode(value));
        },
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
      countCleanups.forEach((fn) => fn());
      projectCleanup?.();
      delete projectStage.dataset.projectStage;
      setHeroCtaInert(hero, false);
      gsap.set([stage, hero, proof, projects, ...items], { clearProps: "all" });
      setFinalCounts(proof);
    },
  };
}

/**
 * Reduced motion: final visible state, full numbers.
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
  setFinalCounts(proof);

  return {
    cleanup: () => {
      setHeroCtaInert(hero, false);
    },
  };
}
