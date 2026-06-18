"use client";

import { useEffect, useState } from "react";

import HeaderNav from "@/components/layout/header-nav";
import { SiteLogo } from "@/components/layout/site-logo";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 32;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 isolate">
      <div
        aria-hidden
        className={cn(
          "site-header__backdrop pointer-events-none absolute inset-0 border-b border-border/40 bg-background/80 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/70",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "site-header__accent absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "site-header__accent pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-primary/5 via-primary/2 to-transparent",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="relative mx-auto w-full max-w-3xl px-6 py-4">
        <div className="grid grid-cols-1 gap-y-3 md:grid-cols-[auto_1fr] md:items-center">
          <SiteLogo className="justify-self-center md:justify-self-start" />
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
