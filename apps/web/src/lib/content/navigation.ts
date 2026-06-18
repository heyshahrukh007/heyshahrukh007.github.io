import type { EnabledHeroCta, EnabledNavItem, HeroCta, NavItem } from "@/types/navigation";

/** Only `enabled: true` items appear in the header. */
export const navItems = [
  { href: "/", label: "Home", enabled: true },
  { href: "/about", label: "About", enabled: true },
  { href: "/portfolio", label: "Portfolio", enabled: true },
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
