import type { Metadata } from "next";

import { hero, site } from "@/lib/site";

export const siteUrl = "https://heyshahrukh007.github.io";

export const defaultDescription = hero.summary;

export const defaultTitle = `${site.name} — ${site.role}`;

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: `/${string}` | "/";
};

export function absoluteUrl(path: string = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, siteUrl).toString();
}

export function createPageMetadata({
  title,
  description = defaultDescription,
  path = "/",
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ?? defaultTitle;
  const url = absoluteUrl(path);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: site.name,
      title: pageTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};
