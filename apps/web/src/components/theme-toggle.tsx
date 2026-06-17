"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme !== "light";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      shape="pill"
      className={cn("relative motion-interactive text-muted-foreground hover:text-foreground", className)}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <SunIcon
        className={cn(
          "size-4 transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mounted && isDark ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <MoonIcon
        className={cn(
          "absolute size-4 transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mounted && isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
