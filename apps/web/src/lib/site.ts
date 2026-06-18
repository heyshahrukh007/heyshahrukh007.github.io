export {
  about,
  hero,
  home,
  professionalHighlights,
  site,
} from "@/lib/content/site";

export {
  enabledNavItems,
  getEnabledHeroCtas,
  getEnabledSocialLinks,
  navItems,
} from "@/lib/content/navigation";

export {
  getFeaturedProjects,
  getPortfolioIndexRoute,
  getProjectBySlug,
  getProjectRoute,
  projects,
} from "@/lib/content/portfolio";

export { experience, resume, skills } from "@/lib/content/resume";

export { contact, socialLinks } from "@/lib/content/contact";

export type {
  EnabledHeroCta,
  HeroCta,
  NavHref,
  NavItem,
} from "@/types/navigation";

export type { Project, ProjectSlug } from "@/types/portfolio";

export { isExternalHeroCta } from "@/types/navigation";
