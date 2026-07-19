import { HeroCodeSnippet } from "@/components/home/hero-code-snippet";
import { HeroPortrait } from "@/components/home/hero-portrait";
import { HeroTilt } from "@/components/home/hero-tilt";
import { cn } from "@/lib/utils";

type HeroVisualProps = {
  className?: string;
};

function CodeSnippetBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-20"
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
    <HeroTilt className={cn("w-full min-w-0", className)}>
      <div className="flex flex-col items-center gap-0 lg:hidden">
        <HeroPortrait className="max-w-64 sm:max-w-xs" parallax />
        <div
          data-parallax="near"
          className="relative mx-auto mt-0 w-full max-w-64 will-change-transform sm:max-w-md md:mt-4"
        >
          <CodeSnippetBackdrop />
          <HeroCodeSnippet />
        </div>
      </div>

      <div className="relative hidden w-full lg:block">
        <HeroPortrait className="ml-0 mr-auto w-full max-w-lg xl:max-w-xl" parallax />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mx-auto max-w-lg xl:max-w-xl"
        >
          <div
            data-parallax="near"
            className="pointer-events-auto absolute right-0 z-20 w-58 will-change-transform lg:bottom-[5%] xl:bottom-[6%] xl:w-64"
          >
            <div className="relative">
              <CodeSnippetBackdrop />
              <HeroCodeSnippet compact />
            </div>
          </div>
        </div>
      </div>
    </HeroTilt>
  );
}
