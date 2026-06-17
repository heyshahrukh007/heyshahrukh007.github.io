import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type ProfileAvatarProps = {
  className?: string;
  size?: "md" | "lg";
};

const sizeClasses = {
  md: "size-16 text-lg sm:size-20 sm:text-xl",
  lg: "size-20 text-xl sm:size-24 sm:text-2xl",
} as const;

export function ProfileAvatar({ className, size = "md" }: ProfileAvatarProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/30 font-semibold tracking-tight text-foreground",
        sizeClasses[size],
        className,
      )}
    >
      {getInitials(site.name)}
    </div>
  );
}
