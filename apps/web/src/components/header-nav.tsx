"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { enabledNavItems } from "@/lib/site";
import { prefersReducedMotion } from "@/lib/motion";
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

type IndicatorStyle = {
  width: number;
  x: number;
  visible: boolean;
};

export default function HeaderNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState<IndicatorStyle>({
    width: 0,
    x: 0,
    visible: false,
  });

  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    setReduceMotion(prefersReducedMotion());
  }, []);

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

  const updateIndicator = useCallback(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const activeItem = enabledNavItems.find((item) =>
      isCurrentNavItem(pathname, currentHash, item.href),
    );

    if (!activeItem) {
      setIndicator((current) => ({ ...current, visible: false }));
      return;
    }

    const activeLink = linkRefs.current.get(activeItem.label);
    if (!activeLink) {
      return;
    }

    const listRect = list.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    setIndicator({
      width: linkRect.width,
      x: linkRect.left - listRect.left,
      visible: true,
    });
  }, [pathname, currentHash]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const observer = new ResizeObserver(() => {
      updateIndicator();
    });

    observer.observe(list);
    window.addEventListener("resize", updateIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  const showIndicator = indicator.visible && !reduceMotion;

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "min-w-0 -mx-6 px-6",
        "md:mx-0 md:flex md:justify-center md:px-0",
        className,
      )}
    >
      <ul
        ref={listRef}
        className="scrollbar-none relative mx-auto flex w-max max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-border/60 bg-muted/20 p-1"
      >
        {showIndicator ? (
          <span
            aria-hidden
            className="motion-nav-indicator pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-background shadow-sm"
            style={{
              width: indicator.width,
              transform: `translateX(${indicator.x}px)`,
            }}
          />
        ) : null}

        {enabledNavItems.map((item) => {
          const isCurrent = isCurrentNavItem(pathname, currentHash, item.href);

          return (
            <li key={item.label} className="relative shrink-0">
              <Link
                ref={(node) => {
                  if (node) {
                    linkRefs.current.set(item.label, node);
                  } else {
                    linkRefs.current.delete(item.label);
                  }
                }}
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "motion-interactive relative z-10 inline-flex min-h-9 items-center whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:min-h-0 md:px-3.5 md:py-1.5 md:text-sm",
                  isCurrent
                    ? showIndicator
                      ? "text-foreground"
                      : "bg-background text-foreground shadow-sm"
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
