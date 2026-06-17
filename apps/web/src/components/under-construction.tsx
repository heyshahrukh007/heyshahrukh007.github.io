import { Construction } from "lucide-react";

import { cn } from "@/lib/utils";

export default function UnderConstruction() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className={cn(
            "absolute -top-24 -left-24 size-72 rounded-full bg-primary/20 blur-3xl",
            "animate-orb-float",
          )}
        />
        <div
          className={cn(
            "absolute -right-16 -bottom-16 size-64 rounded-full bg-primary/15 blur-3xl",
            "animate-orb-float [animation-delay:2s]",
          )}
        />
        <div
          className={cn(
            "absolute top-1/2 left-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl",
            "animate-orb-float [animation-delay:4s]",
          )}
        />
      </div>

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <div
          className={cn(
            "mb-8 flex size-20 items-center justify-center rounded-full border border-primary/30 bg-primary/10 ring-4 ring-primary/5",
            "animate-in fade-in zoom-in-95 duration-700",
            "animate-icon-float",
          )}
        >
          <Construction className="size-10 text-primary" strokeWidth={1.5} />
        </div>

        <h1
          className={cn(
            "mb-4 bg-linear-to-r from-primary via-chart-2 to-chart-1 bg-size-[200%_auto] bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl",
            "animate-in fade-in slide-in-from-bottom-4 duration-700",
            "animate-gradient-shift",
          )}
        >
          Site Under Construction
        </h1>

        <p
          className={cn(
            "mb-2 text-lg text-muted-foreground",
            "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both [animation-delay:150ms]",
          )}
        >
          Something great is on the way.
        </p>
        <p
          className={cn(
            "mb-10 text-muted-foreground",
            "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both [animation-delay:300ms]",
          )}
        >
          Check back soon.
        </p>

        <div
          className={cn(
            "mb-6 flex items-center gap-2",
            "animate-in fade-in duration-700 fill-mode-both [animation-delay:450ms]",
          )}
          aria-hidden
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-2.5 rounded-full bg-primary animate-dot-bounce"
              style={{ animationDelay: `${i * 0.16}s` }}
            />
          ))}
        </div>

        <div
          className={cn(
            "h-1.5 w-48 overflow-hidden rounded-full bg-muted",
            "animate-in fade-in duration-700 fill-mode-both [animation-delay:600ms]",
          )}
          role="progressbar"
          aria-label="Loading"
          aria-valuetext="In progress"
        >
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <div className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-primary to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </main>
  );
}
