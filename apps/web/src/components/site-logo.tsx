import Link from "next/link";

import { getInitials } from "@/lib/initials";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  const initials = getInitials(site.name);

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("group motion-interactive inline-flex min-w-0 items-center gap-2.5", className)}
    >
      <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-background text-xs font-semibold tracking-tight text-primary shadow-sm transition-colors group-hover:border-primary/40">
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-br from-primary/15 via-transparent to-primary/5"
        />
        <span className="relative">{initials}</span>
      </span>
      <span className="hidden truncate text-sm font-medium tracking-tight text-foreground transition-colors group-hover:text-primary md:inline">
        {site.name}
      </span>
    </Link>
  );
}
