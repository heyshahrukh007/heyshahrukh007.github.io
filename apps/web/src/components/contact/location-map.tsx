import { ExternalLink } from "@/components/shared/external-link";
import { LinkArrowUpRightIcon } from "@/components/shared/link-icons";
import { contact, site } from "@/lib/site";
import { textLinkWithIconClassName } from "@/lib/link-styles";
import { cn } from "@/lib/utils";

type LocationMapProps = {
  className?: string;
};

export function LocationMap({ className }: LocationMapProps) {
  const { embedUrl, externalUrl } = contact.locationMap;

  return (
    <figure className={cn("location-map max-w-2xl space-y-3", className)}>
      <div className="location-map__frame">
        <iframe
          title={`Map showing ${site.location}`}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="location-map__iframe"
        />
        <div aria-hidden className="location-map__tint" />
      </div>
      <figcaption className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-muted-foreground">{site.location}</span>
        <ExternalLink href={externalUrl} className={textLinkWithIconClassName}>
          Open in Google Maps
          <LinkArrowUpRightIcon />
        </ExternalLink>
      </figcaption>
    </figure>
  );
}
