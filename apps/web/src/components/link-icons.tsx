import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const linkIconClassName = "size-3.5 shrink-0 opacity-70";

type LinkIconProps = {
  className?: string;
};

export function LinkArrowRightIcon({ className }: LinkIconProps) {
  return <ArrowRightIcon aria-hidden className={cn(linkIconClassName, className)} />;
}

export function LinkArrowUpRightIcon({ className }: LinkIconProps) {
  return <ArrowUpRightIcon aria-hidden className={cn(linkIconClassName, className)} />;
}

export function LinkArrowDownIcon({ className }: LinkIconProps) {
  return <ArrowDownIcon aria-hidden className={cn(linkIconClassName, className)} />;
}

export function LinkArrowLeftIcon({ className }: LinkIconProps) {
  return <ArrowLeftIcon aria-hidden className={cn(linkIconClassName, className)} />;
}
