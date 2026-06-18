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
  href: NavHref;
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

export type NavHref = Route | `${Route}#${string}`;

type EnabledNavItem = {
  label: string;
  enabled: true;
  href: NavHref;
};

type DisabledNavItem = {
  label: string;
  enabled: false;
};

export type NavItem = EnabledNavItem | DisabledNavItem;

export const site = {
  name: "Shahrukh Mansuri",
  role: "Software Engineer",
  location: "Ahmedabad, India",
} as const;

export const home = {
  featuredProjects: {
    title: "Selected work",
    description: "Recent projects that highlight product thinking, implementation quality, and impact.",
    limit: 2,
  },
} as const;

export const hero = {
  greeting: `Hi, I'm ${site.name.split(" ")[0] ?? site.name}`,
  title: {
    lead: "I'm",
    highlights: ["Software"],
    tail: "Engineer.",
  },
  summary:
    "Software engineer based in India. I build reliable web applications and scalable systems with a focus on clean architecture, performance, and thoughtful user experience.",
  photo: {
    src: "/images/hero-portrait.png",
    alt: `${site.name} portrait`,
  },
  ctas: [
    { label: "View Portfolio", enabled: true, href: "/portfolio" },
    { label: "Download Resume", enabled: true, href: "/resume", variant: "outline" },
    { label: "Contact", enabled: true, href: "/contact", variant: "outline" },
  ],
} as const satisfies {
  greeting: string;
  title: {
    lead: string;
    highlights: readonly string[];
    tail: string;
  };
  summary: string;
  photo: {
    src: string;
    alt: string;
  };
  ctas: readonly HeroCta[];
};

/** Only `enabled: true` items appear in the header. */
export const navItems = [
  { href: "/", label: "Home", enabled: true },
  { href: "/about", label: "About", enabled: true },
  { href: "/portfolio", label: "Portfolio", enabled: true },
  { label: "Articles", enabled: false },
  { href: "/resume", label: "Resume", enabled: true },
  { href: "/contact", label: "Contact", enabled: true },
] satisfies NavItem[];

function getEnabledNavItems(items: readonly NavItem[]): EnabledNavItem[] {
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
    content: readonly string[];
  }[];
};

export type Article = (typeof articles.items)[number];
export type ArticleSlug = Article["slug"];

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

export const resume = {
  title: "Resume",
  summary:
    "Download the latest version of my resume or preview it in the browser.",
  file: {
    href: "/resume.pdf",
    downloadName: "Shahrukh-Mansuri-Resume.pdf",
  },
} as const;

export const contact = {
  title: "Contact",
  summary: "Get in touch for collaboration, opportunities, or technical conversations.",
  intro:
    "Use the form below for collaboration, roles, or project ideas.",
  email: {
    address: "heyshahrukh007@gmail.com",
    href: "mailto:heyshahrukh007@gmail.com",
  },
  locationMap: {
    /** Google Maps embed URL — replace via Share → Embed a map on Google Maps */
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117634.71631265804!2d72.46478645!3d23.022505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd149%3A0x4fcedd11614f9756!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1718726400000!5m2!1sen!2sin",
    externalUrl: "https://www.google.com/maps/search/?api=1&query=Ahmedabad,+Gujarat,+India",
  },
} as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/heyshahrukh007",
    icon: "github",
    enabled: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/heyshahrukh007",
    icon: "linkedin",
    enabled: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/heyshahrukh007",
    icon: "instagram",
    enabled: true,
  },
] as const;
