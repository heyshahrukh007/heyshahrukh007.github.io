import { ExternalLink } from "@/components/external-link";
import { socialIconComponents } from "@/components/social-icons";
import { getEnabledSocialLinks, socialLinks } from "@/lib/site";
import { textLinkClassName } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  excludeHrefs?: readonly string[];
  variant?: "text" | "icons";
};

export function SocialLinks({ className, excludeHrefs = [], variant = "text" }: SocialLinksProps) {
  const enabledSocial = getEnabledSocialLinks(socialLinks).filter(
    (item) => !excludeHrefs.includes(item.href),
  );

  if (enabledSocial.length === 0) {
    return null;
  }

  if (variant === "icons") {
    return (
      <nav
        aria-label="Social profiles"
        className={cn("flex flex-wrap items-center gap-2", className)}
      >
        {enabledSocial.map((item) => {
          const Icon = socialIconComponents[item.icon];

          return (
            <ExternalLink
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "motion-interactive inline-flex size-9 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:border-border hover:bg-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              )}
            >
              <Icon className="size-4" />
            </ExternalLink>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Social profiles" className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {enabledSocial.map((item) => (
        <ExternalLink key={item.label} href={item.href} className={cn("text-sm", textLinkClassName)}>
          {item.label}
        </ExternalLink>
      ))}
    </nav>
  );
}
