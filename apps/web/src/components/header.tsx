import HeaderNav from "@/components/header-nav";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent pointer-events-none" />
      <div className="mx-auto w-full max-w-3xl px-6 py-4 relative">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-3 md:gap-x-6">
          <SiteLogo className="col-start-1 row-start-1 min-w-0" />
          <p className="col-start-2 row-start-1 truncate text-center text-sm font-medium tracking-tight text-foreground md:hidden">
            {site.name}
          </p>
          <ThemeToggle className="col-start-3 row-start-1 justify-self-end" />
          <HeaderNav className="col-span-3 row-start-2 md:col-span-1 md:col-start-2 md:row-start-1" />
        </div>
      </div>
    </header>
  );
}
