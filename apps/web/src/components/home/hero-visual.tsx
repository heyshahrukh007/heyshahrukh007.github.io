import { HeroCodeSnippet } from "@/components/home/hero-code-snippet";
import { HeroPortrait } from "@/components/home/hero-portrait";
import { cn } from "@/lib/utils";

type HeroVisualProps = {
  className?: string;
};

function CodeSnippetBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-30"
      style={{
        backgroundImage:
          "radial-gradient(circle, color-mix(in oklch, var(--foreground) 14%, transparent) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    />
  );
}

export function HeroVisual({ className }: HeroVisualProps) {
  return (
    <div className={cn("w-full min-w-0", className)}>
      <div className="flex flex-col items-center gap-0 lg:hidden">
        <HeroPortrait className="max-w-64 sm:max-w-xs" />
        <div className="relative mx-auto w-full max-w-64 sm:max-w-md">
          <CodeSnippetBackdrop />
          <HeroCodeSnippet />
        </div>
      </div>

      <div className="relative mx-auto hidden w-full max-w-lg lg:block xl:max-w-xl">
        <HeroPortrait className="w-full" />
        <div className="absolute right-0 bottom-[8%] z-20 w-58 xl:bottom-[10%] xl:w-64">
          <div className="relative">
            <CodeSnippetBackdrop />
            <HeroCodeSnippet compact />
          </div>
        </div>
      </div>
    </div>
  );
}
