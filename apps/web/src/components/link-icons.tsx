import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const linkIconBaseClassName =
  "motion-interactive shrink-0 opacity-70 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover/button:opacity-100 group-focus-visible/button:opacity-100";

const linkIconHoverRightClassName = cn(
  linkIconBaseClassName,
  "group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 group-hover/button:translate-x-0.5 group-focus-visible/button:translate-x-0.5",
);

const linkIconHoverLeftClassName = cn(
  linkIconBaseClassName,
  "group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5 group-hover/button:-translate-x-0.5 group-focus-visible/button:-translate-x-0.5",
);

const linkIconHoverUpRightClassName = cn(
  linkIconBaseClassName,
  "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 group-focus-visible/button:translate-x-0.5 group-focus-visible/button:-translate-y-0.5",
);

const linkIconHoverDownClassName = cn(
  linkIconBaseClassName,
  "group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5 group-hover/button:translate-y-0.5 group-focus-visible/button:translate-y-0.5",
);

type LinkIconProps = {
  className?: string;
};

export function LinkArrowRightIcon({ className }: LinkIconProps) {
  return <ArrowRightIcon aria-hidden className={cn("size-3.5", linkIconHoverRightClassName, className)} />;
}

export function LinkArrowUpRightIcon({ className }: LinkIconProps) {
  return (
    <ArrowUpRightIcon aria-hidden className={cn("size-3.5", linkIconHoverUpRightClassName, className)} />
  );
}

export function LinkArrowDownIcon({ className }: LinkIconProps) {
  return <ArrowDownIcon aria-hidden className={cn("size-3.5", linkIconHoverDownClassName, className)} />;
}

export function LinkArrowLeftIcon({ className }: LinkIconProps) {
  return <ArrowLeftIcon aria-hidden className={cn("size-3.5", linkIconHoverLeftClassName, className)} />;
}
