import Link from "next/link";

import { getInitials } from "@/lib/initials";
import { contact, site } from "@/lib/site";
import { textLinkClassName } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  const initials = getInitials(site.name);

  return (
    <div
      className={cn(
        "flex w-fit max-w-full items-center gap-3",
        "mx-auto md:mx-0 md:min-w-0",
        className,
      )}
    >
      <Link
        href="/"
        aria-label={`${site.name} — home`}
        className="motion-interactive relative flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold tracking-tight text-primary ring-1 ring-primary/20 transition-all hover:bg-primary/15 hover:ring-primary/35"
      >
        <span className="text-[0.7rem] leading-none">{initials}</span>
      </Link>
      <div className="flex min-w-0 flex-col gap-0.5">
        <Link
          href="/"
          className="truncate text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {site.name}
        </Link>
        <a
          href={contact.email.href}
          className={cn("truncate text-xs text-muted-foreground", textLinkClassName)}
        >
          {contact.email.address}
        </a>
      </div>
    </div>
  );
}
