"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { enabledNavItems, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-3xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4">
        <p className="hidden truncate text-xs text-muted-foreground sm:block">{site.location}</p>

        <nav aria-label="Primary">
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

        <div className="hidden sm:block" aria-hidden />
      </div>
    </header>
  );
}
