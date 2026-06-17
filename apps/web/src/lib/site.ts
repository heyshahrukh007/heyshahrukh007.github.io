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
