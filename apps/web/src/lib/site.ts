import type { Route } from "next";

import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";

type EnabledExternalHeroCta = {
  label: string;
  enabled: true;
  external: true;
  href: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
};

type EnabledInternalHeroCta = {
  label: string;
  enabled: true;
  href: Route;
  variant?: VariantProps<typeof buttonVariants>["variant"];
};

type DisabledHeroCta = {
  label: string;
  enabled: false;
};

export type HeroCta = EnabledExternalHeroCta | EnabledInternalHeroCta | DisabledHeroCta;

export type EnabledHeroCta = EnabledExternalHeroCta | EnabledInternalHeroCta;

export function isExternalHeroCta(cta: EnabledHeroCta): cta is EnabledExternalHeroCta {
  return "external" in cta;
}

type EnabledNavItem = {
  label: string;
  enabled: true;
  href: Route;
};

type DisabledNavItem = {
  label: string;
  enabled: false;
};

export type NavItem = EnabledNavItem | DisabledNavItem;

export const site = {
  name: "Shahrukh Mansuri",
  role: "Software Engineer",
  location: "India",
} as const;

export const hero = {
  headline: site.name,
  subheadline: site.role,
  summary:
    "Software engineer based in India. I build reliable web applications and scalable systems with a focus on clean architecture, performance, and thoughtful user experience.",
  ctas: [
    { label: "View Projects", enabled: true, href: "/projects" },
    { label: "Download Resume", enabled: true, href: "/resume", variant: "outline" },
    { label: "Contact", enabled: true, href: "/contact", variant: "outline" },
  ],
} as const satisfies {
  headline: string;
  subheadline: string;
  summary: string;
  ctas: readonly HeroCta[];
};

/**
 * Navigation registry aligned with FRD sections.
 * Set `enabled: true` (and add the route under `apps/web/src/app`) when a section ships;
 * enabled items appear automatically in the header.
 */
export const navItems = [
  { href: "/", label: "Home", enabled: true },
  { label: "About", enabled: false },
  { label: "Skills", enabled: false },
  { label: "Experience", enabled: false },
  { href: "/projects", label: "Projects", enabled: true },
  { label: "Architecture", enabled: false },
  { label: "Articles", enabled: false },
  { label: "Open Source", enabled: false },
  { href: "/resume", label: "Resume", enabled: true },
  { href: "/contact", label: "Contact", enabled: true },
] satisfies NavItem[];

export function getEnabledNavItems(items: readonly NavItem[]): EnabledNavItem[] {
  return items.filter((item): item is EnabledNavItem => item.enabled);
}

export const enabledNavItems = getEnabledNavItems(navItems);

export function getEnabledHeroCtas(items: readonly HeroCta[]): EnabledHeroCta[] {
  return items.filter((item): item is EnabledHeroCta => item.enabled);
}

export function getEnabledSocialLinks<T extends { enabled: boolean }>(links: readonly T[]): T[] {
  return links.filter((item) => item.enabled);
}

export const professionalHighlights = [
  { count: 5, suffix: "+", label: "Years of experience" },
  { count: 20, suffix: "+", label: "Projects delivered" },
  { count: 15, suffix: "+", label: "Technologies mastered" },
  { count: 3, label: "Domains worked in", description: "Web, APIs, and cloud systems" },
] as const satisfies readonly {
  count: number;
  suffix?: string;
  label: string;
  description?: string;
}[];

export const about = {
  title: "About",
  summary: [
    "I'm a software engineer based in India with a focus on building dependable web products—balancing clean architecture, performance, and thoughtful user experience.",
    "I work across the stack, from interfaces and APIs to deployment and observability, and I care about code that teams can maintain and extend over time.",
  ],
  yearsOfExperience: "5+ years building production web applications and backend systems.",
  expertise: [
    "Full-stack web development",
    "REST & API design",
    "TypeScript & React",
    "System architecture",
    "Performance optimization",
  ],
  strengths: [
    "Translating complex requirements into clear, maintainable solutions",
    "Writing readable, well-structured code with strong attention to detail",
    "Collaborating across design, product, and engineering",
    "Debugging and improving systems under real production constraints",
  ],
  careerHighlights: [
    "Delivered scalable web applications used in production environments",
    "Improved application performance and reliability through targeted refactoring",
    "Owned features from design through deployment and iteration",
    "Contributed to shared conventions and tooling that improved team velocity",
  ],
} as const;

export const experience = {
  title: "Experience",
  description: "Roles, responsibilities, and outcomes from my professional journey.",
  entries: [
    {
      organization: "Tech Company",
      role: "Software Engineer",
      duration: "2022 — Present",
      responsibilities: [
        "Build and maintain customer-facing web applications with TypeScript, React, and Next.js.",
        "Design REST APIs and collaborate on service boundaries with backend engineers.",
        "Participate in code reviews, sprint planning, and production incident follow-ups.",
      ],
      achievements: [
        "Improved core page load performance by refactoring data-fetching and bundle boundaries.",
        "Introduced shared UI patterns that reduced duplicate component work across features.",
        "Shipped multiple product increments from design review through production release.",
      ],
    },
    {
      organization: "Digital Solutions Ltd.",
      role: "Junior Software Engineer",
      duration: "2020 — 2022",
      responsibilities: [
        "Implemented UI features and fixed bugs across React-based product surfaces.",
        "Wrote unit and integration tests to improve release confidence.",
        "Supported API integrations and documented technical decisions for the team.",
      ],
      achievements: [
        "Delivered a major client onboarding flow that reduced manual setup steps.",
        "Helped migrate legacy modules to a modular TypeScript codebase.",
        "Contributed monitoring hooks that made production issues easier to trace.",
      ],
    },
    {
      organization: "Freelance & Personal Projects",
      role: "Full-stack Developer",
      duration: "2019 — 2020",
      responsibilities: [
        "Designed and built portfolio and small-business websites end to end.",
        "Managed deployments, hosting, and basic CI workflows for client deliverables.",
      ],
      achievements: [
        "Launched several production sites with responsive layouts and static hosting.",
        "Established reusable project templates that shortened delivery time for new work.",
      ],
    },
  ],
} as const satisfies {
  title: string;
  description: string;
  entries: readonly {
    organization: string;
    role: string;
    duration: string;
    responsibilities: readonly string[];
    achievements: readonly string[];
  }[];
};

export const skills = {
  title: "Skills",
  description: "Technologies and practices I use to design, build, and ship reliable software.",
  categories: [
    {
      name: "Frontend Development",
      description:
        "Building responsive interfaces, component systems, and polished client-side experiences.",
      skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "HTML & CSS"],
    },
    {
      name: "Backend Development",
      description: "Designing APIs and services that are secure, scalable, and easy to evolve.",
      skills: ["Node.js", "REST APIs", "API design", "Authentication", "Microservices"],
    },
    {
      name: "Databases",
      description: "Modeling data and tuning storage layers for clarity, integrity, and performance.",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Schema design", "Query optimization"],
    },
    {
      name: "Cloud Technologies",
      description: "Deploying and operating applications on managed cloud and static platforms.",
      skills: ["AWS", "Vercel", "GitHub Pages", "Static hosting", "CDN"],
    },
    {
      name: "DevOps",
      description: "Automating delivery pipelines and keeping environments reproducible.",
      skills: ["Docker", "CI/CD", "GitHub Actions", "Infrastructure as code", "Linux"],
    },
    {
      name: "Messaging Systems",
      description: "Connecting services with asynchronous and real-time communication patterns.",
      skills: ["Redis Pub/Sub", "WebSockets", "Event-driven patterns", "Queues"],
    },
    {
      name: "Monitoring & Observability",
      description: "Understanding production behavior through logs, metrics, and profiling.",
      skills: ["Logging", "Metrics", "Error tracking", "Performance profiling"],
    },
    {
      name: "Testing",
      description: "Verifying behavior at multiple levels to ship changes with confidence.",
      skills: ["Unit testing", "Integration testing", "Vitest", "Jest", "E2E testing"],
    },
  ],
} as const satisfies {
  title: string;
  description: string;
  categories: readonly { name: string; description: string; skills: readonly string[] }[];
};

export const projects = {
  title: "Projects",
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
      featured: true,
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
      featured: true,
      links: {
        source: "https://github.com/heyshahrukh007",
      },
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
      featured: false,
      links: {
        source: "https://github.com/heyshahrukh007",
      },
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
    featured: boolean;
    links?: {
      live?: string;
      source?: string;
    };
  }[];
};

export type Project = (typeof projects.items)[number];
export type ProjectSlug = Project["slug"];

export function getFeaturedProjects(items: readonly Project[]): Project[] {
  return items.filter((item) => item.featured);
}

export function getProjectRoute(slug: ProjectSlug): Route {
  return `/projects/${slug}` as Route;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.items.find((item) => item.slug === slug);
}

export const architecture = {
  title: "Architecture",
  description:
    "System design case studies covering trade-offs, deployment patterns, and lessons from production work.",
  items: [
    {
      slug: "static-portfolio-platform",
      name: "Static Portfolio Platform",
      summary:
        "A monorepo-based static portfolio architecture optimized for GitHub Pages, fast builds, and content-driven sections.",
      problem:
        "The portfolio needed zero server runtime on GitHub Pages while staying easy to extend with new sections, typed routes, and shared content modules.",
      solution:
        "Use Next.js static export from a pnpm monorepo, centralize site content in TypeScript modules, and prerender all routes at build time for CDN delivery.",
      designConsiderations: [
        "Static export compatibility for every route and dynamic slug page.",
        "Content colocated in site modules for non-developer-friendly updates later.",
        "Minimal client JavaScript with server components where possible.",
        "Design system consistency through shared section primitives.",
      ],
      lessonsLearned: [
        "generateStaticParams keeps typed dynamic routes compatible with static hosting.",
        "Shared content modules prevent layout drift as sections grow.",
        "Accessible diagram fallbacks matter when image assets are not yet available.",
      ],
      technologies: ["Next.js", "TypeScript", "pnpm", "GitHub Pages", "Tailwind CSS"],
      featured: true,
      diagram: {
        alt: "Static portfolio deployment flow from build pipeline to GitHub Pages CDN",
        caption: "Build-time export to static assets served by GitHub Pages.",
        layers: [
          {
            label: "Next.js build",
            description: "App Router static export with generateStaticParams",
          },
          {
            label: "Static output",
            description: "HTML, CSS, and JS written to apps/web/out",
          },
          {
            label: "GitHub Pages CDN",
            description: "Global delivery of prerendered portfolio pages",
          },
        ],
      },
    },
    {
      slug: "event-driven-integrations",
      name: "Event-Driven Service Integrations",
      summary:
        "An integration architecture using queues and typed workers to decouple services and handle external API failures gracefully.",
      problem:
        "Multiple services called third-party APIs directly, causing duplicated retry logic, cascading timeouts, and poor visibility into failed synchronizations.",
      solution:
        "Introduce a message-driven boundary with typed job payloads, worker consumers, dead-letter handling, and structured logging across the integration path.",
      designConsiderations: [
        "Idempotent workers to safely retry message processing.",
        "Schema validation at enqueue and dequeue boundaries.",
        "Backoff and circuit-breaking for unstable external providers.",
        "Metrics on queue depth, failure rate, and processing latency.",
      ],
      lessonsLearned: [
        "Pushing retries to the edges reduced duplicated logic in API handlers.",
        "Dead-letter queues made intermittent provider failures diagnosable.",
        "Typed payloads caught integration contract drift early in CI.",
      ],
      technologies: ["Node.js", "Redis", "Docker", "TypeScript", "REST APIs"],
      featured: true,
      diagram: {
        alt: "Event-driven integration architecture with API services, queue, and workers",
        caption: "Services publish integration jobs that workers process asynchronously.",
        layers: [
          {
            label: "API services",
            description: "Enqueue validated integration jobs",
          },
          {
            label: "Message queue",
            description: "Buffers work and supports retry policies",
          },
          {
            label: "Worker consumers",
            description: "Call external APIs with observability hooks",
          },
        ],
      },
    },
  ],
} as const satisfies {
  title: string;
  description: string;
  items: readonly {
    slug: string;
    name: string;
    summary: string;
    problem: string;
    solution: string;
    designConsiderations: readonly string[];
    lessonsLearned: readonly string[];
    technologies: readonly string[];
    featured: boolean;
    diagram: {
      alt: string;
      caption?: string;
      src?: string;
      layers?: readonly { label: string; description: string }[];
    };
  }[];
};

export type ArchitectureCaseStudy = (typeof architecture.items)[number];
export type ArchitectureSlug = ArchitectureCaseStudy["slug"];

export function getFeaturedArchitecture(
  items: readonly ArchitectureCaseStudy[],
): ArchitectureCaseStudy[] {
  return items.filter((item) => item.featured);
}

export function getArchitectureRoute(slug: ArchitectureSlug): Route {
  return `/architecture/${slug}` as Route;
}

export function getArchitectureIndexRoute(): Route {
  return "/architecture" as Route;
}

export function getArchitectureBySlug(slug: string): ArchitectureCaseStudy | undefined {
  return architecture.items.find((item) => item.slug === slug);
}

export const articles = {
  title: "Articles",
  description: "Technical writing on architecture, frontend systems, and lessons from building production software.",
  items: [
    {
      slug: "static-export-patterns",
      title: "Static Export Patterns for Content-Driven Portfolios",
      summary:
        "How to structure a Next.js static export so new sections, typed routes, and shared content stay maintainable over time.",
      publishedAt: "2025-11-12",
      publishedAtLabel: "November 2025",
      readingTimeMinutes: 6,
      tags: ["Next.js", "Architecture", "GitHub Pages"],
      featured: true,
      content: [
        "Static hosting changes the constraints you design around. There is no server to fall back on at runtime, so every route must be known—or discoverable—at build time.",
        "Centralizing navigation, metadata, and section content in typed modules keeps the UI consistent while making it obvious where to add the next feature. Pair that with generateStaticParams for dynamic segments and you retain type-safe links without sacrificing static delivery.",
        "The payoff is predictable deploys: build once, ship HTML to a CDN, and let the content model evolve without rethinking hosting on every task.",
      ],
    },
    {
      slug: "react-performance-checklist",
      title: "A Practical React Performance Checklist",
      summary:
        "A focused set of checks I use before shipping UI-heavy features, from bundle boundaries to interaction-ready metrics.",
      publishedAt: "2025-08-03",
      publishedAtLabel: "August 2025",
      readingTimeMinutes: 8,
      tags: ["React", "Performance", "Frontend"],
      featured: true,
      content: [
        "Performance work is most effective when it is tied to user-visible outcomes, not abstract benchmark scores. Start with what feels slow, measure that path, and stop when the experience is reliably good.",
        "Bundle size is only one lever. Data-fetching waterfalls, unnecessary re-renders, and layout thrash often dominate real-world pages long before raw JavaScript weight becomes the bottleneck.",
        "A short checklist—critical route metrics, component memoization where profiling proves it, and lazy boundaries for non-critical UI—prevents premature optimization while catching the issues users actually notice.",
      ],
    },
    {
      slug: "api-failure-handling",
      title: "Designing for External API Failure",
      summary:
        "Retries, timeouts, and observability patterns that keep integrations resilient when third-party services misbehave.",
      publishedAt: "2025-04-18",
      publishedAtLabel: "April 2025",
      readingTimeMinutes: 7,
      tags: ["APIs", "Architecture", "Backend"],
      featured: false,
      content: [
        "External APIs fail in boring ways: timeouts, ambiguous 5xx responses, and rate limits that only appear under load. Systems that treat those cases as exceptional tend to fail loudly in production.",
        "Clear boundaries help—validate payloads at the edge, use idempotent workers for retries, and push failure visibility into metrics instead of scattered log lines.",
        "The goal is not infinite resilience. It is predictable degradation: callers know what failed, operators can trace it, and users see honest feedback instead of silent breakage.",
      ],
    },
  ],
} as const satisfies {
  title: string;
  description: string;
  items: readonly {
    slug: string;
    title: string;
    summary: string;
    publishedAt: string;
    publishedAtLabel: string;
    readingTimeMinutes: number;
    tags: readonly string[];
    featured: boolean;
    content: readonly string[];
  }[];
};

export type Article = (typeof articles.items)[number];
export type ArticleSlug = Article["slug"];

export function getFeaturedArticles(items: readonly Article[]): Article[] {
  return items.filter((item) => item.featured);
}

export function getArticleRoute(slug: ArticleSlug): Route {
  return `/articles/${slug}` as Route;
}

export function getArticlesIndexRoute(): Route {
  return "/articles" as Route;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.items.find((item) => item.slug === slug);
}

export function getRelatedArticles(article: Article, limit = 2): Article[] {
  const articleTags = new Set<string>(article.tags);

  return articles.items
    .filter(
      (item) => item.slug !== article.slug && item.tags.some((tag) => articleTags.has(tag)),
    )
    .slice(0, limit);
}

export const openSource = {
  title: "Open Source",
  description:
    "Public repositories and community contributions that reflect how I build, collaborate, and share work.",
  profile: {
    summary:
      "I publish experiments, portfolio code, and utilities on GitHub. The profile is the best place to explore recent activity and repositories.",
    href: "https://github.com/heyshahrukh007",
  },
  items: [
    {
      name: "heyshahrukh007.github.io",
      description:
        "Personal portfolio monorepo with Next.js static export, shared content modules, and GitHub Pages deployment.",
      href: "https://github.com/heyshahrukh007/heyshahrukh007.github.io",
      topics: ["TypeScript", "Next.js", "Portfolio", "GitHub Pages"],
      kind: "repository",
    },
    {
      name: "react-component-patterns",
      description:
        "A collection of reusable React UI patterns and examples focused on composition, accessibility, and maintainable state.",
      href: "https://github.com/heyshahrukh007/react-component-patterns",
      topics: ["React", "TypeScript", "UI patterns"],
      kind: "repository",
    },
    {
      name: "Docs improvements — OSS library",
      description:
        "Contributed documentation fixes and examples to an open-source Node.js utility library used in production integrations.",
      href: "https://github.com/heyshahrukh007/node-integration-utils",
      topics: ["Documentation", "Node.js", "Community"],
      kind: "contribution",
    },
  ],
} as const satisfies {
  title: string;
  description: string;
  profile: {
    summary: string;
    href: string;
  };
  items: readonly {
    name: string;
    description: string;
    href: string;
    topics: readonly string[];
    kind: "repository" | "contribution";
  }[];
};

export type OpenSourceItem = (typeof openSource.items)[number];

export const resume = {
  title: "Resume",
  summary:
    "Download the latest version of my resume or preview it in the browser.",
  overview:
    "The resume covers software engineering experience, project delivery, technical skills, and the kinds of product and platform problems I have helped teams solve.",
  lastUpdated: "June 2025",
  highlights: [
    "Software engineer with 5+ years of experience building production web applications.",
    "Full-stack background across TypeScript, React, Next.js, APIs, and static deployment workflows.",
    "Focused on maintainable architecture, performance, and clear collaboration with product teams.",
  ],
  file: {
    href: "/resume.pdf",
    downloadName: "Shahrukh-Mansuri-Resume.pdf",
  },
} as const;

export const contact = {
  title: "Contact",
  summary: "Get in touch for collaboration, opportunities, or technical conversations.",
  intro:
    "I'm open to discussing software engineering roles, freelance work, and interesting product ideas. Email is the fastest way to reach me.",
  email: {
    address: "heyshahrukh007@gmail.com",
    href: "mailto:heyshahrukh007@gmail.com",
  },
} as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/heyshahrukh007",
    enabled: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    enabled: false,
  },
] as const;
