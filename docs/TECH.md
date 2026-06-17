# Personal Portfolio Website

## Technical Design Document

| Field | Value |
|-------|-------|
| Project Name | Personal Portfolio Website |
| Owner | Shahrukh Mansuri |
| Version | 1.0 |
| Document Type | Technical Design Document |
| Related | [FRD.md](./FRD.md) |

---

## 1. Overview

This document describes **how** the portfolio site is built. The [FRD](./FRD.md) defines **what** the site must do.

The site is a **static** personal portfolio deployed to **GitHub Pages** at `https://heyshahrukh007.github.io`. There is no backend server at runtime.

### CRITICAL: DRY (Don't Repeat Yourself)

All feature work **must** follow the DRY principle.

- Extract shared config, types, and constants once (e.g. `apps/web/src/lib/site.ts`)
- Reuse existing components and utilities before creating new ones
- Centralize navigation, profile data, social links, and section metadata in shared modules
- Avoid duplicating layout, styling, or markup patterns across pages
- When the same logic or UI appears more than once, refactor into a reusable helper or component

AI assistants and developers implementing tasks must check for existing abstractions before adding new code.

---

## 2. Tech Stack

### Monorepo

| Layer | Technology |
|-------|------------|
| Language | TypeScript |
| Package manager | pnpm 11.3.0 |
| Monorepo orchestration | Turborepo |
| Workspace layout | `apps/web` + `packages/*` |

### Frontend (`apps/web`)

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui (radix-luma style) |
| Primitives | Radix UI, Base UI |
| Icons | Lucide React |
| Fonts | Inter Variable, Geist (Google Fonts) |
| Animations | tw-animate-css + custom CSS keyframes |
| Theming | Dark mode only via `html.dark` |
| Toasts | Sonner |
| Forms (planned) | TanStack React Form |
| Validation | Zod |
| Compiler | React Compiler |

### Shared packages

| Package | Purpose |
|---------|---------|
| `@heyshahrukh007.github.io/env` | Environment validation via `@t3-oss/env-nextjs` + Zod |
| `@heyshahrukh007.github.io/config` | Shared TypeScript config |

---

## 3. Architecture Constraints

GitHub Pages serves **static files only**. The app must be built as a static export.

### Enabled in Next.js

```ts
// apps/web/next.config.ts
output: "export"
typedRoutes: true
reactCompiler: true
images: { unoptimized: true }
```

### Implications

| Feature | Supported? |
|---------|------------|
| Static pages | Yes |
| Client components | Yes |
| API routes | No |
| Server Actions | No |
| ISR / SSR at request time | No |
| Middleware | No |
| `next/image` optimization | No (uses `unoptimized: true`) |

Content must be available at **build time** (local files, MDX, or fetched during CI build).

---

## 4. Project Structure

```
heyshahrukh007.github.io/
├── apps/
│   └── web/                    # Next.js portfolio app
│       ├── src/
│       │   ├── app/            # App Router pages & layouts
│       │   ├── components/     # UI and page components
│       │   ├── lib/            # Utilities (e.g. cn())
│       │   └── index.css       # Global styles & theme tokens
│       ├── next.config.ts
│       └── package.json
├── packages/
│   ├── config/                 # Shared TS config
│   └── env/                    # Typed env validation
├── docs/
│   ├── FRD.md                  # Functional requirements
│   └── TECH.md                 # This document
├── .github/workflows/
│   └── deploy-pages.yml        # GitHub Pages deployment
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

### Path aliases (`apps/web`)

| Alias | Path |
|-------|------|
| `@/*` | `./src/*` |

---

## 5. Current Implementation

| Area | Status |
|------|--------|
| Global layout | Header, main content area, and footer implemented |
| Navigation | Enabled routes: Home, Projects, Resume, Contact |
| Home page | Hero section with headline, summary, FRD CTAs, and social links |
| Theme | Dark mode only, forced |
| Design reference | [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) UX patterns |
| FRD sections | Hero live; Projects, Resume, Contact are route stubs pending full tasks |

---

## 6. Planned Routes

Aligned with [FRD navigation](./FRD.md#6-navigation-requirements):

| Route | Section | Status |
|-------|---------|--------|
| `/` | Home | Hero section live |
| `/about` | About | Planned |
| `/skills` | Skills | Planned |
| `/experience` | Experience | Planned |
| `/projects` | Projects | Stub page (TASK-008) |
| `/architecture` | Architecture showcase | Planned |
| `/articles` | Technical articles | Planned |
| `/open-source` | Open source | Planned |
| `/resume` | Resume | Stub page (TASK-013) |
| `/contact` | Contact | Stub page (TASK-014) |

Article and project detail pages (e.g. `/articles/[slug]`, `/projects/[slug]`) will use static generation with `generateStaticParams`.

---

## 7. Content Model (Proposed)

Recommended approach for a static GitHub Pages site:

```
apps/web/
├── content/
│   ├── projects/*.mdx
│   ├── articles/*.mdx
│   ├── architecture/*.mdx
│   └── data/
│       ├── experience.json
│       ├── skills.json
│       └── profile.json
└── public/
    ├── resume.pdf
    └── images/
```

| Content type | Format | Rationale |
|--------------|--------|-----------|
| Long-form (articles, case studies) | MDX | Author in repo, version-controlled, no CMS cost |
| Structured lists (skills, experience) | JSON or TS | Simple to render, easy to update |
| Resume | PDF in `public/` | Direct download link |
| Images | `public/` or co-located in content | Static asset serving |

**Decision status:** Not finalized. Alternatives include a headless CMS (Sanity, Contentful) if non-developer editing is needed later.

---

## 8. Deployment

### Hosting

- **Platform:** GitHub Pages (user site)
- **URL:** `https://heyshahrukh007.github.io`
- **Source:** GitHub Actions (not branch deploy)

### Build output

`pnpm build` → `apps/web/out/` (static HTML, CSS, JS)

### CI workflow

File: [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml)

1. Trigger: manual (`workflow_dispatch`)
2. `pnpm install --frozen-lockfile`
3. `pnpm build`
4. Upload `apps/web/out` as Pages artifact
5. Deploy via `actions/deploy-pages@v5`

### pnpm build scripts

`sharp` is approved in [`pnpm-workspace.yaml`](../pnpm-workspace.yaml) under `allowBuilds` (required for CI install on pnpm 11).

### One-time GitHub setup

1. **Settings → Pages → Source:** GitHub Actions
2. Run workflow from **Actions → Deploy to GitHub Pages**

---

## 9. Local Development

```bash
pnpm install
pnpm dev          # all apps (turbo)
pnpm dev:web      # web only → http://localhost:3000
pnpm build        # production static export
pnpm check-types  # TypeScript across workspace
```

Verify static output:

```bash
pnpm build
# output: apps/web/out/index.html
```

---

## 10. Styling & UI Conventions

- **Design tokens:** CSS variables in `apps/web/src/index.css` (`:root` / `.dark`)
- **Component style:** shadcn/ui with `radix-luma` preset
- **Utility helper:** `cn()` from `@/lib/utils`
- **Responsive:** Mobile-first Tailwind breakpoints
- **Accessibility:** Semantic HTML, `prefers-reduced-motion` on custom animations

### Design reference

When implementing UI sections (hero, about, work/projects, blog, gallery, contact, etc.), use [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) as the UX and layout reference. Live demo: [demo.magic-portfolio.com](https://demo.magic-portfolio.com).

| Reference area | What to borrow |
|----------------|----------------|
| Home | Clean hero, concise intro, clear primary actions |
| About / CV | Structured profile summary and professional details |
| Work / Projects | Project listing and detail page patterns |
| Blog / Articles | Article listing and reading layout |
| Gallery | Optional media showcase section |
| Overall | Simple, timeless portfolio UX; responsive layout; minimal motion; clear section hierarchy |

Adapt patterns to this stack (Next.js + Tailwind + shadcn/ui). Do not copy Once UI components directly; match UX intent and presentation.

---

## 11. Environment Variables

Managed via `@heyshahrukh007.github.io/env` with Zod validation. Currently minimal (no secrets required for static portfolio).

Add variables to `packages/env` when needed (e.g. analytics ID, form endpoint URL). Client-exposed vars must use the `NEXT_PUBLIC_` prefix.

---

## 12. Open Decisions

| Topic | Options | Notes |
|-------|---------|-------|
| Content format | MDX vs JSON vs CMS | MDX recommended for static deploy |
| Contact form | Static links only vs Formspree/Resend | No backend on GitHub Pages |
| Navigation | Multi-page nav with enabled routes only | Header shows implemented routes; more appear as sections ship |
| Light mode | Re-enable theme toggle | Dark-only for now; `html` uses `class="dark"` |
| SEO | sitemap.xml, robots.txt, OG images | Add at build time |
| Analytics | Plausible, GA, Vercel Analytics | Client-side only |

---

## 13. Out of Scope (Current Phase)

- Backend API or database
- Authentication
- CMS admin UI
- Server-side search
- Dynamic contact form without third-party service

---

## 14. References

- [Functional Requirements (FRD)](./FRD.md)
- [Magic Portfolio — UX reference](https://github.com/once-ui-system/magic-portfolio)
- [Magic Portfolio demo](https://demo.magic-portfolio.com)
- [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)
