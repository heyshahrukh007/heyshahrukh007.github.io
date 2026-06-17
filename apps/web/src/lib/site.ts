import type { Route } from "next";

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
  { label: "Projects", enabled: false },
  { label: "Architecture", enabled: false },
  { label: "Articles", enabled: false },
  { label: "Open Source", enabled: false },
  { label: "Resume", enabled: false },
  { label: "Contact", enabled: false },
] satisfies NavItem[];

export function getEnabledNavItems(items: readonly NavItem[]): EnabledNavItem[] {
  return items.filter((item): item is EnabledNavItem => item.enabled);
}

export const enabledNavItems = getEnabledNavItems(navItems);

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
