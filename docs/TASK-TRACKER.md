# TASK-TRACKER.md

| Task ID  | Task                      | Status | Priority |
| -------- | ------------------------- | ------ | -------- |
| TASK-001 | Repository Setup          | DONE   | High     |
| TASK-002 | Global Layout             | DONE   | High     |
| TASK-003 | Hero Section              | DONE   | High     |
| TASK-004 | Professional Highlights   | DONE   | Medium   |
| TASK-005 | About Section             | DONE   | Medium   |
| TASK-006 | Skills Section            | DONE   | Medium   |
| TASK-007 | Experience Timeline       | DONE   | High     |
| TASK-008 | Projects Section          | DONE   | High     |
| TASK-009 | Project Details Component | DONE   | Medium   |
| TASK-010 | Architecture Section      | DONE   | High     |
| TASK-011 | Articles Section          | DONE   | Medium   |
| TASK-012 | Open Source Section       | DEFERRED | Medium   |
| TASK-013 | Resume Section            | DONE   | Medium   |
| TASK-014 | Contact Section           | DONE   | High     |
| TASK-015 | Responsive Design         | DONE   | High     |
| TASK-016 | Accessibility Review      | DONE   | Medium   |
| TASK-017 | SEO Setup                 | DONE   | Medium   |
| TASK-018 | Production Readiness      | DONE   | High     |
| TASK-019 | ScrollReveal Accessibility Fix | DONE | Critical |
| TASK-020 | Theme Hydration FOUC Fix  | DONE   | High     |
| TASK-021 | Route Motion Regression Fix | DONE | High     |
| TASK-022 | CI Link Validation Hardening | DONE | High     |
| TASK-023 | Nav Active Indicator Fix  | DONE   | High     |
| TASK-024 | Home GSAP Parallax        | DONE   | Medium   |
| TASK-025 | Home Projects Scroll Story | DONE   | High     |
| TASK-026 | Home Intro Hero→Proof→Projects | DONE   | High     |
| TASK-027 | Media Aspect Ratio System | DONE   | Medium   |

## TASK-027 — Media Aspect Ratio System

Theme tokens `--aspect-portrait` (4∶5) and `--aspect-media` (16∶9); portrait + project thumbnails use them; removed `max-h-*` on aspect boxes; TECH.md documents masters + OG 1200×630.

## TASK-026 — Home Intro Hero→Proof→Projects

Single home story scene (`home-intro-scene`, `proof-stats`, `use-home-intro-scroll`, `home-intro-timeline`). Desktop pins Hero→Proof→Projects scrub under header (same handoff language between beats), then nested coverflow; tablet/mobile/short viewports stacked reveal + GSAP counts with separate projects pin/stack; reduced-motion static. Replaces separate hero parallax + professional highlights + rAF count-up + standalone home `ProjectSection` pin.

## TASK-025 — Home Projects Scroll Story

Coverflow primitives live in `project-timeline.ts` (`attachProjectCoverflow`, layout helpers). On home they nest inside TASK-026’s pin; stacked breakpoints still use `createProjectScrollTimeline` for tablet+. `/portfolio` list unchanged.

## Review backlog (Critical & High)

Sourced from post–TASK-018 code review (`96fa816…HEAD`).

### TASK-019 — ScrollReveal Accessibility Fix (Critical)

- `scroll-reveal.tsx`: content starts `opacity: 0` before hydration; invisible without JS
- `index.css`: `prefers-reduced-motion` does not reset `.motion-scroll-reveal-pending`
- `about/page.tsx`: `#contact` hash target can scroll to a hidden `ContactSection`

### TASK-020 — Theme Hydration FOUC Fix (High)

- `layout.tsx` / `providers.tsx`: removed default `class="dark"`; theme applies after hydration → light flash for dark-default users

### TASK-021 — Route Motion Regression Fix (High)

- `template.tsx` + detail pages: stacked `motion-page-enter` and full-page `ScrollReveal` causes double fade and delayed above-the-fold content on route load

### TASK-022 — CI Link Validation Hardening (High)

- `validate-links.mts`: HEAD-only checks fail on some hosts; sequential 10s timeouts; network flakiness can block deploy

### TASK-023 — Nav Active Indicator Fix (High)

- `header-nav.tsx`: stale indicator when active link ref is missing; `reduceMotion` default causes active-tab style flash on mount

## Status Legend

* TODO
* IN_PROGRESS
* BLOCKED
* REVIEW
* DONE
* DEFERRED — scoped out of current release; may return later
