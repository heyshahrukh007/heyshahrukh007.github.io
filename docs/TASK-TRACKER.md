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
| TASK-019 | ScrollReveal Accessibility Fix | TODO | Critical |
| TASK-020 | Theme Hydration FOUC Fix  | TODO   | High     |
| TASK-021 | Route Motion Regression Fix | TODO | High     |
| TASK-022 | CI Link Validation Hardening | TODO | High     |
| TASK-023 | Nav Active Indicator Fix  | TODO   | High     |

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
