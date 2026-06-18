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

export const resume = {
  title: "Resume",
  summary:
    "Download the latest version of my resume or preview it in the browser.",
  file: {
    href: "/resume.pdf",
    downloadName: "Shahrukh-Mansuri-Resume.pdf",
  },
} as const;
