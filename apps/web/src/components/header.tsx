import HeaderNav from "@/components/header-nav";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 px-6 py-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <p className="hidden truncate text-xs tracking-wide text-muted-foreground uppercase sm:block sm:justify-self-start">
          {site.location}
        </p>

        <HeaderNav />

        <div className="hidden sm:block sm:justify-self-end" aria-hidden />
      </div>
    </header>
  );
}
