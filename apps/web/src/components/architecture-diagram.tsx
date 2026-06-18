import Image from "next/image";

import { LinkArrowDownIcon } from "@/components/link-icons";import { cn } from "@/lib/utils";

type ArchitectureDiagramLayer = {
  label: string;
  description: string;
};

type ArchitectureDiagramProps = {
  alt: string;
  caption?: string;
  src?: string;
  layers?: readonly ArchitectureDiagramLayer[];
  className?: string;
};

export function ArchitectureDiagram({
  alt,
  caption,
  src,
  layers = [],
  className,
}: ArchitectureDiagramProps) {
  return (
    <figure className={cn("space-y-3", className)}>
      <div className="overflow-hidden rounded-xl border border-border/50 bg-muted/15">
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={960}
            height={540}
            className="aspect-video w-full object-cover"
            unoptimized
          />
        ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex aspect-[16/10] w-full max-h-48 flex-col justify-center gap-2 p-4 sm:max-h-none sm:aspect-video sm:gap-3 sm:p-6 md:p-8"
        >
            {layers.map((layer, index) => (
              <div key={layer.label} className="space-y-2">
                <div className="rounded-lg border border-border/60 bg-background/60 px-4 py-3 text-center">
                  <p className="text-sm font-medium text-foreground">{layer.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {layer.description}
                  </p>
                </div>                {index < layers.length - 1 ? (
                  <p aria-hidden className="flex justify-center text-muted-foreground/60">
                    <LinkArrowDownIcon />
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="text-center text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
