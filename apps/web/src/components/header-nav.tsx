"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { enabledNavItems } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="justify-self-center">
      <ul className="inline-flex items-center gap-0.5 rounded-full border border-border/60 bg-muted/20 p-1">
        {enabledNavItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "inline-flex rounded-full px-3.5 py-1.5 text-sm transition-colors",
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
