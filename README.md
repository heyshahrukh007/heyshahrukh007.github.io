# heyshahrukh007.github.io

Personal portfolio website for **Shahrukh Mansuri**, built as a static Next.js app and deployed to [GitHub Pages](https://heyshahrukh007.github.io).

> **Status:** Under construction — the live site shows a landing page while portfolio sections are being built.

## Tech Stack

- **TypeScript** — Monorepo with pnpm + Turborepo
- **Next.js 16** — App Router, static export (`output: "export"`)
- **React 19** — React Compiler enabled
- **Tailwind CSS 4** — Styling and design tokens
- **shadcn/ui** — UI components (radix-luma style)

## Documentation

| Document | Description |
|----------|-------------|
| [docs/FRD.md](docs/FRD.md) | Functional requirements — what the site must do |
| [docs/TECH.md](docs/TECH.md) | Technical design — architecture, deployment, conventions |

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev:web
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm dev:web` | Start only the web app (port 3000) |
| `pnpm build` | Build static export to `apps/web/out` |
| `pnpm check-types` | Run TypeScript checks across the workspace |

## Project Structure

```
heyshahrukh007.github.io/
├── apps/
│   └── web/              # Next.js portfolio app
├── packages/
│   ├── config/           # Shared TypeScript config
│   └── env/              # Typed environment validation
├── docs/
│   ├── FRD.md            # Functional requirements
│   └── TECH.md           # Technical design
└── .github/workflows/
    └── deploy-pages.yml  # GitHub Pages deployment
```

## Deployment

The site is deployed to GitHub Pages via GitHub Actions (manual trigger).

1. Ensure **Settings → Pages → Source** is set to **GitHub Actions**
2. Go to **Actions → Deploy to GitHub Pages → Run workflow**

The build outputs static files from `apps/web/out` to `https://heyshahrukh007.github.io`.

## License

Private project.
