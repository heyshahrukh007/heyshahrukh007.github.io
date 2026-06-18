# heyshahrukh007.github.io

This file provides context about the project for AI assistants.

## Project Overview

- **Ecosystem**: Typescript

## Tech Stack

- **Runtime**: none
- **Package Manager**: pnpm

### Frontend

- Framework: next
- CSS: tailwind
- UI Library: shadcn-ui

## Project Structure

```
heyshahrukh007.github.io/
├── apps/
│   └── web/         # Next.js portfolio (static export)
├── packages/        # env, shared TS config
└── docs/            # FRD, TASKS, TECH, TASK-TRACKER
```

### Site map (current)

| Page | Path |
|------|------|
| Home | `/` — hero, highlights, About summary |
| About | `/about` |
| Portfolio | `/portfolio`, `/portfolio/[slug]` |
| Contact | `/contact` |
| Resume + Experience + Skills | `/resume` |

## Common Commands

- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server
- `pnpm build` - Build for production

## Feature Development References

When an AI assistant develops or updates any feature, it must reference:

- `docs/FRD.md` for feature requirements and product behavior
- `docs/TASKS.md` for requirements and implementation scope
- `docs/TASK-TRACKER.md` for task status and progress tracking
- `docs/TECH.md` for technical conventions and UI design reference

### UI design reference

For layout, section structure, and UX, follow [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) as documented in `docs/TECH.md` §10.

## Maintenance

Keep CLAUDE.md updated when:

- Adding/removing dependencies
- Changing project structure
- Adding new features or services
- Modifying build/dev workflows

AI assistants should suggest updates to this file when they notice relevant changes.
