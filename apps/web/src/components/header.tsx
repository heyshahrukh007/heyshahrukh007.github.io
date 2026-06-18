import HeaderNav from "@/components/header-nav";
import { SiteLogo } from "@/components/site-logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-primary/5 via-primary/2 to-transparent pointer-events-none" />
      <div className="relative mx-auto w-full max-w-3xl px-6 py-4">
        <div className="grid grid-cols-1 gap-y-3 md:grid-cols-[auto_1fr] md:items-center">
          <SiteLogo className="justify-self-center md:justify-self-start" />
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
