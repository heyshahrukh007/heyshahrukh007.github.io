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

export type { EnabledNavItem };
