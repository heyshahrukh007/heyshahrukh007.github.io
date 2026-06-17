"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { enabledNavItems } from "@/lib/site";
import { cn } from "@/lib/utils";

function parseNavHref(href: string) {
  const hashIndex = href.indexOf("#");

  if (hashIndex === -1) {
    return { pathname: href, hash: "" };
  }

  return {
    pathname: href.slice(0, hashIndex),
    hash: href.slice(hashIndex),
  };
}

function isCurrentNavItem(pathname: string, currentHash: string, href: string) {
  const { pathname: hrefPath, hash: hrefHash } = parseNavHref(href);

  if (hrefHash) {
    return pathname === hrefPath && currentHash === hrefHash;
  }

  if (hrefPath === "/") {
    return pathname === "/";
  }

  return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
}

export default function HeaderNav() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, [pathname]);

  return (
    <nav aria-label="Primary" className="w-full max-w-full justify-self-center sm:w-auto">
      <ul className="scrollbar-none mx-auto flex w-max max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-border/60 bg-muted/20 p-1">
        {enabledNavItems.map((item) => {
          const isCurrent = isCurrentNavItem(pathname, currentHash, item.href);

          return (
            <li key={item.label} className="shrink-0">
              <Link
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-9 items-center whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-0 sm:px-3.5 sm:py-1.5 sm:text-sm",
                  isCurrent
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
