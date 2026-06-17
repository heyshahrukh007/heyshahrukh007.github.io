import { ExternalLink } from "@/components/external-link";
import { getEnabledSocialLinks, socialLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  excludeHrefs?: readonly string[];
};

export function SocialLinks({ className, excludeHrefs = [] }: SocialLinksProps) {
  const enabledSocial = getEnabledSocialLinks(socialLinks).filter(
    (item) => !excludeHrefs.includes(item.href),
  );

  if (enabledSocial.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {enabledSocial.map((item) => (
        <ExternalLink
          key={item.label}
          href={item.href}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {item.label}
        </ExternalLink>
      ))}
    </div>
  );
}
