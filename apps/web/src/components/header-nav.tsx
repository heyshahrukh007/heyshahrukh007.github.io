"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { enabledNavItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="w-full max-w-full justify-self-center sm:w-auto">
      <ul className="scrollbar-none mx-auto flex w-max max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-border/60 bg-muted/20 p-1">
        {enabledNavItems.map((item) => (
          <li key={item.href} className="shrink-0">
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "inline-flex min-h-9 items-center whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs transition-colors sm:min-h-0 sm:px-3.5 sm:py-1.5 sm:text-sm",
                pathname === item.href
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
