"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type EnabledNavItem = {
  label: string;
  enabled: true;
  href: Route;
};

type DisabledNavItem = {
  label: string;
  enabled: false;
};

type NavItem = EnabledNavItem | DisabledNavItem;

const navItems = [
  { href: "/", label: "Home", enabled: true },
  { label: "About", enabled: false },
  { label: "Skills", enabled: false },
  { label: "Experience", enabled: false },
  { label: "Projects", enabled: false },
  { label: "Architecture", enabled: false },
  { label: "Articles", enabled: false },
  { label: "Open Source", enabled: false },
  { label: "Resume", enabled: false },
  { label: "Contact", enabled: false },
] satisfies NavItem[];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-sm font-semibold text-primary">
              SM
            </span>
            <span className="text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">
              Shahrukh Mansuri
            </span>
          </Link>
          <p className="hidden text-sm text-muted-foreground sm:block">Software Engineer</p>
        </div>

        <nav aria-label="Primary" className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-1 rounded-xl border border-border/50 bg-card/40 p-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.enabled ? (
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "inline-flex rounded-lg px-3 py-2 text-sm transition-colors",
                      pathname === item.href
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Coming soon"
                    className="inline-flex cursor-not-allowed rounded-lg px-3 py-2 text-sm text-muted-foreground/50"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
