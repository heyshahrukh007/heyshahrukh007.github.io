import { cn } from "@/lib/utils";

export const textLinkClassName =
  "motion-interactive rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const textLinkWithIconClassName = cn(
  textLinkClassName,
  "group inline-flex items-center gap-1.5",
);
