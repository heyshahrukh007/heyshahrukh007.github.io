import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";
import { articles, projects } from "@/lib/site";

export const dynamic = "force-static";

const staticPaths = ["/", "/about", "/portfolio", "/resume", "/contact", "/articles"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
  }));

  const projectRoutes = projects.items.map((item) => ({
    url: absoluteUrl(`/portfolio/${item.slug}`),
    lastModified,
  }));

  const articleRoutes = articles.items.map((item) => ({
    url: absoluteUrl(`/articles/${item.slug}`),
    lastModified,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
