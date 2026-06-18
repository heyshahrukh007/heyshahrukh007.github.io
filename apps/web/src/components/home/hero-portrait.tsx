import { PortraitFrame } from "@/components/shared/portrait-frame";
import { hero } from "@/lib/site";

type HeroPortraitProps = {
  className?: string;
};

export function HeroPortrait({ className }: HeroPortraitProps) {
  return (
    <PortraitFrame
      src={hero.photo.src}
      alt={hero.photo.alt}
      className={className}
      size="hero"
      fetchPriority="high"
    />
  );
}
