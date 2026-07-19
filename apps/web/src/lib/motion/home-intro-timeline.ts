import { gsap } from "@/lib/gsap";
import {
  attachProjectCoverflow,
  createProjectScrollTimeline,
  getProjectScrollLength,
  layoutProjectTrack,
} from "@/lib/motion/project-timeline";

/**
 * Home story (Hero → Proof → Projects) timelines.
 *
 * Desktop: one pin; scrub handoffs on an inner stage, then nested coverflow.
 * Stacked breakpoints: reveal + count once; projects pin/stack separately.
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

function animateAllCounts(proof: HTMLElement) {
  const cleanups = collectValueNodes(proof).map((el) => animateValueNode(el));
  return () => {
    cleanups.forEach((fn) => fn());
  };
}

function setHeroCtaInert(hero: HTMLElement, inert: boolean) {
  const ctas = hero.querySelector<HTMLElement>("[data-intro-ctas]");
  if (!ctas) return;
  ctas.toggleAttribute("inert", inert);
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
  const stageH = Math.max(480, window.innerHeight - getPinTop());
  // max-w-5xl = 64rem — keep in sync with Tailwind on the scene markup.
  const contentMax = "64rem";

  gsap.set(stage, {
    position: "relative",
    height: stageH,
    minHeight: stageH,
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
    top: "50%",
    yPercent: -50,
    width: "100%",
    maxWidth: contentMax,
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
    justifyContent: "space-between",
    gap: 0,
    zIndex: 3,
  });
}

/** Keep coverflow within the projects panel so the portfolio link stays on-screen. */
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
  // Match gap-6 / sm:gap-8 between heading, stage, and link (2 gaps).
  const gap = window.innerWidth >= 640 ? 32 : 24;
  const available = Math.max(200, panelH - used - gap * 2);
  const current = projectStage.offsetHeight || available;
  const nextH = Math.min(current, available);

  gsap.set(projectStage, {
    height: nextH,
    minHeight: nextH,
    maxHeight: available,
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
    clearProps: "height,minHeight,overflow",
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

  let killCounts: (() => void) | null = null;
  let countsFired = false;
  let cleanupCoverflow: (() => void) | null = null;

  setZeroCounts(proof);
  setHeroCtaInert(hero, false);
  layoutPinnedStage(stage, hero, proof, projects);

  gsap.set(proof, { autoAlpha: 0, y: 100 });
  gsap.set(projects, { autoAlpha: 0, y: 100 });

  if (items.length > 0) {
    gsap.set(items, { y: 20 });
  }

  if (cards.length > 0) {
    layoutProjectTrack(projectStage, projectTrack, cards);
    fitProjectStageInPanel(projects, projectStage);
  }

  const coverflowUnits = Math.max(1, cards.length - 1);
  const totalUnits = HANDOFF_UNITS * 2 + coverflowUnits;

  const scrollLength = () => {
    const handoff =
      window.innerHeight * (HANDOFF_VH / 100) * HANDOFF_UNITS * 2;
    const coverflow = getProjectScrollLength(
      Math.max(1, cards.length),
      segmentVhForViewport(),
    );
    return handoff + coverflow;
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
                const coverStart = (HANDOFF_UNITS * 2) / totalUnits;
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
        if (cards.length > 0) {
          layoutProjectTrack(projectStage, projectTrack, cards);
          fitProjectStageInPanel(projects, projectStage);
        }
        applyPinnedTop(self.pin);
        timeline.progress(self.progress);
      },
      onEnterBack: (self) => {
        layoutPinnedStage(stage, hero, proof, projects);
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
        clearIntroPinChrome(pin);
      },
      onLeaveBack: () => {
        clearIntroPinChrome(pin);
      },
      onRefresh: (self) => {
        if (self.progress >= 1 && !self.isActive) {
          layoutAfterPin(stage, hero, proof, projects);
          clearIntroPinChrome(pin);
        } else {
          layoutPinnedStage(stage, hero, proof, projects);
          if (cards.length > 0) {
            layoutProjectTrack(projectStage, projectTrack, cards);
            fitProjectStageInPanel(projects, projectStage);
          }
          if (self.isActive) {
            applyPinnedTop(self.pin);
          }
        }
      },
      onUpdate: (self) => {
        const t = timeline.time();
        const proofIn = t >= 0.4 && t < HANDOFF_UNITS + 0.35;
        const projectsFocused = t >= HANDOFF_UNITS + 0.4;

        setHeroCtaInert(hero, proofIn || projectsFocused);

        if (t >= 0.5 && t < HANDOFF_UNITS + 0.25 && !countsFired) {
          countsFired = true;
          killCounts?.();
          killCounts = animateAllCounts(proof);
        }

        if (t < 0.35 && countsFired) {
          countsFired = false;
          killCounts?.();
          killCounts = null;
          setZeroCounts(proof);
        }
      },
    },
  });

  const heroTargets = [copy, visual].filter(Boolean) as HTMLElement[];
  const beat2 = HANDOFF_UNITS;

  // —— Beat 1: Hero → Proof ——
  timeline.fromTo(
    hero,
    { y: 0, scale: 1, autoAlpha: 1 },
    {
      y: -80,
      scale: 0.92,
      autoAlpha: 0,
      duration: 0.55,
      transformOrigin: "50% 40%",
    },
    0,
  );

  if (heroTargets.length > 0) {
    timeline.fromTo(
      heroTargets,
      { y: 0 },
      { y: -20, duration: 0.45 },
      0,
    );
  }

  timeline.fromTo(
    proof,
    { y: 120, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.5 },
    0.18,
  );

  if (items.length > 0) {
    timeline.fromTo(
      items,
      { y: 20 },
      { y: 0, duration: 0.35, stagger: 0.08 },
      0.28,
    );
  }

  timeline.to({}, { duration: 0.15 }, HANDOFF_UNITS - 0.15);

  // —— Beat 2: Proof → Projects (same handoff language) ——
  // Use .to() (not a second fromTo) so reverse scrub restores proof cleanly.
  timeline.to(
    proof,
    {
      y: -80,
      scale: 0.92,
      autoAlpha: 0,
      duration: 0.55,
      transformOrigin: "50% 40%",
    },
    beat2,
  );

  if (items.length > 0) {
    timeline.to(items, { y: -16, duration: 0.4 }, beat2);
  }

  timeline.fromTo(
    projects,
    { y: 120, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.5 },
    beat2 + 0.18,
  );

  timeline.to({}, { duration: 0.15 }, beat2 + HANDOFF_UNITS - 0.15);

  // —— Beat 3: horizontal coverflow ——
  if (cards.length > 0) {
    cleanupCoverflow = attachProjectCoverflow(
      timeline,
      projectStage,
      projectTrack,
      cards,
      beat2 + HANDOFF_UNITS,
      coverflowUnits,
    );
  } else {
    timeline.to({}, { duration: coverflowUnits }, beat2 + HANDOFF_UNITS);
  }

  return {
    cleanup: () => {
      killCounts?.();
      killCounts = null;
      cleanupCoverflow?.();
      cleanupCoverflow = null;
      setHeroCtaInert(hero, false);
      timeline.scrollTrigger?.kill();
      timeline.kill();
      gsap.set(
        [stage, hero, proof, projects, ...heroTargets, ...items],
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
