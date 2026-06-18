import type { Route } from "next";

import { home } from "@/lib/content/site";

export const projects = {
  title: "Portfolio",
  description: "Selected work highlighting product thinking, implementation quality, and measurable impact.",
  items: [
    {
      slug: "personal-portfolio",
      name: "Personal Portfolio",
      summary:
        "A static Next.js portfolio deployed to GitHub Pages, built for performance, clarity, and easy content updates.",
      objectives: [
        "Present professional background and project work in a clear, accessible layout.",
        "Ship a fast static site with a maintainable monorepo and content-driven sections.",
      ],
      contributions: [
        "Designed the information architecture and section flow aligned with portfolio UX references.",
        "Implemented static export, shared content modules, and reusable UI primitives.",
        "Set up monorepo tooling with pnpm and production build verification for GitHub Pages.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "pnpm", "GitHub Pages"],
      role: "Designer & full-stack developer",
      links: {
        live: "https://heyshahrukh007.github.io",
        source: "https://github.com/heyshahrukh007/heyshahrukh007.github.io",
      },
    },
    {
      slug: "client-dashboard",
      name: "Client Operations Dashboard",
      summary:
        "An internal dashboard for tracking onboarding status, account health, and support workflows across teams.",
      objectives: [
        "Reduce manual status checks for customer operations staff.",
        "Surface actionable metrics with filters and role-based views.",
      ],
      contributions: [
        "Led frontend architecture for dashboard views, filters, and shared table components.",
        "Partnered with backend engineers on API contracts and optimistic UI updates.",
        "Improved list rendering performance for large account datasets.",
      ],
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs"],
      role: "Frontend lead",
    },
    {
      slug: "api-integration-toolkit",
      name: "API Integration Toolkit",
      summary:
        "A reusable toolkit for connecting third-party services with typed clients, retries, and structured logging.",
      objectives: [
        "Standardize integration patterns across services.",
        "Improve observability and failure handling for external API calls.",
      ],
      contributions: [
        "Built typed HTTP clients with retry, timeout, and structured error surfaces.",
        "Added logging hooks and examples for service teams adopting the toolkit.",
        "Documented integration patterns and CI workflows for package releases.",
      ],
      technologies: ["TypeScript", "Node.js", "Redis", "Docker", "GitHub Actions"],
      role: "Backend contributor",
    },
  ],
} as const satisfies {
  title: string;
  description: string;
  items: readonly {
    slug: string;
    name: string;
    summary: string;
    objectives: readonly string[];
    contributions: readonly string[];
    technologies: readonly string[];
    role: string;
    links?: {
      live?: string;
      source?: string;
    };
  }[];
};

export type Project = (typeof projects.items)[number];
export type ProjectSlug = Project["slug"];

export function getProjectRoute(slug: ProjectSlug): Route {
  return `/portfolio/${slug}` as Route;
}

export function getPortfolioIndexRoute(): Route {
  return "/portfolio" as Route;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.items.find((item) => item.slug === slug);
}

export function getFeaturedProjects(limit = home.featuredProjects.limit) {
  return projects.items.slice(0, limit);
}
