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
