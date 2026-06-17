import { ExternalLink } from "@/components/external-link";
import { getEnabledSocialLinks, socialLinks } from "@/lib/site";
import { textLinkClassName } from "@/lib/link-styles";
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
    <nav aria-label="Social profiles" className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {enabledSocial.map((item) => (
        <ExternalLink key={item.label} href={item.href} className={cn("text-sm", textLinkClassName)}>
          {item.label}
        </ExternalLink>
      ))}
    </nav>
  );
}
