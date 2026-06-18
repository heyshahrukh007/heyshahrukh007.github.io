import type { HeroCta } from "@/types/navigation";

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
  developerSnippet: {
    variableName: "developer",
    name: site.name,
    role: site.role,
    skills: ["TypeScript", "React", "Next.js", "Node.js"],
    passion: "Building scalable solutions",
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
  developerSnippet: {
    variableName: string;
    name: string;
    role: string;
    skills: readonly string[];
    passion: string;
  };
  ctas: readonly HeroCta[];
};

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
  photo: {
    src: "/images/about-portrait.png",
    alt: `${site.name} portrait`,
  },
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
