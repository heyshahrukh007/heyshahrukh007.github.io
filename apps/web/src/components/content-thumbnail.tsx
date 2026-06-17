import { cn } from "@/lib/utils";

type ContentThumbnailProps = {
  label: string;
  className?: string;
  aspectClassName?: string;
};

export function ContentThumbnail({
  label,
  className,
  aspectClassName = "aspect-[16/10] sm:aspect-video",
}: ContentThumbnailProps) {
  const initials = label
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      aria-hidden
      className={cn(
        "flex w-full items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-linear-to-br from-muted/40 via-muted/20 to-primary/10",
        aspectClassName,
        className,
      )}
    >
      <span className="text-sm font-medium tracking-[0.2em] text-muted-foreground/80 uppercase sm:text-base">
        {initials}
      </span>
    </div>
  );
}
